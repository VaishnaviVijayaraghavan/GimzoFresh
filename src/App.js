import "./App.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Userdashboard from "./components/Userdashboard";
import { BsFillBasket2Fill } from "react-icons/bs";
import { BiHomeSmile } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { resetState } from "./slices/userLoginSlice";

function App() {
  let { isSuccess } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  const logout = () => {
    localStorage.clear();
    dispatch(resetState());
  };

  return (
    <>
      <Navbar className=" navbar-dark navbar-custom" expand="sm">
        <Container>
          <Navbar.Brand href="#home">
            Gizmo <BsFillBasket2Fill /> Fresh
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              {isSuccess ? (
                <NavLink className="nav-link" to="/Signin" onClick={logout}>
                  Sign-Out
                </NavLink>
              ) : (
                <>
                  <NavLink className="nav-link" to="/">
                    <BiHomeSmile /> Home
                  </NavLink>
                  <NavLink className="nav-link" to="/Signup">
                    Sign-Up
                  </NavLink>
                  <NavLink className="nav-link" to="/Signin">
                    Sign-In
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />}>
          Home
        </Route>
        <Route path="/signup" element={<Signup />}>
          Register
        </Route>
        <Route path="/signin" element={<Signin />}>
          Login
        </Route>
        <Route path="/Userdashboard" element={<Userdashboard />}>
          Login
        </Route>
      </Routes>
    </>
  );
}

export default App;
