import { API_URL } from "../../../../config/index";
import cookie from "cookie";

export default async (req, res) => {
  const { feedback_id } = req.query;

  const cookies = cookie.parse(req.headers.cookie ?? "");
  const access = cookies.access ?? false;

  if (req.method === "PUT") {
    const { title, category, upvotes, status, description } = req.body;

    const body = JSON.stringify({
      title,
      category,
      upvotes,
      status,
      description,
    });

    try {
      const apiRes = await fetch(
        `${API_URL}/api/feedbacks/feedbacks/${feedback_id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
          body,
        }
      );

      const data = await apiRes.json();

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when updating feedback.",
      });
    }
  }
};
