<script setup lang="ts">
defineOptions({
  name: "Welcome"
});
</script>

<template>
  <el-card>
    <template #header>
      <div class="font-bold text-lg leading-10">vue3常用模板</div>
      <div class="text-sm">
        包含表格、表单、弹窗等组件，以及动态数据交互内容
      </div>
    </template>
    <div class="leading-8 text-sm">
      组件基于 <el-tag type="primary">element-plus</el-tag>
    </div>
    <div class="leading-8 text-sm">
      请求基于 <el-tag type="primary">axios</el-tag>， 模拟请求使用
      <el-tag type="primary">mockjs</el-tag>
    </div>
  </el-card>
</template>
