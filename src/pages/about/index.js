import React from "react";
import { MidRocket, MidChart, MidMoney, WorldBig } from "../../assets/svg";
import { LandingLayout } from "../../components/layout";

import styles from "../styles.module.scss";

const About = () => {
  return (
    <LandingLayout>
      <div className={styles.landing}>
        <div className={styles.landing__about}>
          <div className={styles.content}>
            <div className={styles.title}>We are building a revolution</div>
            <div className={styles.sub}>
              We believe you deserve convenience and ease in payments.
            </div>
          </div>
        </div>

        <div className={`${styles.landing__steps} ${styles.rev}`}>
          <div className={styles.title}>How we are different</div>
          <div className={styles.stepHolder}>
            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidRocket />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Speed redefined
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                Our payment process has been simplified and made hassle free for
                your convenience.
              </div>
            </div>
            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidChart />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Reports that matter
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                Get reports on your activity to help you keep track and stay
                updated.
              </div>
            </div>

            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidMoney />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Modern payout intergation
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                All payments are processed with a modern and secure third party
                partner.
              </div>
            </div>
          </div>
        </div>

        <div className={styles.location}>
          <div className={styles.content}>
            <div className={styles.title}>LOCATION</div>
            <WorldBig />
            <div className={styles.sub}>Nigeria</div>
          </div>
        </div>
      </div>
    </LandingLayout>
  );
};

export default About;
