import { $t } from "@/plugins/i18n";

export default {
  path: "/form",
  redirect: "/form/index",
  meta: {
    icon: "ep:edit",
    // showLink: false,
    title: $t("menus.form"),
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
    }
  ]
} satisfies RouteConfigsTable;
