import React, { useEffect, useState } from 'react'
import ServicesTable from './ServicesTable/ServicesTable';

const Services = () => {
     const [services, setServices] = useState([]);
      const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        const stored = sessionStorage.getItem("isSidebarOpen");
        return stored !== null ? JSON.parse(stored) : true;
      });
    
      useEffect(() => {
        const interval = setInterval(() => {
          const stored = sessionStorage.getItem("isSidebarOpen");
          const parsed = stored !== null ? JSON.parse(stored) : true;
    
          if (parsed !== isSidebarOpen) {
            setIsSidebarOpen(parsed);
          }
        }, 10);
    
        return () => clearInterval(interval);
      }, [isSidebarOpen]);


        // const mapPaymentsResponse = (payments = []) =>
        // payments.map((item) => ({
        //   id: item._id,
        //   bookingId: item._id,
        //   invoiceId: item._id, // since backend has no invoice_number
        //   invoiceDbId: item._id,
      
        //   totalAmount: `₹${item.totalAmount.toLocaleString("en-IN")}`,
        //   paidAmount: `₹${
        //     (item.totalAmount - item.outStandingAmount).toLocaleString("en-IN")
        //   }`,
        //   pendingAmount: `₹${item.outStandingAmount.toLocaleString("en-IN")}`,
      
        //   paymentStatus: item.paymentStatus,
        //   paymentMode: item.paymentMode,
        //   paymentDate: item.paymentDate,
        // }));
      
        // const fetchPayments = async () => {
        //   setLoading(true);
      
        //   try {
        //     const res = await getPaymentsAPI(page, 10);
        //     console.log("RESPONSE",res?.data?.data)
        //     setPayments(mapPaymentsResponse(res?.data?.data));
        //     setTotal(res?.data?.meta?.total);
        //   } catch (err) {
        //     console.error("Payments fetch failed", err);
        //   } finally {
        //     setLoading(false);
        //   }
        // };
      
        // useEffect(() => {
        //   fetchPayments();
        // }, [page]);
    

      const data = [
  {
    srNo: 1,
    serviceName: "Fashion Photography",
    pricingSection: "Yes"
  },
  {
    srNo: 2,
    serviceName: "Food Photography",
    pricingSection: "Yes"
  },
  {
    srNo: 3,
    serviceName: "Product Photography",
    pricingSection: "Yes"
  },
  {
    srNo: 4,
    serviceName: "Wedding Photography",
    pricingSection: "Yes"
  },
  {
    srNo: 5,
    serviceName: "Maternity and Baby Shoot",
    pricingSection: "Yes"
  },
  {
    srNo: 6,
    serviceName: "Event Photography",
    pricingSection: "Yes"
  },
  {
    srNo: 7,
    serviceName: "Corporate Photography",
    pricingSection: "Yes"
  },
  {
    srNo: 8,
    serviceName: "Sports Photography",
    pricingSection: "Yes"
  },
  {
    srNo: 9,
    serviceName: "Automobile Photography",
    pricingSection: "Yes"
  }
];

  return (
     <div
      className={`content-container ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ marginTop: "100px" }}
    >
      <div className="page-inner-wrapper">
        <h2 className="page-title">Services</h2>

        <ServicesTable data={data} />

{/*         
      {total > LIMIT && (
  <div className="pagination">
    <button
      className="pagination-btn"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Prev
    </button>

    <span className="pagination-info">
      Page {page} of {totalPages}
    </span>

    <button
      className="pagination-btn"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>
  </div>
)} */}

     
      </div>
    </div>
  )
}

export default Services