import React, { useRef, useEffect } from "react";
import Loading from "../components/Loading";
import png from "../assets/png";
import * as SVG from "../assets/svg";
import styles from "../pages/styles.module.scss";
// import * as actionTypes from "../redux/constants";

import QRious from "qrious";
import Axios from "axios";
import { API_BASE_URL } from "../configs/AppConfig";


export default function capitalizeFirstLetter(s) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export const QRCode = ({ text, size }) => {
  const canvas = useRef(null);
  useEffect(() => {
    if (canvas != null && canvas.current != null) {
      // eslint-disable-next-line
      let qr = new QRious({
        element: canvas.current,
        value: text,
        size: size,
      });
    }
  });
  return <canvas ref={canvas}></canvas>;
};

export const processImageToCloudinary = async (file, error, progress) => {
  // `fieldName` and `meta` are not used for now${moment().format('DDMMMYYYY')}

  try {
    const url = `${API_BASE_URL}misc/upload-file`;
    const data = new FormData();
    data.append("file", file);
    // console.log('GCP Upload', url)
    let res = await Axios.post(`${url}`, data, {
      onUploadProgress: (progressEvent) => {
        progress(
          parseInt(
            Math.round((progressEvent.loaded * 100) / progressEvent.total)
          )
        );
      },
    })
    error("urls", res);
    return res.data.data.publicUrl;
  } catch (err) {
    error(err);
    return "error"
    
  }
};

export function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const promiseWrapper = (promise) => {
  return new Promise((resolve) => {
    promise
      .then((resp) => {
        resolve([null, resp]);
      })
      .catch((err) => {
        resolve([err, null]);
      });
  });
};

export function getSession(token) {
  if (!token) return false;
  const header = parseJwt(token);
  if (!header) return false;
  const now = Math.floor(Date.now() / 1000);
  if (header.exp <= now) return false;
  return header;
}

export const date = (time) => {
  const a = new Date(time).toLocaleString();
  return a;
};

export const time = (time) => {
  const a = new Date(time).toLocaleTimeString();
  return a;
};

export function WaitingComponent(Component) {
  return (props) => (
    <React.Suspense
      fallback={
        <div style={{ height: "90vh", position: "relative" }}>
          <Loading />
        </div>
      }
    >
      <Component {...props} />
    </React.Suspense>
  );
}

export function Money(data = 0, curr = "NGN") {
  if (data === "" || data === null || data === undefined) {
    let value = 0
    let money = typeof value === "number" ? value : parseFloat(value, 10);
    return money.toLocaleString("en-NG", {
      currency: curr,
      style: "currency",
    });
  } else {
    let value = data
    let money = typeof value === "number" ? value : parseFloat(value, 10);
    return money.toLocaleString("en-NG", {
      currency: curr,
      style: "currency",
    });
  }
 
}

export function sortData(temp1) {
  return (
    (temp1 &&
      Object.keys(temp1).map((key) => [
        key,
        Object.keys(temp1[key]).map((ke) => [
          ke,
          Object.keys(temp1[key][ke]).map((k) => [k, temp1[key][ke][k][0]]),
        ]),
      ])) ||
    []
  );
}

export const DigitalAsset = [
  {
    value: "BTC",
    name: "btc",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <SVG.BitcoinInput style={{ margin: 5 }} />
        <span>BTC</span>
      </div>
    ),
  },
  {
    value: "iTunes",
    name: "itunes",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.ItunesSmallCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>iTunes</span>
      </div>
    ),
  },
  {
    value: "Steam",
    name: "steam",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.SteamCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Steam</span>
      </div>
    ),
  },
  {
    value: "Google Play",
    name: "google-play",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.GooglePlayCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Google Play</span>
      </div>
    ),
  },
  {
    value: "Sephora",
    name: "sephora",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.SephoraSmallCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Sephora</span>
      </div>
    ),
  },
  {
    value: "Ebay",
    name: "ebay",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.EbayCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Ebay</span>
      </div>
    ),
  },
  {
    value: "Nike",
    name: "nike",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.NikeCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Nike</span>
      </div>
    ),
  },
  {
    value: "Amazon",
    name: "amazon",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.AmazonSmallCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Amazon</span>
      </div>
    ),
  },
  {
    value: "American Express Gold",
    name: "amex-gold",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.AmericanExpressCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>American Express Gold</span>
      </div>
    ),
  },
  {
    value: "Vanilla",
    name: "onevanilla",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.VanillaCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Vanilla</span>
      </div>
    ),
  },
  {
    value: "Nordstrom",
    name: "nordstrom",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.NordstromCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Nordstrom</span>
      </div>
    ),
  },
  {
    value: "Visa",
    name: "visa",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={png.VisaCard}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>Visa</span>
      </div>
    ),
  },
];

export const cardList = {
  itunes: { name: "iTunes", Image: SVG.CardItunes },
  steam: { name: "Steam", Image: SVG.CardSteam },
  "google-play": {
    name: "Google Play",
    Image: () => (
      <img src={png.GooglePlayCard} height="151.692" width="241" alt="card" />
    ),
  },
  sephora: {
    name: "Sephora",
    Image: () => (
      <img height="151.692" width="241" src={png.SephoraSmallCard} alt="card" />
    ),
  },
  ebay: {
    name: "Ebay",
    Image: () => (
      <img height="151.692" width="241" src={png.EbayCard} alt="card" />
    ),
  },
  nike: {
    name: "Nike",
    Image: () => (
      <img height="151.692" width="241" src={png.NikeCard} alt="card" />
    ),
  },
  amazon: {
    name: "Amazon",
    Image: () => (
      <img height="151.692" width="241" src={png.AmazonSmallCard} alt="card" />
    ),
  },
  "amex-gold": {
    name: "American Express Gold",
    Image: () => (
      <img
        height="151.692"
        width="241"
        src={png.AmericanExpressCard}
        alt="card"
      />
    ),
  },
  onevanilla: {
    name: "Vanilla",
    Image: () => (
      <img height="151.692" width="241" src={png.VanillaCard} alt="card" />
    ),
  },
  nordstrom: {
    name: "Nordstrom",
    Image: () => (
      <img height="151.692" width="241" src={png.NordstromCard} alt="card" />
    ),
  },
  visa: {
    name: "Visa",
    Image: () => (
      <img height="151.692" width="241" src={png.VisaCard} alt="card" />
    ),
  },
};

export const countryOptions = [
  {
    value: "USD",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.USD}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>USD</span>
      </div>
    ),
  },
  {
    value: "GBP",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.GBP}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>GBP</span>
      </div>
    ),
  },
  {
    value: "EUR",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.EUR}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>EUR</span>
      </div>
    ),
  },
  {
    value: "CAD",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.CAD}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>CAD</span>
      </div>
    ),
  },
  {
    value: "AUD",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.AUD}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>USD</span>
      </div>
    ),
  },
  {
    value: "JPY",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.JPY}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>JPY</span>
      </div>
    ),
  },
  {
    value: "FRA",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.FRA}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>FRA</span>
      </div>
    ),
  },
  {
    value: "GER",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.GER}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>GER</span>
      </div>
    ),
  },
  {
    value: "IRL",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.IRL}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>IRL</span>
      </div>
    ),
  },
  {
    value: "RUB",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.RUB}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>RUB</span>
      </div>
    ),
  },
  {
    value: "AUT",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.AUT}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>AUT</span>
      </div>
    ),
  },
  {
    value: "BEL",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.BEL}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>BEL</span>
      </div>
    ),
  },
  {
    value: "BRL",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.BR}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>BRL</span>
      </div>
    ),
  },
  {
    value: "DMK",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.DMK}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>DMK</span>
      </div>
    ),
  },
  {
    value: "ESP",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.ESP}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>ESP</span>
      </div>
    ),
  },
  {
    value: "FIN",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.FIN}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>FIN</span>
      </div>
    ),
  },
  {
    value: "GRC",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.GRC}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>GRC</span>
      </div>
    ),
  },
  {
    value: "ITL",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.ITL}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>ITL</span>
      </div>
    ),
  },
  {
    value: "MXN",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.MXN}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>MXN</span>
      </div>
    ),
  },
  {
    value: "NOK",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.NOK}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>NOK</span>
      </div>
    ),
  },
  {
    value: "PRT",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.PRT}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>PRT</span>
      </div>
    ),
  },
  {
    value: "SWE",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <img
          src={SVG.SWE}
          height="12"
          width="21"
          style={{ margin: 5 }}
          alt="currency"
        />
        <span>SWE</span>
      </div>
    ),
  },
];

export const cardOptions = [
  {
    value: "physical",
    name: "Physical Card",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <SVG.CardTypePhysical />
        <span style={{ marginLeft: 10 }}>Physical Card</span>
      </div>
    ),
  },
  {
    value: "small-card",
    name: "Small Card",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <SVG.CardTypePhysical />
        <span style={{ marginLeft: 10 }}>Small Card</span>
      </div>
    ),
  },
  {
    value: "big-card",
    name: "Large Card",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <SVG.CardTypePhysical />
        <span style={{ marginLeft: 10 }}>Large Card</span>
      </div>
    ),
  },
  {
    value: "e-code",
    name: "E-Code",
    render: (
      <div
        className={styles.countryOption}
        style={{ display: "flex", alignItems: "center" }}
      >
        <SVG.CardTypePhysical />
        <span style={{ marginLeft: 10 }}>E-Code</span>
      </div>
    ),
  },
];

export const country = [
  {
    value: "USD",
  },
  {
    value: "GBP",
  },
  {
    value: "EUR",
  },
  {
    value: "CAD",
  },
  {
    value: "AUD",
  },
  {
    value: "JPY",
  },
  {
    value: "FRA",
  },
  {
    value: "GER",
  },
  {
    value: "IRL",
  },
  {
    value: "RUB",
  },
  {
    value: "AUT",
  },
  {
    value: "BEL",
  },
  {
    value: "BRL",
  },
  {
    value: "DMK",
  },
  {
    value: "ESP",
  },
  {
    value: "FIN",
  },
  {
    value: "GRC",
  },
  {
    value: "ITL",
  },
  {
    value: "MXN",
  },
  {
    value: "NOK",
  },
  {
    value: "PRT",
  },
  {
    value: "SWE",
  },
];

export const joinArray = (newDate, oldData) => {
  return [...oldData, ...newDate];
};
