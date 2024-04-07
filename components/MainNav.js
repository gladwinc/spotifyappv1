import { useRouter } from "next/router";
import { Navbar, Nav, Image, Container, Button } from "react-bootstrap";

const MainNav = () => {
  const router = useRouter();
  let isLoggedIn = false; // Initialize isLoggedIn as false by default

  if (typeof window !== "undefined") {
    // Check if window is defined (client-side)
    isLoggedIn = localStorage.getItem("accessToken") !== null;
  }

  const handleLogout = () => {
    // Remove access token from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
      // Redirect user to the login page
      router.push("/login");
    }
  };

  const handleLogin = () => {
    // Redirect user to the login page
    router.push("/login");
  };

  return (
    <Navbar
      className="fixed-top navbar-dark"
      expand="lg"
      style={{ backgroundColor: "#1DB954" }}>
      <Container>
        <Navbar.Brand>
          <Image
            src="spotify_logo.svg"
            width="35"
            height="35"
            className="d-inline-block align-top"
            alt="spotify"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              active={router.pathname === "/dashboard"}
              href="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link
              className="mr-lg-4"
              active={router.pathname === "/about"}
              href="/about">
              About
            </Nav.Link>
          </Nav>
          {isLoggedIn && (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
