import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟类型接口
export default defineFakeRoute([
  {
    url: "/project/submit",
    method: "post",
    response: ({ body }) => {
      return {
        success: true,
        data: "提交成功，提交项目为 【" + body.name + "】"
      };
    }
  }
]);
