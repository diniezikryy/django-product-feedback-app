import { API_URL } from "../../../../config/index";

export default async (req, res) => {
  const { feedback_id } = req.query;

  if (req.method === "GET") {
    try {
      const apiRes = await fetch(
        `${API_URL}/api/feedbacks/feedbacks/${feedback_id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );

      const data = await apiRes.json();

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when retrieving feedback.",
      });
    }
  }
};
