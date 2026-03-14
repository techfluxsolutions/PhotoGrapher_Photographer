import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaDownload, FaEye } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import "./ViewImages.css";
import { useParams } from "react-router-dom";
import { getImagesUsingKeysAPI, getPhotoskeysbyidAPI } from "../../../utils/APIs/gallaryUploadApis";
import Loader from "../../../Loader/Loader";


// const LIMIT = 12;
const LIMIT = 2;


const ViewImages = () => {

  const [selectedItems, setSelectedItems] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loaderRef = useRef(null);
  const isFetchingRef = useRef(false);
const { bookingId, photographerId, clientId } = useParams();
console.log("BOOKING ID",bookingId)
console.log("PHOTOGRAPHER ID",photographerId)
console.log("CLIENT ID", clientId);

  const fetchGallery = useCallback(async (currentPage) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setLoading(true);

      const response = await getPhotoskeysbyidAPI(
        currentPage,
        LIMIT,
        bookingId,
        photographerId
      );

      if (response?.data?.success) {
        const keys = response?.data?.data || [];

        // const images = await Promise.all(
        //   keys
        //     .filter((item) => item?.key)
        //     .map(async (item) => {
        //       const url = await getImagesUsingKeysAPI(bookingId, item.key);
        //       return { id: item._id, key: item.key, url };
        //     })
        // );
        const images = keys
  .filter((item) => item?.key)
  .map((item) => ({
    id: item._id,
    key: item.key,
    url: getImagesUsingKeysAPI(bookingId, item.key),
  }));
        setGalleryData((prev) =>
          currentPage === 1 ? images : [...prev, ...images]
        );

        setHasMore(keys.length >= LIMIT);
      }

    } catch (error) {
      console.error("Gallery API Error:", error);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [bookingId, photographerId]);

  useEffect(() => {
    // If no photographerId, skip API call entirely
    if (!photographerId) {
      setGalleryData([]);
      setSelectedItems([]);
      setHasMore(false);
      setPage(1);
      isFetchingRef.current = false;
      return;
    }

    setGalleryData([]);
    setSelectedItems([]);
    setHasMore(true);
    isFetchingRef.current = false;
    setPage(1);
    fetchGallery(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId, photographerId]);

  useEffect(() => {
    if (page === 1) return;
    if (!photographerId) return;
    fetchGallery(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isFetchingRef.current) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  const toggleSelect = (url) => {
    setSelectedItems((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };

  const openPreview = (url) => window.open(url, "_blank");

  const downloadFile = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "gallery-file";
    link.click();
  };

  const downloadSelected = () => {
    selectedItems.forEach((url) => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "gallery-file";
      link.click();
    });
  };

  const isVideoKey = (key) =>
    key?.includes(".mp4") || key?.includes(".mov") || key?.includes(".webm");

  // const GalleryItem = ({ src, isVideo }) => (
  //   <div
  //     className={`gallery-box video-box ${
  //       selectedItems.includes(src) ? "selected" : ""
  //     }`}
  //   >
  //     <img src={src} alt="gallery" onClick={() => openPreview(src)} loading="lazy" />

  //     {isVideo && (
  //       <div className="play-overlay">
  //         <FaPlay className="play-icon" />
  //       </div>
  //     )}

  //     <div className="gallery-hover">
  //       <div className="gallery-actions-hover">
  //         <button
  //           className="gallery-hover-btn"
  //           onClick={(e) => { e.stopPropagation(); downloadFile(src); }}
  //         >
  //           <FaDownload />
  //         </button>
  //         <button
  //           className="gallery-hover-btn"
  //           onClick={(e) => { e.stopPropagation(); openPreview(src); }}
  //         >
  //           <FaEye />
  //         </button>
  //       </div>

  //       <div className="gallery-checkbox">
  //         <input
  //           type="checkbox"
  //           checked={selectedItems.includes(src)}
  //           onChange={() => toggleSelect(src)}
  //           onClick={(e) => e.stopPropagation()}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
  const GalleryItem = ({ src, isVideo }) => (
  <div
    className={`gallery-box video-box ${
      selectedItems.includes(src) ? "selected" : ""
    }`}
  >

    {isVideo ? (

      <video
        src={src}
        controls
        className="gallery-video"
      />

    ) : (

      <img
        src={src}
        alt="gallery"
        onClick={() => openPreview(src)}
        loading="lazy"
      />

    )}

    {isVideo && (
      <div className="play-overlay">
        <FaPlay className="play-icon" />
      </div>
    )}

    <div className="gallery-hover">
      <div className="gallery-actions-hover">
        <button
          className="gallery-hover-btn"
          onClick={(e) => {
            e.stopPropagation();
            downloadFile(src);
          }}
        >
          <FaDownload />
        </button>

        <button
          className="gallery-hover-btn"
          onClick={(e) => {
            e.stopPropagation();
            openPreview(src);
          }}
        >
          <FaEye />
        </button>
      </div>

      <div className="gallery-checkbox">
        <input
          type="checkbox"
          checked={selectedItems.includes(src)}
          onChange={() => toggleSelect(src)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>

  </div>
);
  const buildRows = () => {
    const rows = [];
    let i = 0;

    if (galleryData.length > 0) {
      const rowItems = galleryData.slice(0, 2);
      rows.push(
        <div className="row gallery-row-gap" key="row-0">
          {rowItems.map((item) => (
            <div className="col-md-6 col-12" key={item.id}>
              <GalleryItem src={item.url} isVideo={isVideoKey(item.key)} />
            </div>
          ))}
        </div>
      );
      i = 2;
    }

    let rowIndex = 1;
    while (i < galleryData.length) {
      const group = galleryData.slice(i, i + 9);
      const col1 = group.slice(0, 3);
      const col2 = group.slice(3, 6);
      const col3 = group.slice(6, 9);

      rows.push(
        <div className="row gallery-row-gap" key={`row-${rowIndex}`}>
          {[col1, col2, col3].map((col, colIdx) =>
            col.length > 0 ? (
              <div className="col-md-4 col-12" key={colIdx}>
                <div className="gallery-col">
                  {col.map((item) => (
                    <GalleryItem
                      key={item.id}
                      src={item.url}
                      isVideo={isVideoKey(item.key)}
                    />
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      );

      i += 9;
      rowIndex++;
    }

    return rows;
  };

  // ─── Coming Soon UI ───────────────────────────────────────────────
  if (!photographerId) {
    return (
      <div className="container gallery-container-view-images">
        <div className="gallery-coming-soon">
          <div className="gallery-coming-soon-icon">
            <FaImage />
          </div>
          <h3 className="gallery-coming-soon-title">Gallery Coming Soon</h3>
          <p className="gallery-coming-soon-subtitle">
            Photos will appear here once a photographer is assigned to this booking.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container gallery-container-view-images">

      {/* HEADER */}
      <div className="gallery-header">
        <div className="gallery-left">
          <div className="gallery-pending">7 Days Pending...</div>

          {selectedItems.length > 0 && (
            <button className="download-selected-btn" onClick={downloadSelected}>
              Download Selected ({selectedItems.length})
            </button>
          )}
        </div>

        <div className="gallery-actions">
          <button className="gallery-btn outline">Store to Cloud</button>
          <button className="gallery-btn">Download Zip</button>
        </div>
      </div>

      {/* GRID */}
      {buildRows()}

      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={loaderRef} style={{ textAlign: "center", padding: 20 }}>
          {loading && <Loader />}
        </div>
      )}

    </div>
  );
};

export default ViewImages;