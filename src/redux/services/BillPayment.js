import fetch from "./FetchInterceptor";

const billPayment = {};

billPayment.initialBillPayment = function (params, payload) {
  // {
  //   "referenceCurrency": "NGN",
  //   "customerNumber": "+2348139172105",
  //   "amount": 10
  //   "itemCode": "MD489"
  // }
  // {
  //   "currencyId": 2,
  //   "itemCode": "it372",
  //   "customerNumber": "2348039393423",
  //   "amount": 43000
  // }
  let data = {};
  data.customerNumber = payload.customerNumber;
  data.amount = payload.amount;
  data.fiatWalletId = payload.currencyId;
  data.itemCode = payload.itemCode;
  return fetch({
    url: `/bills/${params.userId}/${params.billCategory}`,
    method: "post",
    data: data,
  });
};

billPayment.getBillPaymentCategory = function (params) {
  return fetch({
    url: `/bills/${params.billCategory}`,
    method: "get",
  });
};

billPayment.getBillPaymentTransactionDetail = function (params) {
  return fetch({
    url: `/bills/${params.userId}/transactions/${params.transactionId}`,
    method: "get",
  });
};

billPayment.getAllBillPaymentTransactionByUser = function (params) {
  return fetch({
    url: `/bills/${params.userId}/transactions`,
    method: "get",
    params: {
      page: params.skip || 0,
      per_page: params.limit,
    },
  });
};

export default billPayment;
