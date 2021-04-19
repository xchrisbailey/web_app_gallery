import { User, ApiResponse } from "@/types";

import axiosStatic from "axios";

const axios = axiosStatic.create({
  baseURL: window.location.origin.match(/https?:\/\/[a-z0-9\-.]*/) + ":3322" + "/api",
  validateStatus: null
});

export async function submitReview(
    userReview: string,
    userRating: string,
    id: string,
  ): Promise<User> {
    const request = axios.post<ApiResponse<User>>("/webapp/"+ id +"/review",{
      review: userReview,
      rating: userRating
    });
  
    const response = await request;
  
    if (response.data.status === "error") {
      throw response.data.message;
    }
    return response.data.data;
  }