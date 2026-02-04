// src/components/ExportData.jsx
// src/components/ExportData.jsx
// src/components/ExportData.jsx
// src/components/ExportData.jsx
// src/components/ExportData.jsx
// src/components/ExportData.jsx
import React, { useRef, useState, useEffect } from "react";
import {
  FaFileExport,
  FaFileImport,
  FaSyncAlt,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import "../styles/ExportData.css";

function ExportData({ transactions, onImport }) {
  const fileInputRef = useRef(null);
  const [importedData, setImportedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    if (status.message) {
      const timer = setTimeout(
        () => setStatus({ type: "", message: "", fade: false }),
        4000,
      );
      return () => clearTimeout(timer);
    }
  }, [status.message]);

  const handleExport = () => {
    if (!transactions.length) {
      setStatus({ type: "warning", message: "No data available to export." });
      return;
    }
    const blob = new Blob([JSON.stringify(transactions, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "FinTrackr_Vault_Export.json";
    a.click();
    setStatus({
      type: "success",
      message: "Vault data exported successfully.",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        setImportedData(data);
        setShowModal(true);
      } catch (err) {
        console.log(err)
        setStatus({
          type: "error",
          message: "Integrity check failed: Invalid file.",
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="dark-glass-card export-section">
      <h3 className="elegant-heading-xs">Data Portability</h3>
      <p className="text-muted-dark small-text">
        Securely archive or restore your financial vault records.
      </p>

      <div className="export-action-grid">
        <button className="btn-outline-dark" onClick={handleExport}>
          <FaFileExport /> <span>Export JSON</span>
        </button>
        <button
          className="btn-outline-dark"
          onClick={() => fileInputRef.current.click()}
        >
          <FaFileImport /> <span>Import JSON</span>
        </button>
        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept=".json"
          onChange={handleFileChange}
        />
      </div>

      {status.message && (
        <div className={`status-toast ${status.type}`}>{status.message}</div>
      )}

      {showModal && (
        <div className="dark-modal-overlay">
          <div className="dark-modal-box">
            <h4 className="elegant-heading-xs">Import Conflict</h4>
            <p className="small-text">
              Detected {importedData.length} records. Choose an integration
              strategy:
            </p>
            <div className="modal-actions-stacked">
              <button
                className="btn-primary-glow"
                onClick={() => {
                  onImport(importedData);
                  setShowModal(false);
                }}
              >
                <FaSyncAlt /> Replace Existing Vault
              </button>
              <button
                className="btn-outline-dark"
                onClick={() => {
                  onImport([...transactions, ...importedData]);
                  setShowModal(false);
                }}
              >
                <FaPlus /> Merge Records
              </button>
              <button
                className="btn-text-only"
                onClick={() => setShowModal(false)}
              >
                <FaTimes /> Abort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExportData;