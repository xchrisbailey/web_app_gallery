import { SignUp, ApiResponse } from "@/types";

import axios from "axios";

export async function submitUser(
  userFirstName: string,
  userLastName: string,
  userEmail: string,
  userPassword: string
): Promise<SignUp> {
  const request = axios.post<ApiResponse<SignUp>>("/api/signup", {
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

export async function getUsers(): Promise<SignUp> {
  const request = axios.get<ApiResponse<SignUp>>("/api/me");
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

export async function logInUser(userEmail: string, userPassword: string): Promise<SignUp> {
  const request = axios.post<ApiResponse<SignUp>>("/api/login", {
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
