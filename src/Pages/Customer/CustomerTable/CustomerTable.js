import React from "react";
import "./CustomerTable.css";

const CustomerTable = ({ data }) => {
  return (
    <div className="quote-table-wrapper">
      <table className="quote-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Full Name</th>
            <th>Email ID</th>
            <th>Mobile No.</th>
            <th>Date of Birth</th>
            <th>State</th>
            <th>City</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id || index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className="email">{item.email}</td>
              <td>{item.mobile}</td>
              <td>{item.dob}</td>
              <td>{item.state}</td>
              <td>{item.city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerTable;
