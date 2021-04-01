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
  let data = {...payload};
  data.email = payload.email;
  data.firstName = payload.firstName;
  data.lastName = payload.lastName;
  data.country = payload.country || "";
  data.password = payload.password;
  data.username = payload.username;
  return fetch({
    url: "/api/user-account",
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
    url: "/api/user-account/log-in",
    method: "post",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

authService.checkEmailAvailability = function (payload) {
  // {
  //   "email": "wathik.liker@iel.pw",
  // }
  let data = {};
  data.email = payload.email;
  return fetch({
    url: "/api/user-account/validate-email",
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
  return fetch({
    url: `/api/user-account/${params.userId}/verify-email`,
    method: "post",
    data: data,
  });
};

authService.resendVerificationCode = function (params) {
  return fetch({
    url: `/api/user-account/${params.userId}/resend-email-otp`,
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
    url: `/api/user-account/${params.userId}/password`,
    method: "put",
    data: data,
  });
};

authService.resetPassword = function (data) {
  return fetch({
    url: `/api/user-account/reset-password`,
    method: "post",
    headers: {
      "public-request": "true",
    },
    data: {
      email: data.email,
    }
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
  return fetch({
    url: `/api/user-account/complete-password-reset`,
    method: "put",
    data: data,
    headers: {
      "public-request": "true",
    },
  });
};

export default authService;
