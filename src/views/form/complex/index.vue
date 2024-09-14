<template>
  <el-card>
    <template #header>
      <div class="font-medium">
        复杂表单，表单内部分选项有特殊要求，比如远程搜索下拉，下拉框内含有表格，或者某两个选项之间有校验联动等。
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/common.vue"
        target="_blank"
      >
        代码位置 src/views/form/complex/index.vue
      </el-link>
    </template>
  </el-card>
</template>

<script setup lang="ts">
defineOptions({
  name: "FormComplex"
});
</script>
