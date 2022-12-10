import { API_URL } from "../../../config/index";
import cookie from "cookie";

export default async (req, res) => {
  const cookies = cookie.parse(req.headers.cookie ?? "");
  const access = cookies.access ?? false;

  if (req.method === "POST") {
    const { feedback, content } = req.body;

    const body = JSON.stringify({
      feedback,
      content,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/feedbacks/comments/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access}`,
        },
        body,
      });

      const data = await apiRes.json();

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when trying to add a comment.",
      });
    }
  }
};
