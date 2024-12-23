import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./CmpStaffCollection.css";

const CmpStaffCollection = () => {
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    remarks: "",
    username: "",
  });
  const [searchDate, setSearchDate] = useState(""); // State for search date
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");

  const fetchSearchResults = (date) => {
    if (!username || !date) {
      alert("Username or date is missing.");
      return;
    }

    fetch(
      `http://localhost/ticket_collection/get_staffcollection.php?username=${username}&date=${date}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSearchResults(data);
        } else {
          alert(data.Message || "No results found for the selected date.");
          setSearchResults([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching collection details:", error);
        alert("Something went wrong. Please try again later.");
      });
  };

  const searchCollection = () => {
    if (!searchDate) {
      alert("Please select a date to search.");
      return;
    }
    fetchSearchResults(searchDate);

    // Clear the search date input field
    setSearchDate("");
  };

  const save_collection = (e) => {
    e.preventDefault();

    if (!/^\d+$/.test(formData.amount)) {
      alert("Please enter a valid amount with positive digits.");
      return;
    }

    const data = new FormData();
    data.append("date", formData.date);
    data.append("amount", formData.amount);
    data.append("remarks", formData.remarks);
    data.append("username", username);

    fetch("http://localhost/ticket_collection/save_collection.php", {
      method: "POST",
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status) {
          alert("Collection successfully saved");
          setFormData({ date: "", amount: "", remarks: "", username: "" });
        } else {
          alert(data.Message);
        }
      });
  };

  const handle_change = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchDateChange = (e) => {
    setSearchDate(e.target.value);
  };

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="container-fluid">
      <div className="row" style={{ height: "100vh" }}>
        {/* Left Side - Search and Table */}
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Search Collection</h2>
          <div className="mb-3">
            <label htmlFor="search_date" className="form-label">
              Select Date:
            </label>
            <div className="d-flex">
              <input
                id="search_date"
                type="date"
                className="form-control me-2"
                value={searchDate}
                onChange={handleSearchDateChange}
                max={currentDate}
              />
              <button onClick={searchCollection} className="btn btn-secondary">
                Search
              </button>
            </div>
          </div>
          <div className="table-container flex-grow-1 overflow-auto">
          <h2 className="text-center mb-4">Collection List</h2>
            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Sl.No</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {searchResults.map((item, index) => (
                  <tr key={item.collection_id}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.amount}</td>
                    <td>{item.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="col-md-6 d-flex flex-column">
          <h2 className="text-center mb-4">Add New Collection</h2>
          <div className="card flex-grow-1">
            <div className="card-body">
              <form onSubmit={save_collection}>
                <div className="form-group mb-3">
                  <label>Date</label>
                  <input
                    onChange={handle_change}
                    value={formData.date}
                    type="date"
                    className="form-control"
                    name="date"
                    max={currentDate}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Amount</label>
                  <input
                    onChange={handle_change}
                    value={formData.amount}
                    type="text"
                    className="form-control"
                    name="amount"
                    pattern="\d*"
                    title="Please enter a valid amount with positive digits."
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Remarks</label>
                  <textarea
                    onChange={handle_change}
                    value={formData.remarks}
                    className="form-control"
                    name="remarks"
                    rows="3"
                    required
                  ></textarea>
                </div>
                <div className="form-group text-center">
                  <button type="submit" className="btn btn-primary">
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CmpStaffCollection;
