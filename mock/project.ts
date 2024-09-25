import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟类型接口
export default defineFakeRoute([
  {
    url: "/project/submit",
    method: "post",
    timeout: 2000,
    response: ({ body }) => {
      return {
        success: true,
        data:
          "提交成功" +
          (body && body.name ? "，提交项目为 【" + body.name + "】" : "")
      };
    }
  }
]);
