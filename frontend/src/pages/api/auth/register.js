import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { first_name, last_name, email, password } = req.body;

    const body = JSON.stringify({
      first_name,
      last_name,
      email,
      password,
    });

    try {
      const apiRes = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await apiRes.json();

      return res.status(apiRes.status).json(data);
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when registering user.",
      });
    }
  }
};
