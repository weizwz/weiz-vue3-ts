<template>
  <el-card>
    <template #header>
      <div class="font-medium">
        常用表单，配置项有固定数据，也有动态数据，例如一些下拉数据、单选多选项等需要异步获取后展示。
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/common.vue"
        target="_blank"
      >
        代码位置 src/views/form/common.vue
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
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入项目名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目编码" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入项目编码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择项目状态">
              <el-option
                v-for="item of statusList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动时间" prop="activeTime">
            <el-date-picker
              v-model="ruleForm.activeTime"
              type="datetimerange"
              start-placeholder="活动开始时间"
              end-placeholder="活动结束时间"
              format="YYYY-MM-DD HH:mm:ss"
              date-format="YYYY/MM/DD"
              time-format="hh:mm:ss"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="立项金额" prop="funds">
            <el-input-number
              v-model="ruleForm.funds"
              placeholder="请输入立项金额"
              :step="1000"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目类型" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox
                v-for="item of typeList"
                :key="item.id"
                :value="item.id"
                :name="item.name"
                >{{ item.name }}</el-checkbox
              >
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目备注" prop="remark">
            <el-input
              v-model="ruleForm.remark"
              type="textarea"
              maxlength="120"
              show-word-limit
              :rows="2"
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
import {
  getStatusOptionsAPI,
  getTypeOptionsAPI,
  SelectOption
} from "@/api/selectOptions";
import { ProjectDTO, ProjectAPI } from "@/api/project";

defineOptions({
  name: "FormCommon"
});

const statusList = ref<SelectOption[]>();
const typeList = ref<SelectOption[]>();
const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
  name: "",
  code: "",
  status: undefined,
  activeTime: [],
  funds: undefined,
  type: [],
  remark: ""
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
  name: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    { min: 3, max: 20, message: "项目名称长度在3-20之间", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入项目编码", trigger: "blur" },
    { required: true, validator: validateCode, trigger: "blur" }
  ],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
  activeTime: [
    { required: true, message: "请选择活动时间", trigger: "change" }
  ],
  funds: [{ required: true, message: "请输入立项金额", trigger: "change" }]
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

//#start 下拉数据
const getStatusOptions = () => {
  getStatusOptionsAPI().then(data => {
    if (data) {
      statusList.value = data.data;
    }
  });
};
const getTypeOptions = () => {
  getTypeOptionsAPI().then(data => {
    if (data) {
      typeList.value = data.data;
    }
  });
};
//#end
onMounted(() => {
  getStatusOptions();
  getTypeOptions();
});
</script>
