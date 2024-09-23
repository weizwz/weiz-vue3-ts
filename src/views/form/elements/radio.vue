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
      label-width="80px"
      status-icon
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="简单单选" prop="client">
            <el-radio-group v-model="ruleForm.client">
              <el-radio value="company">合作公司</el-radio>
              <el-radio value="user">产品用户</el-radio>
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
import { reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { ProjectDTO, ProjectAPI } from "@/api/project";

defineOptions({
  name: "FormRadio"
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
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
  client: [{ required: true, message: "请选择目标人群", trigger: "change" }]
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
</script>
