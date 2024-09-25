<template>
  <el-card>
    <template #header>
      <div class="font-medium">单选框</div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/elements/radio.vue"
        target="_blank"
      >
        代码位置 src/views/form/elements/radio.vue
      </el-link>
    </template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="120px"
      status-icon
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="基础单选" prop="code">
            <el-radio-group v-model="ruleForm.code">
              <el-radio value="1">选项1</el-radio>
              <el-radio value="2">选项2</el-radio>
              <el-radio value="3">选项3</el-radio>
              <el-radio value="4">选项4</el-radio>
              <el-radio value="5">选项5</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="按钮样式" prop="status">
            <el-radio-group v-model="ruleForm.status">
              <el-radio-button
                v-for="item of 6"
                :key="item"
                :label="'选项' + item"
                :value="item"
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="边框样式" prop="createDate">
            <el-radio-group v-model="ruleForm.createDate">
              <el-radio
                v-for="item of 5"
                :key="item"
                :label="'选项' + item"
                :value="item"
                border
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="动态选项" prop="client">
            <el-radio-group v-model="ruleForm.client">
              <el-radio
                v-for="item of statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联动选项来源" prop="funds">
            <el-radio-group v-model="ruleForm.funds" @change="changeFounds">
              <el-radio-button
                v-for="item of 6"
                :key="item"
                :label="'选项' + item"
                :value="item"
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联动选项结果" prop="funding">
            <el-radio-group v-model="ruleForm.funding">
              <el-radio
                v-for="item of fundingList"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { ProjectDTO, ProjectAPI } from "@/api/project";
import { getStatusOptionsAPI, SelectOption } from "@/api/selectOptions";

defineOptions({
  name: "FormRadio"
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
  code: "",
  status: undefined,
  createDate: "",
  funds: 1,
  funding: "",
  client: ""
});

//#start 表单校验
const validateCode = (rule: any, value: any, callback: any) => {
  const codeRule = /^[0-9a-zA-Z_]{1,}$/;
  if (codeRule.test(value) === false) {
    return callback(new Error("只能输入字母和数字"));
  }
  return callback();
};
const rules = reactive<FormRules<ProjectDTO>>({
  code: [{ required: true, message: "请选择基础单选", trigger: "change" }],
  client: [{ required: true, message: "请选择动态选项", trigger: "change" }],
  funding: [{ required: true, message: "联动选项结果", trigger: "change" }]
});
//#end

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      ProjectAPI.submit(ruleForm).then(res => {
        const tipsType = res.success ? "success" : "error";
        ElMessage({
          message: res.data,
          type: tipsType
        });
      });
    }
  });
};
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

//#start 动态选项
const statusList = ref<SelectOption[]>();
const getStatusOptions = () => {
  getStatusOptionsAPI().then(data => {
    if (data) {
      statusList.value = data.data;
    }
  });
};
//#end

//#start 联动选项
const fundingList = ref<string[]>(["选项" + ruleForm.funds + "的联动"]);
const changeFounds = value => {
  fundingList.value = ["选项" + value + "的联动"];
};

onMounted(() => {
  getStatusOptions();
});
</script>
