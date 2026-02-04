import "./LatestQuotes.css";
import { IoChevronForward } from "react-icons/io5";

const LatestQuotes = () => {

  const quotes = [
    {
      name: "Mansi Shah",
      type: "Wedding Ceremony",
      paymentType: "Full Payment",
      amount: "₹30,000",
      status: "Paid",
    },
    {
      name: "Neha Deshpande",
      type: "Fashion Shoot",
      paymentType: "Partial Payment",
      amount: "₹15,000",
      status: "Partial",
    },
    {
      name: "Mansi Shah",
      type: "Wedding Ceremony",
      paymentType: "Full Payment",
      amount: "₹30,000",
      status: "Paid",
    },
    {
      name: "Neha Deshpande",
      type: "Fashion Shoot",
      paymentType: "Partial Payment",
      amount: "₹15,000",
      status: "Partial",
    },
  ];

  return (
    <div className="recent-payout-wrapper">
      <h4 className="recent-title">Recent Payouts</h4>

      {quotes.map((item, index) => (
        <div key={index} className="payout-card">
          
          {/* Left */}
          <div>
            <div className="payout-name">{item.name}</div>

            <div className="payout-sub">
              • {item.type}
              <span className="dot">• {item.paymentType}</span>
            </div>
          </div>

          {/* Right */}
          <div className="payout-right">
            <div className="payout-amount">{item.amount}</div>

            <div
              className={`payout-status ${
                item.status === "Paid" ? "paid" : "partial"
              }`}
            >
              {item.status}
            </div>

            <IoChevronForward className="arrow-icon" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LatestQuotes;
