import React, { useState, useEffect } from 'react';
import './CmpAdminCollection.css';

const CmpAdminCollection = () => {
  const [stafflist, setStaffList] = useState([]);
  const [formData, setFormData] = useState({
    staff: '',
    start_date: '',
    end_date: '',
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [totalAmount, setTotalAmount] = useState(0); // State for total amount

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle search functionality
  const handleCollection = (e) => {
    e.preventDefault();

    // Validate form data
    if (!formData.staff || !formData.start_date || !formData.end_date) {
      setError('All fields are required.');
      return;
    }

    fetch('http://localhost/ticket_collection/search_collection.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Status) {
          setResults(data.Data);
          setError('');
          // Calculate total amount
          const total = data.Data.reduce((acc, item) => acc + parseFloat(item.amount || 0), 0);
          setTotalAmount(total); // Update the total amount
          setFormData({ staff: '', start_date: '', end_date: '' }); // Clear the form
        } else {
          setResults([]);
          setError(data.Message || 'No results found.');
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        setError('Something went wrong. Please try again later.');
      });
  };

  // Fetch categories to populate the category dropdown
  const getallstaffcollection = () => {
    fetch('http://localhost/ticket_collection/getallstaffcollection.php')
      .then((result) => result.json())
      .then((responds) => {
        if (Array.isArray(responds)) {
          setStaffList(responds);
        } else {
          console.error('Invalid response format:', responds);
        }
      })
      .catch((err) => {
        console.error('Error fetching staff collection:', err);
      });
  };

  // Fetch categories on component mount
  useEffect(() => {
    getallstaffcollection();
  }, []);

  return (
    <div className="search-expense">
      <h3>Search Collection</h3>
      <form onSubmit={handleCollection}>
        <div className="form-group">
          <label htmlFor="staff" className="form-label">
            Staff
          </label>
          <select
            id="staff"
            onChange={handleChange}
            className="form-select"
            name="staff"
            value={formData.staff}
            required
          >
            <option value="">Select Staff</option>
            {stafflist.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="start_date">Start Date:</label>
          <input
            id="start_date"
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="end_date">End Date:</label>
          <input
            id="end_date"
            type="date"
            name="end_date"
            value={formData.end_date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <table>
  <thead>
    <tr>
      <th>Staff Name</th>
      <th>Date</th>
      <th>Amount</th>
      <th>Remarks</th>
    </tr>
  </thead>
  <tbody>
    {results.map((item, index) => {
      // Determine if the staff name cell should be displayed
      const isFirstOccurrence =
        index === 0 || item.staff_id !== results[index - 1].staff_id;

      const staff = stafflist.find((s) => s.staff_id === item.staff_id)?.name || "Unknown Staff";

      return (
        <tr key={index}>
          {isFirstOccurrence && (
            <td rowSpan={results.filter((r) => r.staff_id === item.staff_id).length}>
              {staff}
            </td>
          )}
          <td>{item.date}</td>
          <td>{item.amount}</td>
          <td>{item.remarks}</td>
        </tr>
      );
    })}
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="2"></td> {/* Empty cells to align total under Amount */}
      <td>
        <strong>Total: {totalAmount}</strong>
      </td>
      <td></td>
    </tr>
  </tfoot>
</table>


      {/* Displaying Total */}
      
    </div>
  );
};

export default CmpAdminCollection;
