import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Drawer, Typography } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import _ from "lodash";

import { DashboardLayout } from "../../components/layout";
import Button from "../../components/button";
import Select from "../../components/select";
import Input from "../../components/input";
// import { GiftCardForm } from "./components";
import styles from "../styles.module.scss";
import { EmptyEntryWithTitle } from "../transactions/components";
import {
  getBuyCardsByCountries,
  getBuyCardsBySearch,
  getBuyCardsCardDetail,
  initialBuyGiftCard,
} from "../../redux/actions/buyGiftCard";
import { Money } from "../../utils/helper";

function getImgUrl(data) {
  return `https://www.bitrefill.com/content/cn/b_rgb%3A${
    (data?.logoBackground && data?.logoBackground?.replace("#", "")) || "FFFFFF"
  }%2Cc_pad%2Ch_212%2Cw_350/v${data?.logoVersion}/${data?.logoImage}.jpg`;
}

const { Title, Text } = Typography;

const BuyGiftCard = (props) => {
  // eslint-disable-next-line
  const delayedQuery = useCallback(
    _.debounce(
      (q) => props.getBuyCardsBySearch({ country: "", searchQuery: q }),
      500
    ),
    []
  );
  let location = useLocation();
  const { pathname } = location;
  const history = useHistory();
  const [active, setActive] = useState(null);
  const [state, setState] = useState({
    country: "usa",
    searchQuery: "",
  });
  const [card, setCard] = useState({});
  useEffect(() => {
    const url = new URL(window.location.href);
    const slug = url.searchParams.get("slug");
    if (slug) {
      props.getSingleCard({ card: slug });
      setActive(true);
    }
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    props.getBuyCardsByCountries();
    props.getBuyCardsBySearch({ searchQuery: "", country: "usa" });
    // eslint-disable-next-line
  }, []);
  function createMarkup() {
    return { __html: props?.buyGiftCardDetails?.descriptions?.en || "" };
  }
  function extraInfo() {
    return { __html: props?.buyGiftCardDetails?.extraInfo || "" };
  }
  const handleSubmit = async () => {
    const payload = {
      cardSlug: props?.buyGiftCardDetails?.slug,
      cardCurrency: props?.buyGiftCardDetails?.currency,
      cardValue: card.cardValue,
      amount: card.amount === "null" ? null : card.amount,
      quantity: card.quantity,
      isCustom: false,
      referenceCurrency: card.referenceCurrency,
    };
    await props.buyGiftCard(payload);
    setActive(false);
    setCard({})
  };
  return (
    <DashboardLayout>
      <div className={styles.gitcard}>
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <div>
            <Row>
              <span
                className={styles.gitcard__top__title}
                style={{ marginLeft: 0 }}
              >
                Buy Gift cards{" "}
              </span>
            </Row>
            <Row
              style={{
                marginTop: 10,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Col
                xs={24}
                sm={24}
                md={6}
                lg={4}
                xl={4}
                className="gutter-row ml-4"
                span={6}
              >
                <Input
                  name="search"
                  value={state.searchQuery}
                  onChange={(e) => {
                    delayedQuery(e.target.value);
                    setState((state) => ({
                      country: "",
                      searchQuery: e.target.value,
                    }));
                  }}
                  label="Search card"
                  placeholder="Steam"
                />
              </Col>
              <Col
                xs={24}
                sm={24}
                md={6}
                lg={6}
                xl={6}
                className="gutter-row ml-4"
                span={6}
              >
                <Select
                  label="Select Country"
                  value={state.country}
                  onSelect={(value) => {
                    setState((state) => ({
                      ...state,
                      country: value,
                    }));
                    props.getBuyCardsBySearch({ ...state, country: value });
                  }}
                  name="country"
                  options={
                    props.buyCardCountries &&
                    props.buyCardCountries.map((item) => ({
                      value: item.value,
                      render: (
                        <div
                          className={styles.countryOption}
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          <span>
                            {item.icon}&emsp;{item.label}
                          </span>
                        </div>
                      ),
                    }))
                  }
                />
              </Col>
            </Row>
          </div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {props.buyGiftCards && props.buyGiftCards.length < 1 ? (
              <div style={{ width: "100%" }}>
                <EmptyEntryWithTitle title="GiftCard" action={false} />
              </div>
            ) : (
              props.buyGiftCards &&
              props.buyGiftCards.map((item, key) => {
                return (
                  <Col
                    key={key}
                    xs={24}
                    sm={24}
                    md={12}
                    lg={8}
                    xl={6}
                    className="gutter-row"
                    span={6}
                    style={{ marginBottom: 20 }}
                  >
                    <Card
                      hoverable
                      bordered={false}
                      onClick={
                        item?.outOfStock
                          ? () => {}
                          : () => {
                              props.getSingleCard({ card: item.slug });
                              history.push(`${pathname}?slug=${item.slug}`);
                              setActive(true);
                            }
                      }
                      style={{ width: "100%", border: "1px solid #00000026" }}
                      cover={
                        <img
                          alt={"card" + key}
                          style={
                            item.logoNoMargin
                              ? {
                                  width: "100%",
                                  height: 200,
                                  backgroundColor: item.logoBackground,
                                }
                              : {
                                  width: "100%",
                                  height: 200,
                                  padding: "30px",
                                  backgroundColor: item.logoBackground,
                                }
                          }
                          src={getImgUrl(item)}
                        />
                      }
                    >
                      <p
                        style={{
                          margin: 0,
                          textAlign: "center",
                          fontSize: "1.3em",
                        }}
                      >
                        <strong>
                          <p>{item.name}</p>
                          {item.outOfStock ? "Out Of Stock" : ""}
                        </strong>
                      </p>
                    </Card>
                  </Col>
                );
              })
            )}
          </Row>
        </div>
        {active && (
          <Drawer
            title={state?.title}
            width={"100vw"}
            placement="right"
            onClose={() => {
              setActive(false);
              history.push(`${pathname}`);
            }}
            visible={props.buyGiftCardDetails ? active : false}
            style={{ width: "100vw" }}
          >
            <div
              className={styles.sellPage}
              style={{
                alignItems: "center",
                flexDirection: "column",
                margin: "auto",
                maxWidth: 900,
              }}
            >
              {console.log(props.buyGiftCardDetails)}
              <Title level={3}>
                {props?.buyGiftCardDetails?.name}{" "}
                {props?.buyGiftCardDetails?.currency}
              </Title>
              <img
                alt={"card"}
                style={
                  props?.buyGiftCardDetails?.logoNoMargin
                    ? {
                        width: 300,
                        height: 200,
                        marginTop: 20,
                        marginBottom: 20,
                        boxShadow: "-3px 4px 20px #00000026",
                        backgroundColor:
                          props?.buyGiftCardDetails?.logoBackground,
                      }
                    : {
                        width: 300,
                        height: 200,
                        marginTop: 20,
                        marginBottom: 20,
                        padding: "30px",
                        boxShadow: "-3px 4px 20px #00000026",
                        backgroundColor:
                          props?.buyGiftCardDetails?.logoBackground,
                      }
                }
                src={getImgUrl(props?.buyGiftCardDetails)}
              />
              <div style={{ marginTop: 30, marginBottom: 30 }}>
                <Text>
                  <div dangerouslySetInnerHTML={createMarkup()} />
                </Text>
              </div>
              <div>
                <Select
                  labelClass={styles.largeMarginLabel}
                  label="Select Wallet"
                  value={card.referenceCurrency}
                  onSelect={(value) => {
                    setCard((card) => ({
                      ...card,
                      referenceCurrency: value,
                    }));
                  }}
                  name="wallet"
                  options={[
                    { render: "NGN", value: "NGN" },
                    { render: "GHS", value: "GHS" },
                  ]}
                />
                <Input
                  className={`${styles.input}`}
                  value={card.quantity || 0}
                  label="Quantity"
                  placeholder="minimum is 1"
                  labelClass={styles.largeMarginLabel}
                  onChange={(e) => {
                    setCard((card) => ({
                      ...card,
                      quantity: e.target.value,
                    }));
                  }}
                  type="number"
                />
                <Select
                  labelClass={styles.largeMarginLabel}
                  hintClass={styles.largeMarginHint}
                  label="Select amount"
                  value={`${card.cardValue}.${card.amount}`}
                  name="amount"
                  onSelect={(value) =>
                    setCard((card) => ({
                      ...card,
                      cardValue: value?.split(".")[0],
                      amount: value?.split(".")[1],
                    }))
                  }
                  options={props?.buyGiftCardDetails?.packages.map((item) => ({
                    render: `${props?.buyGiftCardDetails?.currency} ${
                      item.value
                    } - Price: ${Money(item.usdPrice, "USD")}`,
                    value: `${item.value}.${item.amount}`,
                  }))}
                  hint={<p dangerouslySetInnerHTML={extraInfo()} />}
                />
                <Button
                  className={`${styles.gitcard__form__body__input}`}
                  text="Buy"
                  form="full"
                  disabled={
                    !card.quantity ||
                    !card.amount ||
                    !card.cardValue ||
                    !card.referenceCurrency
                  }
                  onClick={() => handleSubmit()}
                />
              </div>
            </div>
          </Drawer>
        )}
      </div>
    </DashboardLayout>
  );
};

const mapStateToProps = (state) => ({
  buyCardCountries: state.buyGiftCard.buyCardCountries,
  buyGiftCards: state.buyGiftCard.buyGiftCards,
  buyGiftCardDetails: state.buyGiftCard.buyGiftCardDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getBuyCardsByCountries: () => {
    dispatch(getBuyCardsByCountries());
  },
  getBuyCardsBySearch: (data) => {
    dispatch(getBuyCardsBySearch(data));
  },
  getSingleCard: (data) => {
    dispatch(getBuyCardsCardDetail(data));
  },
  buyGiftCard: (data) => {
    dispatch(initialBuyGiftCard(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyGiftCard);
