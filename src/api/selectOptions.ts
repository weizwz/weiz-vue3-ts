import { http } from "@/utils/http";

export type TypeOption = {
  id: string;
  name: string;
};

export type TypeResult = {
  success: boolean;
  data: TypeOption[];
};

/** 登录 */
export const getTypeOptionsAPI = (data?: object) => {
  return http.request<TypeResult>("post", "/type/list", { data });
};
