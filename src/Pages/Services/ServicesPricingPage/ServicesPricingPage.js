
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicesPricingPage.css";
import EditPricingModal from "./EditPricingModal/EditPricingModal";
import { FiEdit } from "react-icons/fi";
const ServicesPricingPage = ({ serviceData }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editablePlan, setEditablePlan] = useState(null);

    const navigate = useNavigate();


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

    const handleEditClick = (plan) => {
        setEditablePlan({
            ...plan,
            features: [...plan.features],
        });
        setIsEditModalOpen(true);
    };
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditablePlan((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

   const handleFeatureChange = (index, value) => {
  setEditablePlan((prev) => {
    let updatedFeatures = [...prev.features];

    // Add new feature
    if (index === "add") {
      updatedFeatures.push("");
    }
    // Remove feature
    else if (value === null) {
      updatedFeatures.splice(index, 1);
    }
    // Edit feature
    else {
      updatedFeatures[index] = value;
    }

    return {
      ...prev,
      features: updatedFeatures,
    };
  });
};


    const handleSaveEdit = () => {
        setPricingPlans((prev) =>
            prev.map((plan) =>
                plan.additionalServiceId === editablePlan.additionalServiceId
                    ? editablePlan
                    : plan
            )
        );
        setIsEditModalOpen(false);
    };




    // console.log("ServicesPricingPage serviceData:", serviceData);

    // Mock data for display if serviceData is missing (for UI testing)
    const mockServiceData = {
        _id: "mock_id",
        additionalServices: [
            { _id: "1", serviceType: "Basic", serviceCost: "1,999" },
            { _id: "2", serviceType: "Standard", serviceCost: "5,999" },
            { _id: "3", serviceType: "Premium", serviceCost: "8,999" }
        ]
    };

    // Use mock data if serviceData is missing or has no additionalServices
    const effectiveServiceData = (serviceData && serviceData.additionalServices && serviceData.additionalServices.length > 0)
        ? serviceData
        : mockServiceData;

    const staticFeatures = [
        "1–1.5 hours photoshoot",
        "Cake cutting and family moments",
        "Professionally edited digital photos",
        "High-resolution online delivery",
    ];

    // Define the desired order for pricing plans
    const planOrder = { 'basic': 1, 'standard': 2, 'premium': 3 };

    const [pricingPlans, setPricingPlans] = useState(() =>
        (effectiveServiceData.additionalServices || [])
            .map((item) => ({
                title: item.serviceType.toUpperCase(),
                features: staticFeatures,
                price: `₹${item.serviceCost}/-`,
                amount: Number(item.serviceCost),
                isPopular: item.serviceType === "Standard",
                mainServiceId: effectiveServiceData._id,
                additionalServiceId: item._id,
                sortOrder: planOrder[item.serviceType.toLowerCase()] || 999,
            }))
            .sort((a, b) => a.sortOrder - b.sortOrder)
    );


    const handleNavigate = (plan) => {
        navigate("/calenderBooking", {
            state: {
                mainServiceId: plan.mainServiceId,
                additionalServiceId: plan.additionalServiceId,
                price: plan.amount,
            },
        });
    };

    return (
        <div
            className={`content-container ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"
                }`}
            style={{ marginTop: "100px" }}
        >
            <div className="page-inner-wrapper">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    ← Back
                </button>
                {/* <h1 className="pricing-main-title page-title">Pricing</h1> */}

                <h1 className="page-title">Pricing</h1>


                <div className="pricing-container">
                    {pricingPlans.map((plan, index) => (
                        <div key={index} className="pricing-card">
                            {/* {plan.isPopular && (
              <div className="popular-badge">Recommended</div>
            )} */}

                            <h3 className="plan-title">{plan.title}</h3>



                            <ul className="plan-features">
                                {plan.features.map((feature, i) => (
                                    <li key={i}>{feature}</li>
                                ))}
                            </ul>

                            <button
                                className="price-btn-label"
                                // onClick={() => handleNavigate(plan)}
                            >
                                {plan.price}
                            </button>

                            <button
                                className="price-btn mt-4"
                                onClick={() => handleEditClick(plan)}
                                title="Edit Booking"
                            >
                                {/* <FiEdit size={16} />  */}
                                Edit
                            </button>

                        </div>

                    ))}
                </div>
                <EditPricingModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    editablePlan={editablePlan}
                    onChange={handleEditChange}
                    onFeatureChange={handleFeatureChange}
                    onSave={handleSaveEdit}
                />

            </div>
        </div>
    );
};

export default ServicesPricingPage;
