import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaPlay, FaDownload, FaEye, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import "./ViewImages.css";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getPhotoskeysbyidAPI,
  getImagesUsingKeysAPI,
  downloadFullZip,
  downloadSelectedImages,
  downloadSingleImage,
  deleteSingleImage,
  deleteSelectedImages
} from "../../../../utils/APIs/gallaryUploadApis";

import Loader from "../../../../Template/Loader/Loader";

const LIMIT = 10;

const ViewImages = () => {

  const { bookingId, photographerId, clientId } = useParams();
  const navigate = useNavigate();

  const [selectedItems, setSelectedItems] = useState([]);
  const [galleryData, setGalleryData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [zipLoading, setZipLoading] = useState(false);

  const loaderRef = useRef(null);
  const isFetchingRef = useRef(false);

  /* ===============================
        FETCH GALLERY
  =============================== */

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

        const images = await Promise.all(
          keys
            .filter((item) => item?.key)
            .map(async (item) => {
              const url = await getImagesUsingKeysAPI(bookingId, item.key);
              return { id: item._id, key: item.key, url };
            })
        );

        setGalleryData((prev) =>
          currentPage === 1 ? images : [...prev, ...images]
        );

        setHasMore(keys.length >= LIMIT);
      }

    } catch (error) {

      console.error("Gallery API Error:", error);
      toast.error("Failed to load gallery");

    } finally {

      setLoading(false);
      isFetchingRef.current = false;

    }

  }, [bookingId, photographerId]);

  /* ===============================
      DELETE SINGLE IMAGE
  =============================== */

  const deleteFile = async (key) => {

    try {

      const payload = {
        key: [key],
        bookingId: bookingId
      };

      await deleteSingleImage(payload);

      setGalleryData((prev) =>
        prev.filter((item) => item.key !== key)
      );

      toast.success("Image deleted");

    } catch (error) {

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Delete failed";

      toast.error(backendMessage);
    }
  };

  /* ===============================
      DELETE SELECTED IMAGES
  =============================== */

  const deleteSelected = async () => {

    try {

      const selectedKeys = galleryData
        .filter((item) => selectedItems.includes(item.url))
        .map((item) => item.key);

      const payload = {
        key: selectedKeys,
        bookingId: bookingId
      };

      await deleteSelectedImages(payload);

      setGalleryData((prev) =>
        prev.filter((item) => !selectedKeys.includes(item.key))
      );

      setSelectedItems([]);

      toast.success("Selected images deleted");

    } catch (error) {

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Delete failed";

      toast.error(backendMessage);
    }
  };

  /* ===============================
      DOWNLOAD FULL ZIP
  =============================== */

  const handleDownloadZip = async () => {

    try {

      setZipLoading(true);

      const payload = {
        bookingid: bookingId,
        clientId: clientId,
        photographerId: photographerId
      };

      const response = await downloadFullZip(payload);

      const blob = new Blob([response.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `booking-${bookingId}-files.zip`;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {

      toast.error("Download failed");

    } finally {

      setZipLoading(false);

    }
  };

  /* ===============================
      INITIAL LOAD
  =============================== */

  useEffect(() => {

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

  }, [bookingId, photographerId]);

  useEffect(() => {

    if (page === 1) return;
    if (!photographerId) return;

    fetchGallery(page);

  }, [page]);

  /* ===============================
      INFINITE SCROLL
  =============================== */

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {

        if (
          entries[0].isIntersecting &&
          hasMore &&
          !loading &&
          !isFetchingRef.current
        ) {
          setPage((prev) => prev + 1);
        }

      },
      { threshold: 1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();

  }, [hasMore, loading]);

  /* ===============================
      IMAGE ACTIONS
  =============================== */

  const toggleSelect = (url) => {
    setSelectedItems((prev) =>
      prev.includes(url)
        ? prev.filter((item) => item !== url)
        : [...prev, url]
    );
  };

  const openPreview = (url) => window.open(url, "_blank");

  const downloadFile = async (key) => {

    try {

      setZipLoading(true);

      const payload = {
        key: key,
        bookingId: bookingId
      };

      const response = await downloadSingleImage(payload);

      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;

      const fileName = key.split("/").pop() || "gallery-file";
      a.download = fileName;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {

      toast.error("Failed to download file");

    } finally {

      setZipLoading(false);

    }
  };

  const downloadSelected = async () => {

    try {

      setZipLoading(true);

      const selectedKeys = galleryData
        .filter((item) => selectedItems.includes(item.url))
        .map((item) => item.key);

      const payload = {
        bookingid: bookingId,
        keys: selectedKeys
      };

      const response = await downloadSelectedImages(payload);

      const blob = new Blob([response.data], { type: "application/zip" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `selected-files-${bookingId}.zip`;

      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

    } catch (error) {

      toast.error("Download failed");

    } finally {

      setZipLoading(false);

    }
  };

  const isVideoKey = (key) =>
    key?.includes(".mp4") ||
    key?.includes(".mov") ||
    key?.includes(".webm");

  const GalleryItem = ({ src, isVideo, fileKey }) => (

    <div
      className={`gallery-box video-box ${
        selectedItems.includes(src) ? "selected" : ""
      }`}
    >

      {isVideo ? (
        <video src={src} controls className="gallery-video" />
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
              downloadFile(fileKey);
            }}
          >
            <FaDownload />
          </button>

          <button
            className="gallery-hover-btn"
            onClick={(e) => {
              e.stopPropagation();
              deleteFile(fileKey);
            }}
          >
            <FaTrash />
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
    const chunkSize = 11;

    for (let start = 0; start < galleryData.length; start += chunkSize) {

      const chunk = galleryData.slice(start, start + chunkSize);

      const firstRow = chunk.slice(0, 2);

      if (firstRow.length) {

        rows.push(
          <div className="row gallery-row-gap" key={`row-top-${start}`}>
            {firstRow.map((item) => (
              <div className="col-md-6 col-12" key={item.id}>
                <GalleryItem
                  src={item.url}
                  isVideo={isVideoKey(item.key)}
                  fileKey={item.key}
                />
              </div>
            ))}
          </div>
        );

      }

    }

    return rows;

  };

  /* ===============================
      COMING SOON
  =============================== */

  if (!photographerId) {

    return (
      <div className="container gallery-container-view-images">
        <div className="gallery-coming-soon">
          <FaImage />
          <h3>Gallery Coming Soon</h3>
          <p>Photos will appear here once a photographer is assigned</p>
        </div>
      </div>
    );

  }

  return (

    <div className="container gallery-container-view-images">

      {zipLoading && <Loader />}

      <div className="gallery-header">

        <div className="gallery-left">

  <button
    className="download-selected-btn"
    onClick={() => navigate(-1)}
  >
    Back
  </button>

  {selectedItems.length > 0 && (
    <>
      <button
        className="download-selected-btn"
        onClick={downloadSelected}
      >
        Download Selected ({selectedItems.length})
      </button>

      <button
        className="delete-selected-btn"
        onClick={deleteSelected}
      >
        Delete Selected ({selectedItems.length})
      </button>
    </>
  )}

</div>

        <div className="gallery-actions">
          <button
            className="gallery-btn"
            onClick={handleDownloadZip}
            disabled={zipLoading}
          >
            {zipLoading ? "Preparing..." : "Download Zip"}
          </button>

        </div>

      </div>

      {!loading && galleryData.length === 0 && (
        <div className="gallery-no-images">
          <FaImage className="gallery-no-images-icon" />
          <h3>No Uploaded Images</h3>
          <p>The photographer has not uploaded any images yet.</p>
        </div>
      )}

      {galleryData.length > 0 && buildRows()}

      {hasMore && (
        <div ref={loaderRef} style={{ textAlign: "center", padding: 20 }}>
          {loading && <Loader />}
        </div>
      )}

    </div>
  );
};

export default ViewImages;
// comment test