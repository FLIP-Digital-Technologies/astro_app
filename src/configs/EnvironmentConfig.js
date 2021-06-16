const dev = {
  API_ENDPOINT_URL: "https://api.astroafrica.site/v1/",
};

const prod = {
  API_ENDPOINT_URL:  "https://api.astroafrica.site/v1/",
};

const test = {
  API_ENDPOINT_URL: "https://myflipapp-297309.uc.r.appspot.com/",
};

const stage = {
  API_ENDPOINT_URL:  "https://api.astroafrica.xyz/v1/",
                   
};

const getEnv = () => {
  if (process.env.NODE_ENV === "development") {
    return dev;
  }
  
  switch (process.env.REACT_APP_ENV) {
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
