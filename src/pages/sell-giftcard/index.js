import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { DoubleRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { DashboardLayout } from "../../components/layout";
import GiftCardForm from "./components";
import styles from "../styles.module.scss";
import {
  getGiftCardCodes,
  getGiftCardDetails,
  initialGiftCardSale,
} from "../../redux/actions/giftCard";
import { EmptyLoading } from "../transactions/components";
import homeStyles from "../home/styles.module.scss";
// import { cardList } from "../../utils/helper";
import { getFiatCurrencies, getUserWallets } from "../../redux/actions/Auths";
import { getCurrencyConversions } from "../../redux/actions/user";
import history from "../../redux/history";

// const getHumanForm = (name) => (
//   name.replace("-", " ").split(" ").map(word => `${word[0].toUpperCase()}${word.slice(1,)}`).join(" ")
// )

const SellGiftcard = (props) => {
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
  let b = props.giftCardList;

  let list = b;
  useEffect(() => {
    props.getCards({ cardCode: "" });
    props.getWallets();
    props.getMainFiatCurrency();
    props.getConversions();
    // eslint-disable-next-line
  }, []);
  const [active, setActive] = useState(null);

  const CardItem = ({ item, data }) => {
    const handleClick = () => {
      props.getCardDetails({ cardCode: data.uid });
      let a = {};
      let name = data.name;
      a.name = name;
      a.image = data.image;
      a.displayName = data.name;
      a.uid = data.uid;
      a._id = data.id;

      // a[name] = Object(data[1]).map((key) => ({
      //   name: key[0],
      //   [key[0]]: key[1],
      // }));
      // Object(data[1]).map((key) => (a[key[0]] = key[1]));
      // console.log(a);

      setActive(a);
    };

    // let C = cardList[item];
    return (
      // <div onClick={handleClick} className={styles.gitcard__content__card}>
      //   <div className={styles.holder}>

      //     <img src={data.image} height="151.692" width="241" alt="card" />
      //   </div>
      //   {data.name}

      // </div>
      <div className={homeStyles.widgets__inner} onClick={handleClick}>
        <div className={homeStyles.widgets__image}>
          <img
            src={data.image}
            height="40"
            width="40"
            style={{ marginRight: 5 }}
            alt="wallet"
          />
        </div>
        <div className={homeStyles.widgets__info}>{data.name}</div>
        <div className={homeStyles.widgets__description}>
          {`Sell your ${data.name} giftcard`}
        </div>
        <div className={homeStyles.widgets__arrow}>
          <DoubleRightOutlined className={homeStyles.widgets__arrow__inner} />
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className={styles.gitcard}>
        {!active && (
          <>
            <div className={styles.gitcard__top}>
              <span className={styles.gitcard__top__title}>
                {windowDimensions.width < 600 && (
                  <ArrowLeftOutlined
                    onClick={() => history.goBack()}
                    style={{ marginRight: 10, cursor: "pointer" }}
                  />
                )}
                Gift cards{" "}
              </span>
              {/* <div className={styles.gitcard__top__search}>
                <SearchIcon />
                <input placeholder="Search for giftcards" />
              </div> */}
            </div>
            <Row
              // gutter={{ xs: 0, sm: 0, md: 0, lg: 0 }}
              gutter={[8,8]}
              style={{ marginLeft: 25, marginTop: 20 }}
            >
              {list && list.length < 1 ? (
                <div style={{ width: "100%" }}>
                  <EmptyLoading action={false} />
                </div>
              ) : (
                list &&
                list.map((item, key) => {
                  return (
                    <Col
                      key={key}
                      xs={11}
                      sm={11}
                      md={11}
                      lg={4}
                      xl={4}
                      className="gutter-row"
                      span={6}
                      style={{ marginBottom: 28, marginRight: 12 }}
                    >
                      <CardItem key={key} data={item} item={item[0]} />
                    </Col>
                  );
                })
              )}
            </Row>
          </>
        )}
        {active && (
          <GiftCardForm
            soldGiftCard={props.soldGiftCard}
            handleBack={() => setActive(null)}
            SellGiftCard={props.SellGiftCard}
            active={active}
            loading={props.loading}
            userWallets={props.userWallets}
            fiatCurrency={props.fiatCurrency}
            conversions={props.conversions}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  loading: state.giftCard.loading,
  giftCardList: state.giftCard.giftCardList,
  soldGiftCard: state.giftCard.sellGiftCard,
  cardDetails: state.giftCard.cardDetails,
  userWallets: state.user.userWallets,
  fiatCurrency: state.user.fiatCurrency,
  conversions: state.user.conversions,
});

const mapDispatchToProps = (dispatch) => ({
  getCards: (data) => {
    dispatch(getGiftCardCodes(data));
  },
  SellGiftCard: (data) => {
    dispatch(initialGiftCardSale(data));
  },
  getCardDetails: (data) => {
    dispatch(getGiftCardDetails(data));
  },
  getWallets: () => {
    dispatch(getUserWallets());
  },
  getMainFiatCurrency: () => {
    dispatch(getFiatCurrencies());
  },
  getConversions: () => {
    dispatch(getCurrencyConversions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SellGiftcard);
