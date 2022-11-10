import React, { useEffect, useState } from "react";
import { authHandler } from "../../firebaseAuthHandler";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import "./Login.css";
import CustomAlert from "../../components/CustomAlert";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (loading) {
      return;
    }
  }, [user, loading]);

  const onSubmit = (email, password) => {
    if (isSignUp) {
      authHandler.signUp(email, password).catch((error) => {
        setError(error.message);
      });
      setError("");
    } else {
      authHandler.signIn(email, password).catch((error) => {
        setError(error.message);
      });
      setError("");
    }
  };

  return (
    <Container bsPrefix="formCon">
      <Form>
        <h1 className="form-header">{isSignUp ? "Register" : "Login"}</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll never share your Email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Text
            id="passwordHelpBlock"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "Already have an account? Sign In!"
              : "New Here? Sign Up!"}
          </Form.Text>
        </Form.Group>
      </Form>
      <Button
        onClick={() => onSubmit(email, password)}
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
      <Button
        onClick={() => authHandler.googleProvider()}
        variant="danger"
        type="submit"
      >
        Sign in with Google
      </Button>
      {error !== "" && <CustomAlert setError={setError} error={error} />}
    </Container>
  );
}
export default Login;
