<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <el-card>
    <el-space wrap direction="vertical" alignment="start" :size="20">
      <h1>vue3常用模板</h1>
      <p>包含 表格、表单、弹窗、api等</p>
      <p>ui 组件基于 element-plus</p>
      <p>请求 api 基于 axios</p>
    </el-space>
  </el-card>
</template>
