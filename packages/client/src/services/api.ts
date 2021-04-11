import { WebApp, ApiResponse, PaginatedApiResponse, Category } from "@/types";
import axiosStatic from "axios";
import { processWebApp } from "./webAppUtils";

const axios = axiosStatic.create({
  baseURL: "/api",
  validateStatus: null
});

export async function getApp(id: string): Promise<WebApp> {
  const request = axios.get<ApiResponse<WebApp>>("/webapp/" + id);
  const response = await request;
  if (response.data.status === "error") {
    throw response.data.message;
  }
  return processWebApp(response.data.data);
}

export async function submitApp(url: string): Promise<WebApp> {
  const request = axios.post<ApiResponse<WebApp>>("/webapp", {
    data: { appUrl: url, appleMobileWebAppCapable: true } // TODO make appleMobileWebAppCapable dynamic
  });
  const response = await request;
  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

export class WebAppQuery {
  private nextPage?: number = 0;
  private webApps: WebApp[] = [];
  private category?: Category;

  constructor(category?: Category) {
    this.category = category;
  }

  hasNextPage(): boolean {
    return this.nextPage !== undefined;
  }

  getApps() {
    return this.webApps;
  }

  async getMore() {
    if (this.hasNextPage()) {
      const request = axios.get<PaginatedApiResponse<WebApp>>("/webapp", {
        params: { page: this.nextPage, category: this.category }
      });
      const response = await request;
      if (response.data.status === "error") {
        throw response.data.message;
      }
      this.nextPage = response.data.nextPage ?? undefined;
      this.webApps.push(...response.data.data.map(processWebApp));
    } else {
      throw "no more pages";
    }
  }
}
