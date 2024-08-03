// const ShippingInfo = require("../model/shippingModel"); // Adjust the path as per your project structure
const CryptoJS = require("crypto-js");
const cloudinary = require("cloudinary");
const ShippingInfo=require("../model/shippingModel");
const secretKey = "your_secret_key"; 
const bcrypt = require('bcrypt');

const createShippingInfo = async (req, res) => {
    console.log(req.body);
    const id = req.query.userID;

    const {
        userID,
        username,
        address,
        contactNumber,
        pickUpDate,
        returnDate,
        specificRequirements
    } = req.body;

    if (!userID || !username || !address || !contactNumber || !pickUpDate || !returnDate || !specificRequirements) {
        return res.status(400).json({
            success: false,
            message: "Please provide all the required details."
        });
    }

    try {
        // Encrypt sensitive data
        const encryptedUsername = CryptoJS.AES.encrypt(username, secretKey).toString();
        const encryptedAddress = CryptoJS.AES.encrypt(address, secretKey).toString();
        const encryptedContactNumber = CryptoJS.AES.encrypt(contactNumber, secretKey).toString();
        const encryptedSpecificRequirements = CryptoJS.AES.encrypt(specificRequirements, secretKey).toString();

        // Create new shipping info document with encrypted data
        const newShippingInfo = new ShippingInfo({
            userID: userID,
            username: encryptedUsername,
            address: encryptedAddress,
            contactNumber: encryptedContactNumber,
            pickUpDate: pickUpDate,
            returnDate: returnDate,
            specificRequirements: encryptedSpecificRequirements
        });

        // Save the new shipping info to the database
        await newShippingInfo.save();

        res.status(200).json({
            success: true,
            message: "Shipping information created successfully.",
            data: newShippingInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};


 
// Function to update shipping information for a single item in the cart
const updateSingleShippingInfo = async (shippingId, updatedShippingInfo) => {
    try {
        const updatedShipping = await ShippingInfo.findByIdAndUpdate(
            shippingId,
            { $set: updatedShippingInfo },
            { new: true }
        );
 
        if (!updatedShipping) {
            throw new Error('Shipping information not found');
        }
 
        return updatedShipping;
    } catch (error) {
        throw new Error('Error updating shipping information');
    }
};
 
 
// GET SINGLE SHIPPING INFO
const getSingleShippingInfo = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "Shipping info ID is required."
        });
    }
    try {
        const singleShippingInfo = await ShippingInfo.findById(id);
        if (!singleShippingInfo) {
            return res.status(404).json({
                success: false,
                message: "Shipping info not found."
            });
        }

        // Decrypt sensitive data
        const decryptedUsername = CryptoJS.AES.decrypt(singleShippingInfo.username, secretKey).toString(CryptoJS.enc.Utf8);
        const decryptedAddress = CryptoJS.AES.decrypt(singleShippingInfo.address, secretKey).toString(CryptoJS.enc.Utf8);
        const decryptedContactNumber = CryptoJS.AES.decrypt(singleShippingInfo.contactNumber, secretKey).toString(CryptoJS.enc.Utf8);
        const decryptedSpecificRequirements = CryptoJS.AES.decrypt(singleShippingInfo.specificRequirements, secretKey).toString(CryptoJS.enc.Utf8);

        res.json({
            success: true,
            message: "Shipping info fetched successfully.",
            shippingInfo: {
                ...singleShippingInfo.toObject(),
                username: decryptedUsername,
                address: decryptedAddress,
                contactNumber: decryptedContactNumber,
                specificRequirements: decryptedSpecificRequirements
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

 
// GET SHIPPING INFO BY USER ID
const getShippingInfoByUserID = async (req, res) => {
    const id = req.params.id;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: "User ID is required."
        });
    }
    try {
        const shippingInfo = await ShippingInfo.find({ userID: userID });
        res.json({
            success: true,
            message: "Shipping info retrieved successfully.",
            shippingInfo: shippingInfo
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};
 
// UPDATE SHIPPING INFO
const updateShippingInfo = async (req, res) => {
    const id = req.params.id;
    const {
        userID,
        username,
        address,
        contactNumber,
        pickUpDate,
        returnDate,
        specificRequirements
    } = req.body;
 
    // Validate required fields
    if (!userID || !username || !address || !contactNumber || !specificRequirements || !pickUpDate || !returnDate ) {
        return res.status(400).json({
            success: false,
            message: "All fields are required."
        });
    }
 
    try {
        const updatedShippingInfo = {
            userID: userID,
            username:username,
            address: address,
            contactNumber: contactNumber,
            pickUpDate: pickUpDate,
            returnDate: returnDate,
            specificRequirements: specificRequirements,
            policyAgreement1: policyAgreement1,
            policyAgreement2: policyAgreement2
        };
 
        const updatedShippingInfoResult = await ShippingInfo.findByIdAndUpdate(id, updatedShippingInfo, { new: true });
 
        if (!updatedShippingInfoResult) {
            return res.status(404).json({
                success: false,
                message: "Shipping info not found."
            });
        }
 
        res.json({
            success: true,
            message: "Shipping info updated successfully.",
            shippingInfo: updatedShippingInfoResult
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};
 
module.exports = {
    createShippingInfo,
    getSingleShippingInfo,
    getShippingInfoByUserID,
    updateShippingInfo,
    updateSingleShippingInfo
};
 