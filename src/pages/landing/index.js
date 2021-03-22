import React from "react";
import { Link } from "react-router-dom";
// import { Hero, Rocket } from "../../assets/svg";
import { LandingLayout } from "../../components/layout";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import { Middle, Cards, Hands, Customer } from "./components";
import LandOne from "../../assets/svg/landing-one.svg";

const Landing = () => {
  return (
    <LandingLayout>
      <div className={styles.landing}>
        <div className={styles.landing__top}>
          {/* <Hero /> */}
          <div className={styles.landing__top__content}>
            <div className={styles.title}>
              Exchange digital assets with EASE and Confidence
            </div>
            <Link to="/signin">
              <Button className={styles.button} text="Trade Now!" form="full" />
            </Link>
          </div>
          <div className={styles.landing__top__image}>
            <img
              src={LandOne}
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
