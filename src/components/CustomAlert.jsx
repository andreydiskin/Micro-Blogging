import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

/* alert for errors */
export default function CustomAlert(props) {
  return (
    <ToastContainer  position="bottom-center">
      <Toast
        bg="danger"
        onClose={() => props.setError("")}
        show={props.error !== ""}
        delay={3000}
        autohide
      >
        <Toast.Body>{props.error}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
