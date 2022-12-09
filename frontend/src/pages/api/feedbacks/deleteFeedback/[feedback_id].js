import { API_URL } from "../../../../config/index";
import cookie from "cookie";

export default async (req, res) => {
  const { feedback_id } = req.query;

  const cookies = cookie.parse(req.headers.cookie ?? "");
  const access = cookies.access ?? false;

  if (req.method === "DELETE") {
    try {
      const apiRes = await fetch(
        `${API_URL}/api/feedbacks/feedbacks/${feedback_id}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const data = await apiRes.json();

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when deleting feedback.",
      });
    }
  }
};
