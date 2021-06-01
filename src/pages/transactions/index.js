import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout";
import {
  ArrowLeftOutlined,
  // BarChartOutlined,
  // PayCircleOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";
// import Flyout from "./components";
import styles from "../styles.module.scss";
import FiatTrans from "./fiatTrans";
import CryptoTrans from "./cryptoTrans";
import GiftCardTrans from "./giftCardTrans";
import homeStyles from "../home/styles.module.scss";
import { Row, Col } from "antd";
import png from "../../assets/png";
import history from "../../redux/history";

const Transactions = () => {
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
          <span className={styles.gitcard__top__title}>
            {windowDimensions.width < 600 && (
              <ArrowLeftOutlined
                onClick={() => history.goBack()}
                style={{ marginRight: 10, cursor: "pointer" }}
              />
            )}
            Transactions{" "}
          </span>
          <div className={styles.transactioncards}>
            <Row gutter={[8, 25]}>
              <Col span={6} xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                <div
                  className={homeStyles.widgets__inner}
                  onClick={() => {
                    setShowFiatTrans(true);
                    setActive(false);
                    setShowCryptoTrans(false);
                    setShowGiftTrans(false);
                    // setFormState((state) => ({ ...state, ...item, show: true }));
                    // setFormState((state) => ({ ...state, show: true }));
                  }}
                >
                  <div className={homeStyles.widgets__image}>
                    <img
                      src={png.FiatTrans}
                      className={homeStyles.widgets__images}
                      style={{ marginRight: 5 }}
                      alt="wallet"
                    />
                  </div>
                  <div className={homeStyles.widgets__info}>Fiat</div>
                  <div className={homeStyles.widgets__description}>
                    Details of your Fiat Currency Transactions
                  </div>
                  <div className={homeStyles.widgets__arrow}>
                    <DoubleRightOutlined
                      className={homeStyles.widgets__arrow__inner}
                    />
                  </div>
                </div>
              </Col>
              <Col span={6} xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                <div
                  className={homeStyles.widgets__inner}
                  onClick={() => {
                    setShowCryptoTrans(true);
                    setActive(false);
                    setShowFiatTrans(false);
                    setShowGiftTrans(false);
                  }}
                >
                  <div className={homeStyles.widgets__image}>
                    <img
                      src={png.CryptoTrans}
                      className={homeStyles.widgets__images}
                      style={{ marginRight: 5 }}
                      alt="wallet"
                    />
                  </div>
                  <div className={homeStyles.widgets__info}>Crypto</div>
                  <div className={homeStyles.widgets__description}>
                    Details of your Crypto Currency Transactions
                  </div>
                  <div className={homeStyles.widgets__arrow}>
                    <DoubleRightOutlined
                      className={homeStyles.widgets__arrow__inner}
                    />
                  </div>
                </div>
              </Col>
              <Col span={6} xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                <div
                  className={homeStyles.widgets__inner}
                  onClick={() => {
                    setShowCryptoTrans(false);
                    setActive(false);
                    setShowFiatTrans(false);
                    setShowGiftTrans(true);
                  }}
                >
                  <div className={homeStyles.widgets__image}>
                    <img
                      src={png.GiftCardTrans}
                      className={homeStyles.widgets__images}
                      style={{ marginRight: 5 }}
                      alt="wallet"
                    />
                  </div>
                  <div className={homeStyles.widgets__info}>GiftCards</div>
                  <div className={homeStyles.widgets__description}>
                    Details of your GiftCards Transactions
                  </div>
                  <div className={homeStyles.widgets__arrow}>
                    <DoubleRightOutlined
                      className={homeStyles.widgets__arrow__inner}
                    />
                  </div>
                </div>
              </Col>
            </Row>
            {/* <div className={styles.transactioncards__content}>

            </div> */}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};

export default Transactions;
