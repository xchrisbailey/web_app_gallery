import { User, ApiResponse } from "@/types";

import axios from "axios";

export async function submitReview(userReview: string, userRating: number, id: string): Promise<User> {
  const request = axios.post<ApiResponse<User>>("/api/webapp/" + id + "/reviews", {
    review: userReview,
    rating: userRating
  });

  try {
    const response = await request;
    return response.data.data;
  } catch (error) {
    if (error.response.data.status === "error") {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
}
