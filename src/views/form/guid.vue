<script setup lang="ts">
defineOptions({
  name: "FormGuid"
});
</script>

<template>
  <el-card>
    <h3>说明</h3>
    <el-divider />
    <el-space wrap :size="20">
      <p>
        表单模板使用了
        <el-link
          type="primary"
          target="_blank"
          :underline="false"
          href="https://plus-pro-components.com/guide/"
          >PlusProComponents</el-link
        >
        插件。
      </p>
      <p>
        PlusProComponents 是基于 element-plus
        而开发的模板组件，它二次封装了菜单、表格、表单、分页等一些实用的组件。
        当你使用这些功能的时候，直接配置数据即可，不需要再一一编写原生组件代码。
      </p>
      <p>
        关于它的安装和使用请直接查看
        <el-link
          type="primary"
          target="_blank"
          :underline="false"
          href="https://plus-pro-components.com/guide/quickstart.html"
          >官方文档
        </el-link>
      </p>
    </el-space>
  </el-card>
</template>
