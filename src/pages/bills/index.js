import React, { useState } from "react";
import { DashboardLayout } from "../../components/layout";
import { BarChartOutlined } from "@ant-design/icons";
import Flyout from "./components";
import styles from "../styles.module.scss";

const Bills = () => {
  const INITIAL_STATE = {
    title: "",
    close: () => setFormState(INITIAL_STATE),
    show: false,
  };
  const BILLS = [
    {
      title: "Cable",
      Icon: BarChartOutlined,
    },
    {
      title: "Airtime",
      Icon: BarChartOutlined,
    },
    {
      title: "Internet",
      Icon: BarChartOutlined,
    },
    {
      title: "Electricity",
      Icon: BarChartOutlined,
    },
  ];
  const [formState, setFormState] = useState(INITIAL_STATE);
  return (
    <DashboardLayout>
      <span className={styles.gitcard__top__title}>Bills </span>
      <Flyout state={formState} setState={setFormState} />
      <div className={styles.bills}>
        <div className={styles.bills__content}>
          {BILLS &&
            BILLS.map((item, index) => (
              <div
                onClick={() => {
                  setFormState((state) => ({ ...state, ...item, show: true }));
                  setFormState((state) => ({ ...state, show: true }));
                }}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
                key={index.toString()}
              >
                <div>
                  <item.Icon />
                </div>
                <span>{item.title}</span>
              </div>
            ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Bills;
