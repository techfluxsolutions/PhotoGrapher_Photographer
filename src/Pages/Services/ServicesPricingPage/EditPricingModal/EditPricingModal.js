import React from "react";
import Modal from "react-modal";
import "./EditPricingModal.css"
Modal.setAppElement("#root");

const EditPricingModal = ({
  isOpen,
  onClose,
  editablePlan,
  onChange,
  onFeatureChange,
  onSave,
}) => {
  if (!isOpen || !editablePlan) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="edit-modal"
      overlayClassName="edit-modal-overlay"
    >
      <h2>Edit Pricing Plan</h2>

      <label>Plan Title</label>
      <input
        type="text"
        name="title"
        value={editablePlan.title}
        onChange={onChange}
      />

      <label>Price</label>
      <input
        type="text"
        name="price"
        value={editablePlan.price}
        onChange={onChange}
      />

      {/* <label>Features</label>
      {editablePlan.features.map((feature, index) => (
        <input
          key={index}
          type="text"
          value={feature}
          onChange={(e) =>
            onFeatureChange(index, e.target.value)
          }
        />
      ))} */}

<label>Features</label>

<div className="features-wrapper">
  {editablePlan.features.map((feature, index) => (
    <div key={index} className="feature-row">
      <input
        type="text"
        value={feature}
        placeholder={`Feature ${index + 1}`}
        onChange={(e) =>
          onFeatureChange(index, e.target.value)
        }
      />

      <button
        type="button"
        className="remove-feature-btn"
        onClick={() => onFeatureChange(index, null)}
        disabled={editablePlan.features.length === 1}
      >
        ✕
      </button>
    </div>
  ))}

  <button
    type="button"
    className="add-feature-btn"
    onClick={() => onFeatureChange("add")}
  >
    + Add Feature
  </button>
</div>

      <div className="modal-actions">
        <button className="save-btn" onClick={onSave}>
          Save
        </button>
        <button className="cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default EditPricingModal;
