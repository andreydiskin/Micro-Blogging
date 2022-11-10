import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { CustomButton } from "../components/CustomButton";
import Card from "react-bootstrap/Card";
import * as config from "../helpers/config";
import { uploadFile } from "../firebaseStorage";
import { updateUserName, addImageRefToUser } from "../helpers/apiCalls";

/* profile of the user and setting user name */
export default function Profile(props) {
  const [input, setInput] = useState(props.userName);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.setUserName(input);
    updateUserName(props.userId, input, setInput);
    setInput("");
  };
  const upload = (e) => {
    const file = e.target.files[0];
    // using FileReader:
    //https://developer.mozilla.org/en-US/docs/Web/API/FileReader
    let fileReader = new FileReader();
    fileReader.onload = async (e) => {
      try {
        const { result } = e.currentTarget;
        if (result) {
          const imgId = await uploadFile(result, props.userId, props.setImgUrl);
          await addImageRefToUser(props.userId, imgId);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fileReader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Card.Header>{config.navProfile}</Card.Header>
      <Form.Text>{config.profileUserName}</Form.Text>
      <Form.Control
        type="text"
        id={config.profileId}
        aria-describedby="userName"
        onChange={handleChange}
        value={input}
        placeholder={config.profilePlaceholder}
      />
      <Form.Group controlId="formFileSm" className="mb-3">
        <Form.Text>Upload your picture!</Form.Text>
        <Form.Control onChange={(e) => upload(e)} type="file" size="sm" />
      </Form.Group>
      <CustomButton onClick={handleSubmit} />
    </>
  );
}
