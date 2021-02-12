import fetch from "./FetchInterceptor";

const giftCardService = {};

giftCardService.getGiftCardCodes = function (params) {
  return fetch({
    url: `/api/transactions/cards/${params.cardCode || "all"}`,
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};

giftCardService.initialSellGiftCard = function (params, payload) {
  // {
  //   "referenceCurrency": "NGN",
  //   "amount": 100,
  //   "cardCode": "itunes.usd.physical",
  //   "quantity": [
  //     "https://placeimg.com/640/480/animals/grayscale"
  //   ]
  // }
  let data = {};
  data.amount = payload.amount;
  data.cardCode = payload.cardCode;
  data.imageURLs = payload.imageURLs;
  data.quantity = payload.quantity;
  data.referenceCurrency = payload.referenceCurrency;
  return fetch({
    url: `/api/transactions/cards/${params.userId}/sell`,
    method: "post",
    data: data,
  });
};

giftCardService.cancelSellGiftCardTransaction = function (params) {
  return fetch({
    url: `/api/transactions/cards/${params.userId}/${params.transactionId}/cancel`,
    method: "put",
  });
};

giftCardService.getTransactionDetails = function (params) {
  return fetch({
    url: `/api/transactions/cards/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

giftCardService.getTransactionHistory = function (params) {
  return fetch({
    url: `/api/transactions/cards/${params.userId}/history`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

export default giftCardService;
