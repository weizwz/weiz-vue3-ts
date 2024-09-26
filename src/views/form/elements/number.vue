<template>
  <el-card>
    <template #header>
      <div class="font-medium">数字框</div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/elements/number.vue"
        target="_blank"
      >
        代码位置 src/views/form/elements/number.vue
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
          <el-form-item label="基础用法" prop="status">
            <el-input-number
              v-model="ruleForm.status"
              placeholder="请输入数字"
              class="!w-2/4"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24" prop="funding">
          <el-form-item
            label="基本设置 - min最小值 | max最大值 | step步长 | step-strictly设定只接受步长倍数 | disabled禁用 | precision精度 | size尺寸 default,large,small"
            prop="funding"
          >
            <el-input-number
              v-model="ruleForm.period"
              placeholder="请输入数字"
              :min="10"
              :max="100"
              :step="10"
              :step-strictly="true"
              :precision="2"
              size="default"
              :disabled="false"
              class="!w-2/4"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="按钮位置 - controls-position可设置默认或靠右，值为''或者right"
            prop="wordsCount"
          >
            <el-input-number
              v-model="ruleForm.wordsCount"
              placeholder="请输入数字"
              controls-position="right"
              class="!w-2/4"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="自定义图标 - 需要用到模板template，#decrease-icon代表减少的图标 | #increase-icon代表增加的图标"
            prop="funds"
          >
            <el-input-number
              v-model="ruleForm.funds"
              placeholder="请输入数字"
              controls-position="right"
              class="!w-2/4"
            >
              <template #decrease-icon>
                <el-icon>
                  <Minus />
                </el-icon>
              </template>
              <template #increase-icon>
                <el-icon>
                  <Plus />
                </el-icon>
              </template>
            </el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目联动 - change函数监听变化" prop="selfFunds">
            <el-input-number
              v-model="ruleForm.selfFunds"
              :min="1000"
              :step="1000"
              placeholder="请输入金额"
              class="!w-2/4"
              @change="changeSelfFunds"
            />
          </el-form-item>
        </el-col>
        <el-col v-if="showFunding" :span="24">
          <el-form-item label="金额来源" prop="funding">
            <el-input v-model="ruleForm.funding" placeholder="请输入金额来源" />
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
import { Minus, Plus } from "@element-plus/icons-vue";
import { ProjectDTO, ProjectAPI } from "@/api/project";

defineOptions({
  name: "FormNumber"
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
  status: undefined,
  period: undefined,
  wordsCount: 100,
  funds: undefined,
  selfFunds: undefined,
  funding: ""
});

//#start 表单校验
const validateFounding = (rule: any, value: any, callback: any) => {
  if (showFunding.value && value.trim() === "") {
    return callback(new Error("请输入金额来源"));
  }
  return callback();
};
const rules = reactive<FormRules<ProjectDTO>>({
  selfFunds: [{ required: true, message: "请输入金额", trigger: "blur" }],
  funding: [{ required: true, validator: validateFounding, trigger: "blur" }]
});
//#end

//#start 联动
const showFunding = ref(false);
const changeSelfFunds = value => {
  showFunding.value = value > 1000;
};
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
  showFunding.value = false;
};

onMounted(() => {});
</script>
