import cookie from "cookie";
import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const body = JSON.stringify({
      email,
      password,
    });

    try {
      // Makes a POST request to the django backend API
      const apiRes = await fetch(`${API_URL}/api/token`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body,
      });

      const data = await apiRes.json();

      // If request is successful, set HTTPOnly cookie for access (30m expiry) & refresh (24h expiry) token.
      if (apiRes.status === 200) {
        res.setHeader("Set-Cookie", [
          cookie.serialize("access", data.access, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 30,
            sameSite: "strict",
            path: "/api/",
          }),
          cookie.serialize("refresh", data.refresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24,
            sameSite: "strict",
            path: "/api/",
          }),
        ]);

        return res.status(200).json({
          success: "Logged in successfully.",
        });
      } else {
        return res.status(apiRes.status).json(data);
      }
    } catch (err) {
      return res.status(500).json({
        error: "Something went wrong when logging in user.",
      });
    }
  }
};
