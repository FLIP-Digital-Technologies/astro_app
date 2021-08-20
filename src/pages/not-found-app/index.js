import React from "react";
import png from "../../assets/png";
import { DashboardLayout } from "../../components/layout";
import styles from "../styles.module.scss";

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className={styles.notfoundapp}>
        <img
        src={png.UnderMaintenance}
        alt=''
        />
        <h1>Error 404</h1>
        <h2>Not found</h2>
        {/* <h3></h3> */}
      </div>
    </DashboardLayout>
  );
}
