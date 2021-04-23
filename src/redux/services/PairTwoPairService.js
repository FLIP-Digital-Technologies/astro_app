import fetch from "./FetchInterceptor";

const PairTwoPairService = {};

PairTwoPairService.initialBTCP2P = function (params) {
  // {
  //   "amount": 200,
  //   "email": "address@example.com",
  //   "cryptoCurrencyId": 1,
  //   "transferNote": "Happy birthday"
  // }
  let data = {};
  data.amount = params.amount;
  data.cryptoCurrencyId  = params.cryptoCurrencyId;
  data.email  = params.recipientEmail;
  data.transferNote  = params.transferNote;

  return fetch({
    url: `/coins/${params.userId}/p2ptransfer`,
    method: "post",
    data: data,
  });
};


PairTwoPairService.getCurrentFiatTransferRate = function () {
  return fetch({
    url: `/fiats/tickers`,
    method: "get",
  });
};

PairTwoPairService.initialFiatP2P = function (params) {
  // {
  //   "amount": 200,
  //   "email": "address@example.com",
  //   "debitCurrencyId": 1,
  //   "recipientCurrencyId": 1,
  //   "transferNote": "Happy birthday"
  // }

  let data = {};
  data.amount = params.amount;
  data.email  = params.email;
  data.debitWalletId  = params.debitWalletId;
  data.recipientCurrencyId  = params.recipientCurrencyId;
  data.transferNote  = params.transferNote;

  return fetch({
    url: `/fiats/${params.userId}/transfer`,
    method: "post",
    data: data,
  });
};

PairTwoPairService.getTransactionDetails = function (params) {
  return fetch({
    url: `/fiats/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

PairTwoPairService.getTransactionHistory = function (params) {
  return fetch({
    url: `/fiats/${params.userId}/transfer`,
    method: "get",
    params: {
      page: params.skip,
      per_page: params.limit,
    },
  });
};

export default PairTwoPairService;