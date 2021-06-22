import fetch from "./FetchInterceptor";

const authService = {};

authService.createAccount = function (payload) {
  // {
  //   "email": "ass.orboobs@cuffa.com",
  //   "firstName": "Ass",
  //   "lastName": "Orboobs",
  //   "password": "passwordao",
  //   "username": "assplusboobsequalslife",
  //   "referralCode": "VnpJrP",
  //   "phoneNumber": ""
  // }
  let data = {};
  data.email = payload.email;
  data.firstName = payload.firstName;
  data.lastName = payload.lastName;
  data.password = payload.password;
  data.username = payload.username;

  if (payload.referralCode) {
    data.referralCode = payload.referralCode;
  }

  return fetch({
    url: "/user-account",
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

authService.loginAccount = function (payload) {
  // {
  //   "email": "wathik.liker@iel.pw",
  //   "password": "passwordwl"
  // }
  let data = {};
  data.email = payload.email;
  data.password = payload.password;
  return fetch({
    url: "/user-account/sign-in",
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

authService.getUserDetails = function (params) {
  return fetch({
    url: `/user-account/${params.userId}`,
    method: "get",
  });
};

authService.checkEmailAvailability = function (payload) {
  // {
  //   "email": "wathik.liker@iel.pw",
  // }
  let data = {};
  data.email = payload.email;
  return fetch({
    url: "/user-account/validate-email",
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

authService.verifyEmail = function (params, payload) {
  // {
  //   "otpCode": "571843"
  // }
  let data = {};
  data.otpCode = payload.otpCode;
  data.reference = payload.reference;
  return fetch({
    url: `/user-account/${params.userId}/verify-email-ref`,
    method: "post",
    data: data,
  });
};

authService.verifyEmailToken = function (payload) {
  
  let data = {};
  data.token = payload.token;
  data.userId = payload.userId;
  return fetch({
    url: `/user-account/${payload.userId}/verify-email-token`,
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

authService.resendVerificationCode = function (params) {
  return fetch({
    url: `/user-account/${params.userId}/resend-email-otp`,
    method: "post",
  });
};

authService.changePassword = function (params, payload) {
  // {
  //   "currentPassword": "Try-Guessing-this123.",
  //   "newPassword": "passwordwl"
  // }
  let data = {};
  data.currentPassword = payload.currentPassword;
  data.newPassword = payload.newPassword;
  return fetch({
    url: `/user-account/${params.userId}/password`,
    method: "put",
    data: data,
  });
};

authService.resetPassword = function (data) {
  return fetch({
    url: `/user-account/reset-password`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: {
      email: data.email,
    },
  });
};

authService.completePasswordReset = function (payload) {
  // {
  //   "resetCode": "028251",
  //   "newPassword": "Try-Guessing-this123.",
  //   "email": "user@email.com",
  // }
  let data = {};
  data.resetCode = payload.resetCode;
  data.newPassword = payload.newPassword;
  data.email = payload.email;
  data.reference = payload.reference;
  return fetch({
    url: `/user-account/complete-password-reset`,
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

authService.changePin = function (params, payload) {
  // {
  //   "currentPassword": "Try-Guessing-this123.",
  //   "newPassword": "passwordwl"
  // }
  let data = {};
  data.currentPin = payload.currentPin;
  data.newPin = payload.newPin;
  return fetch({
    url: `/user-account/${params.userId}/transaction-pin`,
    method: "put",
    data: data,
  });
};

authService.resetPin = function (params ,data) {
  return fetch({
    url: `/user-account/reset-pin`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: {
      email: data.email,
    },
  });
};

authService.completePinReset = function (params, payload) {
  // {
  //   "resetCode": "028251",
  //   "newPassword": "Try-Guessing-this123.",
  //   "email": "user@email.com",
  // }
  let data = {};
  data.resetCode = payload.resetCode;
  data.newPin = payload.newPin;
  // data.email = payload.email;
  data.reference = payload.reference;
  return fetch({
    url: `/user-account/${params.userId}/complete-pin-reset`,
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

export default authService;
