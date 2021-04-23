import fetch from "./FetchInterceptor";

const BTCTransactionServices = {};

BTCTransactionServices.getWalletDetails = function (params) {
  return fetch({
    url: `/user-account/${params.userId}/fetch-wallets`,
    method: "get",
  });
  // return Promise.resolve(
  //   {
  //     "code":200,
  //     "data": {
  //       "fiatWallets": [
  //         {
  //           "id": 1,
  //           "balance": 44353.34,
  //           "Currency": {
  //             "code": "NGN",
  //             "name": "Nigerian Naira",
  //             "id": 1
  //           },
  //           "current": 2730,
  //           "is_active": true
  //         }
  //       ],
  //       "cryptoWallets": [
  //         {
  //           "id": 1,
  //           "balance": 0.000545,
  //           "Currency": {
  //             "code": "BTC",
  //             "name": "Bitcoin",
  //             "id": 344
  //           },
  //           "current": 0.0004,
  //           "is_active": true
  //         }
  //       ]
  //     },
  //     "message": "Wallets"
  //   }
  // )
};

BTCTransactionServices.getCurrentMarketTicker = function (params) {
  return fetch({
    url: `/coins/tickers/${'btcngn'}`,
    method: "get",
    params: {
      volume: params?.volume || 1
    },
    headers: {
      "public-request": "true",
    },
  });
  // return Promise.resolve({
  //   "code": 200,
  //   "message": "Fetched current market tickers successfully",
  //   "data": {
  //     "at": "2021-01-31T02:55:42.000Z",
  //     "tickers": {
  //       "BTCUSD": {
  //         "buy": 32000,
  //         "sell": 31500
  //       },
  //       "BTCNGN": {
  //         "buy": 15360000,
  //         "sell": 14490000
  //       },
  //       "BTCGHS": {
  //         "buy": 192000,
  //         "sell": 182700
  //       }
  //     },
  //     "availability": {
  //       "buy": {
  //         "value": true,
  //         "minVolume": 0.0001,
  //         "maxVolume": 5
  //       },
  //       "sell": {
  //         "value": true,
  //         "minVolume": 0.001,
  //         "maxVolume": 5
  //       }
  //     }
  //   }
  // })
};

BTCTransactionServices.initialBuyBTC = function (params, payload) {
  // {
  //   "amount": 200,
  //   "debitFiatWalletId": 1,
  //   "creditCoinsWalletId": 1
  // }
  // {
  //   amount: state.btc,
  //   debitFiatWalletId: state.walletInfo.id,
  //   creditCoinsWalletId: state.creditCoinsWalletId,
  // }
  let data = {};
  data.amount = payload.amount;
  data.debitFiatWalletId = payload.debitFiatWalletId;
  data.creditCoinsWalletId = payload.creditCoinsWalletId;
  return fetch({
    url: `/coins/${params.userId}/buy`,
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
  data.cryptoWalletId = payload.cryptoWalletId;
  data.fiatWalletId = payload.fiatWalletId;
  return fetch({
    url: `/coins/${params.userId}/sell`,
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
  data.cryptoWalletId = payload.cryptoWalletId;
  return fetch({
    url: `/coins/${params.userId}/send`,
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

BTCTransactionServices.getTransactionBuyHistory = function (params) {
  return fetch({
    url: `/coins/${params.userId}/buy`,
    method: "get",
    params: {
      page: params.skip,
      per_page: params.limit,
    },
  });
};

BTCTransactionServices.getTransactionSellHistory = function (params) {
  return fetch({
    url: `/coins/${params.userId}/sell`,
    method: "get",
    params: {
      page: params.skip,
      per_page: params.limit,
    },
  });
};

BTCTransactionServices.getTransactionSendHistory = function (params) {
  return fetch({
    url: `/coins/${params.userId}/send`,
    method: "get",
    params: {
      page: params.skip,
      per_page: params.limit,
    },
  });
};

BTCTransactionServices.getTransactionP2PHistory = function (params) {
  return fetch({
    url: `/coins/${params.userId}/p2ptransfer`,
    method: "get",
    params: {
      page: params.skip,
      per_page: params.limit,
    },
  });
};

BTCTransactionServices.getTransactionBuyDetails = function (params) {
  return fetch({
    url: `/coins/${params.userId}/buy/${params.transactionId}`,
    method: "get",
  });
};
BTCTransactionServices.getTransactionSellDetails = function (params) {
  return fetch({
    url: `/coins/${params.userId}/sell/${params.transactionId}`,
    method: "get",
  });
};
BTCTransactionServices.getTransactionSendDetails = function (params) {
  return fetch({
    url: `/coins/${params.userId}/send/${params.transactionId}`,
    method: "get",
  });
};
BTCTransactionServices.getTransactionP2PDetails = function (params) {
  return fetch({
    url: `/coins/${params.userId}/p2ptransfer/${params.transactionId}`,
    method: "get",
  });
};

BTCTransactionServices.getBTCTransactionDetails = function (params) {
  return fetch({
    url: `/api/transactions/btc/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

export default BTCTransactionServices;
