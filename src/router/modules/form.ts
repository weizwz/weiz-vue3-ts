import { $t } from "@/plugins/i18n";

export default {
  path: "/form",
  redirect: "/form/guide",
  meta: {
    icon: "ep:edit",
    // showLink: false,
    title: $t("menus.formTemplate"),
    rank: 1
  },
  children: [
    {
      path: "/form/guide",
      name: "form_guide",
      component: () => import("@/views/form/guid.vue"),
      meta: {
        title: $t("menus.formGuid")
      }
    },
    {
      path: "/form/index",
      name: "form_basic",
      component: () => import("@/views/form/index.vue"),
      meta: {
        title: $t("menus.formBasic")
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
