import React from "react";
import { Link } from "react-router-dom";
import {
  MidRocket,
  MidChart,
  MidMoney,
  MidCards,
  Exchange,
  WorldSmall,
  RocketTiny,
  StarSmall,
  MidPhone,
} from "../../assets/svg";
import Button from "../../components/button";
import styles from "../styles.module.scss";

export const Middle = () => {
  return (
    <div className={styles.landing__steps}>
      <div className={styles.title}>Convenience at every step</div>
      <div className={styles.stepHolder}>
        <div className={styles.step}>
          <div className={styles.step__icon}>
            <MidRocket />
          </div>
          <div className={styles.step__title}>Speed redefined</div>
          <div className={styles.step__sub}>
            Our payment process has been simplified and made hassle free for
            your convenience.
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.step__icon}>
            <MidChart />
          </div>
          <div className={styles.step__title}>Reports that matter</div>
          <div className={styles.step__sub}>
            Get reports on your activity to help you keep track and stay
            updated.
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.step__icon}>
            <MidMoney />
          </div>
          <div className={styles.step__title}>Modern payout intergation</div>
          <div className={styles.step__sub}>
            All payments are processed with a modern and secure third party
            partner.
          </div>
        </div>
      </div>
    </div>
  );
};

export const Cards = () => {
  return (
    <div className={styles.landing__cards}>
      <MidCards />
      <div className={styles.content}>
        <div className={styles.content__top}>
          <Exchange /> <span className={styles.badge}>Exchange</span>
        </div>
        <div className={styles.title}>Lightning fast giftcard trading</div>
        <div className={styles.sub}>
          Sell giftcards at your convenience, anywhere in the world. All trades
          are processed withing minutes!
        </div>
        <div className={styles.extra}>
          <WorldSmall /> <span>Accepting giftcards from all countries</span>
        </div>
        <Link to="/signin">
          <Button className={styles.button} text="Get Started" form="full" />
        </Link>
      </div>
    </div>
  );
};

export const Hands = () => {
  return (
    <div className={`${styles.landing__cards} ${styles.rev}`}>
      <MidPhone className={styles.revSvg} />
      <div className={`${styles.content} ${styles.rev}`}>
        <div className={styles.content__top}>
          <StarSmall /> <span className={styles.badge}>Convenience</span>
        </div>
        <div className={styles.title}>
          The convenient way to Trade bitcoin, irrespective of your location
        </div>
        <div className={styles.sub}>
          with swifttrades you can buy and sell bitcoin, from anywhere in the
          world. Our wallet also serves as a means to store bitcoin and make
          payments.
        </div>
        <div className={styles.extra}>
          <RocketTiny /> <span>Trade within minutes!</span>
        </div>
        <Link to="/signin">
          <Button className={styles.button} text="Get Started" form="full" />
        </Link>
      </div>
    </div>
  );
};
