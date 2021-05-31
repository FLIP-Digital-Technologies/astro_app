import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Clipboard from "react-clipboard.js";
// import { Switch } from "antd";
import Input from "../../components/input";
import Select from "../../components/select";
import Button from "../../components/button";
import { DashboardLayout } from "../../components/layout";
import { Copy } from "../../assets/svg";
import styles from "../styles.module.scss";
import homeStyles from "../home/styles.module.scss";
import { Row, Col, Modal } from "antd";
import png from "../../assets/png";
import AppFetch from "../../redux/services/FetchInterceptor";
import * as actionTypes from "../../redux/constants";
import {
  // BarChartOutlined,
  // PayCircleOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
import {
  changePassword,
  changePin,
  completeResetPin,
  getCryptoCurrencies,
  getFiatCurrencies,
  GetUserDetails,
  resetPin,
} from "../../redux/actions/Auths";
import { getBTCWalletDetails } from "../../redux/actions/btc";
import {
  getUserBankAccount,
  addUserBankAccount,
  removeUserBankAccount,
  getUserReferrals,
  redeemUserReferralBonus,
} from "../../redux/actions/user";
import ModalWrapper from "../../components/Modals";
import {
  getBankListByCountry,
  verifyBankAccountDetails,
  getBankBranchByID,
} from "../../redux/actions/bank";
import { Table, Tag, Popconfirm, notification } from "antd";
import { date, Money } from "../../utils/helper";
import { EmptyEntryWithTitle } from "../transactions/components";

export const ReferralTable = ({ fetchTrans, transaction, handleAction }) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });
  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Bonus Amount",
      dataIndex: "bonus",
      key: "x",
      render: (bonus) => <p>{Money(bonus.amount, bonus.currency)}</p>,
    },
    {
      title: "Redeemed",
      dataIndex: "bonusRedeemed",
      key: "x",
      render: (bonusRedeemed) => (
        <Tag color={bonusRedeemed ? "green" : "geekblue"}>
          {bonusRedeemed ? "Yes" : "No"}
        </Tag>
      ),
    },
    {
      title: "Date Redeemed",
      dataIndex: "dateRedeemed",
      render: (dateRedeemed) => `${date(dateRedeemed)}`,
    },
    {
      title: "Friend Referred",
      dataIndex: "userReferred",
      render: (userReferred) =>
        `${userReferred && userReferred.lastName} ${
          userReferred && userReferred.firstName
        }`,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id, rec) => (
        <Popconfirm
          disabled={rec.bonusRedeemed}
          title="You are about to redeem this bonus?"
          onConfirm={() => handleAction(id)}
        >
          {rec.bonusRedeemed ? "Bonus already Redeemed" : "Redeem Bonus"}
        </Popconfirm>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="Referrals" />
      )}
    </div>
  );
};

const Profile = ({
  user,
  bankAccounts,
  bankName,
  verifyBankAccount,
  getCurrentUser,
  getUserBankDetails,
  getBankList,
  getBalance,
  submitBankDetails,
  removeUserBankDetails,
  bankList,
  changePassword,
  changePin,
  getBankBranchList,
  branchList,
  getUserReferrals,
  redeemReferralBonus,
  userReferralTransaction,
  cryptoCurrency,
  fiatCurrency,
  getMainFiatCurrency,
  getMainCryptoCurrency,
  ResetPinViaEmail,
  completeResetPin,
}) => {
  function getWindowDimensions() {
    const { screen } = window;
    let width = screen.width;
    let height = screen.height;
    return {
      width,
      height,
    };
  }
  const [windowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    getCurrentUser();
    // console.log("abh", [...fiatCurrency, ...cryptoCurrency]);
    getUserBankDetails();
    getMainFiatCurrency();
    getMainCryptoCurrency();
    // getBankList();
    getBalance();
    // eslint-disable-next-line
  }, []);
  const INITIAL_STATE = {
    accountNumber: "",
    bankCode: "",
    bvn: "",
    accountName: "",
    bankName: "",
    isMobileMoney: false,
    currency: "",
    bankBranchCode: "",
    bankBranchName: "",
    accountType: {
      value: "",
      country: "",
    },
  };

  const [state, setState] = useState(INITIAL_STATE);
  const [switchReset, setSwitch] = useState(true);
  const [resetCode, setResetCode] = useState("");
  const [resetEmail, handleResetEmail] = useState("");
  const [newPin, handleNewPin] = useState("");
  const [passwordModal, setPasswordModal] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [resetPinModal, setResetPinModal] = useState(false);
  const [pass, setNewPassword] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [pin, setNewPin] = useState({
    currentPin: "",
    newPin: "",
  });
  const handlePasswordChange = ({ target: { name, value } }) => {
    setNewPassword((pass) => ({ ...pass, [name]: value }));
  };
  const handlePinChange = ({ target: { name, value } }) => {
    setNewPin((pass) => ({ ...pass, [name]: value }));
  };

  const handleChange = ({ target: { name, value } }) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  useEffect(() => {
    if (
      state.accountType.value === "ng-account" &&
      state.bankCode &&
      state.accountNumber.length === 10 &&
      !state.isMobileMoney
    ) {
      console.log("ng- account");
      verifyBankAccount({
        bankCode: state.bankCode,
        accountNumber: state.accountNumber,
      });
    } else if (
      state.accountType.value === "gh-account" &&
      state.bankCode &&
      state.accountNumber.length === 12 &&
      !state.isMobileMoney
    ) {
      console.log("gh - account");
      verifyBankAccount({
        bankCode: state.bankCode,
        accountNumber: state.accountNumber,
      });
    } else if (
      state.accountType.value === "gh-mobile" &&
      state.accountNumber.length === 11
    ) {
      console.log("mobile");
      verifyBankAccount({
        bankCode: state.bankCode,
        accountNumber: `233${state.accountNumber.substring(1)}`,
      });
    }
    // eslint-disable-next-line
  }, [state.bankCode, state.accountNumber, verifyBankAccount]);
  useEffect(() => {
    if (branchList && branchList.length === 1) {
      setState((state) => ({
        ...state,
        bankBranchName: branchList && branchList[0].branch_name,
        bankBranchCode: branchList && branchList[0].branch_code,
      }));
    }
  }, [branchList]);
  useEffect(() => {
    if (bankName && bankName.accountName) {
      setState((state) => ({
        ...state,
        accountName: bankName && bankName.accountName,
      }));
    }
  }, [bankName]);

  const handleBankFormSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    submitBankDetails({
      ...state,
      currencyId: state.currency === "GH" ? 2 : 1,
      accountType: state.accountType,
    });
    setTimeout(() => {
      setState((state) => ({
        ...state,
        currency: "",
        accountNumber: "",
        bankCode: "",
        bvn: "",
        accountName: "",
        bankName: "",
        bankBranchCode: "",
        bankBranchName: "",
        isMobileMoney: false,
      }));
    }, 2000);
  };

  const handleMobileMoneyBankCode = (value) => {
    handleChange({ target: { name: "bankCode", value: value } });
    handleChange({ target: { name: "bankName", value: "" } });
    handleChange({ target: { name: "accountName", value: "" } });
    handleChange({ target: { name: "accountNumber", value: "" } });
    handleChange({ target: { name: "accountNumber", value: "" } });
    handleChange({ target: { name: "bankBranchCode", value: "" } });
    handleChange({ target: { name: "bankBranchName", value: "" } });
  };

  const handleBankCode = (value) => {
    handleChange({ target: { name: "bankCode", value: value.split(",")[0] } });
    handleChange({ target: { name: "bankName", value: value.split(",")[1] } });
    handleChange({ target: { name: "accountName", value: "" } });
    handleChange({ target: { name: "accountNumber", value: "" } });
    handleChange({ target: { name: "accountNumber", value: "" } });
    handleChange({ target: { name: "bankBranchCode", value: "" } });
    handleChange({ target: { name: "bankBranchName", value: "" } });
    if (state.currency === "GH") getBankBranchList({ id: value.split(",")[2] });
  };
  const handleDelAccount = (id) => {
    removeUserBankDetails({ bankAccountId: id });
  };
  const handleChangePassword = (e) => {
    if (e) {
      e.preventDefault();
    }
    changePassword(pass);
  };
  const handleChangePin = (e) => {
    if (e) {
      e.preventDefault();
    }
    changePin(pin);
  };
  const resetPin = (e) => {
    if (resetEmail.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/)) {
      const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
    AppFetch({
      url: `/user-account/${userId}/reset-pin`,
      method: "post",
      headers: {
        "public-request": "true",
      },
      data: {
        email: resetEmail,
      },
    })
      .then((response) => {
        console.log("reset", response);
        localStorage.setItem("reference", response.data.reference);
        notification.success({
          message:'Otp sent to email successfully'
        })
        // setWallet_btc_rate(response.data.ticker.sell);
        setSwitch(false);
      })
      .catch((err) => {
        notification.error({
          message: "Try Again",
          duration: 2.5,
        });
        setSwitch(true);
      });
    } else {
      notification.error({
        message:'Invalid email'
      })
    }
    
    // ResetPinViaEmail({
    //   email: resetEmail,
    // });

    
  };

  const completePinReset = (e) => {
    completeResetPin({
      email: resetEmail,
      resetCode,
      newPin,
    });
    handleCancel();
    setSwitch(true);
  };

  const handleCancel = () => {
    setResetPinModal(false);
    setSwitch(true);
  };
  return (
    <DashboardLayout bg="#fff">
      <div className={styles.profile} style={{ margin: 0 }}>
        <div className={styles.profilePersonal}>
          <div
            className={styles.profileSection}
            style={{ marginBottom: 20, paddingBottom: 0 }}
          >
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Basic Information</span>
            </div>
          </div>
          <div
            className={styles.profilePersonalEntry}
            style={{ lineHeight: 18, wordWrap: "break-word", width: "auto" }}
          >
            <span>Email</span>
            <span>{user && user.email}</span>
          </div>
          <div
            className={styles.profilePersonalEntry}
            style={{ lineHeight: 18, wordWrap: "break-word", width: "auto" }}
          >
            <span>Name</span>
            <span>{`${(user && user.Profile.first_name) || `-`} ${
              (user && user.Profile.last_name) || `-`
            }`}</span>
          </div>
          <div
            className={styles.profilePersonalEntry}
            style={{ lineHeight: 18, wordWrap: "break-word", width: "auto" }}
          >
            <span>Password</span>
            <span>*********</span>
          </div>
          <div
            className={styles.profilePersonalEntry}
            style={{ lineHeight: 18, wordWrap: "break-word", width: "auto" }}
          >
            <span>Referral Code</span>
            <span style={{ display: "flex", alignItems: "center" }}>
              <small>{(user && user.referral_code) || "---"}</small>
              <Clipboard
                style={{ padding: 8 }}
                component="div"
                data-clipboard-text={`${
                  window && window.location && window.location.origin
                }/signup?code=${user && user.referral_code}`}
                onSuccess={() =>
                  notification.success({
                    message: "copied",
                    duration: 1,
                  })
                }
              >
                <Copy title="copy referral link" />
              </Clipboard>
            </span>
          </div>
        </div>
        <div className={styles.profileBank}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Bank Accounts</span>
              <span className={styles.sub}>List of Bank Accounts </span>
            </div>
          </div>
          <div
            className={styles.profileBankContent}
            style={{ maxHeight: 540, overflowY: "auto" }}
          >
            {bankAccounts && bankAccounts.length > 0 ? (
              bankAccounts.map((item, index) => (
                <div
                  key={index}
                  className={styles.profilePersonalEntry}
                  style={{
                    padding: "15px 10px",
                    border: "1px solid #c4c4c4",
                    maxWidth: 300,
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    width: "100%",
                  }}
                >
                  <span
                    style={{ width: "100%" }}
                  >{`${item.account_number}`}</span>
                  <span style={{ width: "100%" }}>{`${
                    item.details.is_mobile_money
                      ? "Mobile Money Account"
                      : item.details.account_name
                  }`}</span>
                  <span style={{ width: "100%" }}>{`${
                    item.details.is_mobile_money
                      ? item.bank_code
                      : item.details.bankName
                  }`}</span>
                  <Button
                    className={styles.deleteButton}
                    onClick={() => handleDelAccount(item.id)}
                    style={{
                      marginTop: 20,
                      background: "#e82127",
                      color: "#fff",
                    }}
                    text="Delete Bank Account"
                  />
                </div>
              ))
            ) : (
              <EmptyEntryWithTitle title="Bank Account" />
            )}
          </div>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.sub}>
                Add a primary bank account and trade easily{" "}
              </span>
            </div>
          </div>
          <form
            onSubmit={(e) => handleBankFormSubmit(e)}
            className={styles.profileBankContent}
          >
            <Select
              labelClass={styles.profileBankInputLabel}
              className={styles.profileBankInput}
              label="Select Account Type"
              value={state.currency}
              onSelect={(value) => {
                setState((state) => ({
                  ...state,
                  currency: value.country,
                  accountType: value,
                  accountNumber: "",
                  bankCode: "",
                  bvn: "",
                  accountName: "",
                  bankName: "",
                  bankBranchCode: "",
                  bankBranchName: "",
                  isMobileMoney: false,
                }));
                if (value !== "US") {
                  getBankList({ country: value.country });
                }
              }}
              name="select payment currency"
              // options={fiatCurrency.map((item)=> ({
              //   render: item.name,
              //   value:item.code.substring(0,2)
              // }))}
              options={[
                {
                  render: "Nigeria Accounts",
                  value: {
                    country: "NG",
                    value: "ng-account",
                    name: "Nigeria Account",
                  },
                },
                {
                  render: "Ghana Accounts",
                  value: {
                    country: "GH",
                    value: "gh-account",
                    name: "Ghana Account",
                  },
                },
                {
                  render: "Ghana Mobile Money",
                  value: {
                    country: "GH",
                    value: "gh-mobile",
                    name: "Ghana Mobile Money",
                  },
                },
              ]}
            />
            {/* {state.currency === "GH" && (
              <div
                className={styles.profileBankInput}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flex: "1 1",
                  position: "relative",
                  marginBottom: 15,
                }}
              >
                <label
                  style={{
                    fontSize: 14,
                    color: "#0d0d0b",
                    fontWeight: "450",
                    marginBottom: 6,
                  }}
                  className={styles.profileBankInputLabel}
                >
                  Mobile Money Account
                </label>
                <Switch
                  checked={state.isMobileMoney}
                  onChange={(value) => {
                    setState((state) => ({
                      ...state,
                      isMobileMoney: value,
                      bankName: "",
                      bankBranchCode: "",
                      bankBranchName: "",
                      bankCode: "",
                    }));
                  }}
                  checkedChildren="Yes"
                  unCheckedChildren="No"
                />
              </div>
            )} */}
            {state.accountType.value === "ng-account" && (
              <Select
                name="bankCode"
                labelClass={styles.profileBankInputLabel}
                className={styles.profileBankInput}
                value={state.bankCode}
                onSelect={(value) => handleBankCode(value)}
                label="Bank Name"
                placeholder="Select your bank"
                options={bankList?.map((i) => ({
                  value: `${i.code},${i.name}`,
                  render: i.name,
                }))}
              />
            )}
            {state.accountType.value === "gh-account" && (
              <Select
                name="bankCode"
                className={styles.profileBankInput}
                value={state.bankCode}
                onSelect={(value) => handleBankCode(value)}
                label="Bank"
                placeholder="Select your bank"
                options={bankList?.map((i) => ({
                  value: `${i.code},${i.name},${i.id}`,
                  render: i.name,
                }))}
              />
            )}
            {state.accountType.value === "gh-account" && (
              <Select
                name="bankBranchName"
                labelClass={styles.profileBankInputLabel}
                className={styles.profileBankInput}
                value={`${state.bankBranchCode},${state.bankBranchName}`}
                onSelect={(value) => {
                  setState((state) => ({
                    ...state,
                    bankBranchName: value.split(",")[1],
                    bankBranchCode: value.split(",")[0],
                  }));
                }}
                label="Bank Branch"
                placeholder="Select your bank branch"
                options={
                  branchList &&
                  branchList?.map((i) => ({
                    value: `${i.branch_code},${i.branch_name}`,
                    render: i.branch_name,
                  }))
                }
              />
            )}
            {state.accountType.value === "gh-mobile" && (
              <Select
                name="bankCode"
                className={styles.profileBankInput}
                value={state.bankCode}
                onSelect={(value) => handleMobileMoneyBankCode(value)}
                label="Mobile Network"
                placeholder="Select your bank"
                options={[
                  { render: "MTN", value: "MTN" },
                  { render: "AIRTEL", value: "AIRTEL" },
                  { render: "TIGO", value: "TIGO" },
                  { render: "VODAFONE", value: "VODAFONE" },
                ]}
              />
            )}
            {state.currency && state.accountType.value !== "gh-mobile" && (
              <Input
                name="accountNumber"
                value={state.accountNumber}
                labelClass={styles.profileBankInputLabel}
                className={styles.profileBankInput}
                onChange={handleChange}
                label="Account Number"
                placeholder="e.g 01236548"
                maxLength="15"
                hint="Please ensure to input the correct account number"
              />
            )}
            {state.accountType.value === "gh-mobile" && (
              <Input
                name="accountNumber"
                value={state.accountNumber}
                labelClass={styles.profileBankInputLabel}
                className={styles.profileBankInput}
                onChange={handleChange}
                label="Mobile Number"
                placeholder="e.g 01236548"
                maxLength="11"
                hint="Please ensure to input the correct account number"
              />
            )}
            {state.accountType.value !== "gh-mobile" && (
              <Input
                name="accountName"
                value={state.accountName}
                labelClass={styles.profileBankInputLabel}
                className={styles.profileBankInput}
                onChange={handleChange}
                label="Account Name"
                placeholder="Enter your account name"
                readOnly={true}
                disabled
              />
            )}

            <div className={styles.btnPair}>
              <Button
                disabled={
                  !state.accountNumber || !state.currency || !state.bankCode
                }
                text="Save"
                type="submit"
                form="full"
              />
            </div>
          </form>
        </div>
        <div className={styles.profileBank}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Referral</span>
              <span className={styles.sub}>Redeem Your Referrals</span>
            </div>
          </div>
          <ReferralTable
            fetchTrans={getUserReferrals}
            transaction={userReferralTransaction}
            handleAction={(id) => {
              redeemReferralBonus({ referralId: id });
            }}
          />
        </div>
        <div className={styles.profileSecurity}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Security</span>
              <span className={styles.sub}>Change your security keys</span>
            </div>
          </div>
          <div className={styles.profileSecurityWidgets}>
            <Row gutter={[16, 16]}>
              <Col span={8} xs={10} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <div
                  className={homeStyles.widgets__inner}
                  onClick={() => {
                    setPasswordModal(true);
                  }}
                >
                  <div className={homeStyles.widgets__image}>
                    <img
                      src={png.ChangePassword}
                      className={homeStyles.widgets__images}
                      style={{ marginRight: 5 }}
                      alt="wallet"
                    />
                  </div>
                  <div className={homeStyles.widgets__info}>Password</div>
                  <div className={homeStyles.widgets__description}>
                    Change your Password
                  </div>
                  <div className={homeStyles.widgets__arrow}>
                    <DoubleRightOutlined
                      className={homeStyles.widgets__arrow__inner}
                    />
                  </div>
                </div>
              </Col>
              <Col span={8} xs={10} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <div
                  className={homeStyles.widgets__inner}
                  onClick={() => {
                    setPinModal(true);
                  }}
                >
                  <div className={homeStyles.widgets__image}>
                    <img
                      src={png.ChangePin}
                      className={homeStyles.widgets__images}
                      style={{ marginRight: 5 }}
                      alt="wallet"
                    />
                  </div>
                  <div className={homeStyles.widgets__info}>Change Pin</div>
                  <div className={homeStyles.widgets__description}>
                    Change your Pin
                  </div>
                  <div className={homeStyles.widgets__arrow}>
                    <DoubleRightOutlined
                      className={homeStyles.widgets__arrow__inner}
                    />
                  </div>
                </div>
              </Col>
              <Col span={8} xs={10} sm={12} md={8} lg={8} xl={8} xxl={8}>
                <div
                  className={homeStyles.widgets__inner}
                  onClick={() => {
                    setResetPinModal(true);
                  }}
                >
                  <div className={homeStyles.widgets__image}>
                    <img
                      src={png.ResetPin}
                      className={homeStyles.widgets__images}
                      style={{ marginRight: 5 }}
                      alt="wallet"
                    />
                  </div>
                  <div className={homeStyles.widgets__info}>Reset Pin</div>
                  <div className={homeStyles.widgets__description}>
                    Reset Your Pin
                  </div>
                  <div className={homeStyles.widgets__arrow}>
                    <DoubleRightOutlined
                      className={homeStyles.widgets__arrow__inner}
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <ModalWrapper
          isModalVisible={passwordModal}
          setIsModalVisible={() => {
            setPasswordModal(false);
          }}
        >
          <form
            onSubmit={handleChangePassword}
            className={styles.profileSecurityContents}
          >
            <h1>
              <span className={styles.sub}>Change your Password</span>
            </h1>
            <Input
              placeholder="Current Password"
              label="Current Password"
              name="currentPassword"
              onChange={handlePasswordChange}
              required={true}
              minLength={"8"}
              type="password"
              pattern={"^{8,}$"}
              value={pass.currentPassword}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <Input
              placeholder="New Password"
              label="New Password"
              name="newPassword"
              onChange={handlePasswordChange}
              required={true}
              minLength={"8"}
              type="password"
              pattern={"^{8,}$"}
              value={pass.newPassword}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <div className={styles.btnPair} style={{ marginTop: 20 }}>
              <Button form="full" type="submit" text="Change Password" />
            </div>
          </form>
        </ModalWrapper>
        <ModalWrapper
          isModalVisible={pinModal}
          setIsModalVisible={() => {
            setPinModal(false);
          }}
        >
          <form
            onSubmit={handleChangePin}
            className={styles.profileSecurityContents}
          >
            <h1>
              <span className={styles.sub}>Change your Pin</span>
            </h1>
            <Input
              placeholder="Current Pin"
              label="Current Pin"
              name="currentPin"
              onChange={handlePinChange}
              required={true}
              maxLength={"4"}
              type="number"
              // pattern={"^{8,}$"}
              value={pin.currentPin}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <Input
              placeholder="New Pin"
              label="New Pin"
              name="newPin"
              onChange={handlePinChange}
              required={true}
              maxLength={"4"}
              type="number"
              // pattern={"^{8,}$"}
              value={pin.newPin}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <div className={styles.btnPair} style={{ marginTop: 20 }}>
              <Button form="full" type="submit" text="Change Pin" />
            </div>
          </form>
        </ModalWrapper>
        <Modal
          footer={null}
          title="Reset Transaction Pin"
          visible={resetPinModal}
          onCancel={handleCancel}
        >
          {switchReset ? (
            <div>
              <Input
                className={styles.auth__content__input__body}
                inputClass={styles.auth__content__input}
                placeholder="Email"
                onChange={(e) => handleResetEmail(e.target.value)}
                value={resetEmail}
                type="email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$"
                required={true}
                label="Please enter your registered email."
              />
              <Button
                className={styles.auth__content__button}
                form="full"
                disabled={!resetEmail}
                onClick={(e) => resetPin(e)}
                text="Submit"
              />
            </div>
          ) : (
            <div>
              <Input
                className={styles.auth__content__input__body}
                inputClass={styles.auth__content__input}
                placeholder="123456"
                onChange={(e) => setResetCode(e.target.value)}
                value={resetCode}
                type="number"
                required={true}
                label="Please enter the OTP sent to your email."
              />
              <Input
                className={styles.auth__content__input__body}
                inputClass={styles.auth__content__input}
                placeholder="New Pin"
                onChange={(e) => handleNewPin(e.target.value)}
                value={newPin}
                type="number"
                required={true}
                label="New Pin"
              />
              {/* <Button
              className={styles.auth__content__button}
              form="full"
              
              onClick={(e) => completePinReset(e)}
              text="Submit"
            /> */}
              <div className={styles.btnPair} style={{ marginTop: 20 }}>
                <Button
                  form="full"
                  type="submit"
                  text="Submit"
                  onClick={(e) => completePinReset(e)}
                />
              </div>
            </div>
          )}
        </Modal>
        {/* <div className={styles.profileSecurity}>
          <div className={styles.profileSection}>
            <div className={styles.profileSectionLeft}>
              <span className={styles.main}>Security</span>
              <span className={styles.sub}>Change password</span>
            </div>
          </div>
          <form
            onSubmit={handleChangePassword}
            className={styles.profileSecurityContent}
          >
            <Input
              placeholder="Current Password"
              label="Current Password"
              name="currentPassword"
              onChange={handlePasswordChange}
              required={true}
              minLength={"8"}
              type="password"
              pattern={"^{8,}$"}
              value={pass.currentPassword}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <Input
              placeholder="New Password"
              label="New Password"
              name="newPassword"
              onChange={handlePasswordChange}
              required={true}
              minLength={"8"}
              type="password"
              pattern={"^{8,}$"}
              value={pass.newPassword}
              labelClass={styles.profileBankInputLabel}
              className={styles.input}
            />
            <div className={styles.btnPair} style={{ marginTop: 20 }}>
              <Button form="full" type="submit" text="Change Password" />
            </div>
          </form>
          
        </div> */}
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  fiatCurrency: state.user.fiatCurrency,
  cryptoCurrency: state.user.cryptoCurrency,
  balance: state.btc.balance,
  branchList: state.bank.bankBranchList,
  bankList: state.bank.bankList,
  bankName: state.bank.bankDetails,
  bankAccounts: state.bank.bankAccounts,
  UserReferrals: state.user.userReferralTransaction,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => {
    dispatch(GetUserDetails());
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
  getMainCryptoCurrency: () => {
    dispatch(getCryptoCurrencies());
  },
  getUserBankDetails: () => {
    dispatch(getUserBankAccount());
  },
  getBankBranchList: (data) => {
    dispatch(getBankBranchByID(data));
  },
  getBankList: (data) => {
    dispatch(getBankListByCountry(data));
  },
  getBalance: () => {
    dispatch(getBTCWalletDetails());
  },
  verifyBankAccount: (data) => {
    dispatch(verifyBankAccountDetails(data));
  },
  submitBankDetails: (data) => {
    dispatch(addUserBankAccount(data));
  },
  removeUserBankDetails: (data) => {
    dispatch(removeUserBankAccount(data));
  },
  changePassword: (data) => {
    dispatch(changePassword(data));
  },
  changePin: (data) => {
    dispatch(changePin(data));
  },
  getUserReferrals: (data) => {
    dispatch(getUserReferrals(data));
  },
  redeemReferralBonus: (data) => {
    dispatch(redeemUserReferralBonus(data));
  },
  ResetPinViaEmail: (data) => {
    dispatch(resetPin(data));
  },
  completeResetPin: (data) => {
    dispatch(completeResetPin(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
