import React from "react";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./style.css";
// import {
//   MidRocket,
//   MidChart,
//   MidMoney,
//   MidCards,
//   Exchange,
//   WorldSmall,
//   RocketTiny,
//   StarSmall,
//   MidPhone,
// } from "../../assets/svg";
import Button from "../../components/button";
import styles from "../styles.module.scss";
import Ease from "../../assets/svg/flip.svg"
import HappyFace from "../../assets/svg/happy.svg"

export const Middle = () => {
  return (
    <div className={styles.landing__steps}>
      <div className={styles.title}>Why Flip?</div>
      <div className={styles.stepHolder}>
        <div className={styles.step}>
          <div className={styles.step__icon}>
            <i class="fas fa-fighter-jet"></i>{" "}
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
            <i class="far fa-handshake"></i>{" "}
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
            <i class="fas fa-user-shield"></i>{" "}
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
      <img
        className={styles.landing__cards__image}
        src={Ease}
        alt="placeholder"
      />
      <div className={styles.content}>
        {/* <div className={styles.content__top}>
          <Exchange /> <span className={styles.badge}>Exchange</span>
        </div> */}
        <div className={styles.title}>
          Trade your Gift Cards without stress!
        </div>
        <div className={styles.sub}>
          FlipAfrika (FLIP) is an ecommerce brand registered in Nigeria(FLIP digital services) Ghana (FLIP digital technologies).
          Primarily focused on providing payment solutions and trust worthy exchange services to young africans locally and in the diaspora.
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
        className={styles.landing__cards__image}
        src={HappyFace}
        alt="placeholder"
      />
      <div className={`${styles.content} ${styles.rev}`}>
        <div className={styles.title}>Get the best value for your Bitcoins</div>
        <div className={styles.sub} style={{marginBottom: 13}}>
          <i class="fas fa-circle" style={{color: "#00519e"}}></i>{" "}
          Trade Gift cards (Buy and sell)
        </div>
        <div className={styles.sub} style={{marginBottom: 13}}>
          <i class="fas fa-circle" style={{color: "#00519e"}}></i>{" "}
          Trade Bitcoins (Buy and Sell)
        </div>
        <div className={styles.sub} style={{marginBottom: 13}}>
          <i class="fas fa-circle" style={{color: "#00519e"}}></i>{" "}
          Free and secure crypto wallets
        </div>
        <div className={styles.sub} style={{marginBottom: 13}}>
          <i class="fas fa-circle" style={{color: "#00519e"}}></i>{" "}
          Free Naira and Cedis wallets
        </div>
        <div className={styles.sub} style={{marginBottom: 13}}>
          <i class="fas fa-circle" style={{color: "#00519e"}}></i>{" "}
          Send money ( peer to peer )
        </div>
        <div className={styles.sub} style={{marginBottom: 13}}>
          <i class="fas fa-circle" style={{color: "#00519e"}}></i>{" "}
          Pay bills
        </div>
        <br />
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
          <img src="https://joeschmoe.io/api/v1/AnthonyLamptey" alt="" />
          <div className="myCarousel">
            <h3>Anthony Lamptey</h3>
            <h4>Accra Ghana</h4>
            <p>
              Even a child in kindergarten can successfully initiate and complete any trade on FLIP platform. Thats how easy it is to use FLIP.
            </p>
          </div>
        </div>

        <div>
          <img src="https://joeschmoe.io/api/v1/Lordstrings" alt="" />
          <div className="myCarousel">
            <h3>Lordstrings</h3>
            <h4>Ibadan Nigeria</h4>
            <p>
              I dont get stranded with FLIP app, i just come online and get my stuff done, trade and pay bills, easy as it sounds
            </p>
          </div>
        </div>

        <div>
          <img src="https://joeschmoe.io/api/v1/Kwakuwiereko" alt="" />
          <div className="myCarousel">
            <h3>Kwaku wiereko</h3>
            <h4>Kumasi Ghana</h4>
            <p>
            First of its Nigerians trade and get paid without stress, likewise Ghanians, its a great time to be alive.
            </p>
          </div>
        </div>
        <div>
          <img src="https://joeschmoe.io/api/v1/OgunyemiMoses" alt="" />
          <div className="myCarousel">
            <h3>Ogunyemi Moses</h3>
            <h4>Abuja Nigeria</h4>
            <p>
            I Can trade confidently with my eyes closed on FLIP. i trust Flip that  Much
            </p>
          </div>
        </div>
      </Carousel>
    </div>
  );
};
