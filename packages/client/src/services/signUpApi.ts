import { User, ApiResponse } from "@/types";

import axios from "axios";

export async function submitUser(
  userFirstName: string,
  userLastName: string,
  userEmail: string,
  userPassword: string
): Promise<User> {
  const request = axios.post<ApiResponse<User>>("/api/signup", {
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
  const request = axios.get<ApiResponse<User>>("/api/me", { withCredentials: true });
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
  const request = axios.post<ApiResponse<User>>("/api/login", {
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

export async function logOutUser(): Promise<User> {
  const request = axios.post<ApiResponse<User>>("/api/logout", {
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
