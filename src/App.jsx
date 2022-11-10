import "./App.css";
import React, { useState, useEffect, useContext } from "react";
import Tweets from "./pages/Tweets.jsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import { NavLink } from "react-router-dom";
import * as config from "./helpers/config";
import useAuth from "./hooks/useAuth";
import { getProfilePic } from "./firebaseStorage";
import { getUserName, getImgRef } from "./helpers/apiCalls";
import { authHandler } from "./firebaseAuthHandler";
import Login from "./pages/Login/Login";
import { UsernameContext } from "./context/UsernameContext";
function App() {
  const defUrl =
    "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

  const [imgUrl, setImgUrl] = useState(defUrl);
  const { user } = useAuth();

  const {userName , setUserName} = useContext(UsernameContext);

  const updateUserName = async () => {
    await getUserName(user.uid, setUserName);
  };

  const updateProfilePic = async () => {
    const url = await getImgRef(user.uid, setUserName);
    getProfilePic(setImgUrl, url);
  };
  useEffect(() => {
    if (user !== null) {
      updateUserName();
      updateProfilePic();
    }
  }, [user, imgUrl]);

  return (
    <>
      <BrowserRouter>
        <Navbar>
          <Navbar.Brand href="#home">
            <img
              src={imgUrl}
              className="profile-pic"
              hidden={imgUrl === "undefined/undefined"}
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Container>
            <Nav className="me-auto">
              <Nav.Link as="div">
                <NavLink to="/">{config.navHome}</NavLink>
              </Nav.Link>
              {user !== null && (
                <Nav.Link as="div">
                  <NavLink to="/profile">{config.navProfile}</NavLink>
                </Nav.Link>
              )}

              <Nav.Link
                bsPrefix={user !== null ? "sign-out" : "sign-out-more"}
                as="button"
                onClick={() => authHandler.signingOut(setImgUrl)}
              >
                Sign Out
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/"
            element={<Tweets user={user} userName={userName} />}
          />
          {
            <Route
              path="/profile"
              element={
                user === null ? (
                  <Login />
                ) : (
                  <Profile
                    userName={userName}
                    setImgUrl={setImgUrl}
                    userId={user.uid}
                    setUserName={setUserName}
                  />
                )
              }
            />
          }
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
