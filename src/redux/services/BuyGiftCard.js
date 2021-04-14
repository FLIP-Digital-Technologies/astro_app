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
  data.email = payload.email;
  return fetch({
    url: `/buy-cards/${params.userId}`,
    method: "post",
    data: data,
  });
};

buyGiftCardService.getBuyCardsByCountries = function () {
  return fetch({
    url: `/buy-cards/search/countries`,
    method: "get"
  });
};

buyGiftCardService.getBuyCardsBySearch = function (params) {
  return fetch({
    url: `/buy-cards/search`,
    method: "get",
    params: {
      country: params.country,
      searchQuery: params.searchQuery,
    },
  });
};

buyGiftCardService.getBuyCardsCardDetail = function (params) {
  return fetch({
    url: `/buy-cards/search/${params.card}`,
    method: "get",
  });
};

buyGiftCardService.getBuyCardTransaction = function (params) {
  return fetch({
    url: `/buy-cards/${params.userId}/${params.transactionId}`,
    method: "get",
  });
};

buyGiftCardService.cancelBuyCardTransaction = function (params) {
  return fetch({
    url: `/buy-cards/${params.userId}/${params.transactionId}`,
    method: "delete",
  });
};

buyGiftCardService.getAllBuyCardsTransactions = function (params) {
  return fetch({
    url: `/buy-cards/${params.userId}`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};

export default buyGiftCardService;
