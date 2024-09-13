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
      label-width="120px"
      status-icon
      style="margin-right: 40px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="项目名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入项目名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="项目编码" prop="code">
            <el-input
              v-model="ruleForm.code"
              placeholder="请输入项目编码"
              maxlength="12"
              show-word-limit
            />
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
          <el-form-item label="创建时间" required>
            <el-row :gutter="0">
              <el-col :span="11">
                <el-form-item prop="createDate">
                  <el-date-picker
                    v-model="ruleForm.createDate"
                    type="date"
                    aria-label="请选择日期"
                    placeholder="请选择日期"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
              <el-col class="text-center" :span="2">
                <span class="text-gray-500">-</span>
              </el-col>
              <el-col :span="11">
                <el-form-item prop="createTime">
                  <el-time-picker
                    v-model="ruleForm.createTime"
                    aria-label="请选择时间"
                    placeholder="请选择时间"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
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

defineOptions({
  name: "FormBasic"
});

interface RuleForm {
  name: string;
  code: string;
  startUp: boolean;
  status: string;
  createDate: string;
  createTime: string;
  activeTime: string;
  funds: number | undefined;
  funding: string;
  type: string[];
  client: string;
  remark: string;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  name: "",
  code: "",
  startUp: true,
  status: "",
  createDate: "",
  createTime: "",
  activeTime: "",
  funds: undefined,
  funding: "",
  type: [],
  client: "user",
  remark: ""
});

const fundingOptions = ["活动专项金", "部门出资", "公司拨款"];

const rules = reactive<FormRules<RuleForm>>({
  name: [
    { required: true, message: "请输入项目名称", trigger: "blur" },
    { min: 3, max: 20, message: "项目名称长度在3-20之间", trigger: "blur" }
  ],
  code: [{ required: true, message: "请输入项目编码", trigger: "blur" }],
  startUp: [{ required: true, message: "请选择是否立项", trigger: "change" }],
  status: [{ required: true, message: "请选择状态", trigger: "change" }],
  createDate: [
    {
      type: "date",
      required: true,
      message: "请选择日期",
      trigger: "change"
    }
  ],
  createTime: [
    {
      type: "date",
      required: true,
      message: "请选择时间",
      trigger: "change"
    }
  ],
  activeTime: [
    { required: true, message: "请选择活动时间", trigger: "change" }
  ],
  funds: [{ required: true, message: "请输入立项金额", trigger: "change" }],
  funding: [{ required: true, message: "请选择资金来源", trigger: "change" }]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(valid => {
    if (valid) {
      ElMessage({
        message: "提交成功",
        type: "success"
      });
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>
