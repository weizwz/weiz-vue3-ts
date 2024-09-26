<h1>vue3常用模板</h1>

## 介绍

框架基于 [Pure-Admin-Thin 精简版](https://pure-admin.github.io/pure-admin-doc/pages/introduction/)。

技术：vite5 + vue3 + ts + pina + Element-Plus + Tailwindcss

功能：展示vue3+ts常用模板和方法，方便复制和粘贴

预览 [weiz-vue3-ts](https://weizwz.com/weiz-vue3-ts/)

## mock接口说明

接口定义 [vite-plugin-fake-server](https://github.com/condorheroblog/vite-plugin-fake-server)，参数类型如下：

```ts
export interface FakeRoute {
  url: string;
  method?: HttpMethodType;
  timeout?: number;
  statusCode?: number;
  statusText?: string;
  headers?: OutgoingHttpHeaders;
  response?: (
    processedRequest: ProcessedRequest,
    req: IncomingMessage,
    res: ServerResponse
  ) => any;
  rawResponse?: (req: IncomingMessage, res: ServerResponse) => void;
}

export function defineFakeRoute(config: FakeRoute | FakeRoute[]) {
  return config;
}
```

构造参数:

- [faker-js/faker](https://github.com/faker-js/faker)，说明文档 [https://v8.fakerjs.dev/guide/usage.html](https://v8.fakerjs.dev/guide/usage.html)；
- [Mock.js](https://github.com/nuysoft/Mock)，说明文档 [https://github.com/nuysoft/Mock/wiki/Getting-Started](https://github.com/nuysoft/Mock/wiki/Getting-Started)

## 提交规范

- feat: 增加新功能
- fix: 修复问题/BUG
- style: 代码风格相关无影响运行结果的
- perf: 优化/性能提升
- refactor: 重构
- revert: 撤销修改
- test: 测试相关
- docs: 文档/注释
- chore: 依赖更新/脚手架配置修改等
- workflow: 工作流改进
- ci: 持续集成
- types: 类型定义文件更改
- wip: 开发中

## 许可证

[MIT © 2024, weizwz](./LICENSE)
