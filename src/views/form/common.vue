<template>
  <el-card>
    <template #header>
      <div class="font-medium">
        常用表单，配置项有固定数据，也有动态数据，例如一些下拉数据、单选多选项等需要异步获取后展示，。
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/common.vue"
        target="_blank"
      >
        代码位置 src/views/form/common.vue
      </el-link>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
defineOptions({
  name: "FormCommon"
});
</script>
