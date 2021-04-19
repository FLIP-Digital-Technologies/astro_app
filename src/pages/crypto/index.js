import React, { useEffect, useState } from "react";
import * as SVG from "../../assets/svg";
import { connect } from "react-redux";
import { DashboardLayout } from "../../components/layout";
import { getCryptoCurrencies, getUserWallets } from "../../redux/actions/Auths";
import styles from "../styles.module.scss";
import BTC from "../btc";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddCryptoWallet from "../../components/Modals/addCryptoWallet";

const data = [
  { name: "Bitcoin", code: "BTC", price: 61000, balance: "0.096" },
  { name: "Ethereum", code: "ETH", price: 2300, balance: "0.1" },
  { name: "Litecoin", code: "LTE", price: 500, balance: "30.08" },
  { name: "Dogecoin", code: "DGE", price: 1.5, balance: "400.09" },
  { name: "Binance Coin", code: "BNB", price: 61000, balance: "0.096" },
];

const getIcon = (name) => {
  switch (name) {
    case "BTC":
      return (
        <img
          src={SVG.BitcoinLogo}
          height="30"
          width="30"
          style={{ marginRight: 14 }}
          alt="currency"
        />
      );
    case "ETH":
      return (
        <img
          src={SVG.ETH}
          height="30"
          width="30"
          style={{ marginRight: 14 }}
          alt="currency"
        />
      );
    case "LTE":
      return (
        <img
          src={SVG.LTC}
          height="30"
          width="30"
          style={{ marginRight: 14 }}
          alt="currency"
        />
      );
    case "DGE":
      return (
        <img
          src={SVG.DGE}
          height="30"
          width="30"
          style={{ marginRight: 14 }}
          alt="currency"
        />
      );
    case "BNB":
      return (
        <img
          src={SVG.BNB}
          height="30"
          width="30"
          style={{ marginRight: 14 }}
          alt="currency"
        />
      );
    default:
      return <i class="fab fa-hive" style={{ marginRight: 14 }}></i>;
  }
  // return <i class="fab fa-hive" style={{marginRight: 14}}></i>
};

const CryptoPage = (props) => {
  const [opencryptoAddWallet, setOpencryptoAddWallet] = useState(false);
  const [active, setActive] = useState(null);
  useEffect(() => {
    props.getBalance();
    // eslint-disable-next-line
  }, []);
  return (
    <DashboardLayout>
      {!active && (
        <>
          <span className={styles.gitcard__top__title}>Crypto </span>
          <div className={styles.home}>
            <div className={styles.home__welcome}>
              <div className={styles.home__top}>
                {props.balance &&
                  props.balance.cryptoWallets.length > 0 &&
                  props.balance.cryptoWallets.map((item, index) => (
                    <div
                      className={styles.crypto}
                      onClick={() => {
                        console.log(index, item);
                        setActive({ ...item, icon: getIcon(item.Currency.code) });
                      }}
                    >
                      <div className={styles.crypto__ta}>
                        <div className={styles.crypto__value}>
                          {getIcon(item.Currency.code)}
                          <span>{item.Currency.name}</span>
                          {""}
                          {/* {wallet === "BTC" && <span>{wallet}</span>} */}
                        </div>
                      </div>
                      <div
                        className={styles.crypto__ta}
                      >

                        {/* <span className={styles.balances__title}>{currencyHeader}</span> */}
                        <div className={styles.crypto__value}>
                          <span>{item.balance}</span>
                          {` ${item.Currency.code}`}
                          {/* {wallet === "BTC" && <span>{wallet}</span>} */}
                        </div>
                        <div className={styles.crypto__price}>
                          <span>{"USD $ "}</span>
                          {/* {` ${item.price.toLocaleString()}`} */}
                          USD $ 55,000
                        </div>
                      </div>
                      {/* <div
                    className={styles.crypto__ta}
                    //   onClick={() => {
                    //     if (fiatIndex + 1 === balance.fiatWallets.length) {
                    //       return;
                    //     } else {
                    //       setFiatIndex(++fiatIndex);
                    //     }
                    //   }}
                  >
                    <RightCircleOutlined
                      style={{
                        fontSize: "30px",
                        color: "#08c",
                        //   : "",
                      }}
                    />
                  </div> */}
                    </div>
                  ))}
                {props.balance && props.balance.cryptoWallets.length === 0 && (
                  <div
                    className={styles.crypto}
                    onClick={() => {
                      // add code for adding wallet
                      // setActive({...item, icon:getIcon(item.code)})
                    }}
                  >
                    <div onClick={()=> setOpencryptoAddWallet(true)}
                    className={styles.crypto__ta}>
                      <div className={styles.crypto__value}>
                        <i class="fas fa-coins" style={{ marginRight: 14 }}></i>
                        <span>{"Add Crypto wallet"}</span>
                        {""}
                        {/* {wallet === "BTC" && <span>{wallet}</span>} */}
                      </div>
                    </div>
                    <div
                      className={styles.crypto__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      {/* <span
                      className={styles.crypto__title}
                      // onClick={(e) => e.preventDefault()}
                    >
                      {"Wallet Balance"}
                      <DownOutlined />
                    </span> */}

                      {/* <span className={styles.balances__title}>{currencyHeader}</span> */}
                      <div className={styles.crypto__value}>
                        {/* <span>{item.balance}</span>{` ${item.code}`} */}
                        {/* {wallet === "BTC" && <span>{wallet}</span>} */}
                      </div>
                      <div className={styles.crypto__price}>
                        {/* <span>{"USD $ "}</span>{` ${item.price.toLocaleString()}`} */}
                        {/* {wallet === "BTC" && <span>{wallet}</span>} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {active && <BTC handleBack={() => setActive(null)} active={active} fiatWallets={props.balance.fiatWallets} />}
      <AddCryptoWallet
        setIsModalVisible={setOpencryptoAddWallet}
        isModalVisible={opencryptoAddWallet}
        wallets={props.cryptoCurrency}
      />
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  balance: state.btc.balance,
  cryptoCurrency:state.user.cryptoCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  getBalance: () => {
    dispatch(getUserWallets());
  },
  getMainCryptoCurrency: () => {
    dispatch(getCryptoCurrencies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CryptoPage);
