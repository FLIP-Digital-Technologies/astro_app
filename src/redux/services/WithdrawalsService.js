import fetch from "./FetchInterceptor";

const withdrawalsService = {};

withdrawalsService.initialWithdrawalRequest = function (params, data) {
  // {
  //   "amount": 65000,
  //   "bankAccountId": "851d92fa-cf9d-46dc-355d-c4f5bfd60ab8",
  //   "currency": "NGN"
  // }
  // console.log('withdraw', data)
  let payload = {};
  // if (data.bankAccount) {
  //   payload.amount = Number(data.amount);
  //   payload.save = data.save;
  //   payload.bankAccount = data.bankAccount;
  // } else {
    payload.amount = Number(data.amount);
    payload.bankAccountId = data.bankAccountId;
    payload.fiatWalletId = data.fiatWalletId;
    payload.transactionPin = data.pin
  // }

  return fetch({
    url: `/payments/outwards/${params.userId}`,
    method: "put",
    data: payload,
  });
};
withdrawalsService.initialWithdrawal3rdRequest = function (params, data) {
  // {
  //   "amount": 65000,
  //   "bankAccountId": "851d92fa-cf9d-46dc-355d-c4f5bfd60ab8",
  //   "currency": "NGN"
  // }
  let payload = {};
  // if (data.bankAccount) {
  //   payload.amount = Number(data.amount);
  //   payload.save = data.save;
  //   payload.bankAccount = data.bankAccount;
  // } else {
    payload.amount = Number(data.amount);
    payload.bankAccountId = data.bankAccountId;
    payload.fiatWalletId = data.currencyId;
    payload.transactionPin = data.pin
  // }

  return fetch({
    url: `/payments/outwards/${params.userId}`,
    method: "post",
    data: payload,
  });
};

withdrawalsService.cancelWithdrawalRequest = function (params, data) {
  return fetch({
    url: `/payments/outwards/${params.userId}/${params.transactionId}`,
    method: "delete",
  });
};

withdrawalsService.getWithdrawalRequestDetails = function (params) {
  return fetch({
    url: `/payments/outwards/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

withdrawalsService.getWithdrawalRequestByUser = function (params) {
  return fetch({
    url: `/payments/outwards/${params.userId}`,
    method: "get",
    params: {
      page: params.skip || 0,
      per_page: params.limit || 10,
    },
  });
};

withdrawalsService.getWithdrawalSettings = function (params) {
  return fetch({
    url: `/misc/settings/withdrawal/`,
    method: "get",
  });
};

export default withdrawalsService;
