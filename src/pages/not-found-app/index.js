import React from "react";
import { DashboardLayout } from "../../components/layout";
import styles from "../styles.module.scss";

export default function NotFound() {
  return (
    <DashboardLayout>
      <div className={styles.notfoundapp}>
        <h1>Oops, What are you looking for here ?</h1>
        <h1> Not Found</h1>
        <h2> 404</h2>
      </div>
    </DashboardLayout>
  );
}
