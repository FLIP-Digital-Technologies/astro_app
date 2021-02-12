import fetch from "./FetchInterceptor";

const BTCTransactionServices = {};

BTCTransactionServices.getWalletDetails = function (params) {
  return fetch({
    url: `/api/wallets/${params.userId}`,
    method: "get",
  });
};

BTCTransactionServices.getCurrentMarketTicker = function () {
  return fetch({
    url: "/api/transactions/btc/tickers",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
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
