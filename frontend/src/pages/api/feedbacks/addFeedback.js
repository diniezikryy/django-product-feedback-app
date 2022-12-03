import { API_URL } from "../../../config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { title, category, suggestion, description } = req.body;

    const body = JSON.stringify({
      title,
      category,
      status,
      description,
    });

    try {
    }
  }
};
