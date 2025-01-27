import React from "react";

const Modal = ({ colId, handleRemoveColumn, handleCloseColumnModal }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h1 className="modal-content">
          Are you sure you want to remove the column?
        </h1>
        <div className="modal-btn-container">
          <button
            type="button"
            className="modal-btn-success"
            onClick={() => handleRemoveColumn(colId)}
          >
            Yes
          </button>
          <button
            type="button"
            className="modal-btn-cancel"
            onClick={handleCloseColumnModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
