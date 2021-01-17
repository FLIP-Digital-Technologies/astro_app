import { DashboardOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/home`,
    title: "home",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "transactions",
    path: `${APP_PREFIX_PATH}/transactions`,
    title: "Transactions",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "gift cards",
    path: `${APP_PREFIX_PATH}/gift-cards`,
    title: "Gift Cards",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
  {
    key: "bit-coin",
    path: `${APP_PREFIX_PATH}/bit-coin`,
    title: "Bitcoin",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
