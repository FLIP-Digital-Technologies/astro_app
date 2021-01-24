import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./style.css";
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
      <div className={styles.title}>Why Flip?</div>
      <div className={styles.stepHolder}>
        <div className={styles.step}>
          <div className={styles.step__icon}>
            <img src="https://via.placeholder.com/50.png" alt="placeholder" />{" "}
          </div>
          <div className={styles.step__text}>
            <div className={styles.step__title}>Fast</div>
            <div className={styles.step__sub}>
              We make the fastest transactions and pay in minutes!
            </div>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.step__icon}>
            <img src="https://via.placeholder.com/50.png" alt="placeholder" />{" "}
          </div>
          <div className={styles.step__text}>
            <div className={styles.step__title}>Trusted</div>
            <div className={styles.step__sub}>
              We make the fastest transactions and pay in minutes!
            </div>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.step__icon}>
            <img src="https://via.placeholder.com/50.png" alt="placeholder" />{" "}
          </div>
          <div className={styles.step__text}>
            <div className={styles.step__title}>Secure</div>
            <div className={styles.step__sub}>
              We make the fastest transactions and pay in minutes!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Cards = () => {
  return (
    <div className={styles.landing__cards}>
      <img src="https://via.placeholder.com/500X700.png" alt="placeholder" />
      <div className={styles.content}>
        {/* <div className={styles.content__top}>
          <Exchange /> <span className={styles.badge}>Exchange</span>
        </div> */}
        <div className={styles.title}>
          Trade your Gift Cards without stress!
        </div>
        <div className={styles.sub}>
          You can trade with us and get paid instantly!
        </div>

        <Link to="/signin">
          <Button className={styles.button} text="Trade Now!" form="full" />
        </Link>
      </div>
    </div>
  );
};

export const Hands = () => {
  return (
    <div className={`${styles.landing__cards} ${styles.rev}`}>
      <img
        // className={styles.revSvg}
        src="https://via.placeholder.com/500X700.png"
        alt="placeholder"
      />
      <div className={`${styles.content} ${styles.rev}`}>
        <div className={styles.title}>Get the best value for your Bitcoins</div>
        <div className={styles.sub}>
          You can trade with us and get paid instantly!
        </div>
        <Link to="/signin">
          <Button className={styles.button} text="Trade Now!" form="full" />
        </Link>
      </div>
    </div>
  );
};

export const Customer = () => {
  return (
    <div className={styles.landing__customer}>
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        autoPlay={true}
        interval={6100}
      >
        <div>
          <img src="https://via.placeholder.com/60.png" alt="" />
          <div className="myCarousel">
            <h3>Shirley Fultz</h3>
            <h4>Designer</h4>
            <p>
              It's freeing to be able to catch up on customized news and not be
              distracted by a social media element on the same site
            </p>
          </div>
        </div>

        <div>
          <img src="https://via.placeholder.com/60.png" alt="" />
          <div className="myCarousel">
            <h3>Daniel Keystone</h3>
            <h4>Designer</h4>
            <p>
              The simple and intuitive design makes it easy for me use. I highly
              recommend Fetch to my peers.
            </p>
          </div>
        </div>

        <div>
          <img src="https://via.placeholder.com/60.png" alt="" />
          <div className="myCarousel">
            <h3>Theo Sorel</h3>
            <h4>Designer</h4>
            <p>
              I enjoy catching up with Fetch on my laptop, or on my phone when
              I'm on the go!
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
