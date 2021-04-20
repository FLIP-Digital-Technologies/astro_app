import fetch from "./FetchInterceptor";

const generalService = {};

generalService.checkHealth = function () {
  return fetch({
    url: "/health",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

generalService.getFiatCurrency = function () {
  return fetch({
    url: "/misc/fiat-currencies",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

generalService.getCryptoCurrency = function () {
  return fetch({
    url: "/misc/crypto-currencies",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

generalService.convertCurrency = function (payload) {
  let data = {};
  data.from = payload.from;
  data.to = payload.to;
  data.amount = payload.amount
  return fetch({
    url: "/misc/convert-fx",
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

generalService.getUserDetails = function (params) {
  return fetch({
    url: "/user-account/" + params.userId,
    method: "get",
  });
};

generalService.updateUserDetails = function (params, data) {
  return fetch({
    url: "/user-account/" + params.userId,
    method: "put",
    data: data,
  });
};

generalService.getUserWallets = function (params) {
  return fetch({
    url: `/user-account/${params.userId}/fetch-wallets`,
    method: "get",
  });
};

generalService.setTransactionPin = function (params, payload) {
  // {
  //   "pin": "3310"
  // }
  let data = {};
  data.pin = payload.pin;
  return fetch({
    url: `/user-account/${params.userId}/transaction-pin`,
    method: "put",
    data: data,
  });
};

generalService.resetTransactionPin = function (params, payload) {
  // {
  //   "pin": "3310"
  // }
  let data = {};
  data.pin = payload.pin;
  return fetch({
    url: `/user-account/${params.userId}/reset-pin`,
    method: "post",
    data: data,
  });
};

generalService.completeTransactionPinReset = function (params, payload) {
  // {
  //   "resetCode": "868123",
  //   "newPin": "1990"
  // }
  let data = {};
  data.resetCode = payload.resetCode;
  data.newPin = payload.newPin;
  return fetch({
    url: `/user-account/${params.userId}/complete-pin-reset`,
    method: "put",
    data: data,
  });
};

generalService.addBankAccount = function (params, payload) {
  // {
  //   "accountNumber": "0217712602",
  //   "accountName": "BELLO MUBARAK AYOBAMI",
  //   "bankCode": "058",
  //   "bankName": "Guaranty Trust Bank",
  //   "currency": "NGN"
  // }
  let data = {};
  data.accountNumber = payload.accountNumber;
  data.accountName = payload.accountName;
  data.bankCode = payload.bankCode;
  data.bankName = payload.bankName;
  data.currencyId = payload.currency === "NGN" ? 1 : 2;
  data.isMobileMoney = payload.isMobileMoney;
  return fetch({
    url: `/user-account/${params.userId}/bank-accounts`,
    method: "post",
    data: data,
  });
};

generalService.uploadFile = function (params, payload) {
  const data = new FormData();
  data.append("file", payload.file);
  return fetch({
    url: `/misc/upload-file`,
    method: "post",
    data: data,
  });
};

generalService.getBankDetails = function (params) {
  return fetch({
    url: "/user-account/" + params.userId + "/bank-accounts",
    method: "get",
  });
};

generalService.removeBankDetails = function (params) {
  return fetch({
    url:
      "/user-account/" +
      params.userId +
      "/bank-accounts/" +
      params.bankAccountId,
    method: "delete",
  });
};

generalService.createFiatWallet = function (params, data) {
  return fetch({
    url: `/user-account/${params.userId}/create-fiat-wallet`,
    method: "post",
    data: data,
  });
};

generalService.createCryptoWallet = function (params, data) {
  return fetch({
    url: `/user-account/${params.userId}/create-crypto-wallet`,
    method: "post",
    data: data,
  });
};

export default generalService;
