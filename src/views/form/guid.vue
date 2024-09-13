<script setup lang="ts">
// import myImg from "@/assets/img/20240912_171725.png";

defineOptions({
  name: "FormGuid"
});

const imgList = [];
</script>

<template>
  <el-card>
    <h3>说明</h3>
    <el-divider />
    <el-space wrap direction="vertical" alignment="start" :size="20">
      <p>表单模板使用了 element-plus 的表单组件</p>
      <p>
        具体使用和API请直接查看
        <el-link
          type="primary"
          target="_blank"
          :underline="false"
          href="https://element-plus.org/zh-CN/component/form.html"
          >官方文档 </el-link
        >。
      </p>
    </el-space>
    <el-divider />
    <h3>示例</h3>
    <el-divider />
    <el-space wrap direction="vertical" alignment="start" :size="20">
      <p>我们以表单为例，揭示此组件的基本使用原理：</p>
      <el-image
        src=""
        style="width: 600px"
        :preview-src-list="imgList"
        :initial-index="0"
        fit="cover"
      />
    </el-space>
  </el-card>
</template>
