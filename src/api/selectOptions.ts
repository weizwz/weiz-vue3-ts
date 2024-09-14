import { http } from "@/utils/http";

export type TypeOption = {
  id: string;
  name: string;
};

export type TypeResult = {
  success: boolean;
  data: TypeOption[];
};

/** 下拉选项 */
export const getTypeOptionsAPI = () => {
  return http.request<TypeResult>("post", "/type/list");
};
