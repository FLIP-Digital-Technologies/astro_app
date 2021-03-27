import fetch from "./FetchInterceptor";

const generalService = {};

generalService.checkHealth = function () {
  return fetch({
    url: "/api/health",
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

generalService.getUserDetails = function (params) {
  return fetch({
    url: "/api/user-account/" + params.userId,
    method: "get",
  });
};

generalService.updateUserDetails = function (params, data) {
  return fetch({
    url: "/api/user-account/" + params.userId,
    method: "put",
    data: data,
  });
};

generalService.setTransactionPin = function (params, payload) {
  // {
  //   "pin": "3310"
  // }
  let data = {};
  data.pin = payload.pin;
  return fetch({
    url: `/api/user-account/${params.userId}/transaction-pin`,
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
    url: `/api/user-account/${params.userId}/transaction-pin`,
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
    url: `/api/user-account/${params.userId}/complete-pin-reset`,
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
  data.currency = payload.currency;
  data.isMobileMoney = payload.isMobileMoney;
  return fetch({
    url: `/api/user-account/${params.userId}/bank-accounts`,
    method: "post",
    data: data,
  });
};

generalService.getBankDetails = function (params) {
  return fetch({
    url: "/api/user-account/" + params.userId + "/bank-accounts",
    method: "get",
  });
};

generalService.removeBankDetails = function (params) {
  return fetch({
    url:
      "/api/user-account/" +
      params.userId +
      "/bank-accounts/" +
      params.bankAccountId,
    method: "delete",
  });
};

export default generalService;
