import React from "react";
import Loadable from "react-loadable";
import PageLoader from "../components/PageLoader";

const loadable = (loader) =>
    Loadable({
        loader,
        delay: true,
        loading: () => <PageLoader />,
    });

export const routes = [
    {
        path: "/login",
        component: loadable(() => import("../pages/Login")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/forgotusername",
        component: loadable(() => import("../pages/ForgotUsername")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/forgotpassword",
        component: loadable(() => import("../pages/ForgotPassword")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/register",
        component: loadable(() => import("../pages/Register")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/register/:affiliate_code",
        component: loadable(() => import("../pages/Register")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/creditcard/save",
        component: loadable(() => import("../pages/SaveCreditCard")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/creditcard/update",
        component: loadable(() => import("../pages/UpdateCreditCard")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/subscription/create",
        component: loadable(() => import("../pages/ChooseSubscription")),
        exact: true,
        required_auth: false,
    },
    {
        path: "/search/single",
        component: loadable(() => import("../pages/SingleSearch")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/account/setting",
        component: loadable(() => import("../pages/AccountSetting")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/update/email",
        component: loadable(() => import("../pages/UpdateEmail")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/update/password",
        component: loadable(() => import("../pages/UpdatePassword")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/addcredit",
        component: loadable(() => import("../pages/AddCredit")),
        exact: true,
        required_auth: true,
    },

    {
        path: "/dashboard",
        component: loadable(() => import("../pages/Dashboard")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/properties",
        component: loadable(() => import("../pages/Properties")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/properties/remove",
        component: loadable(() => import("../pages/RemoveProperties")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/help",
        component: loadable(() => import("../pages/Help")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/contactus",
        component: loadable(() => import("../pages/ContactUs")),
        exact: true,
        required_auth: true,
    },

    {
        path: "/search/batch/files",
        component: loadable(() => import("../pages/BatchFiles")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/search/batch/upload",
        component: loadable(() => import("../pages/BatchUpload")),
        exact: true,
        required_auth: true,
    },

    {
        path: "/search/batch",
        component: loadable(() => import("../pages/BatchUpload1")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/records/list",
        component: loadable(() => import("../pages/Records")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/active/list",
        component: loadable(() => import("../pages/Active")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/tags/list",
        component: loadable(() => import("../pages/Tags")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/assistants/list",
        component: loadable(() => import("../pages/Assistants")),
        exact: true,
        required_auth: true,
    },
    {
        path: "/assistants/new",
        component: loadable(() => import("../pages/Assistants/new")),
        exact: true,
        required_auth: true,
    },
];
