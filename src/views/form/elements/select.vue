<template>
  <el-card>
    <template #header>
      <div class="font-medium">选择框</div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/elements/select.vue"
        target="_blank"
      >
        代码位置 src/views/form/elements/select.vue
      </el-link>
    </template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-position="right"
      label-width="90px"
      status-icon
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="基础用法" prop="createDate">
            <el-select v-model="ruleForm.createDate" placeholder="请选择">
              <el-option value="1" label="星期一" />
              <el-option value="2" label="星期二" />
              <el-option value="3" label="星期三" />
              <el-option value="4" label="星期四" />
              <el-option value="5" label="星期五" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="基础多选" prop="activeTime">
            <el-select
              v-model="ruleForm.activeTime"
              multiple
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item of dayList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="自定义模板" prop="period">
            <el-select v-model="ruleForm.period" clearable placeholder="请选择">
              <el-option
                v-for="(item, index) of dayList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <div class="flex justify-between items-center">
                  <span>{{ item.name }}</span>
                  <el-tag :type="item.tag">Tag {{ index + 1 }}</el-tag>
                </div>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="分组下拉" prop="funds">
            <el-select v-model="ruleForm.funds" placeholder="请选择">
              <el-option-group
                v-for="group in dayGroupList"
                :key="group.id"
                :label="group.name"
              >
                <el-option
                  v-for="item in group.options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-option-group>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="搜索下拉" prop="type">
            <el-select
              v-model="ruleForm.type"
              filterable
              reserve-keyword
              multiple
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item of typeList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="远程搜索" prop="members">
            <el-select
              v-model="ruleForm.members"
              filterable
              reserve-keyword
              multiple
              clearable
              remote
              collapse-tags
              collapse-tags-tooltip
              placeholder="请选择"
              :remote-method="getMembersOptions"
              :loading="getMemberLoading"
            >
              <el-option
                v-for="item of membersList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
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
import {
  getDayGroupOptionsAPI,
  getDayOptionsAPI,
  getTypeOptionsAPI,
  getMembersOptionsAPI,
  SelectOption
} from "@/api/selectOptions";

defineOptions({
  name: "FormCheckbox"
});

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<ProjectDTO>({
  createDate: "",
  activeTime: [],
  period: undefined,
  funds: undefined,
  type: [],
  members: []
});

//#start 表单校验
const rules = reactive<FormRules<ProjectDTO>>({
  funds: [{ required: true, message: "请选择", trigger: "change" }]
});
//#end

//#start 动态下拉数据
const dayList = ref<SelectOption[]>([]);
const typeList = ref<SelectOption[]>([]);
const dayGroupList = ref<SelectOption[]>([]);
const membersList = ref<SelectOption[]>([]);
const getMemberLoading = ref(false);
const getDayOptions = () => {
  getDayOptionsAPI().then(data => {
    if (data) {
      dayList.value = data.data;
    }
  });
};
const getDayGroupOptions = () => {
  getDayGroupOptionsAPI().then(data => {
    if (data) {
      dayGroupList.value = data.data;
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
const getMembersOptions = (query: string) => {
  if (query) {
    getMemberLoading.value = true;
    getMembersOptionsAPI({ name: query })
      .then(data => {
        getMemberLoading.value = false;
        if (data) {
          membersList.value = data.data;
        }
      })
      .catch(() => {
        getMemberLoading.value = false;
        membersList.value = [];
      });
  } else {
    membersList.value = [];
  }
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
  getDayOptions();
  getDayGroupOptions();
  getTypeOptions();
});
</script>
