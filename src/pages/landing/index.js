import React from "react";
import { Link } from "react-router-dom";
import { Hero, Rocket } from "../../assets/svg";
import { LandingLayout } from "../../components/layout";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import { Middle, Cards, Hands } from "./components";

const Landing = () => {
  return (
    <LandingLayout>
      <div className={styles.landing}>
        <div className={styles.landing__top}>
          <Hero />
          <div className={styles.landing__top__content}>
            <div className={styles.title}>
              <div>Trade all giftcards</div>
              and bitcoin in Minutes!
            </div>
            <div className={styles.sub}>
              <span>The fastest and easiest way to trade</span> <Rocket />
            </div>
            <Link to="/signin">
              <Button
                className={styles.button}
                text="Get Started"
                form="full"
              />
            </Link>
          </div>
        </div>
        <Middle />
        <Cards />
        <Hands />
      </div>
    </LandingLayout>
  );
};

export default Landing;
