<div className={styles.home}>
        <div className={styles.home__welcome}>
          <div className={styles.home__top}>
            {!balance && (
              <div className={styles.balances}>
                <div
                  className={styles.balances__ta}
                  
                >
                  <LeftCircleOutlined
                    style={{
                      fontSize: "30px",
                      color:"#9a4e6a",
                    }}
                  />
                </div>
                <div
                  className={styles.balances__ta}
                  // onClick={() => {
                  //   if (currencyHeader == "Fiat Wallet Balance") {
                  //     setCurrencyHeader("Crypto Wallet Balance");
                  //   } else if (currencyHeader == "Crypto Wallet Balance") {
                  //     setCurrencyHeader("Fiat Wallet Balance");
                  //   } else {
                  //     return;
                  //   }
                  // }}
                >
                  <Dropdown
                    // trigger={["hover"]}
                    overlay={menu}
                    // onVisibleChange={handleVisibleChange}
                    visible={visible}
                  >
                    <span
                      className={styles.balances__title}
                      // style={{ cursor: "pointer" }}
                      // onClick={(e) => e.preventDefault()}
                    >
                      {currencyHeader} {"  "}
                      <DownOutlined />
                    </span>
                  </Dropdown>
                  
                  <div className={styles.balances__value}>
                    <span>{'Please Wait...'}</span>{" "}
                    
                  </div>
                  <div className={styles.balances__btn__holder}>
                    <LoadingOutlined style={{fontSize:40}} />
                  </div>
                </div>
                <div
                  className={styles.balances__ta}
                >
                  <RightCircleOutlined
                    style={{
                      fontSize: "30px",
                      color:"#9a4e6a"
                    }}
                  />
                </div>
              </div>
            )}
            {headerId === "1"
              ? balance &&
                balance.fiatWallets &&
                (balance.fiatWallets.length > 0 ? (
                  <div className={styles.balances}>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (fiatIndex < 1) {
                          return;
                        } else {
                          setFiatIndex(--fiatIndex);
                        }
                      }}
                    >
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: fiatIndex < 1 ? "#9a4e6a" : "",
                        }}
                      />
                    </div>
                    <div
                      className={styles.balances__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          style={{ cursor: "pointer" }}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader} {"  "}
                          <DownOutlined />
                        </span>
                      </Dropdown>
                      <div className={styles.balances__value}>
                        <span>{renderBalance}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          onClick={() => setWallet("NGN")}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          {balance &&
                            balance.fiatWallets &&
                            balance.fiatWallets[fiatIndex].Currency.code}
                        </div>
                        {fiatIndex + 1 === balance.fiatWallets.length && (
                          <>
                            <div
                              onClick={() => setOpenAddWallet(true)}
                              className={`${styles.balances__btn} ${styles.active}`}
                            >
                              <PlusOutlined />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (fiatIndex + 1 === balance.fiatWallets.length) {
                          return;
                        } else {
                          setFiatIndex(++fiatIndex);
                        }
                      }}
                    >
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            fiatIndex + 1 === balance.fiatWallets.length
                              ? "#9a4e6a"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.balances}>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (fiatIndex < 1) {
                          return;
                        } else {
                          setFiatIndex(--fiatIndex);
                        }
                      }}
                    >
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: fiatIndex < 1 ? "#9a4e6a" : "",
                        }}
                      />
                    </div>
                    <div
                      className={styles.balances__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader}
                          <DownOutlined />
                        </span>
                      </Dropdown>
                      
                      <div className={styles.balances__value}>
                        <span>{"Add Wallet"}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          onClick={() => setOpenAddWallet(true)}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          <PlusOutlined />
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (balance.fiatWallets.length === 0) {
                          return;
                        }
                        if (fiatIndex + 1 === balance.fiatWallets.length) {
                          return;
                        } else {
                          setFiatIndex(++fiatIndex);
                        }
                      }}
                    >
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            balance.fiatWallets.length === 0
                              ? "#9a4e6a"
                              : fiatIndex + 1 === balance.fiatWallets.length
                              ? "#9a4e6a"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ))
              : balance &&
                balance.cryptoWallets &&
                (balance.cryptoWallets.length > 0 ? (
                  <div className={styles.balances}>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (cryptoIndex < 1) {
                          return;
                        } else {
                          setCryptoIndex(--cryptoIndex);
                        }
                      }}
                    >
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: cryptoIndex < 1 ? "#9a4e6a" : "",
                        }}
                      />
                    </div>
                    <div className={styles.balances__ta}>
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader}
                          <DownOutlined />
                        </span>
                      </Dropdown>

                      <div className={styles.balances__value}>
                        <span>
                          {balance &&
                            balance.cryptoWallets &&
                            balance.cryptoWallets[cryptoIndex].Currency.code}
                          {"    "}
                        </span>
                        <span>{renderCryptoBalance}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          // onClick={() => setWallet("NGN")}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          {balance &&
                            balance.cryptoWallets &&
                            balance.cryptoWallets[cryptoIndex].Currency.code}
                        </div>
                        {cryptoIndex + 1 === balance.cryptoWallets.length && (
                          <>
                            <div
                              onClick={() => setOpencryptoAddWallet(true)}
                              className={`${styles.balances__btn} ${styles.active}`}
                            >
                              <PlusOutlined />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (cryptoIndex + 1 === balance.cryptoWallets.length) {
                          return;
                        } else {
                          setCryptoIndex(++cryptoIndex);
                        }
                      }}
                    >
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            cryptoIndex + 1 === balance.cryptoWallets.length
                              ? "#9a4e6a"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className={styles.balances}>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (cryptoIndex < 1) {
                          return;
                        } else {
                          setCryptoIndex(--cryptoIndex);
                        }
                      }}
                    >
                      <LeftCircleOutlined
                        style={{
                          fontSize: "30px",
                          color: cryptoIndex < 1 ? "#9a4e6a" : "",
                        }}
                      />
                    </div>
                    <div
                      className={styles.balances__ta}
                      // onClick={() => {
                      //   if (currencyHeader == "Fiat Wallet Balance") {
                      //     setCurrencyHeader("Crypto Wallet Balance");
                      //   } else if (currencyHeader == "Crypto Wallet Balance") {
                      //     setCurrencyHeader("Fiat Wallet Balance");
                      //   } else {
                      //     return;
                      //   }
                      // }}
                    >
                      <Dropdown
                        trigger={["hover"]}
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visible}
                      >
                        <span
                          className={styles.balances__title}
                          // onClick={(e) => e.preventDefault()}
                        >
                          {currencyHeader}
                          <DownOutlined />
                        </span>
                      </Dropdown>
                      {/* <span className={styles.balances__title}>{currencyHeader}</span> */}
                      <div className={styles.balances__value}>
                        <span>{"Add Wallet"}</span>{" "}
                        {wallet === "BTC" && <span>{wallet}</span>}
                      </div>
                      <div className={styles.balances__btn__holder}>
                        <div
                          onClick={() => setOpencryptoAddWallet(true)}
                          className={`${styles.balances__btn} ${styles.active}`}
                        >
                          <PlusOutlined />
                        </div>
                      </div>
                    </div>
                    <div
                      className={styles.balances__ta}
                      onClick={() => {
                        if (balance.cryptoWallets.length === 0) {
                          return;
                        }
                        if (cryptoIndex + 1 === balance.cryptoWallets.length) {
                          return;
                        } else {
                          setCryptoIndex(++cryptoIndex);
                        }
                      }}
                    >
                      <RightCircleOutlined
                        style={{
                          fontSize: "30px",
                          color:
                            balance.cryptoWallets.length === 0
                              ? "#9a4e6a"
                              : cryptoIndex + 1 === balance.cryptoWallets.length
                              ? "#9a4e6a"
                              : "",
                        }}
                      />
                    </div>
                  </div>
                ))}
            <div
              onClick={() => {
                userLoading
                  ? notification.info({
                      message: "Please wait",
                    })
                  : setShowFund(true);
              }}
              className={styles.fund}
            >
              <div className={styles.fund__image}>
                <div>
                  <PlusOutlined style={{ fontSize: 23 }} />
                </div>
              </div>
              <span className={styles.fund__text}>Fund Wallet</span>
            </div>
            <div
              onClick={() => {
                userLoading
                  ? notification.info({
                      message: "Please wait",
                    })
                  : setOpenWithdrawal(true);
              }}
              className={styles.fund}
            >
              <div className={styles.fund__image}>
                <div>
                  <i
                    class="fas fa-wallet text-white"
                    style={{ fontSize: 22, color: "#ffffff" }}
                  />
                </div>
              </div>
              <span className={styles.fund__text}>Withdrawal</span>
            </div>
          </div>
          <div className={styles.quick}>
            <div
              className={styles.quick__holder}
              style={{ width: "100%", flexWrap: "wrap" }}
            >
              <div
                onClick={() => {
                  userLoading
                    ? notification.info({
                        message: "Please wait",
                      })
                    : setShowPTWOP(true);
                }}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <UserSwitchOutlined />
                </div>
                <span style={{ textAlign: "center", lineHeight: 1 }}>
                  send money via P2P
                </span>
              </div>
              <div
                onClick={() => history.push("/app/sell-giftcard")}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="fas fa-gift"></i>
                </div>
                <span>Sell GiftCard</span>
              </div>
              <div
                onClick={() => {
                  userLoading
                    ? notification.info({
                        message: "Please wait",
                      })
                    : setShowPTWOPcrypto(true);
                }}
                // onClick={() => history.push("/app/crypto")}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="fas fa-coins" />
                </div>
                <span style={{ textAlign: "center", lineHeight: 1 }}>
                  send Crypto via P2P
                </span>
              </div>
              <div
                onClick={() => {
                  userLoading
                    ? notification.info({
                        message: "Please wait",
                      })
                    : setShowAirtime(true);
                }}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="far fa-credit-card"></i>
                </div>
                <span>Buy Airtime</span>
              </div>
              <div
                onClick={() => history.push("/app/bills")}
                className={`${styles.actionBtn} ${styles.quickBtn}`}
              >
                <div>
                  <i class="fas fa-file-invoice-dollar"></i>
                </div>
                <span>Bill Payments</span>
              </div>
            </div>
          </div>
        </div>
      </div>