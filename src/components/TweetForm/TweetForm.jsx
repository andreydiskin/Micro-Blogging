import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import "./TweetForm.css";
import * as config from "../../helpers/config";
import { setDate } from "../../helpers/utils";
import { TweetsContext } from "../../context/TweetsContext";

export default function TweetForm(props) {
  const [error, setError] = useState("");
  const [tweetBody, setTweetBody] = useState("");

  const { newTweet } = useContext(TweetsContext);

  const isDisabled = () => {
    if (props.isLoading) {
      return true;
    }
    return error !== "";
  };

  const changeBody = (e) => {
    if (e.target.value.length > config.maxInputLength) {
      setError(config.errMsg);
    } else {
      setError("");
      setTweetBody(e.target.value);
    }
  };
  const handleSubmit = () => {
    if (tweetBody.length > config.maxInputLength) return;
    const newDate = setDate();
    let res = {
      index: Date.now(),
      id: props.user.uid,
      content: tweetBody,
      date: newDate,
      userName: props.userName,
    };

    if (tweetBody !== "") {
      newTweet(res, props.setError, props.setIsLoading);
    }
    setTweetBody("");
  };

  return (
    <>
      <Form>
        <InputGroup bsPrefix="tweetInput" className="mb-3">
          <Form.Control
            bsPrefix="formInput"
            value={tweetBody}
            onChange={changeBody}
            as="textarea"
            placeholder={config.placeholderMsg}
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          ></Form.Control>
          <Row>
            <Col sm="6">
              {error !== "" && (
                <Alert bsPrefix="errAlert" variant="danger">
                  {error}
                </Alert>
              )}
            </Col>
            <Col sm="6">
              <Button
                disabled={isDisabled()}
                onClick={handleSubmit}
                variant="primary"
              >
                {props.btnMsg}
              </Button>
            </Col>
          </Row>
        </InputGroup>
      </Form>
    </>
  );
}
