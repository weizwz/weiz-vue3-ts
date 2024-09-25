<template>
  <el-card>
    <template #header>
      <div class="font-medium">复选框</div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/elements/checkbox.vue"
        target="_blank"
      >
        代码位置 src/views/form/elements/checkbox.vue
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
        <el-col :span="24">
          <el-form-item label="基础多选" prop="activeTime">
            <el-checkbox-group v-model="ruleForm.activeTime">
              <el-checkbox value="1">选项1</el-checkbox>
              <el-checkbox value="2">选项2</el-checkbox>
              <el-checkbox value="3">选项3</el-checkbox>
              <el-checkbox value="4">选项4</el-checkbox>
              <el-checkbox value="5">选项5</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="按钮样式" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox-button
                v-for="item of 6"
                :key="item"
                :label="'选项' + item"
                :value="item"
              />
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="边框样式" prop="tags">
            <el-checkbox-group v-model="ruleForm.tags">
              <el-checkbox
                v-for="item of 6"
                :key="item"
                :label="'选项' + item"
                :value="item"
                border
              />
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="动态选项" prop="members">
            <el-checkbox-group v-model="ruleForm.members">
              <el-checkbox
                v-for="item of typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-checkbox-group>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="限制个数" prop="subject">
            <el-checkbox-group v-model="ruleForm.subject" :min="1" :max="2">
              <el-checkbox
                v-for="item of 6"
                :key="item"
                :label="'选项' + item"
                :value="item"
              />
            </el-checkbox-group>
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
import { getTypeOptionsAPI, SelectOption } from "@/api/selectOptions";

defineOptions({
  name: "FormCheckbox"
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
  activeTime: [],
  type: [],
  tags: [],
  members: [],
  subject: []
});

//#start 表单校验
const rules = reactive<FormRules<ProjectDTO>>({
  activeTime: [
    { required: true, message: "请选择基础多选", trigger: "change" }
  ],
  members: [{ required: true, message: "请选择动态选项", trigger: "change" }],
  subject: [{ required: true, message: "请选择限制个数", trigger: "change" }]
});
//#end

//#start 动态选项
const typeList = ref<SelectOption[]>();
const getTypeOptions = () => {
  getTypeOptionsAPI().then(data => {
    if (data) {
      typeList.value = data.data;
    }
  });
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
};

onMounted(() => {
  getTypeOptions();
});
</script>
