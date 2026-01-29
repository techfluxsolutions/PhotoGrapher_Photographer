import React from "react";
import { Modal, Button } from "react-bootstrap";

const RequestModal = ({ show, onHide, onResult }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Request Approval</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-center" style={{ fontSize: "18px", fontWeight: "500" }}>
          Do you want to accept or reject this request?
        </p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">

        <Button
          variant="success"
          onClick={() => {
            onResult("accepted");
            onHide();
          }}
        >
          Accept
        </Button>

        <Button
          variant="danger"
          onClick={() => {
            onResult("rejected");
            onHide();
          }}
        >
          Reject
        </Button>

        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>

      </Modal.Footer>
    </Modal>
  );
};

export default RequestModal;
