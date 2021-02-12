import React, { useState } from "react";
import { LandingLayout } from "../../components/layout";
import Select from "../../components/select";
import Button from "../../components/button";

import styles from "../styles.module.scss";

const AboutRates = () => {
  const typeOptions = [
    {
      value: "Bitcoin",
      render: "Bitcoin",
    },
    {
      value: "Amazon Giftcard",
      render: "Amazon Giftcard",
    },
    {
      value: "Itunes Giftcard",
      render: "Itunes Giftcard",
    },
  ];

  const [buy, setBuy] = useState(false);
  const [type, setType] = useState("Bitcoin");

  const onTypeChange = (value) => {
    setType(value);
  };
  return (
    <LandingLayout>
      <div className={styles.landing}>
        <div className={styles.rates}>
          <div className={styles.rates__left}>
            <div className={styles.title}>Our rate</div>
            <div className={styles.sub}>Absolutely the best</div>
          </div>

          <div className={styles.rates__right}>
            <div className={styles.title}>Rates Calculator</div>
            <div className={styles.sub}>
              Get the current value of your transaction
            </div>
            <div className={styles.buttonHolder}>
              <Button
                className={`${styles.buttonLeft} ${buy && styles.rev}`}
                text="SELL"
                form="full"
                onClick={() => setBuy(false)}
              />
              <Button
                className={`${styles.buttonRight} ${!buy && styles.rev}`}
                text="BUY"
                form="full"
                onClick={() => setBuy(true)}
              />
            </div>
            <Select
              options={typeOptions}
              value={type}
              onSelect={onTypeChange}
              label="How much are you willing to sell?"
              labelClass={styles.label}
            />
            <div className={styles.range}>
              <span>Regular Range</span>
              <span>$1+</span>
            </div>
            <div className={styles.rate}>
              <span>Rate</span>
              <span>NGN 484.59/$</span>
            </div>
            <Button className={styles.button} text="Check Rates" form="full" />
          </div>
        </div>
        {/* <div className={`${styles.landing__steps} ${styles.rev} ${styles.two}`}>
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
       */}
      </div>
    </LandingLayout>
  );
};

export default AboutRates;
