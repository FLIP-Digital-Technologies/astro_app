import fetch from "./FetchInterceptor";

const paymentService = {};

paymentService.initialPayment = function (params, payload) {
  // {
  //   "amount": 65000,
  //   "currency": "NGN"
  // }
  let data = {};
  data.currency = payload.currency;
  data.amount = payload.amount;
  return fetch({
    url: `/api/payments/inwards/${params.userId}`,
    method: "post",
    data: data,
  });
};

paymentService.cancelPayment = function (params) {
  return fetch({
    url: `/api/payments/inwards/${params.userId}/${params.transactionId}/cancel`,
    method: "put",
  });
};

paymentService.getPaymentDetails = function (params) {
  return fetch({
    url: `/api/payments/inwards/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

paymentService.getAllPaymentByUser = function (params) {
  return fetch({
    url: `/api/payments/inwards/${params.userId}`,
    method: "get",
    params: {
      currency: params.currency,
      skip: params.skip,
      limit: params.limit,
    },
  });
};

export default paymentService;
