import { http } from "@/utils/http";

// 数据交互模型
export type ProjectDTO = {
  name?: string;
  code?: string;
  startUp?: boolean;
  status?: number;
  createDate?: string;
  activeTime?: string[];
  funds?: number;
  funding?: string;
  type?: string[];
  client?: string;
  remark?: string;
};

// 数据展示模型
export type ProjectVO = {
  id: string;
  name: string;
  code: string;
  startUp: boolean;
  status: number;
  statusName: string;
  createDate: string;
  activeTime: string[];
  funds: number;
  funding: string;
  type: string[];
  client: string;
  remark: string;
};

export type ProjectResult<T> = {
  success: boolean;
  data: T;
};

export const ProjectAPI = {
  // 列表
  list: () => {
    return http.request<ProjectResult<ProjectVO[]>>("post", "/project/list");
  },
  // 提交
  submit: (data: ProjectDTO) => {
    return http.request<ProjectResult<string>>("post", "/project/submit", {
      data
    });
  },
  // 更新
  update: (data: ProjectDTO) => {
    return http.request<ProjectResult<string>>("post", "/project/update", {
      data
    });
  },
  // 删除
  delete: (data: { id: string }) => {
    return http.request<ProjectResult<string>>("post", "/project/delete", {
      data
    });
  }
};
