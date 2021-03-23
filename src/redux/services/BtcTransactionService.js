import fetch from "./FetchInterceptor";

const BTCTransactionServices = {};

BTCTransactionServices.getWalletDetails = function (params) {
  return fetch({
    url: `/api/wallets/${params.userId}`,
    method: "get",
  });
};

BTCTransactionServices.getCurrentMarketTicker = function (params) {
  // return fetch({
  //   url: "/api/transactions/btc/tickers",
  //   method: "get",
  //   params: {
  //     volume: params?.volume || 1
  //   },
  //   headers: {
  //     "public-request": "true",
  //   },
  // });
  return Promise.resolve({
    "code": 200,
    "message": "Fetched current market tickers successfully",
    "data": {
      "at": "2021-01-31T02:55:42.000Z",
      "tickers": {
        "BTCUSD": {
          "buy": 32000,
          "sell": 31500
        },
        "BTCNGN": {
          "buy": 15360000,
          "sell": 14490000
        },
        "BTCGHS": {
          "buy": 192000,
          "sell": 182700
        }
      },
      "availability": {
        "buy": {
          "value": true,
          "minVolume": 0.0001,
          "maxVolume": 5
        },
        "sell": {
          "value": true,
          "minVolume": 0.001,
          "maxVolume": 5
        }
      }
    }
  })
};

BTCTransactionServices.initialBuyBTC = function (params, payload) {
  // {
  //   "referenceCurrency": "NGN",
  //   "amount": 0.0025
  // }
  let data = {};
  data.amount = payload.amount;
  data.referenceCurrency = payload.referenceCurrency;
  return fetch({
    url: `/api/transactions/btc/${params.userId}/buy`,
    method: "post",
    data: data,
  });
};

BTCTransactionServices.initialSellBTC = function (params, payload) {
  // {
  //   "referenceCurrency": "NGN",
  //   "amount": 0.0025
  // }
  let data = {};
  data.amount = payload.amount;
  data.referenceCurrency = payload.referenceCurrency;
  return fetch({
    url: `/api/transactions/btc/${params.userId}/sell`,
    method: "post",
    data: data,
  });
};

BTCTransactionServices.initialSendBTCToExternalWallet = function (
  params,
  payload
) {
  // {
  //   "address": "mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB",
  //   "amount": 0.0001
  // }
  let data = {};
  data.address = payload.address;
  data.amount = payload.amount;
  return fetch({
    url: `/api/transactions/btc/${params.userId}/send`,
    method: "post",
    data: data,
  });
};

BTCTransactionServices.receiveBTC = function (params) {
  return fetch({
    url: `/api/transactions/btc/${params.userId}/receive`,
    method: "get",
  });
};

BTCTransactionServices.getTransactionHistory = function (params) {
  return fetch({
    url: `/api/transactions/btc/${params.userId}/history`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

BTCTransactionServices.getBTCTransactionDetails = function (params) {
  return fetch({
    url: `/api/transactions/btc/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

export default BTCTransactionServices;
