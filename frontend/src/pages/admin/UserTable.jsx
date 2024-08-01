import React, { useEffect, useState } from "react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteUserById, getAllUserApi } from "../../apis/Api";
import Sidebar from "./sidebar";

export const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQueryUsers, setSearchQueryUsers] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllUserApi()
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDialog) {
      return;
    } else {
      deleteUserById(id)
        .then((res) => {
          if (res.data.success === true) {
            window.location.reload();
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== id)
            );
            toast.success(res.data.message);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  };

  const handleSort = () => {
    const sortedUsers = [...users];
    sortedUsers.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.firstName.localeCompare(b.firstName);
      } else {
        return b.firstName.localeCompare(a.firstName);
      }
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchUsers = () => {
    const filteredUsers = users.filter((user) => {
      const lowerCaseQuery = searchQueryUsers.toLowerCase();
      return (
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.firstName.toLowerCase().includes(lowerCaseQuery)
      );
    });
    setUsers(filteredUsers);
  };

  return (
    <>
    <style>
      {
        `
        .main-content {
  margin-left: 250px;
  padding: 20px;
  margin-top: 80px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

// .table th, .table td {
//   padding: 10px;
//   text-align: left;
//   border: 1px solid #ddd;
// }

// .table-dark th {
//   background-color: black;
//   // color: white;
// }

.btn-group .btn {
  margin-right: 5px;
}

// .search-container {
//   display: flex;
//   align-items: center;
// }

// .search-container input {
//   flex: 1;
//   margin-right: 10px;
// }

// .clear-search-button, .search-button, .sort-button {
//   margin-right: 5px;
// }

// .clear-search-button, .search-button, .sort-button, .btn-danger {
//   padding: 5px 10px;
//   font-size: 0.875rem;
// }

// .btn-primary {
//   background-color: #d9534f;
//   border-color: #d9534f;
// }

// .btn-primary:hover {
//   background-color: #c9302c;
//   border-color: #ac2925;
// }
`
      }
    </style>
      <Sidebar />

      <div className="main-content">
        <div className="d-flex justify-content-between">
          <h2>User List</h2>

          <Link to="/admin/dashboard">
            {/* <button type="button" className="btn btn-secondary">
              Back to Admin Dashboard
            </button> */}
          </Link>
        </div>7

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search users by name, email, phone, or token..."
              value={searchQueryUsers}
              onChange={(e) => setSearchQueryUsers(e.target.value)}
            />
            {searchQueryUsers && (
              <button
              className="clear-search-button"
              onClick={() => setSearchQueryUsers("")}
              style={{
                backgroundColor: "gray",
                color: "white",
                border: "none",
                padding: "8px 16px",
                borderRadius: "4px",
                cursor: "pointer",
                marginRight: "8px", // Adjust spacing between buttons
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              Clear Search
            </button>
            )}
           <button
  className="search-button"
  onClick={handleSearchUsers}
  style={{
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginRight: "8px", // Adjust spacing between buttons
    transition: "background-color 0.3s, color 0.3s",
  }}
>
  Search Users
</button>
<button
  className="sort-button"
  onClick={handleSort}
  style={{
    backgroundColor: "gray",
    color: "white",
    border: "none",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s, color 0.3s",
  }}
>
  {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
</button>
          </div>

          <Link to="/admin/add-user">
            
          </Link>
        </div>

        <table className="table">
          <thead className="table-dark">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((userData, index) => (
              <tr key={index}>
                <td>{userData.firstName}</td>
                <td>{userData.lastName}</td>
                <td>{userData.email}</td>
                <td>
                  <div className="btn-group" role="group">
                    <Link
                      className="btn btn-success"
                      style={{ backgroundColor: "black", color: "white" }}
                      to={`/admin/edit/${userData._id}`}
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(userData._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
