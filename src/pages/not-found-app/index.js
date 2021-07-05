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
        
        />
        <h1>Astro will be back shortly</h1>
        <h2>We are under Maintenance</h2>
        <h3>Please bear with us</h3>
      </div>
    </DashboardLayout>
  );
}
