import fetch from './FetchInterceptor'

const bankService = {}

bankService.getCountryBankList = function (params) {
  return fetch({
    url: `/api/misc/get-banks`,
    method: 'get',
    headers: {
      "public-request": "true",
    },
  })
}

bankService.validateBankAccountDetails = function (payload) {
  // {
  //   "accountNumber": "0217712602",
  //   "bankCode": "058"
  // }
  let data = {};
  data.accountNumber = payload.accountNumber;
  data.bankCode = payload.bankCode;
  return fetch({
    url: '/api/misc/verify-bank-details',
    method: 'post',
    data: data,
    headers: {
      "public-request": "true",
    },
  })
}

export default bankService