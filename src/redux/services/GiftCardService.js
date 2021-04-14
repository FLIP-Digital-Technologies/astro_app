import fetch from "./FetchInterceptor";

const giftCardService = {};

giftCardService.getGiftCardCodes = function (params) {
  return fetch({
    url: `/cards/${params.cardCode || ""}`,
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
  data.sellerRemarks = payload.remark;
  data.referenceCurrency = payload.referenceCurrency;
  return fetch({
    url: `/cards/${params.userId}/sell`,
    method: "post",
    data: data,
  });
};

giftCardService.cancelSellGiftCardTransaction = function (params) {
  return fetch({
    url: `/cards/${params.userId}/${params.transactionId}`,
    method: "delete",
  });
};

giftCardService.getTransactionDetails = function (params) {
  return fetch({
    url: `/cards/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

giftCardService.getTransactionHistory = function (params) {
  return fetch({
    url: `/cards/${params.userId}/sell`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

export default giftCardService;
