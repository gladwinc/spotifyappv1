export default function handler(req, res) {
  const isLoggedIn = req.session.user ? true : false;

  res.status(200).json({ isLoggedIn });
}
