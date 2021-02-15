import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col } from "antd";

import { DashboardLayout } from "../../components/layout";
import { GiftCardForm } from "./components";
import styles from "../styles.module.scss";
import {
  getGiftCardCodes,
  initialGiftCardSale,
} from "../../redux/actions/giftCard";
import { EmptyEntryWithTitle } from "../transactions/components";
import { sortData, cardList } from "../../utils/helper";

const getHumanForm = (name) => (
  name.replace("-", " ").split(" ").map(word => `${word[0].toUpperCase()}${word.slice(1,)}`).join(" ")
)

const SellGiftcard = (props) => {
  let b = props.giftCardList;
  let list = sortData(b);
  useEffect(() => {
    props.getCards({ cardCode: "all" });
    // eslint-disable-next-line
  }, []);
  const [active, setActive] = useState(null);

  const CardItem = ({ item, data }) => {
    const handleClick = () => {
      let a = {};
      let name = data[0];
      a.name = name;
      a.Image = C.Image;
      a.displayName = getHumanForm(item);
      a[name] = Object(data[1]).map((key) => ({
        name: key[0],
        [key[0]]: key[1],
      }));
      Object(data[1]).map((key) => (a[key[0]] = key[1]));
      console.log(a);
      setActive(a);
    };

    let C = cardList[item];
    return (
      <div onClick={handleClick} className={styles.gitcard__content__card}>
        <div className={styles.holder}>{C && C.Image && <C.Image />}</div>
        {getHumanForm(item) || null}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className={styles.gitcard}>
        {!active && (
          <>
            <div className={styles.gitcard__top}>
              <span className={styles.gitcard__top__title}>Gift cards </span>
              {/* <div className={styles.gitcard__top__search}>
                <SearchIcon />
                <input placeholder="Search for giftcards" />
              </div> */}
            </div>
            <Row gutter={{ xs: 0, sm: 0, md: 0, lg: 0 }}>
              {list && list.length < 1 ? (
                <div style={{ width: "100%" }}>
                  <EmptyEntryWithTitle title="GiftCard" action={false} />
                </div>
              ) : (
                list &&
                list.map((item, key) => {
                  return (
                    <Col
                      key={key}
                      xs={12}
                      sm={12}
                      md={8}
                      lg={4}
                      xl={4}
                      className="gutter-row"
                      span={6}
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
          />
        )}
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  giftCardList: state.giftCard.giftCardList,
  soldGiftCard: state.giftCard.sellGiftCard,
});

const mapDispatchToProps = (dispatch) => ({
  getCards: (data) => {
    dispatch(getGiftCardCodes(data));
  },
  SellGiftCard: (data) => {
    dispatch(initialGiftCardSale(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SellGiftcard);
