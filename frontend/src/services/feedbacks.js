export const getAllFeedbacks = async () => {
  const apiRes = await fetch(
    "http://localhost:3000/api/feedbacks/getAllFeedbacks",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await apiRes.json();

  return data;
};

export const getIndFeedback = async (feedback_id) => {
  const apiRes = await fetch(
    `http://localhost:3000/api/feedbacks/getIndFeedback/${feedback_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
