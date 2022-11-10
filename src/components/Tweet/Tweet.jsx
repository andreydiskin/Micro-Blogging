import React from "react";
/* used React Bootstrap */
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Tweet.css";

export default function Tweet(props) {
  /* for the note I used the Card styling from React Bootstrap :
  https://react-bootstrap.netlify.app/components/cards/
  */
  return (
    <Card bsPrefix="tweetMsg" style={{ width: "600px", height: "100px" }}>
      <Row>
        <Col>
          <Card.Title>{props.tweet.userName}</Card.Title>
        </Col>
        <Col>
          <Card.Subtitle className="mb-2 text-muted">
            {props.tweet.date}
          </Card.Subtitle>
        </Col>
      </Row>
      <Row>
        <Card.Body>
          <Card.Text>{props.tweet.content}</Card.Text>
        </Card.Body>
      </Row>
    </Card>
  );
}
