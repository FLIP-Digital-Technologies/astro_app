import React, { useState } from "react";
import { Tabs } from "antd";
import { connect } from "react-redux";
import { DashboardLayout } from "../../components/layout";
import { Step1, Step2, Step3 } from "./components";
import styles from "../styles.module.scss";
import {
  addUserBankAccount,
  setTransactionPin,
  updateUserDetails,
} from "../../redux/actions/user";
import { changePassword } from "../../redux/actions/Auths";
import { verifyBankAccountDetails } from "../../redux/actions/bank";
import { history } from "../../redux/store";

const OnBoarding = (props) => {
  const { TabPane } = Tabs;
  const [activeKey, setActiveKey] = useState("1");
  React.useEffect(() => {
    if (props.updatedUser) {
      setActiveKey("2");
    }
  }, [props.updatedUser, setActiveKey]);
  React.useEffect(() => {
    if (props.addedBankDetails) {
      setActiveKey("3");
    }
  }, [props.addedBankDetails, setActiveKey]);
  React.useEffect(() => {
    if(props.updatedTransactionPin){
      history.push("/app")
    }
  }, [props.updatedTransactionPin, setActiveKey])
  function callback(key) {
    setActiveKey(key);
  }

  return (
    <DashboardLayout>
      <div className={styles.onboarding}>
        <Tabs defaultActiveKey="1" activeKey={activeKey} onChange={callback}>
          <TabPane
            tab={
              <div className={styles.onboarding__tab}>
                <span>1.</span>
                <span>STEP 1 (Complete your profile)</span>
              </div>
            }
            key="1"
          >
            <Step1 user={props.user} submitForm={props.submitUserDetails} />
          </TabPane>
          <TabPane
            tab={
              <div className={styles.onboarding__tab}>
                <span>2.</span>
                <span>STEP2 (Add bank account)</span>
              </div>
            }
            key="2"
          >
            <Step2
              user={props.user}
              bankList={props.bankLink}
              verifyBankAccount={props.verifyBankAccount}
              bankName={props.bankName}
              submitForm={props.submitBankDetails}
            />
          </TabPane>
          <TabPane
            tab={
              <div className={styles.onboarding__tab}>
                <span>3.</span>
                <span>STEP 3 (Security)</span>
              </div>
            }
            key="3"
          >
            <Step3 user={props.user} submitForm={props.submitPin} />
          </TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  updatedUser: state.user.updatedUser,
  bankLink: state.bank.bankList,
  bankName: state.bank.bankDetails,
  addedBankDetails: state.user.updatedUserBank,
  updatedTransactionPin: state.user.updatedTransactionPin,
});

const mapDispatchToProps = (dispatch) => ({
  submitUserDetails: (data) => {
    dispatch(updateUserDetails(data));
  },
  submitBankDetails: (data) => {
    dispatch(addUserBankAccount(data));
  },
  submitChangePassword: (data) => {
    dispatch(changePassword(data));
  },
  submitPin: (data) => {
    dispatch(setTransactionPin(data));
  },
  verifyBankAccount: (data) => {
    dispatch(verifyBankAccountDetails(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OnBoarding);
