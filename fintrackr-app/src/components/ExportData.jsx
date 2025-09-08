// src/components/ExportData.jsx
// src/components/ExportData.jsx
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

  // Auto-clear with fade
  useEffect(() => {
    if (status.message) {
      const fadeTimer = setTimeout(() => {
        setStatus((prev) => ({ ...prev, fade: true }));
      }, 3000); // start fade after 3s

      const clearTimer = setTimeout(() => {
        setStatus({ type: "", message: "", fade: false });
      }, 4000); // fully clear after 4s

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [status.message]);

  // --- Export ---
  const handleExport = () => {
    if (!transactions || transactions.length === 0) {
      setStatus({ type: "warning", message: "⚠ No transactions to export." });
      return;
    }

    try {
      const blob = new Blob([JSON.stringify(transactions, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "transactions.json";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
      setStatus({
        type: "success",
        message: "✅ Transactions exported successfully!",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "❌ Failed to export transactions.",
      });
      console.error("Export error:", error);
    }
  };

  // --- Import ---
  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!Array.isArray(data)) throw new Error("Invalid file format");

        setImportedData(data);
        setShowModal(true);
      } catch (error) {
        setStatus({
          type: "error",
          message: "❌ Failed to import transactions.",
        });
        console.error("Import error:", error);
      }
    };
    reader.readAsText(file);
  };

  // --- Confirm Replace ---
  const confirmReplace = () => {
    onImport(importedData);
    setStatus({
      type: "success",
      message: "✅ Transactions replaced with imported data!",
    });
    setShowModal(false);
    setImportedData(null);
  };

  // --- Confirm Merge ---
  const confirmMerge = () => {
    const merged = [
      ...transactions,
      ...importedData.filter(
        (imp) => !transactions.some((t) => t.id === imp.id)
      ),
    ];
    onImport(merged);
    setStatus({
      type: "success",
      message: "✅ Imported transactions merged successfully!",
    });
    setShowModal(false);
    setImportedData(null);
  };

  return (
    <div className="chart-card export-data">
      <p className="export-info">
        Backup your transactions as a file (.json). You can also restore them
        later by importing.
      </p>

      <div className="export-buttons">
        <button onClick={handleExport}>
          <FaFileExport /> Export Transactions
        </button>
        <button onClick={handleImportClick} className="import-btn">
          <FaFileImport /> Import Transactions
        </button>
        <input
          type="file"
          ref={fileInputRef}
          accept="application/json"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>

      {/* ✅ Inline feedback with auto-clear */}
      {status.message && (
        <p
          className={`export-status ${status.type} ${
            status.fade ? "fade-out" : ""
          }`}
        >
          {status.message}
        </p>
      )}

      {/* --- Custom Modal --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Import Transactions</h3>
            <p>
              You are importing <b>{importedData.length}</b> transactions. Do
              you want to <b>replace</b> your current list, or <b>merge</b>{" "}
              them?
            </p>
            <div className="modal-buttons">
              <button className="replace-btn" onClick={confirmReplace}>
                <FaSyncAlt /> Replace
              </button>
              <button className="merge-btn" onClick={confirmMerge}>
                <FaPlus /> Merge
              </button>
              <button
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                <FaTimes /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExportData;
