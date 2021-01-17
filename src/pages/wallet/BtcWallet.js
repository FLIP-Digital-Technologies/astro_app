import React, {useState} from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { DashboardLayout } from "../../components/layout";
import Table from "../../components/table";
import { WalletCard } from "./components";
import Button from "../../components/button";
import { Money } from "../../utils/helper";

import styles from "../styles.module.scss";
import SCanSell from "../../components/Modals/scan-modal";

const Wallet = ({ balance, user, btcRates, btcTrans }) => {
  const [openReceive, setOpenReceive] = useState(false);
  const history = useHistory();
  const { url } = useRouteMatch();

  const goTo = (link) => {
    history.push(`${url}${link}`);
  };

  return (
    <DashboardLayout>
      <div>
        <SCanSell setIsModalVisible={setOpenReceive}  isModalVisible={openReceive} />
        <div className={styles.walletBtc}>
          <WalletCard
            walletName="BTC Wallet"
            handleVie={() => {}}
            name={`${user && user.lastName} ${user && user.firstName}`}
            amount={Money(
              (balance && balance.BTC && balance.BTC.balance) || 0,
              "BTC"
            )}
            action={false}
            rate={btcRates && btcRates.tickers && btcRates.tickers.btcusd.sell}
          />

          <div className={styles.btnHolder}>
            <Button onClick={() => goTo("/send")} text="Send" form="full" />
            <Button text="Receive" form="full" onClick={() => setOpenReceive(true)} />
          </div>
          <div className={styles.btnHolder}>
            <Button
              text="Buy"
              form="full"
              onClick={() => {
                history.push("/app/coin/buy");
              }}
            />
            <Button
              text="Sell"
              form="full"
              onClick={() => {
                history.push("/app/coin/sell");
              }}
            />
          </div>
        </div>
        <Table
          action={false}
          type={"BTC"}
          keys={["createdAt", "amount", "transactionType", "status"]}
          data={btcTrans && btcTrans.transactions}
        />
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
