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

giftCardService.getGiftCardCode = function (params) {
  return fetch({
    url: `/cards/${params.cardCode || ""}`,
    method: "get",
    headers: {
      "public-request": "true",
    },
  });
};


// return Promise.resolve({
//   "code":200,
//   "data": {
//     "cardRateDetails": [
//       {
//         "id": 1,
//         "card_currency_id": 1,
//         "physical": {
//           "20": 0.6,
//           "25": 0.6,
//           "50": 0.6,
//           "100": 0.7,
//           "200": 0.7,
//           "500": 0.8
//         },
//         "ecode": {
//           "20": 0.6,
//           "25": 0.6,
//           "50": 0.6,
//           "100": 0.7,
//           "200": 0.7,
//           "500": 0.8
//         },
//         "created_at": "2021-04-14T10:35:49.000Z",
//         "updated_at": "2021-04-14T10:35:49.000Z",
//         "GiftCard": {
//           "id": 1,
//           "name": "Amazon",
//           "uid": "amazon",
//           "image": "https://storage.googleapis.com/flip-web-data/gift-cards/amazon.png",
//           "created_at": "2021-04-14T10:35:49.000Z",
//           "updated_at": "2021-04-14T10:35:49.000Z"
//         },
//         "GiftCardCurrency": {
//           "id": 1,
//           "code": "USD",
//           "name": "United States Dollars",
//           "rate": "1",
//           "created_at": "2021-04-14T10:35:48.000Z",
//           "updated_at": "2021-04-14T10:35:48.000Z"
//         }
//       },
//       {
//         "id": 2,
//         "card_currency_id": 2,
//         "physical": {
//           "20": 0.6,
//           "25": 0.6,
//           "50": 0.6,
//           "100": 0.7,
//           "200": 0.7,
//           "500": 0.8
//         },
//         "ecode": {
//           "20": 0.6,
//           "25": 0.6,
//           "50": 0.6,
//           "100": 0.7,
//           "200": 0.7,
//           "500": 0.8
//         },
//         "created_at": "2021-04-14T10:35:49.000Z",
//         "updated_at": "2021-04-14T10:35:49.000Z",
//         "GiftCard": {
//           "id": 1,
//           "name": "Amazon",
//           "uid": "amazon",
//           "image": "https://storage.googleapis.com/flip-web-data/gift-cards/amazon.png",
//           "created_at": "2021-04-14T10:35:49.000Z",
//           "updated_at": "2021-04-14T10:35:49.000Z"
//         },
//         "GiftCardCurrency": {
//           "id": 2,
//           "code": "EUR",
//           "name": "Euros",
//           "rate": "1",
//           "created_at": "2021-04-14T10:35:48.000Z",
//           "updated_at": "2021-04-14T10:35:48.000Z"
//         }
//       }
//     ]
//   },
//   "message": "Fetched card rate details for: {cardUid} successfully"
// })
// }

giftCardService.initialSellGiftCard = function (params, payload) {
  // {
  //   "amount": 200,
  //   "cardCurrencyId": 1,
  //   "giftCardId": 1,
  //   "cardType": "physical|ecode",
  //   "imageURLs": [
  //     "https://www.itunes.apple.com/"
  //   ],
  //   "fiatCurrencyId": 1,
  //   "sellerRemarks": "Lorem Ipsum, Lorem Ipsum, and others"
  // }
  let data = {};
  data.amount = payload.amount;
  data.cardCurrencyId = payload.cardCurrencyId;
  data.giftCardId = payload.giftCardId;
  data.cardType = payload.cardType;
  data.imageURLs = payload.imageURLs;
  data.fiatCurrencyId = payload.fiatCurrencyId;
  data.sellerRemarks = payload.remark;
  
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
