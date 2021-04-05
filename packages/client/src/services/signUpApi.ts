import { SignUp, ApiResponse, } from "@/types";
import axios from "axios";

axios.defaults.validateStatus = null;
axios.defaults.baseURL = window.location.origin.match(/https?:\/\/[a-z0-9\-.]*/) + ":3000" + "/api";

export async function submitUser(userLastName: string, userFirstName: string, userEmail: string, userPassword: string): Promise<SignUp> {
    const request = axios.post<ApiResponse<SignUp>>("/signup", {
      data: { firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword} 
    });
    const response = await request;
    if (response.data.status === "error") {
      throw response.data.message;
    }
    return response.data.data;
  }