const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Users = require("../model/userModel");

const { forgetPassword } = require("../controllers/otpcontroller");

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // if (password.length < 8 || password.length > 12) {
  //   passwordErrors.push('Password must be 8-12 characters long.');
  // }
  // if (!/[A-Z]/.test(password)) {
  //   passwordErrors.push('Password must contain at least one uppercase letter.');
  // }
  // if (!/[a-z]/.test(password)) {
  //   passwordErrors.push('Password must contain at least one lowercase letter.');
  // }
  // if (!/\d/.test(password)) {
  //   passwordErrors.push('Password must contain at least one number.');
  // }
  // if (!/[\W_]/.test(password)) {
  //   passwordErrors.push('Password must contain at least one special character.');
  // }

  if (!firstName || !lastName || !email || !password) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  try {
    const existingUser = await Users.findOne({ email: email });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User already exists.",
      });
    }

    const randomSalt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, randomSalt);
    // const hashedfirstName = await bcrypt.hash(firstName, 10);
    // const hashedlastName = await bcrypt.hash(lastName, 10);
    // const hashedemail = await bcrypt.hash(email, 10);

    const newUser = new Users({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: encryptedPassword,
      passwordHistory: [encryptedPassword],
    });

    console.log("User data before saving:", newUser); // Debugging

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User created successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json("Server Error");
  }
};
const nodemailer = require("nodemailer");

// Function to send verification email
const sendVerifyMail = async (firstName, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "amiableella6@gmail.com",
        pass: "haik cshy czot pmkd",
      },
    });
    const mailOptions = {
      from: "amiableella6@gmail.com",
      to: email,
      subject: "For Verification mail",
      html: `<p>Hi, ${firstName} ,Please click here to <a href= "http://localhost:5000/api/user/verify/${user_id}"> Verify </a> your mail.</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been successfully sent:-", info.response);
      }
    });
  } catch (error) {
    console.error("Error sending verification mail:", error);
    throw new Error("Email sending failed");
  }
};

const loginUser = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please fill all the fields.",
    });
  }

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist.",
      });
    }

    const maxFailedAttempts = 3;
    const lockoutDuration = 1 * 60 * 1000; // 15 minutes in milliseconds

    // Check if the user is currently locked out
    if (user.failedLoginAttempts >= maxFailedAttempts) {
      const now = new Date();
      const timeSinceLastAttempt = now - new Date(user.lastFailedLogin);
      const timeLeft = lockoutDuration - timeSinceLastAttempt;

      if (timeSinceLastAttempt < lockoutDuration) {
        const minutesLeft = Math.ceil(timeLeft / (60 * 1000));

        // Send lockout email notification
        sendLockoutEmail(user.email);

        return res.json({
          success: false,
          message: `Too many failed attempts. Your account is locked. 
          Please try again in ${minutesLeft} minute(s).`,
          attemptsLeft: 0,
          timeLeft: minutesLeft,
        });
      }

      // Reset failed attempts and timestamp after lockout period
      user.failedLoginAttempts = 0;
      user.lastFailedLogin = null;
      await user.save();
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      user.failedLoginAttempts += 1;
      user.lastFailedLogin = new Date();
      await user.save();

      const attemptsLeft = maxFailedAttempts - user.failedLoginAttempts;

      if (attemptsLeft === 0) {
        // Send lockout email notification
        sendLockoutEmail(user.email);
      }

      return res.json({
        success: false,
        message: `Password does not match.
         You have ${attemptsLeft} attempt(s) left.`,
        attemptsLeft: attemptsLeft,
        timeLeft: null,
      });
    }

    user.failedLoginAttempts = 0;
    user.lastFailedLogin = null;
    await user.save();

    // Check password expiry in 90days
    // const passwordExpiryDays = 90;
    // const now = new Date();
    // const passwordAge = Math.floor(
    //   (now - new Date(user.passwordLastChanged)) / (1000 * 60 * 60 * 24)
    // );

    // if (passwordAge > passwordExpiryDays) {
    //   return res.json({
    //     success: false,
    //     message: "Your password has expired. Please change your password.",
    //     passwordExpired: true,
    //   });
    // }
    // // Check password expiry in minutes
    const passwordExpiryMinutes = 1; // Set password expiry period to 1 minute
    const now = new Date();
    const passwordAgeInMinutes = Math.floor(
      (now - new Date(user.passwordLastChanged)) / (1000 * 60)
    ); // Calculate password age in minutes

    if (passwordAgeInMinutes > passwordExpiryMinutes) {
      return res.json({
        success: false,
        message: "Your password has expired.fdgusdfh Please change your password.",
        passwordExpired: true,
      });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      token: token,
      userData: user,
      message: "User logged in successfully.",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Server Error",
    });
  }
};

const sendLockoutEmail = async (email) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // Your email
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Account Locked Due to Too Many Failed Login Attempts",
      text: "Your account has been locked due to too many failed login attempts. Please try again after 15 minutes.",
    };

    await transporter.sendMail(mailOptions);
    console.log("Lockout email sent successfully.");
  } catch (error) {
    console.error("Error sending lockout email:", error);
  }
};

// const loginUser = async (req, res) => {
//   console.log(req.body);

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Please fill all the fields.",
//     });
//   }

//   try {
//     const user = await Users.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User does not exist.",
//       });
//     }

//     const maxFailedAttempts = 3;
//     const lockoutDuration = 15 * 60 * 1000; // 15 minutes in milliseconds

//     // Check if the user is currently locked out
//     if (user.failedLoginAttempts >= maxFailedAttempts) {
//       const now = new Date();
//       const timeSinceLastAttempt = now - new Date(user.lastFailedLogin);
//       const timeLeft = lockoutDuration - timeSinceLastAttempt;

//       if (timeSinceLastAttempt < lockoutDuration) {
//         const minutesLeft = Math.ceil(timeLeft / (60 * 1000));
//         return res.json({
//           success: false,
//           message: `Too many failed attempts. Your account is locked. Please try again in ${minutesLeft} minute(s).`,
//           attemptsLeft: 0,
//           timeLeft: minutesLeft
//         });
//       }

//       // Reset failed attempts and timestamp after lockout period
//       user.failedLoginAttempts = 0;
//       user.lastFailedLogin = null;
//       await user.save();
//     }

//     // Check password expiry
//     const passwordExpiryDays = 1; // Set password expiry period (e.g., 90 days)
//     const now = new Date();
//     const passwordAge = Math.floor((now - new Date(user.passwordLastChanged)) / (1000 * 60 * 60 * 24)); // Calculate password age in days

//     if (passwordAge > passwordExpiryDays) {
//       return res.json({
//         success: false,
//         message: "Your password has expired. Please change your password.",
//         passwordExpired: true
//       });
//     }
//   // // Check password expiry in minutes
//   // const passwordExpiryMinutes = 1; // Set password expiry period to 1 minute
//   // const now = new Date();
//   // const passwordAgeInMinutes = Math.floor(
//   //   (now - new Date(user.passwordLastChanged)) / (1000 * 60)
//   // ); // Calculate password age in minutes

//   // if (passwordAgeInMinutes > passwordExpiryMinutes) {
//   //   return res.json({
//   //     success: false,
//   //     message: "Your password has expired. Please change your password.",
//   //     passwordExpired: true,
//   //   });
//   // }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       user.failedLoginAttempts += 1;
//       user.lastFailedLogin = new Date();
//       await user.save();

//       const attemptsLeft = maxFailedAttempts - user.failedLoginAttempts;

//       return res.json({
//         success: false,
//         message: `Password does not match. You have ${attemptsLeft} attempt(s) left.`,
//         attemptsLeft: attemptsLeft,
//         timeLeft: null
//       });
//     }

//     user.failedLoginAttempts = 0;
//     user.lastFailedLogin = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_TOKEN_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       success: true,
//       token: token,
//       userData: user,
//       message: "User logged in successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// const loginUser = async (req, res) => {
//   console.log(req.body);

//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.json({
//       success: false,
//       message: "Please fill all the fields.",
//     });
//   }

//   try {
//     const user = await Users.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User does not exist.",
//       });
//     }

//     const maxFailedAttempts = 3;
//     const lockoutDuration = 1 * 60 * 1000; // 15 minutes in milliseconds

//     // Check if the user is currently locked out
//     if (user.failedLoginAttempts >= maxFailedAttempts) {
//       const now = new Date();
//       const timeSinceLastAttempt = now - new Date(user.lastFailedLogin);
//       const timeLeft = lockoutDuration - timeSinceLastAttempt;

//       if (timeSinceLastAttempt < lockoutDuration) {
//         const minutesLeft = Math.ceil(timeLeft / (60 * 1000));
//         return res.json({
//           success: false,
//           message: `Too many failed attempts. Your account is locked. Please try again in ${minutesLeft} minute(s).`,
//           attemptsLeft: 0,
//           timeLeft: minutesLeft
//         });
//       }

//       // Reset failed attempts and timestamp after lockout period
//       user.failedLoginAttempts = 0;
//       user.lastFailedLogin = null;
//       await user.save();
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//       // Increment failed attempts and update timestamp
//       user.failedLoginAttempts += 1;
//       user.lastFailedLogin = new Date();
//       await user.save();

//       const attemptsLeft = maxFailedAttempts - user.failedLoginAttempts;

//       return res.json({
//         success: false,
//         message: `Password does not match. You have ${attemptsLeft} attempt(s) left.`,
//         attemptsLeft: attemptsLeft,
//         timeLeft: null
//       });
//     }

//     // Reset failed attempts after successful login
//     user.failedLoginAttempts = 0;
//     user.lastFailedLogin = null;
//     await user.save();

//     const token = jwt.sign(
//       { id: user._id, isAdmin: user.isAdmin },
//       process.env.JWT_TOKEN_SECRET,
//       { expiresIn: "1h" }
//     );

//     res.status(200).json({
//       success: true,
//       token: token,
//       userData: user,
//       message: "User logged in successfully.",
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// };

// const changePassword = async (req, res) => {
//   try {
//     const { email, changepassword } = req.body;

//     const user = await Users.findOne({ email });

//     if (!user) {
//       return res.json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     if (user.password) {
//       user.passwordHistory.push(user.password);
//     }

//     const randomSalt = await bcrypt.genSalt(10);
//     const newHashedPassword = await bcrypt.hash(changepassword, randomSalt);

//     user.password = newHashedPassword;
//     user.passwordLastChanged = new Date(); // Update the password last changed date
//     await user.save();

//     res.json({
//       success: true,
//       message: "Password changed successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

const changePassword = async (req, res) => {
  try {
    console.log(req.body);
    const { email, changepassword } = req.body;

    // Find the user by email
    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    // Check if the new password matches any in the password history
    for (const oldPassword of user.passwordHistory) {
      const isMatch = await bcrypt.compare(changepassword, oldPassword);
      if (isMatch) {
        return res.json({
          success: false,
          message:
            "New password cannot be the same as any of your previous passwords.",
        });
      }
    }

    // Add the current password to history if it exists
    if (user.password) {
      user.passwordHistory.push(user.password);
    }

    // Hash the new password
    const randomSalt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(changepassword, randomSalt);

    // Update the user's password
    user.password = newHashedPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const updateUserData = async (req, res) => {
  console.log(req.body);

  const oldEmail = req.body.oldEmail;
  const newEmail = req.body.newEmail;
  const newPassword = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const isAdmin = req.body.isAdmin;

  if (!oldEmail) {
    return res.status(500).json({
      success: false,
      message: "Old email missing",
    });
  }

  try {
    const user = await Users.findOne({ email: oldEmail });

    if (!user) {
      console.log("User not found");
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (newPassword) {
      // Add the current password to history
      if (user.password) {
        user.passwordHistory.push(user.password);
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    user.email = newEmail || user.email;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;

    if (newEmail && newEmail !== oldEmail) {
      const existingUser = await Users.findOne({ email: newEmail });
      if (existingUser && !existingUser._id.equals(user._id)) {
        return res.json({
          success: false,
          message: "Email already exists",
        });
      }
    }

    if (isAdmin) {
      user.isAdmin = isAdmin;
    }
    await user.save();
    console.log("User data updated successfully");

    const userData = await Users.findOne({ email: user.email });

    return res.json({
      success: true,
      message: "User data updated successfully",
      userData: userData,
    });
  } catch (error) {
    console.error("Error updating user data:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating user data",
    });
  }
};

const forget = async (req, res) => {
  const email = req.body.email;
  console.log("Received email: " + email);

  try {
    const user = await Users.findOne({ email });
    if (user) {
      console.log("Existing user found: " + email);
      console.log(email);
      await forgetPassword(email); //

      // return respondWithData(res, 'SUCCESS', "OTP Sent successfully", hash);
      return res.status(500).json({
        success: true,
        message: "OTP Sent successfully",
      });
    } else {
      console.log("Existing user not found");
      // return respondWithError(res, 'NOT_FOUND', "Email Not found");
      res.status(404).json({ success: false, message: "Email Not found" });
      console.log("Existing user not found");
    }
  } catch (err) {
    console.error(err);
    // return respondWithError(res, 'INTERNAL_SERVER_ERROR', err.toString());
    res.status(500).json(err);
  }
};

module.exports = {
  createUser,
  loginUser,
  changePassword,
  updateUserData,
  forget,
  sendVerifyMail,
};
