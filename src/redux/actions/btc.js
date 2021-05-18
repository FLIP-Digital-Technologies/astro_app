import * as actionTypes from "../constants";
import BTCTransactionServices from "../services/BtcTransactionService";
// import { history } from "../store";

const GetBTCWalletDetailsById = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_WALLET_DETAILS_BY_ID_PENDING,
  });

  await BTCTransactionServices.getBTCTransactionDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_WALLET_DETAILS_BY_ID_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_WALLET_DETAILS_BY_ID_FAILED,
        payload: err,
      });
    });
}; // done

export const getBTCWalletDetailsById = (data) => (dispatch) => {
  dispatch(GetBTCWalletDetailsById(data));
}; // done

const GetBTCWalletDetails = () => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_WALLET_DETAILS_PENDING,
  });

  await BTCTransactionServices.getWalletDetails({ userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_WALLET_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_WALLET_DETAILS_FAILED,
        payload: err,
      });
    });
}; // done

export const getBTCWalletDetails = () => (dispatch) => {
  dispatch(GetBTCWalletDetails());
}; // done

const GetBTCCurrentMarketTicker = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.GET_CURRENT_MARKET_TICKERS_PENDING,
  });

  await BTCTransactionServices.getCurrentMarketTicker(data)
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CURRENT_MARKET_TICKERS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_CURRENT_MARKET_TICKERS_FAILED,
        payload: err,
      });
    });
  return;
}; // done

export const getBTCCurrentMarketTicker = (data) => (dispatch) => {
  dispatch(GetBTCCurrentMarketTicker(data));
}; // done

const InitialBTCBuyTransaction = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_BUY_BTC_PENDING,
  });

  await BTCTransactionServices.initialBuyBTC({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_BUY_BTC_SUCCESS,
        payload: response.data,
      });
      dispatch(getBTCWalletDetails);
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_BUY_BTC_FAILED,
        payload: err,
      });
    });
};

export const initialBTCBuyTransaction = (data) => (dispatch) => {
  dispatch(InitialBTCBuyTransaction(data));
};

const InitialBTCSellTransaction = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_SELL_BTC_PENDING,
  });

  await BTCTransactionServices.initialSellBTC({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_SELL_BTC_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_SELL_BTC_FAILED,
        payload: err,
      });
    });
};

export const initialBTCSellTransaction = (data) => (dispatch) => {
  dispatch(InitialBTCSellTransaction(data));
};

const InitialBTCSellToExternalWalletTransaction = (data) => async (
  dispatch
) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_PENDING,
  });

  await BTCTransactionServices.initialSendBTCToExternalWallet({ userId }, data)
    .then((response) => {
      dispatch({
        type: actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.INITIAL_SEND_BTC_TO_EXTERNAL_WALLET_FAILED,
        payload: err,
      });
    });
};

export const initialBTCSellToExternalWalletTransaction = (data) => (
  dispatch
) => {
  dispatch(InitialBTCSellToExternalWalletTransaction(data));
};

const ReceiveBTCIntoWallet = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.RECEIVE_BTC_PENDING,
  });

  await BTCTransactionServices.receiveBTC({ userId, cryptoWalletId:data.cryptoWalletId })
    .then((response) => {
      dispatch({
        type: actionTypes.RECEIVE_BTC_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.RECEIVE_BTC_FAILED,
        payload: err,
      });
    });
};

export const receiveBTCIntoWallet = (data) => (dispatch) => {
  dispatch(ReceiveBTCIntoWallet(data));
};

const GetBTCTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_TRANSACTION_HISTORY_PENDING,
  });

  await BTCTransactionServices.getTransactionBuyHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_TRANSACTION_HISTORY_FAILED,
        payload: err,
      });
    });
};

export const getBTCTransactionHistory = (data) => (dispatch) => {
  dispatch(GetBTCTransactionHistory(data));
};


const GetCryptoBuyTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_BUY_TRANSACTION_HISTORY_PENDING,
  });

  await BTCTransactionServices.getTransactionBuyHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_BUY_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_BUY_TRANSACTION_HISTORY_FAILED,
        payload: err,
      });
    });
};

export const getCryptoBuyTransactionHistory = (data) => (dispatch) => {
  dispatch(GetCryptoBuyTransactionHistory(data));
};

const GetCryptoSellTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_SELL_TRANSACTION_HISTORY_PENDING,
  });

  await BTCTransactionServices.getTransactionSellHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_SELL_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_SELL_TRANSACTION_HISTORY_FAILED,
        payload: err,
      });
    });
};

export const getCryptoSellTransactionHistory = (data) => (dispatch) => {
  dispatch(GetCryptoSellTransactionHistory(data));
};

const GetCryptoSendTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_SEND_TRANSACTION_HISTORY_PENDING,
  });

  await BTCTransactionServices.getTransactionSendHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_SEND_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_SEND_TRANSACTION_HISTORY_FAILED,
        payload: err,
      });
    });
};

export const getCryptoSendTransactionHistory = (data) => (dispatch) => {
  dispatch(GetCryptoSendTransactionHistory(data));
};

const GetCryptoP2PTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_P2P_TRANSACTION_HISTORY_PENDING,
  });

  await BTCTransactionServices.getTransactionP2PHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_P2P_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_P2P_TRANSACTION_HISTORY_FAILED,
        payload: err,
      });
    });
};

export const getCryptoP2PTransactionHistory = (data) => (dispatch) => {
  dispatch(GetCryptoP2PTransactionHistory(data));
};






const GetCryptoBuyTransactionDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_BUY_TRANSACTION_DETAILS_PENDING,
  });

  await BTCTransactionServices.getTransactionBuyDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_BUY_TRANSACTION_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_BUY_TRANSACTION_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getCryptoBuyTransactionDetails = (data) => (dispatch) => {
  dispatch(GetCryptoBuyTransactionDetails(data));
};

const GetCryptoSellTransactionDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_SELL_TRANSACTION_DETAILS_PENDING,
  });

  await BTCTransactionServices.getTransactionSellDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_SELL_TRANSACTION_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_SELL_TRANSACTION_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getCryptoSellTransactionDetails = (data) => (dispatch) => {
  dispatch(GetCryptoSellTransactionDetails(data));
};

const GetCryptoSendTransactionDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_SEND_TRANSACTION_DETAILS_PENDING,
  });

  await BTCTransactionServices.getTransactionSendDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_SEND_TRANSACTION_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_SEND_TRANSACTION_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getCryptoSendTransactionDetails = (data) => (dispatch) => {
  dispatch(GetCryptoSendTransactionDetails(data));
};

const GetCryptoP2PTransactionDetails = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_COIN_P2P_TRANSACTION_DETAILS_PENDING,
  });

  await BTCTransactionServices.getTransactionP2PDetails({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_COIN_P2P_TRANSACTION_DETAILS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_COIN_P2P_TRANSACTION_DETAILS_FAILED,
        payload: err,
      });
    });
};

export const getCryptoP2PTransactionDetails = (data) => (dispatch) => {
  dispatch(GetCryptoP2PTransactionDetails(data));
};







const GetLastBTCTransactionHistory = (data) => async (dispatch) => {
  const userId = localStorage.getItem(actionTypes.AUTH_TOKEN_ID);
  dispatch({
    type: actionTypes.GET_LAST_TRANSACTION_HISTORY_PENDING,
  });

  await BTCTransactionServices.getTransactionBuyHistory({ ...data, userId })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_LAST_TRANSACTION_HISTORY_SUCCESS,
        payload: response.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: actionTypes.GET_LAST_TRANSACTION_HISTORY_FAILED,
        payload: err,
      });
    });
};

export const getLastBTCTransactionHistory = (data) => (dispatch) => {
  dispatch(GetLastBTCTransactionHistory(data));
};
