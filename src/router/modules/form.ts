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
        }
      ]
    }
  ]
} satisfies RouteConfigsTable;
