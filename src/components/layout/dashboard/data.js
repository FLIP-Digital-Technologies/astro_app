import React from "react";
import { useHistory } from "react-router-dom";

import {
  ArrowLeft,
} from "../../../assets/svg";
import {
  TransactionOutlined,
  ProjectOutlined,
  SettingOutlined,
  // CreditCardOutlined,
  GiftOutlined,
  HomeOutlined
} from '@ant-design/icons';

export const Routes = {
  BTC: "/app/btc",
  CryptoView: "/app/crypto",
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
  { Icon: HomeOutlined, Name: "Home", route: Routes.home },
  { Icon: GiftOutlined, Name: "Sell Gift Cards", route: Routes.sellgiftcard },
  // { Icon: CreditCardOutlined, Name: "Buy Gift Cards", route: Routes.buygiftcard },
  // { Icon: MoneyCollectOutlined, Name: "Crypto", route: Routes.CryptoView },
  { Icon: TransactionOutlined, Name: "Transactions", route: Routes.transactions },
  { Icon: ProjectOutlined, Name: "Bills", route: Routes.bills },
  { Icon: SettingOutlined, Name: "Settings", route: Routes.settings },
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
