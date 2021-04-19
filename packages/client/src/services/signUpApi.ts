import { User, ApiResponse } from "@/types";

import axiosStatic from "axios";

const axios = axiosStatic.create({
  baseURL: window.location.origin.match(/https?:\/\/[a-z0-9\-.]*/) + ":3322" + "/api",
  validateStatus: null
});

export async function submitUser(
  userFirstName: string,
  userLastName: string,
  userEmail: string,
  userPassword: string
): Promise<User> {
  const request = axios.post<ApiResponse<User>>("/signup", {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    password: userPassword
  });

  const response = await request;

  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

export async function getUser(

): Promise<User> {
  const request = axios.get<ApiResponse<User>>("/me");
  const response = await request;
  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

export async function logInUser(
  userEmail: string,
  userPassword: string
): Promise<User> {
  const request = axios.post<ApiResponse<User>>("/login", {
    email: userEmail,
    password: userPassword
  });

  const response = await request;

  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

