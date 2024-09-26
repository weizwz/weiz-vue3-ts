import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker";

// 构造数据方法
const setOption = list => {
  let options = [];
  for (const item of list) {
    options.push({
      id: faker.number.int({ min: 100000, max: 999999 }),
      name: item
    });
  }
  return options;
};

// 模拟类型接口
const statusList = ["未开始", "进行中", "已完成"];
const typeList = ["线上活动", "线下活动", "品牌曝光", "推广活动"];
export default defineFakeRoute([
  {
    url: "/status/list",
    method: "post",
    response: () => {
      return {
        success: true,
        data: setOption(statusList)
      };
    }
  },
  {
    url: "/type/list",
    method: "post",
    response: () => {
      return {
        success: true,
        data: setOption(typeList)
      };
    }
  }
]);
