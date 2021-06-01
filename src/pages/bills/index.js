import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout";
import { BarChartOutlined, DoubleRightOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Flyout from "./components";
import styles from "../styles.module.scss";
import homeStyles from "../home/styles.module.scss";
import { Row, Col } from "antd";
import png from "../../assets/png";
import history from "../../redux/history";
// import { ArrowLeftOutlined } from "@ant-design/icons"

const Bills = () => {
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
  const INITIAL_STATE = {
    title: "",
    close: () => setFormState(INITIAL_STATE),
    show: false,
  };
  const BILLS = [
    {
      title: "Cable",
      Icon: BarChartOutlined,
      details: "Pay for your Cable Subscriptions",
      img: png.CableTv,
    },
    {
      title: "Airtime",
      Icon: BarChartOutlined,
      details: "Buy your preferred Airtime",
      img: png.Phone,
    },
    {
      title: "Internet",
      Icon: BarChartOutlined,
      details: "Pay for your Internet Subscriptions",
      img: png.Internet,
    },
    {
      title: "Electricity",
      Icon: BarChartOutlined,
      details: "Pay your Electricity bill",
      img: png.Electricity,
    },
  ];
  const [formState, setFormState] = useState(INITIAL_STATE);
  return (
    <DashboardLayout>
      <span className={styles.gitcard__top__title}>
        {windowDimensions.width < 600 && (
          <ArrowLeftOutlined
            onClick={() => history.goBack()}
            style={{ marginRight: 10, cursor: "pointer" }}
          />
        )}
        Bills{" "}
      </span>
      <Flyout state={formState} setState={setFormState} />
      <div className={styles.bills}>
        {/* <div className={styles.bills__content}> */}
        <Row gutter={[8, 25]}>
          {BILLS &&
            BILLS.map((item, index) => (
              <Col span={6} xs={12} sm={12} md={12} lg={8} xl={6} xxl={6}>
                <div
                  className={homeStyles.widgets__inner}
                  onClick={() => {
                    setFormState((state) => ({
                      ...state,
                      ...item,
                      show: true,
                    }));
                    setFormState((state) => ({ ...state, show: true }));
                  }}
                  key={index.toString()}
                >
                  <div className={homeStyles.widgets__image}>
                    <img
                      src={item.img}
                      className={homeStyles.widgets__images}
                      style={{ marginRight: 5 }}
                      alt="wallet"
                    />
                  </div>
                  <div className={homeStyles.widgets__info}>{item.title}</div>
                  <div className={homeStyles.widgets__description}>
                    {item.details}
                  </div>
                  <div className={homeStyles.widgets__arrow}>
                    <DoubleRightOutlined
                      className={homeStyles.widgets__arrow__inner}
                    />
                  </div>
                </div>
              </Col>
            ))}
        </Row>
        {/* </div> */}
      </div>
    </DashboardLayout>
  );
};

export default Bills;
