import React from "react";
import { BsFillBasket2Fill } from "react-icons/bs";
import Carousel from "react-bootstrap/Carousel";
import welcome from "../images/welcome.svg";
import sale1 from "../images/sale1.png";
import sale2 from "../images/sale2.jpg";
import sale3 from "../images/sale3.jpg";
import sale4 from "../images/sale4.jpg";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import tomatoes from "../images/tomatoes.jpg";
import oranges from "../images/oranges.jpg";
import cherry from "../images/cherry.jpg";
import carrots from "../images/carrot.jpg";
import Card from "react-bootstrap/Card";
import "../css/style.css";
import Footer from "./footer";

function Home() {
  return (
    <>
      <div className="container text-center main-container">
        <br />
        <br />
        <h1 className="text-center welcome">
          Welcome to Gizmo <BsFillBasket2Fill /> Fresh
        </h1>
        <p className="mega-sale">Mega Sale!</p>
        <div className="carousel-container ">
          <Carousel variant="dark" expand="sm">
            <Carousel.Item>
              <img
                className="d-block w-100 "
                src={sale1}
                width="120px"
                height="420px"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={sale2}
                width="120px"
                height="420px"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 "
                src={sale3}
                width="120px"
                height="420px"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 "
                src={sale4}
                width="120px"
                height="420px"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <br />
        <hr />

        <br />
        <h2>
          <i>All Organic, Farm Fresh products at you door step now.</i>
        </h2>
        <br />
        <img src={welcome} width="450px" className="m-3" />
        <br />
        <br />
        <div className="container description-container">
          <p style={{ textAlign: "justify" }} className="aboutOrganics">
            <strong>Organic produce contains fewer pesticides.</strong>{" "}
            Chemicals such as synthetic fungicides, herbicides, and insecticides
            are widely used in conventional agriculture and residues remain on
            (and in) the food we eat.{" "}
            <strong> Organic food is often fresher</strong> because it doesn’t
            contain preservatives that make it last longer. Organic produce is
            sometimes (but not always, so watch where it is from) produced on
            smaller farms nearer to where it is sold.
            <strong>
              {" "}
              Organic farming tends to be better for the environment.
            </strong>{" "}
            Organic farming practices may reduce pollution, conserve water,
            reduce soil erosion, increase soil fertility, and use less energy.
            Farming without synthetic pesticides is also better for nearby birds
            and animals as well as people who live close to farms.
          </p>
        </div>
        <br />
        <hr />
        <br />
        <div className="container highlight-container">
          <p className="productHighlight" style={{ textAlign: "justify" }}>
            Here are Our Farm Fresh Products. Just-In Just For You. Hurry-up and
            grab it before it's sold-out.
          </p>
        </div>
        <br />
        <div className="product-cards container" expand="sm">
          <Row xs={1} sm={2} md={4}>
            <Col>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={tomatoes} height="250px" />
                <Card.Body>
                  <Card.Title>Tomatoes</Card.Title>
                  <Card.Text>Farm fresh tomatoes right at your door.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={oranges} height="250px" />
                <Card.Body>
                  <Card.Title>Orange</Card.Title>
                  <Card.Text>
                    Oranges handpicked from the garden just for you.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={cherry} height="250px" />
                <Card.Body>
                  <Card.Title>Cherry</Card.Title>
                  <Card.Text>Organic cherries from farmer's garden</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "15rem" }}>
                <Card.Img variant="top" src={carrots} height="250px" />
                <Card.Body>
                  <Card.Title>Carrots</Card.Title>
                  <Card.Text>
                    Naturally grown carrots. Chemicals free.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Home;
