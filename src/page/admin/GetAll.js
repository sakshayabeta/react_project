import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./GetAll.css";

const GetAll = () => {
  const [clist, setGetAllList] = useState([]);
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const getAllStaff = () => {
    fetch("http://localhost/ticket_collection/getAllStaff.php")
      .then((result) => result.json())
      .then((responds) => {
        setGetAllList(responds);
      });
  };

  useEffect(() => {
    getAllStaff();
  }, []);

  const save_staff = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error messages

    // Validation for full name
    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      alert("Full name can only contain alphabets (A-Z or a-z).");
      return;
    }

    // Validation for phone number
    if (
      !/^\d{10}$/.test(formData.phn_no) || // Check for 10 digits
      /^(.)\1{9}$/.test(formData.phn_no) // Disallow repeating numbers like 1111111111 or 0000000000
    ) {
      alert(
        "Phone number must be exactly 10 digits and cannot have repeated digits (e.g., 1111111111)."
      );
      return;
    }

    // Validation for email
    if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(formData.email)
    ) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validation for password
    if (formData.password.length < 5) {
      alert("Password must be at least 5 characters long.");
      return;
    }

    // Check if email already exists
    const isEmailExist = clist.some((staff) => staff.email === formData.email);
    if (isEmailExist) {
      alert("Email already exists. Please use a different email.");
      return;
    }

    // Check if password already exists
    const isPasswordExist = clist.some(
      (staff) => staff.password === formData.password
    );
    if (isPasswordExist) {
      alert("Password already exists. Please use a unique password.");
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("address", formData.address);
    data.append("phn_no", formData.phn_no);
    data.append("email", formData.email);
    data.append("password", formData.password);

    fetch("http://localhost/ticket_collection/save_staff.php", {
      method: "POST",
      body: data,
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.Status) {
          alert("Staff successfully saved");
          setFormData({}); // Clear the form
          getAllStaff(); // Refresh staff list
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

  const delete_staff = (staff_id, email) => {
    fetch(
      `http://localhost/ticket_collection/delete_staff.php?staff_id=${staff_id}&email=${email}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Network response was not ok " + response.statusText
          );
        }
        return response.json();
      })
      .then((data) => {
        if (data.Status === "true") {
          alert("Staff successfully deleted");
          setGetAllList((prevList) =>
            prevList.filter((item) => item.staff_id !== staff_id)
          );
        } else {
          alert(data.Message);
        }
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        alert("Failed to delete staff. Please try again.");
      });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row" style={{ height: "100vh" }}>
          {/* Left Side - Table */}
          <div className="col-6 d-flex flex-column">
            <h2 className="text-center mb-4">Staff List</h2>
            <div className="table-container flex-grow-1 overflow-auto">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Sl.No</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clist.map((item, index) => (
                    <tr key={item.staff_id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                      <td>{item.phn_no}</td>
                      <td>{item.email}</td>
                      <td>
                        <button
                          onClick={() => {
                            delete_staff(item.staff_id, item.email);
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <Link to={`/CmpStaffUpdate/${item.staff_id}`}>
                          <button className="btn btn-primary">EDIT</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="col-6 d-flex flex-column">
            <h2 className="text-center mb-4">Add New Staff</h2>
            <form onSubmit={save_staff}>
              {/* Error Message */}
              {errorMessage && (
                <div className="alert alert-danger text-center">
                  {errorMessage}
                </div>
              )}
              <div className="form-group mb-3">
                <label>Full Name </label>
                <input
                  onChange={handle_change}
                  value={formData.name || ""}
                  type="text"
                  className="form-control"
                  name="name"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Address </label>
                <textarea
                  onChange={handle_change}
                  value={formData.address || ""}
                  className="form-control"
                  name="address"
                  rows="3"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Phone Number </label>
                <input
                  onChange={handle_change}
                  value={formData.phn_no || ""}
                  type="text"
                  className="form-control"
                  name="phn_no"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Email Id </label>
                <input
                  onChange={handle_change}
                  value={formData.email || ""}
                  type="email"
                  className="form-control"
                  name="email"
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label>Password </label>
                <input
                  onChange={handle_change}
                  value={formData.password || ""}
                  type="password"
                  className="form-control"
                  name="password"
                  required
                />
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
    </>
  );
};

export default GetAll;
