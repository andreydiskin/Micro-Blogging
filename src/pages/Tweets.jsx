import React, { useState } from "react";
import TweetForm from "../components/TweetForm/TweetForm";
import TweetList from "../components/TweetList";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import * as config from "../helpers/config";
import Spinner from "react-bootstrap/Spinner";
import CustomAlert from "../components/CustomAlert";
import { TweetsContextProvider } from "../context/TweetsContext";
import Login from "./Login/Login";

export default function Tweets(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <>
      {error !== "" && <CustomAlert setError={setError} error={error} />}
      <Container>
        <TweetsContextProvider>
          {props.user === null ? (
            <Login />
          ) : (
            <>
              <Row>
                <TweetForm
                  userName={props.userName}
                  isLoading={isLoading}
                  setError={setError}
                  setIsLoading={setIsLoading}
                  btnMsg={config.btnMsg}
                  user={props.user}
                />
              </Row>
              {isLoading && <Spinner variant="light" animation="border" />}

              <TweetList isLoading={isLoading} />
            </>
          )}
        </TweetsContextProvider>
      </Container>
    </>
  );
}
