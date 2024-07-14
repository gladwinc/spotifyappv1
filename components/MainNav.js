import { useRouter } from "next/router";
import {
  Navbar,
  Nav,
  Image,
  Container,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { PersonFillAdd, PersonFillDash } from "react-bootstrap-icons"; // Import the icons
import { AUTHORIZE_URL, REDIRECT_URI, SCOPES } from "@/constants/constants";

const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;
const MainNav = () => {
  const router = useRouter();

  const handleNavbarLogin = () => {
    const url =
      `${AUTHORIZE_URL}?` +
      `client_id=${encodeURIComponent(CLIENT_ID)}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(SCOPES.join(" "))}&` +
      `response_type=token&` +
      `show_dialog=true`;

    window.location = url;
  };

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

  return (
    <Navbar
      className="fixed-top navbar-dark"
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
        <Nav className="me-auto">
          <Nav.Link active={router.pathname === "/dashboard"} href="/dashboard">
            Dashboard
          </Nav.Link>
          <Nav.Link active={router.pathname === "/demo"} href="/demo">
            Demo
          </Nav.Link>
        </Nav>
        {!isLoggedIn ? (
          <PersonFillAdd
            onClick={handleNavbarLogin}
            style={{ color: "#FAF9F6", cursor: "pointer" }}
            size={23}
          />
        ) : (
          <PersonFillDash
            onClick={handleLogout}
            style={{ color: "#FAF9F6", cursor: "pointer" }}
            size={23}
          />
        )}
      </Container>
    </Navbar>
  );
};

export default MainNav;
