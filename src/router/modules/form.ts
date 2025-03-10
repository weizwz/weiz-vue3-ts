import { $t } from "@/plugins/i18n";

export default {
  path: "/form",
  redirect: "/form/index",
  meta: {
    icon: "ep:edit",
    // showLink: false,
    title: $t("menus.formTemplate"),
    rank: 1
  },
  children: [
    {
      path: "/form/index",
      name: "form_basic",
      component: () => import("@/views/form/index.vue"),
      meta: {
        title: $t("menus.formBasic")
      }
    },
    {
      path: "/form/common",
      name: "form_common",
      component: () => import("@/views/form/common.vue"),
      meta: {
        title: $t("menus.formCommon")
      }
    },
    {
      path: "/form/elements",
      redirect: "/form/elements/radio",
      meta: {
        title: $t("menus.formElements")
      },
      children: [
        {
          path: "/form/elements/radio",
          name: "form_elements_radio",
          component: () => import("@/views/form/elements/radio.vue"),
          meta: {
            title: "单选框"
          }
        },
        {
          path: "/form/elements/checkbox",
          name: "form_elements_checkbox",
          component: () => import("@/views/form/elements/checkbox.vue"),
          meta: {
            title: "复选框"
          }
        },
        {
          path: "/form/elements/input",
          name: "form_elements_input",
          component: () => import("@/views/form/elements/input.vue"),
          meta: {
            title: "输入框"
          }
        },
        {
          path: "/form/elements/number",
          name: "form_elements_number",
          component: () => import("@/views/form/elements/number.vue"),
          meta: {
            title: "数字框"
          }
        },
        {
          path: "/form/elements/select",
          name: "form_elements_select",
          component: () => import("@/views/form/elements/select.vue"),
          meta: {
            title: "选择框"
          }
        },
        {
          path: "/form/elements/tree",
          name: "form_elements_tree",
          component: () => import("@/views/form/elements/tree.vue"),
          meta: {
            title: "树形框"
          }
        }
      ]
    }
  ]
} satisfies RouteConfigsTable;
