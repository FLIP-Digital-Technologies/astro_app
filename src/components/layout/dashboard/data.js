import React from "react";
import { useHistory } from "react-router-dom";

import {
  Home,
  // Coin,
  GiftCard,
  // Wallet,
  Transactions,
  // RateIcon,
  ArrowLeft,
  Settings,
  // Logout,
} from "../../../assets/svg";
import {
  TransactionOutlined,
} from '@ant-design/icons';

export const Routes = {
  BTC: "/app/btc",
  sellgiftcard: "/app/sell-giftcard",
  buygiftcard: "/app/buy-giftcard",
  airtime: "/app/airtime",
  bills: "/app/bills",
  transactions: "/app/transactions",
  settings: "/app/settings",
  onBoarding: "/app/onboarding",
  home: "/app",
  // profile: "/app/profile",
};

export const navigation = [
  { Icon: Home, Name: "Home", route: Routes.home },
  { Icon: () => <i class="fas fa-gift" style={{marginRight: 14}}></i>, Name: "Sell Gift Cards", route: Routes.sellgiftcard },
  { Icon: GiftCard, Name: "Buy Gift Cards", route: Routes.buygiftcard },
  { Icon: () => <i class="fab fa-btc" style={{marginRight: 14}}></i>, Name: "Bitcoin", route: Routes.BTC },
  { Icon: TransactionOutlined, Name: "Transactions", route: Routes.transactions },
  { Icon: Transactions, Name: "Bills", route: Routes.bills },
  { Icon: Settings, Name: "Setting", route: Routes.settings },
  // { Icon: Logout, Name: "Log out", route: "" },
];

const Goback = ({ route, name }) => {
  const history = useHistory();
  return (
    <div onClick={() => history.push(route)}>
      <ArrowLeft /> {name}
    </div>
  );
};

export const generateRoute = (path) => {
  switch (path) {
    case Routes.buyCoin:
      return "Buy Coins";

    case Routes.sellCoin:
      return "Sell Coins";

    case Routes.wallet:
      return "Wallet";

    case Routes.buygiftcard:
      return "Buy Giftcards";

    case Routes.sellgiftcard:
      return "Sell Giftcards";

    case Routes.transactions:
      return "Transactions";

    case Routes.rate:
      return "Rates";

    case Routes.home:
      return "Home";

    case `${Routes.wallet}/naira`:
      return <Goback route="/app/wallet" name="Back" />;

    case `${Routes.wallet}/btc`:
      return <Goback route="/app/wallet" name="Back" />;
    case `${Routes.wallet}/btc/send`:
      return <Goback route="/app/wallet" name="Back" />;
    case `${Routes.profile}`:
      return "Profile";

    default:
      break;
  }
};
