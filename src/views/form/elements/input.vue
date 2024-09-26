<template>
  <el-card>
    <template #header>
      <div class="font-medium">输入框</div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/elements/input.vue"
        target="_blank"
      >
        代码位置 src/views/form/elements/input.vue
      </el-link>
    </template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="top"
      label-width="120px"
      status-icon
    >
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="基础用法" prop="city">
            <el-input v-model="ruleForm.city" placeholder="请输入内容" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="密码框 - type=password | show-password显示密码图标"
            prop="password"
          >
            <el-input
              v-model="ruleForm.password"
              type="password"
              show-password
              placeholder="请输入密码"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" prop="funding">
          <el-form-item
            label="基本设置 - maxlength长度 | clearable一键清空 | show-word-limit统计字数 | disabled禁用 | size尺寸 default,large,small"
            prop="funding"
          >
            <el-input
              v-model="ruleForm.funding"
              clearable
              placeholder="请输入内容"
              maxlength="100"
              size="default"
              :disabled="false"
              show-word-limit
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="格式化文本(只支持数字和字母) - 内容以陕A开头 & 非字母数字被格式化为空字符串 & 输入小写字母被自动转换为大写 & 提交时的内容去掉陕A开头"
            prop="code"
          >
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入内容"
              maxlength="7"
              :parser="value => value.replace(/陕A/, '')"
              :formatter="
                value =>
                  '陕A' + value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
              "
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="带图标 - prefix-icon图标在前|suffix-icon图标在后"
            prop="client"
          >
            <el-input
              v-model="ruleForm.client"
              placeholder="请输入内容"
              :prefix-icon="Search"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="复合输入 - template自定义模板 | #prepend添加到前面 | #append添加到后面"
            prop="owner"
          >
            <el-input v-model="ruleForm.owner" placeholder="请输入姓名">
              <template #prepend>
                <el-select
                  v-model="ruleForm.status"
                  placeholder="请选择"
                  style="width: 120px"
                >
                  <el-option label="行政人员" :value="1" />
                  <el-option label="教职工" :value="2" />
                </el-select>
              </template>
              <template #append>
                <el-button :icon="UserFilled" />
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="文本域 - type=textarea | rows设置行数 | autosize设置自适应限制 | resize设置能否被手动缩放 none,both,horizontal,vertical"
            prop="remark"
          >
            <el-input
              v-model="ruleForm.remark"
              :rows="2"
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 3 }"
              resize="none"
              placeholder="请输入内容"
              maxlength="500"
              show-word-limit
            />
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
import { Search, UserFilled } from "@element-plus/icons-vue";
import { ProjectDTO, ProjectAPI } from "@/api/project";

defineOptions({
  name: "FormInput"
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
  code: "",
  city: "",
  password: "",
  funding: "",
  remark: "",
  status: undefined,
  owner: "",
  client: ""
});

//#start 表单校验
const validatePassword = (rule: any, value: any, callback: any) => {
  const codeRule = /^[0-9a-zA-Z_]{1,}$/;
  if (codeRule.test(value) === false) {
    return callback(new Error("密码只支持字母和数字"));
  }
  return callback();
};
const rules = reactive<FormRules<ProjectDTO>>({
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 5, max: 20, message: "密码长度在5-20之间", trigger: "blur" },
    { required: true, validator: validatePassword, trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入内容", trigger: "blur" }]
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
  ruleForm.status = undefined;
};

onMounted(() => {});
</script>
