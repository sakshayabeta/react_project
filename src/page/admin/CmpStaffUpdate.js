import React from 'react'
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './CmpStaffupdate.css';

 

const CmpStaffUpdate = () => {
  const { staff_id } = useParams(); // Get the ad ID from the URL
  const navigate = useNavigate(); // To redirect after successful update
  const [staffData, setstaffData] = useState({
    name: "",
    address: "",
    phn_no: "",
    email: "",
    password:""
  });

  const [error, setError] = useState(null);

  // Fetch existing ad details
  useEffect(() => {
    const fetchStaffDetails = async () => {
      try {
        const response = await fetch(`http://localhost/ticket_collection/getstaffbyid.php?staff_id=${staff_id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch staff details");
        }
        const data = await response.json();
        setstaffData({
          name: data.name,
          address: data.address,
          phn_no: data.phn_no,
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchStaffDetails();
  }, [staff_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setstaffData({ ...staffData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    //formData.append("staff_id", staff_id);
    formData.append("name", staffData.name);
    formData.append("address", staffData.address);
    formData.append("phn_no", staffData.phn_no);
    formData.append("email", staffData.email);
    formData.append("password", staffData.password);

 

    try {
      const response = await fetch(`http://localhost/ticket_collection/update_staff.php?staff_id=${staff_id}`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (result.Status) {
        alert("Staff updated successfully");
        navigate("/admin/getallStaff"); // 
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert("Error updating the ad: " + error.message);
    }
  };

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div class="container">
      <h1>Edit Staff</h1>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>Name:</label>
          <input class="form-control"

            type="text"
            name="name"
            value={staffData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input class="form-control"

            type="text"
            name="address"
            value={staffData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone no:</label>
          <input class="form-control"

            type="text"
            name="phn_no"
            value={staffData.phn_no}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input class="form-control"

            type="text"
            name="email"
            value={staffData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input class="form-control"

            type="password"
            name="password"
            value={staffData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <button type="submit">Update</button>
      </form>
    
    </div>
  
  );
};

export default CmpStaffUpdate;


