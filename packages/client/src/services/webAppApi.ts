import { WebApp, ApiResponse, PaginatedApiResponse, Category } from "@/types";
import axios from "axios";
import { processWebApp } from "./webAppUtils";

export async function getApp(id: string): Promise<WebApp> {
  const request = axios.get<ApiResponse<WebApp>>("/api/webapp/" + id);
  try {
    const response = await request;
    return processWebApp(response.data.data);
  } catch (error) {
    if (error.response.data.status === "error") {
      throw error.response.data.message;
    } else {
      throw error;
    }
  }
}

export async function submitApp(appUrl: string, category: Category): Promise<WebApp> {
  const request = axios.post<ApiResponse<WebApp>>("/api/webapp", { appUrl, category });
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

export class WebAppQuery {
  private nextPage?: number = 1;
  private webApps: WebApp[] = [];
  private category?: Category;
  private pageSize?: number;
  private search?: string;

  constructor(category?: Category, pageSize?: number, search?: string) {
    this.category = category;
    this.pageSize = pageSize;
    this.search = search;
  }

  hasNextPage(): boolean {
    return this.nextPage !== undefined;
  }

  getApps() {
    return this.webApps;
  }

  async getMore() {
    if (this.hasNextPage()) {
      const request = axios.get<PaginatedApiResponse<WebApp>>("/api/webapp", {
        params: { page: this.nextPage, category: this.category, limit: this.pageSize, search: this.search }
      });
      try {
        const response = await request;
        this.nextPage = response.data.nextPage ?? undefined;
        this.webApps.push(...response.data.data.map(processWebApp));
      } catch (error) {
        if (error.response.data.status === "error") {
          throw error.response.data.message;
        } else {
          throw error;
        }
      }
    } else {
      throw "no more pages";
    }
  }
}
