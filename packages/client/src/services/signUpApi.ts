import { User, ApiResponse } from "@/types";

import axiosStatic from "axios";

const axios = axiosStatic.create({
  baseURL: "/api",
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

export async function getUser(): Promise<User> {
  const request = axios.get<ApiResponse<User>>("/me", { withCredentials: true });
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

export async function logInUser(userEmail: string, userPassword: string): Promise<User> {
  const request = axios.post<ApiResponse<User>>("/login", {
    email: userEmail,
    password: userPassword
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
