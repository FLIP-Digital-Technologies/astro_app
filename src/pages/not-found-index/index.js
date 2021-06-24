import React from "react";
import { AuthHeader } from "../../components/header";
import styles from "../styles.module.scss";

export default function NotFound() {
  return (
    <AuthHeader>
      <div className={styles.notfoundindex}>
        <h1>404</h1>
        <h2>Oops, Page Not Found</h2>
      </div>
    </AuthHeader>
  );
}
