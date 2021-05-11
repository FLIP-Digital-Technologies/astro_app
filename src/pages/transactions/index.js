import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout";
import { BarChartOutlined, PayCircleOutlined } from "@ant-design/icons";
// import Flyout from "./components";
import styles from "../styles.module.scss";
import FiatTrans from "./fiatTrans";
import CryptoTrans from "./cryptoTrans";
import GiftCardTrans from "./giftCardTrans";

const Transactions = () => {
  const [showFiatTrans, setShowFiatTrans] = useState(false);
  const [showCryptoTrans, setShowCryptoTrans] = useState(false);
  const [showGiftTrans, setShowGiftTrans] = useState(false);
  const [active, setActive] = useState(true);
  return (
    <DashboardLayout>
      {!active && showFiatTrans && (
        <FiatTrans
          isVisible={showFiatTrans}
          setIsVisible={setShowFiatTrans}
          goBack={setActive}
        />
      )}
      {!active && showCryptoTrans && (
        <CryptoTrans
          isVisible={showCryptoTrans}
          setIsVisible={setShowCryptoTrans}
          goBack={setActive}
        />
      )}
      {!active && showGiftTrans && (
        <GiftCardTrans
          isVisible={showGiftTrans}
          setIsVisible={setShowGiftTrans}
          goBack={setActive}
        />
      )}
      {active && (
        <>
          <span className={styles.gitcard__top__title}>Transactions </span>
          <div className={styles.transactioncards}>
            <div className={styles.transactioncards__content}>
              <div
                onClick={() => {
                  setShowFiatTrans(true);
                  setActive(false);
                  setShowCryptoTrans(false);
                  setShowGiftTrans(false);
                  // setFormState((state) => ({ ...state, ...item, show: true }));
                  // setFormState((state) => ({ ...state, show: true }));
                }}
                className={`${styles.actionBtns} ${styles.quickBtns}`}
                // key={index.toString()}
              >
                <div>
                  <BarChartOutlined />
                </div>
                <span>{"Fiat"}</span>
              </div>
              <div
                onClick={() => {
                  setShowCryptoTrans(true);
                  setActive(false);
                  setShowFiatTrans(false);
                  setShowGiftTrans(false);
                }}
                className={`${styles.actionBtns} ${styles.quickBtns}`}
                // key={index.toString()}
              >
                <div>
                  <PayCircleOutlined />
                </div>
                <span>{"Crypto"}</span>
              </div>
              <div
                onClick={() => {
                  setShowCryptoTrans(false);
                  setActive(false);
                  setShowFiatTrans(false);
                  setShowGiftTrans(true);
                }}
                className={`${styles.actionBtns} ${styles.quickBtns}`}
                // key={index.toString()}
              >
                <div>
                  <PayCircleOutlined />
                </div>
                <span>{"GiftCard"}</span>
              </div>
              {/* ))} */}
            </div>
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Transactions;
