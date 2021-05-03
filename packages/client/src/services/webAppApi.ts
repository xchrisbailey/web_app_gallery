import { WebApp, ApiResponse, PaginatedApiResponse, Category } from "@/types";
import axios, { CancelTokenSource } from "axios";
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
  private source?: CancelTokenSource;
  private nextPage?: number = 1;
  private webApps: WebApp[] = [];
  private category?: Category;
  private pageSize?: number;
  private search?: string;
  loading = false;
  error?: string;

  constructor(pageSize?: number) {
    this.pageSize = pageSize;
  }

  get hasNextPage(): boolean {
    return this.nextPage !== undefined;
  }

  get apps() {
    return this.webApps;
  }

  set settings({ category, search }: { category?: Category; search?: string }) {
    this.category = category;
    this.search = search;
    this.nextPage = 1;
    this.getMore();
  }

  async getMore() {
    if (this.hasNextPage) {
      this.source?.cancel();
      this.source = axios.CancelToken.source();
      const request = axios.get<PaginatedApiResponse<WebApp>>("/api/webapp", {
        params: { page: this.nextPage, category: this.category, limit: this.pageSize, search: this.search },
        cancelToken: this.source.token
      });
      this.loading = true;
      try {
        const response = await request;
        this.nextPage = response.data.nextPage ?? undefined;
        if (response.data.page === 1) {
          //empty the array
          this.webApps.splice(0, this.webApps.length);
        }
        this.webApps.push(...response.data.data.map(processWebApp));
      } catch (error) {
        console.error(error);
        if (axios.isCancel(error)) {
          // console.log("request canceled");
        } else {
          if (this.nextPage === 1) {
            this.webApps = [];
          }
          if (error.response.data.status === "error") {
            this.error = error.response.data.message;
          } else {
            this.error = error;
          }
        }
      } finally {
        this.loading = false;
      }
    } else {
      throw "no more pages";
    }
  }
}
