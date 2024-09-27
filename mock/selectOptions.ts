import { defineFakeRoute } from "vite-plugin-fake-server/client";
import { faker } from "@faker-js/faker";
import type { SelectOption } from "@/api/selectOptions";
import type { TagProps } from "element-plus";

// 构造数据方法
const tagsType = ["primary", "success", "info", "warning", "danger"];
const setOption = (list, tag) => {
  let options = [];
  for (const item of list) {
    const obj: SelectOption = {
      id: faker.number.int({ min: 100000, max: 999999 }),
      name: item
    };
    if (tag)
      obj.tag = tagsType[parseInt(Math.random() * 5)] as TagProps["type"];

    options.push(obj);
  }
  return options;
};

// 模拟类型接口
const statusList = ["未开始", "进行中", "已完成"];
const typeList = ["线上活动", "线下活动", "品牌曝光", "推广活动"];
const dayList = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期天"
];
export default defineFakeRoute([
  {
    url: "/status/list",
    method: "post",
    response: () => {
      return {
        success: true,
        data: setOption(statusList, false)
      };
    }
  },
  {
    url: "/type/list",
    method: "post",
    response: () => {
      return {
        success: true,
        data: setOption(typeList, false)
      };
    }
  },
  {
    url: "/day/list",
    method: "post",
    response: () => {
      return {
        success: true,
        data: setOption(dayList, true)
      };
    }
  },
  {
    url: "/day/group/list",
    method: "post",
    response: () => {
      return {
        success: true,
        data: [
          {
            id: faker.number.int({ min: 100000, max: 999999 }),
            name: "工作日",
            options: setOption(dayList.slice(0, 5), false)
          },
          {
            id: faker.number.int({ min: 100000, max: 999999 }),
            name: "休息日",
            options: setOption(dayList.slice(5, 7), false)
          }
        ]
      };
    }
  }
]);
