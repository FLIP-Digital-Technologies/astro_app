import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout";
import Table from "../../components/table";
import { WalletCard } from "./components";
import { Money } from "../../utils/helper";
import Button from "../../components/button";

import styles from "../styles.module.scss";
import DepositModal from "../../components/Modals/deposit-modal";
import WithdrawInitial from "../../components/Modals/withdraw-modal-Initial";

const Wallet = ({ balance, user, withdrawalTrans, depositTransaction }) => {
  const [openDeposit, setOpenDeposit] = useState(false);
  const [openWithdrawal, setOpenWithdrawal] = useState(false);
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
      <div>
        <div className={styles.walletBtc}>
          <WalletCard
            action={false}
            walletName="Naira Wallet"
            handleView={() => {}}
            name={`${(user && user.lastName) || `-`} ${
              (user && user.firstName) || `-`
            }`}
            amount={Money(
              (balance && balance.NGN && balance.NGN.balance) || 0,
              "NGN"
            )}
          />

          <div className={styles.btnHolder}>
            <Button
              text="Withdraw"
              form="full"
              onClick={() => setOpenWithdrawal(true)}
            />
            <Button
              text="Deposit"
              form="full"
              onClick={() => setOpenDeposit(true)}
            />
          </div>
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
            action={false}
            keys={["createdAt", "amount", "bankAccount", "status"]}
            data={withdrawalTrans && withdrawalTrans.transactions}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Wallet;
