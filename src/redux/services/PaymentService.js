import fetch from "./FetchInterceptor";

const paymentService = {};

paymentService.initialPayment = function (params, payload) {
  // {
  //   "amount": 65000,
  //   "currency": "NGN"
  // }
  let data = {};
  data.currencyId = payload.currencyId;
  data.amount = payload.amount;
  return fetch({
    url: `/payments/inwards/${params.userId}`,
    method: "post",
    data: data,
  });
};

paymentService.cancelPayment = function (params) {
  return fetch({
    url: `/payments/inwards/${params.userId}/${params.transactionId}`,
    method: "delete",
  });
};

paymentService.getPaymentDetails = function (params) {
  return fetch({
    url: `/payments/inwards/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

paymentService.getAllPaymentByUser = function (params) {
  return fetch({
    url: `/payments/inwards/${params.userId}`,
    method: "get",
    params: {
      // currency: params.currency,
      // page: params.skip,
      page:1,
      per_page: params.limit,
    },
  });
};

export default paymentService;
