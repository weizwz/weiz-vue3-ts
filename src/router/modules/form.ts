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
      path: "/form/complex",
      name: "form_complex",
      component: () => import("@/views/form/complex.vue"),
      meta: {
        title: $t("menus.formComplex")
      }
    }
  ]
} satisfies RouteConfigsTable;
