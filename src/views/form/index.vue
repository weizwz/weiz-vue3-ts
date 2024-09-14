<template>
  <el-card>
    <template #header>
      <div class="font-medium">
        基础表单，配置项都是固定数据，例如下拉选项、单选多选项等
      </div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/index.vue"
        target="_blank"
      >
        代码位置 src/views/form/index.vue
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
          <el-form-item label="是否立项" prop="startUp">
            <el-switch v-model="ruleForm.startUp" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目状态" prop="status">
            <el-select v-model="ruleForm.status" placeholder="请选择项目状态">
              <el-option label="未开始" :value="0" />
              <el-option label="进行中" :value="1" />
              <el-option label="已完成" :value="2" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="创建时间" prop="createDate">
            <el-date-picker
              v-model="ruleForm.createDate"
              type="datetime"
              aria-label="请选择创建时间"
              placeholder="请选择创建时间"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
              style="width: 100%"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="活动时间" prop="activeTime">
            <el-date-picker
              v-model="ruleForm.activeTime"
              type="datetimerange"
              start-placeholder="活动开始时间"
              end-placeholder="活动结束时间"
              format="YYYY/MM/DD HH:mm:ss"
              value-format="YYYY-MM-DD HH:mm:ss"
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
          <el-form-item label="资金来源" prop="funding">
            <el-segmented
              v-model="ruleForm.funding"
              :options="fundingOptions"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目类型" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox :value="0" name="type"> 线上活动 </el-checkbox>
              <el-checkbox :value="2" name="type"> 线下活动 </el-checkbox>
              <el-checkbox :value="3" name="type"> 品牌曝光 </el-checkbox>
              <el-checkbox :value="1" name="type"> 推广活动 </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="目标人群" prop="client">
            <el-radio-group v-model="ruleForm.client">
              <el-radio value="company">合作公司</el-radio>
              <el-radio value="user">产品用户</el-radio>
            </el-radio-group>
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
import { reactive, ref } from "vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { ProjectDTO, ProjectAPI } from "@/api/project";

defineOptions({
  name: "FormBasic"
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
  name: "",
  code: "",
  startUp: false,
  status: undefined,
  createDate: "",
  activeTime: [],
  funds: undefined,
  funding: "",
  type: [],
  client: "",
  remark: ""
});

const fundingOptions = ["活动专项金", "部门出资", "公司拨款"];

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
    { min: 5, max: 20, message: "项目名称长度在5-20之间", trigger: "blur" }
  ],
  code: [
    { required: true, message: "请输入项目编码", trigger: "blur" },
    { required: true, validator: validateCode, trigger: "blur" }
  ],
  startUp: [{ required: true, message: "请选择是否立项", trigger: "change" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
  createDate: [
    { required: true, message: "请选择创建时间", trigger: "change" }
  ],
  activeTime: [
    { required: true, message: "请选择活动时间", trigger: "change" }
  ],
  funds: [{ required: true, message: "请输入立项金额", trigger: "change" }],
  funding: [{ required: true, message: "请选择资金来源", trigger: "change" }]
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
