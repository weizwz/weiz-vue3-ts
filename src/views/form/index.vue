<script lang="ts" setup>
import { ref } from "vue";
import type { PlusColumn, FieldValues } from "plus-pro-components";

defineOptions({
  name: "FormBasic"
});

const submitLoading = ref(false);
const hasReset = ref(true);
const state = ref<FieldValues>({
  status: "",
  name: "",
  rate: 0,
  progress: "",
  switch: true,
  time: new Date().toString()
});

const rules = {
  name: [
    {
      required: true,
      message: "请输入名称"
    }
  ],
  status: [
    {
      required: true,
      message: "请选择状态"
    }
  ],
  tag: [
    {
      required: true,
      message: "请输入标签"
    }
  ]
};

const columns: PlusColumn[] = [
  {
    label: "名称",
    width: 120,
    prop: "name",
    valueType: "copy",
    tooltip: "提示：最多输入6个字符",
    fieldProps: {
      maxlength: 6,
      showWordLimit: true
    }
  },
  {
    label: "状态",
    prop: "status",
    valueType: "select",
    options: [
      {
        label: "未解决",
        value: "0",
        color: "red"
      },
      {
        label: "已解决",
        value: "1",
        color: "blue"
      },
      {
        label: "解决中",
        value: "2",
        color: "yellow"
      }
    ]
  },
  {
    label: "标签",
    prop: "tag"
  },
  {
    label: "执行进度(%)",
    prop: "progress",
    valueType: "input-number",
    fieldProps: { step: 10, min: 0, max: 100 }
  },
  {
    label: "时间",
    prop: "time",
    valueType: "date-picker"
  },
  {
    label: "城市",
    prop: "city",
    valueType: "cascader",
    options: [
      {
        value: "0",
        label: "陕西",
        children: [
          {
            value: "0-0",
            label: "西安",
            children: [
              {
                value: "0-0-0",
                label: "新城区"
              },
              {
                value: "0-0-1",
                label: "高新区"
              },
              {
                value: "0-0-2",
                label: "灞桥区"
              }
            ]
          }
        ]
      },
      {
        value: "1",
        label: "山西",
        children: [
          {
            value: "1-0",
            label: "太原",
            children: [
              {
                value: "1-0-0",
                label: "小店区"
              },
              {
                value: "1-0-1",
                label: "古交市"
              },
              {
                value: "1-0-2",
                label: "万柏林区"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    label: "地区",
    prop: "place",
    tooltip: "请精确到门牌号",
    fieldProps: {
      placeholder: "请精确到门牌号"
    }
  },
  {
    label: "到期时间",
    prop: "endTime",
    valueType: "date-picker",
    fieldProps: {
      type: "datetimerange",
      startPlaceholder: "请选择开始时间",
      endPlaceholder: "请选择结束时间"
    }
  },
  {
    label: "要求",
    prop: "demand",
    valueType: "checkbox",
    options: [
      {
        label: "四六级",
        value: "0"
      },
      {
        label: "计算机二级证书",
        value: "1"
      },
      {
        label: "普通话证书",
        value: "2"
      }
    ]
  },
  {
    label: "梦想",
    prop: "gift",
    valueType: "radio",
    options: [
      {
        label: "诗",
        value: "0"
      },
      {
        label: "远方",
        value: "1"
      },
      {
        label: "苟且",
        value: "2"
      }
    ]
  },
  {
    label: "评分",
    prop: "rate",
    valueType: "rate"
  },
  {
    label: "是否显示",
    prop: "switch",
    valueType: "switch"
  },
  {
    label: "说明",
    prop: "desc",
    valueType: "textarea",
    fieldProps: {
      maxlength: 120,
      showWordLimit: true,
      autosize: { minRows: 2, maxRows: 4 }
    },
    colProps: {
      span: 24
    }
  }
];

const handleChange = (values: FieldValues) => {
  console.log(values, "change");
};
const handleSubmit = (values: FieldValues) => {
  console.log(values, "Submit");
};
const handleSubmitError = (err: any) => {
  console.log(err, "err");
};
const handleReset = () => {
  console.log("handleReset");
};
</script>

<template>
  <el-card>
    <template #header>
      <div class="font-medium">
        基础表单，配置项都是固定数据，例如下拉、单选多选、日期时间等
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/index.vue"
        target="_blank"
      >
        代码位置 src/views/form/index.vue
      </el-link>
    </template>
    <PlusForm
      v-model="state"
      label-position="right"
      label-width="100"
      :columns="columns"
      :rules="rules"
      :row-props="{ gutter: 20 }"
      :col-props="{
        span: 12
      }"
      @change="handleChange"
      @submit="handleSubmit"
      @submit-error="handleSubmitError"
      @reset="handleReset"
    >
      <template #footer="{ handleSubmit, handleReset }">
        <div style="margin: 0 auto">
          <el-button v-if="hasReset" @click="handleReset">重置</el-button>
          <el-button
            type="primary"
            :loading="submitLoading"
            @click="handleSubmit"
            >提交</el-button
          >
        </div>
      </template>
    </PlusForm>
  </el-card>
</template>
