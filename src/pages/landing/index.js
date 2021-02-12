import React from "react";
import { Link } from "react-router-dom";
// import { Hero, Rocket } from "../../assets/svg";
import { LandingLayout } from "../../components/layout";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import { Middle, Cards, Hands, Customer } from "./components";

const Landing = () => {
  return (
    <LandingLayout>
      <div className={styles.landing}>
        <div className={styles.landing__top}>
          {/* <Hero /> */}
          <div className={styles.landing__top__content}>
            <div className={styles.title}>
              Best place to trade your Gift Cards and Bitcoins easily!
            </div>
            <Link to="/signin">
              <Button className={styles.button} text="Trade Now!" form="full" />
            </Link>
          </div>
          <div className={styles.landing__top__image}>
            <img
              src="https://via.placeholder.com/500X700.png"
              alt="placeholder"
            />
          </div>
        </div>
        <Cards />
        <Hands />
        <Middle />
        <Customer />
      </div>
    </LandingLayout>
  );
};

export default Landing;
