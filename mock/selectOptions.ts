import { defineFakeRoute } from "vite-plugin-fake-server/client";

// 模拟类型接口
export default defineFakeRoute([
  {
    url: "/type/list",
    method: "post",
    response: () => {
      return {
        success: true,
        data: [
          {
            id: 0,
            name: "未开始"
          },
          {
            id: 1,
            name: "进行中"
          },
          {
            id: 2,
            name: "已完成"
          }
        ]
      };
    }
  }
]);
