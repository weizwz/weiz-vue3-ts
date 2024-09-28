import { http } from "@/utils/http";
import type { TagProps } from "element-plus";

export type SelectOption = {
  id: string | number;
  name: string;
  tag?: TagProps["type"];
  options?: SelectOption[];
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

export const getDayOptionsAPI = () => {
  return http.request<TypeResult>("post", "/day/list");
};

export const getDayGroupOptionsAPI = () => {
  return http.request<TypeResult>("post", "/day/group/list");
};

export const getMembersOptionsAPI = (data?: object) => {
  return http.request<TypeResult>("post", "/members/list", { data });
};
