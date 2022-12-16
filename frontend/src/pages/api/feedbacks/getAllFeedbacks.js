export default async (req, res) => {
  if (req.method === "GET") {
    try {
      const apiRes = await fetch(`${process.env.API_URL}/api/feedbacks/feedbacks`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await apiRes.json();

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when retrieving feedbacks.",
      });
    }
  }
};
