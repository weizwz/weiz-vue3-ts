import { http } from "@/utils/http";

// 数据交互模型
export type ProjectDTO = {
  // 名称
  name?: string;
  // 编码
  code?: string;
  // 密码
  password?: string;
  // 是否开动
  startUp?: boolean;
  // 状态
  status?: number;
  // 创建日期
  createDate?: string;
  // 开始结束日期
  activeTime?: string[];
  // 周期（天）
  period?: number;
  // 字数
  wordsCount?: number;
  // 城市
  city?: string;
  // 资金
  funds?: number;
  // 资金来源
  funding?: string;
  // 自筹资金
  selfFunds?: number;
  // 类型
  type?: string[];
  // 客户类型
  client?: string;
  // 标签
  tags?: string[];
  // 负责人
  owner?: string;
  // 成员
  members?: string[];
  // 所属科目
  subject?: string[];
  // 备注
  remark?: string;
};

// 数据展示模型
export type ProjectVO = {
  id: string;
  name: string;
  code: string;
  password: string;
  startUp: boolean;
  status: number;
  statusName: string;
  createDate: string;
  activeTime: string[];
  period: number;
  wordsCount: number;
  city: string;
  funds: number;
  funding: string;
  selfFunds: number;
  type: string[];
  client: string;
  tags: string[];
  owner: string;
  members: string[];
  subject: string[];
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
