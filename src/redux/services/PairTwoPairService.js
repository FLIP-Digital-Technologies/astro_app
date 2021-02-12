import fetch from "./FetchInterceptor";

const PairTwoPairService = {};

PairTwoPairService.initialBTCP2P = function (params) {
  // {
  //   "amount": 0.0001,
  //   "recipientEmail": " or recipientUsername ",
  //   "recipientUsername": " or recipientEmail ",
  //   "transferNote": "OPTIONAL"
  // }
  let data = {};
  data.amount = params.amount;
  data.recipientUsername  = params.recipientUsername;
  data.recipientEmail  = params.recipientEmail;
  data.transferNote  = params.transferNote;

  return fetch({
    url: `/api/transactions/btc/${params.userId}/p2ptransfer`,
    method: "post",
    data: data,
  });
};

PairTwoPairService.getCurrentFiatTransferRate = function () {
  return fetch({
    url: `/api/transactions/fiats/tickers`,
    method: "get",
  });
};

PairTwoPairService.initialFiatP2P = function (params) {
  // {
  //   "amount": 10000,
  //   "recipientEmail": " or recipientUsername ",
  //   "recipientUsername": " or recipientEmail ",
  //   "referenceCurrency": "COMPULSORY: NGN or GHS",
  //   "recipientCurrency": "COMPULSORY: NGN or GHS",
  //   "transferNote": "OPTIONAL"
  // }
  let data = {};
  data.amount = params.amount;
  data.recipientUsername  = params.recipientUsername;
  data.recipientEmail  = params.recipientEmail;
  data.referenceCurrency  = params.referenceCurrency;
  data.recipientCurrency  = params.recipientCurrency;
  data.transferNote  = params.transferNote;

  return fetch({
    url: `/api/transactions/fiats/${params.userId}/transfer`,
    method: "post",
    data: data,
  });
};

PairTwoPairService.getTransactionDetails = function (params) {
  return fetch({
    url: `/api/transactions/fiats/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

PairTwoPairService.getTransactionHistory = function (params) {
  return fetch({
    url: `/api/transactions/fiats/${params.userId}/history`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

export default PairTwoPairService;