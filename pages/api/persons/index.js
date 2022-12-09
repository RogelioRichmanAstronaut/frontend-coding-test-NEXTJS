export default async function handler(req, res) {
  const { method } = req;

  if (method === "GET") {
  }
  if (method === "POST") {
    try {
      res.status(201).json(req.body);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}
