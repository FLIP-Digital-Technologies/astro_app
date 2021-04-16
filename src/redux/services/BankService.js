import fetch from "./FetchInterceptor";

const bankService = {};

bankService.getCountryBankList = function (params) {
  return fetch({
    url: `/misc/get-banks/${params.country}`,
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

bankService.getCountryBranchList = function (params) {
  return fetch({
    url: `/misc/get-bank-branches/${params.id}`,
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

bankService.validateBankAccountDetails = function (payload) {
  // {
  //   "accountNumber": "0217712602",
  //   "bankCode": "058"
  // }
  let data = {};
  data.accountNumber = payload.accountNumber;
  data.bankCode = payload.bankCode;
  return fetch({
    url: "/misc/verify-bank-details",
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

bankService.createFiatWallet = function (payload) {
  let data = {};
  data.currencyId = payload.currencyId;
  return fetch({
    url: `/user-account/${payload.userId}/create-fiat-wallet`,
    method: "post",
    data: data,
  });
};

export default bankService;
