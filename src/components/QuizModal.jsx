import React from "react";
import "./QuizModal.css"; // Assuming you save the CSS above in this file

const QuizModal = ({message, onCancel, onSubmit}) => {
  return (
    <div className="modal-backdrop">
      <div className="submit-modal">
        <h1>{message}</h1>
        <div className="buttons">
          <button onClick={onCancel} className="no">No</button>
          <button onClick={onSubmit} className="yes">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default QuizModal;
