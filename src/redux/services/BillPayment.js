import fetch from "./FetchInterceptor";

const billPayment = {};

billPayment.initialBillPayment = function (params, payload) {
  // {
  //   "referenceCurrency": "NGN",
  //   "customerNumber": "+2348139172105",
  //   "amount": 10
  //   "itemCode": "MD489"
  // }
  let data = {};
  data.customerNumber = payload.customerNumber;
  data.amount = payload.amount;
  data.referenceCurrency = payload.referenceCurrency;
  data.itemCode = payload.itemCode;
  return fetch({
    url: `/api/transactions/bills/${params.userId}/${params.billCategory}`,
    method: "post",
    data: data,
  });
};

billPayment.getBillPaymentCategory = function (params) {
  return fetch({
    url: `/api/transactions/bills/${params.billCategory}`,
    method: "get",
  });
};

billPayment.getBillPaymentTransactionDetail = function (params) {
  return fetch({
    url: `/api/transactions/bills/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

billPayment.getAllBillPaymentTransactionByUser = function (params) {
  return fetch({
    url: `/api/transactions/bills/${params.userId}/history`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

export default billPayment;
