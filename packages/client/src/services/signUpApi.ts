import { SignUp, ApiResponse } from "@/types";

import axiosStatic from "axios";

const axios = axiosStatic.create({
  baseURL: window.location.origin.match(/https?:\/\/[a-z0-9\-.]*/) + ":3000" + "/api",
  validateStatus: null
});

export async function submitUser(
  userLastName: string,
  userFirstName: string,
  userEmail: string,
  userPassword: string
): Promise<SignUp> {
  const request = axios.post<ApiResponse<SignUp>>("/signup", {
    data: { firstName: userFirstName, lastName: userLastName, email: userEmail, password: userPassword }
  });

  const response = await request;

  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

export async function getUsers(): Promise<SignUp> {
  const request = axios.get<ApiResponse<SignUp>>("/me");
  const response = await request;
  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}
