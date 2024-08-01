import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteContactById, getAllContact } from "../../apis/Api";
import { FaSortAlphaDown, FaSortAlphaUp } from 'react-icons/fa';
import Sidebar from "./sidebar";

export const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    getAllContact()
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
      });
  }, []);

  const handleDelete = (id) => {
    const confirmDialog = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDialog) {
      return;
    } else {
      deleteContactById(id).then((res) => {
        if (res.data.success === true) {
          window.location.reload();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
    }
  };

  const handleSort = () => {
    const sortedContacts = [...contacts];
    sortedContacts.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.email.localeCompare(b.email);
      } else {
        return b.email.localeCompare(a.email);
      }
    });
    setContacts(sortedContacts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearch = () => {
    const filteredContacts = contacts.filter((contact) => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return contact.email.toLowerCase().includes(lowerCaseQuery);
    });
    setContacts(filteredContacts);
  };

  return (
    <>
      <Sidebar />

      <div className="main-content" style={{ marginLeft: "250px", padding: "20px", marginTop: "80px" }}>
        <div className="d-flex justify-content-between">
          <h2>Contact List</h2>

          <Link to="/admin/dashboard">
           
          </Link>
        </div>

        <div className="search-container mb-4">
          <input
            type="text"
            placeholder="Search users by email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
           <button
           className="clear-search-button"
           onClick={() => setSearchQuery("")}
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
           Clear Search
         </button>
         
          )}
          <button
  className="search-button"
  onClick={handleSearch}
  style={{
  
      backgroundColor: "gray",
      color: "white",
      transition: "background-color 0.3s, color 0.3s",
      border: "none",
      padding: "8px 16px",
 
    
  }}
>
  Search
</button>

<button
  className="sort-button"
  onClick={handleSort}
  style={{
    backgroundColor: "gray",
    color: "white",
    
    transition: "background-color 0.3s, color 0.3s",
    border: "none", // Remove border for cleaner look
    padding: "8px 16px", // Adjust padding for better button size
  }}
>
  {sortOrder === "asc" ? <FaSortAlphaDown /> : <FaSortAlphaUp />}
</button>

        </div>

        <table className="table mt-2">
          <thead className="table-dark">
            <tr>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id}>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      onClick={() => handleDelete(contact._id)}
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
