<template>
  <el-card>
    <template #header>
      <div class="font-medium">树形框</div>
      <el-link
        class="mt-2"
        href="https://github.com/weizwz/weiz-vue3-ts/blob/main/src/views/form/elements/tree.vue"
        target="_blank"
      >
        代码位置 src/views/form/elements/tree.vue
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
          <el-form-item label="基础用法" prop="subject">
            <el-tree-select
              v-model="ruleForm.subject"
              :data="subjectData"
              :render-after-expand="false"
              check-strictly
              style="width: 360px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="多选" prop="department">
            <el-tree-select
              v-model="ruleForm.department"
              :data="projectData"
              :render-after-expand="false"
              show-checkbox
              multiple
              style="width: 360px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="可筛选" prop="type">
            <el-tree-select
              v-model="ruleForm.type"
              :data="typeData"
              show-checkbox
              :filter-node-method="filterNodeMethod"
              filterable
              style="width: 360px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="样式自定义" prop="tags">
            <el-tree-select
              v-model="ruleForm.tags"
              :data="tagsData"
              style="width: 360px"
            >
              <template #default="{ data: { label, value } }">
                {{ label
                }}<span style="float: right; color: red">id: {{ value }}</span>
              </template>
            </el-tree-select>
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
import { ProjectDTO, ProjectAPI, Department } from "@/api/project";
import { getProjectOptionsAPI } from "@/api/selectOptions";

defineOptions({
  name: "FormTree"
});

const ruleFormRef = ref<FormInstance>();
const projectData = ref([]);
const subjectData = ref([]);
const typeData = ref([]);
const tagsData = ref([]);
let treeData = [];
const ruleForm = reactive<ProjectDTO>({
  subject: [],
  department: [],
  type: [],
  tags: []
});

//#start 表单校验
const rules = reactive<FormRules<ProjectDTO>>({
  department: [{ required: true, message: "请选择多选", trigger: "change" }]
});
//#end

//#start 动态下拉数据
const getProjectOptions = () => {
  getProjectOptionsAPI().then(data => {
    if (data) {
      treeData = arrToTree(data.data);
      subjectData.value = treeData;
      projectData.value = treeData;
      typeData.value = treeData;
      tagsData.value = treeData;
    }
  });
};
// 平铺数据到树形数据的转换
function arrToTree(arr, pid = undefined) {
  const res = [];
  arr.forEach(item => {
    if (item.parentId === pid) {
      const children = arrToTree(
        arr.filter(v => v.parentId !== pid),
        item.id
      );
      const _item = {
        value: item.id,
        label: item.name
      };
      if (children.length) {
        res.push({ ..._item, children });
      } else {
        res.push({ ..._item });
      }
    }
  });
  return res;
}
// 过滤数据方法
const filterNodeMethod = (value, data) => data.label.includes(value);
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

onMounted(() => {
  getProjectOptions();
});
</script>
