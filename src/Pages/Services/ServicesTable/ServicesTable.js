import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const ServicesTable = ({data}) => {
    const navigate=useNavigate()
    const handleEditClick = () =>{
        navigate("/services-pricing")
        console.log("Edit Click")
    }
  return (
    <div className="quote-table-wrapper">
      <table className="quote-table">
        <thead>
          <tr>
            <th>Sr.</th>
            <th>Service Name</th>
            <th>Pricing Section</th>
            <th>Action</th>
           
          </tr>
        </thead>

        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.serviceName}</td>
              <td>{item.pricingSection}</td>
              

                 <td>
                <button
                  className="chat-btn"
                  onClick={() => handleEditClick(item)}
                  title="Edit Booking"
                >
                  <FiEdit size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ServicesTable