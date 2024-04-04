import { useRouter } from "next/router";
import { Navbar, Nav, Image } from "react-bootstrap";

const MainNav = () => {
  const router = useRouter();

  // Function to generate navigation links with current query parameters

  return (
    <Navbar
      className="fixed-top navbar-dark"
      expand="lg"
      style={{ backgroundColor: "#1DB954" }}>
      <Navbar.Brand href="/">
        <Image
          src="spotify_logo.svg" // Replace "/path/to/your/image.png" with the actual path to your image
          width="35"
          height="35"
          className="d-inline-block align-top"
          alt="Navbar Brand Image"
          style={{ marginLeft: "40px" }}
        />
      </Navbar.Brand>{" "}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link active={router.pathname === "/dashboard"} href="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link active={router.pathname === "/about"} href="/about">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
