import { WebApp, ApiResponse, PaginatedApiResponse } from "@/types";
import axios from "axios";

export async function getApp(id: string): Promise<WebApp> {
  const request = axios.get<ApiResponse<WebApp>>(`/api/webapp/${id}`);
  const response = await request;
  if (response.data.status === "error") {
    throw response.data.message;
  }
  return response.data.data;
}

export async function submitApp(url: string): Promise<WebApp> {
  const request = axios.post<ApiResponse<WebApp>>("/api/webapp", {
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

  constructor() {
    this.getMore();
  }

  hasNextPage(): boolean {
    return this.nextPage !== undefined;
  }

  getApps() {
    return this.webApps;
  }

  async getMore(): Promise<WebApp[]> {
    if (this.hasNextPage()) {
      const request = axios.get<PaginatedApiResponse<WebApp>>("/api/webapp", {
        params: { page: this.nextPage }
      });
      const response = await request;
      if (response.data.status === "error") {
        throw response.data.message;
      }
      this.nextPage = response.data.nextPage ?? undefined;
      this.webApps.concat(...response.data.data);
      return this.webApps;
    } else {
      throw "no more pages";
    }
  }
}
