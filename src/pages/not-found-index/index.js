import React from "react";
import png from "../../assets/png";
import { AnotherHeader } from "../../components/header";
import styles from "../styles.module.scss";

export default function NotFound() {
  return (
    <AnotherHeader>
      <div className={styles.notfoundindex}>
      <img
        src={png.UnderMaintenance}
        alt=''
        />
        <h1>Astro will be back shortly</h1>
        <h2>We are under Maintenance</h2>
        <h3>Please bear with us</h3>
      </div>
    </AnotherHeader>
  );
}
