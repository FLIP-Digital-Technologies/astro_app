const dev = {
  API_ENDPOINT_URL: "https://api-dot-myflipapp-297309.uc.r.appspot.com/v1/",
};

const prod = {
  API_ENDPOINT_URL: "https://myflipapp-297309.uc.r.appspot.com/",
};

const test = {
  API_ENDPOINT_URL: "https://myflipapp-297309.uc.r.appspot.com/",
};

const stage = {
  API_ENDPOINT_URL:  "https://api-dot-myflipapp-297309.uc.r.appspot.com/v1/",
                   
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case "development":
      return dev;
    case "production":
      return prod;
    case "test":
      return test;
    case "staging":
      return stage;
    default:
      break;
  }
};

export const env = getEnv();
