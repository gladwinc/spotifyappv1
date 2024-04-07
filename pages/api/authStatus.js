export default function handler(req, res) {
  // Perform authentication check here, such as checking session, JWT, etc.
  const isLoggedIn = req.session.user ? true : false; // Example: Check if user session exists

  res.status(200).json({ isLoggedIn });
}
