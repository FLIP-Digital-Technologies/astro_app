import fetch from "./FetchInterceptor";

const referralService = {};

referralService.redeemUserReferralBonus = function (params, payload) {
  // {
  //   "referralId": "e38d00cf-6185-40e2-a429-7982a4711fae"
  // }
  let data = {};
  data.referralId = payload.referralId;
  return fetch({
    url: `/user-account/${params.userId}/redeem-referral`,
    method: "post",
    data: data,
  });
};

referralService.getUserReferrals = function (params) {
  return fetch({
    url: `/user-account/${params.userId}/referrals`,
    method: "get",
    params: {
      skip: params.skip,
      limit: params.limit,
    },
  });
};


export default referralService;
