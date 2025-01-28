import React from "react";
import "./index.css";

const Modal = ({ id, name, type, handleRemove, handleCloseModal }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h1 className="modal-content">
          Are you sure you want to remove {type}
          <span className="content-name"> '{name}'</span>?
        </h1>
        <div className="modal-btn-container">
          <button
            type="button"
            className="modal-btn-success"
            onClick={() => handleRemove(id)}
          >
            Yes
          </button>
          <button
            type="button"
            className="modal-btn-cancel"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
