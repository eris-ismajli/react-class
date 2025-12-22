import React, { useState } from "react";
import "./modal.css";

const Modal = ({
  title,
  message = "",
  onCancel,
  onSubmit,
  isEditing = false,
  handleChange
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h1>{title}</h1>
        {isEditing && (
          <div className="edit-inputs">
            <input onChange={handleChange} type="text" name="name" placeholder="New Name" />
            <input onChange={handleChange} type="email" name="email" placeholder="New Email" />
          </div>
        )}
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button className="modal-btn no" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn yes" onClick={onSubmit}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
