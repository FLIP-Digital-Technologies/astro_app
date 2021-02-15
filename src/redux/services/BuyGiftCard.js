import fetch from "./FetchInterceptor";

const buyGiftCardService = {};

buyGiftCardService.initialBuy = function (params, payload) {
  // {
  //   "cardSlug": "fortnite-_standard-edition_-international",
  //   "cardCurrency": "USD",
  //   "cardValue": "2800-V-Bucks",
  //   "amount": 25,
  //   "quantity": 2,
  //   "isCustom": false,
  //   "referenceCurrency": "NGN"
  // }
  let data = {};
  data.cardSlug = payload.cardSlug;
  data.cardCurrency = payload.cardCurrency;
  data.cardValue = payload.cardValue;
  data.amount = payload.amount;
  data.quantity = payload.quantity;
  data.isCustom = payload.isCustom;
  data.referenceCurrency = payload.referenceCurrency;
  data.referralId = payload.referralId;
  return fetch({
    url: `/api/transactions/buy-cards/${params.userId}`,
    method: "post",
    data: data,
  });
};

buyGiftCardService.getBuyCardsByCountries = function () {
  return fetch({
    url: `/api/transactions/buy-cards/search/get-countries`,
    method: "get"
  });
};

buyGiftCardService.getBuyCardsBySearch = function (params) {
  return fetch({
    url: `/api/transactions/buy-cards/search`,
    method: "get",
    params: {
      country: params.country,
      searchQuery: params.searchQuery,
    },
  });
};

buyGiftCardService.getBuyCardsCardDetail = function (params) {
  return fetch({
    url: `/api/transactions/buy-cards/search/${params.card}`,
    method: "get",
  });
};

buyGiftCardService.getBuyCardTransaction = function (params) {
  return fetch({
    url: `/api/transactions/buy-cards/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

buyGiftCardService.cancelBuyCardTransaction = function (params) {
  return fetch({
    url: `/api/transactions/buy-cards/${params.userId}/${params.transactionId}/cancel`,
    method: "put",
  });
};

buyGiftCardService.getAllBuyCardsTransactions = function (params) {
  return fetch({
    url: `/api/transactions/buy-cards/${params.userId}/history`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

export default buyGiftCardService;