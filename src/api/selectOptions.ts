import { http } from "@/utils/http";

export type SelectOption = {
  id: string;
  name: string;
};

type TypeResult = {
  success: boolean;
  data: SelectOption[];
};

/** 下拉选项 */
export const getStatusOptionsAPI = () => {
  return http.request<TypeResult>("post", "/status/list");
};

export const getTypeOptionsAPI = () => {
  return http.request<TypeResult>("post", "/type/list");
};
