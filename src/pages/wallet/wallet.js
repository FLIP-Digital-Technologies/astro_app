import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { DashboardLayout } from "../../components/layout";
import Table from "../../components/table";
import { WalletCard } from "./components";
import { Money } from "../../utils/helper";
import {
  ArrowRight,
  BtcAction,
  NairaAction,
  WithdrawalAction,
} from "../../assets/svg";

import styles from "../styles.module.scss";
import DepositModal from "../../components/Modals/deposit-modal";
import WithdrawInitial from "../../components/Modals/withdraw-modal-Initial";

const Wallet = ({
  balance,
  user,
  btcRates,
  withdrawalTrans,
  depositTransaction,
  btcTrans,
}) => {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdrawal, setOpenWithdrawal] = useState(false);
  const history = useHistory();
  return (
    <DashboardLayout>
      <DepositModal
        setIsModalVisible={setOpenDeposit}
        isModalVisible={openDeposit}
      />
      <WithdrawInitial
        setIsModalVisible={setOpenWithdrawal}
        isModalVisible={openWithdrawal}
      />
      <div className={styles.walletPage}>
        <div className={styles.walletPage__top}>
          <div className={styles.walletPage__top__left}>
            <WalletCard
              walletName="Naira Wallet"
              handleView={() => {
                history.push("/app/wallet/naira");
              }}
              name={`${(user && user.lastName) || `-`} ${
                (user && user.firstName) || `-`
              }`}
              amount={Money(
                (balance && balance.NGN && balance.NGN.balance) || 0,
                "NGN"
              )}
            />
            <WalletCard
              walletName="BTC Wallet"
              handleView={() => {
                history.push("/app/wallet/btc");
              }}
              name={`${(user && user.lastName) || `-`} ${
                (user && user.firstName) || `-`
              }`}
              amount={Money(
                (balance && balance.BTC && balance.BTC.balance) || 0,
                "BTC"
              )}
              rate={
                btcRates && btcRates.tickers && btcRates.tickers.BTCUSD.sell
              }
            />
          </div>
          <div style={{ paddingRight: 10 }}>
            <h3 className={styles.action__title}>Quick Actions</h3>
            <div
              className={styles.action}
              onClick={() => {
                history.push("/app/coin/buy");
              }}
            >
              <BtcAction /> <span>Buy Bitcoin</span> <ArrowRight />
            </div>
            <div className={styles.action} onClick={() => setOpenDeposit(true)}>
              <NairaAction /> <span>Top Up NGN Wallet</span> <ArrowRight />
            </div>
            <div
              className={styles.action}
              onClick={() => setOpenWithdrawal(true)}
            >
              <WithdrawalAction /> <span>Withdraw</span> <ArrowRight />
            </div>
          </div>
        </div>
        <div>
          <Table
            type={"BTC"}
            keys={["createdAt", "amount", "transactionType", "status"]}
            data={btcTrans && btcTrans.transactions}
            onClickActionEmpty={() => history.push("/app/wallet/btc")}
          />
        </div>
        <div>
          <Table
            type={"Deposit"}
            action={false}
            keys={["createdAt", "amount", "trxReference", "status"]}
            data={depositTransaction && depositTransaction.transactions}
          />
        </div>
        <div>
          <Table
            type={"Withdrawal"}
            keys={["createdAt", "amount", "bankAccount", "status"]}
            data={withdrawalTrans && withdrawalTrans.transactions}
            action={false}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
