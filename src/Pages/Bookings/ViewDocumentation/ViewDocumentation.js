import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./ViewDocumentation.css";

const ViewDocumentation = ({ show, onHide }) => {
  // 7 sample documentation files
  const docs = [
    "/docs/document1.jpg",
    "/docs/document2.jpg",
    "/docs/document3.jpg",
    "/docs/document4.jpg",
    "/docs/document5.jpg",
    "/docs/document6.jpg",
    "/docs/document7.jpg",
  ];

  const [index, setIndex] = useState(0);

  if (!docs || docs.length === 0) return null;

  const getFileName = (path) => path.split("/").pop();

  const nextDoc = () => {
    if (index < docs.length - 1) {
      setIndex(index + 1);
    }
  };

  const prevDoc = () => {
    if (index > 0) setIndex(index - 1);
  };

  /** ⭐ SLIDING PAGINATION LOGIC (Show Only 3 Numbers At Once) ⭐ **/
  const pageWindow = 3;
  let start = index - 1;
  if (start < 0) start = 0;
  if (start > docs.length - pageWindow) {
    start = docs.length - pageWindow;
  }
  const end = start + pageWindow;

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>View Documents</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* ⭐ Document Name Display */}
        <h5 className="doc-name text-center mb-3">
          {getFileName(docs[index])}
        </h5>

        <div className="doc-view-wrapper text-center">
          {docs[index].includes(".pdf") ? (
            <iframe
              src={docs[index]}
              title="pdf"
              className="doc-frame"
            ></iframe>
          ) : (
            <img
              src={docs[index]}
              alt="doc"
              className="doc-image"
            />
          )}
        </div>

        {/* ⭐ Sliding Pagination */}
        <div className="pagination-wrapper mt-3">
          {Array.from({ length: end - start }).map((_, i) => {
            const page = start + i;

            return (
              <span
                key={page}
                className={`page-number ${
                  page === index ? "active-page" : ""
                }`}
                onClick={() => setIndex(page)}
              >
                {page + 1}
              </span>
            );
          })}
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" onClick={prevDoc} disabled={index === 0}>
          ◄ Previous
        </Button>

        <Button
          variant="primary"
          onClick={nextDoc}
          disabled={index === docs.length - 1}
        >
          Next ►
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewDocumentation;
