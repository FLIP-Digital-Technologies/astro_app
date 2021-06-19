 {/* <div className={`${styles.landing__steps} ${styles.rev} ${styles.two}`}>
          <div className={styles.title}>How we are different</div>
          <div className={styles.stepHolder}>
            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidRocket />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Speed redefined
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                Our payment process has been simplified and made hassle free for
                your convenience.
              </div>
            </div>
            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidChart />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Reports that matter
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                Get reports on your activity to help you keep track and stay
                updated.
              </div>
            </div>

            <div className={styles.step}>
              <div className={`${styles.step__icon} ${styles.rev}`}>
                <MidMoney />
              </div>
              <div className={`${styles.step__title} ${styles.rev}`}>
                Modern payout intergation
              </div>
              <div className={`${styles.step__sub} ${styles.rev}`}>
                All payments are processed with a modern and secure third party
                partner.
              </div>
            </div>
          </div>
        </div>
       */}
       {/* <div className={styles.rates}>
          <div className={styles.rates__left}>
            <div className={styles.title}>Our rate</div>
            <div className={styles.sub}>Absolutely the best</div>
          </div>

          <div className={styles.rates__right}>
            <div className={styles.title}>Rates Calculator</div>
            <div className={styles.sub}>
              Get the current value of your transaction
            </div>
            <div className={styles.buttonHolder}>
              <Button
                className={`${styles.buttonLeft} ${buy && styles.rev}`}
                text="SELL"
                form="full"
                onClick={() => setBuy(false)}
              />
              <Button
                className={`${styles.buttonRight} ${!buy && styles.rev}`}
                text="BUY"
                form="full"
                onClick={() => setBuy(true)}
              />
            </div>
            {buy ? (
              <Input
                labelClass={styles.rate__selector__content__label}
                className={styles.rate__selector__content__input}
                label="Buy bitcoin"
                Dummy={{ Icon: BitcoinInput, text: "Bitcoin" }}
              />
            ) : (
              <>
                <Select
                  // options={DigitalAsset.filter(
                  //   (it) =>
                  //     list.filter((i) => i === it.name || "btc").length > 0
                  // )}
                  options={coinsData && coinsData.map((item) => ({
                    render:`${item.name}`,
                    value:item
                  }))}
                  value={state.asset}
                  onSelect={onAssetChange}
                  label="How much are you willing to sell?"
                  labelClass={styles.label}
                />
                {state.asset !== "BTC" && (
                  <>
                    <Select
                      options={countryOptions.filter(
                        (it) =>
                          avaCurr &&
                          avaCurr.filter((i) =>
                            it.value.toLowerCase().includes(i)
                          ).length > 0
                      )}
                      value={state.country}
                      onSelect={onCountryChange}
                      label="Select Country Currency"
                      labelClass={styles.label}
                    />
                    <Select
                      options={cardOptions.filter(
                        (it) =>
                          avaCard &&
                          avaCard.filter((i) => it.value.includes(i)).length > 0
                      )}
                      value={state.cardType}
                      onSelect={onCardTypeChange}
                      label="Select Card Type"
                      labelClass={styles.label}
                    />
                  </>
                )}
              </>
            )}
            {buy || state.asset === "BTC" ? (
              <>
                <div className={styles.rate}>
                  <span>Rate</span>
                  <span>{` ${
                    buy
                      ? btcRates &&
                        btcRates.tickers &&
                        Money(btcRates.tickers.btcngn.sell, "NGN")
                      : btcRates &&
                        btcRates.tickers &&
                        Money(btcRates.tickers.btcngn.buy, "NGN")
                  } / BTC`}</span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.range}>
                  <span>Regular Range</span>
                  <span>$1+</span>
                </div>
                <div className={styles.rate}>
                  <span>Rate</span>
                  <span>{Money((meta && meta.rate.NGN) || 0, "NGN")}/$</span>
                </div>
              </>
            )}
            <Button className={styles.button} text="Check Rates" form="full" />
          </div>
        </div> */}

        <div style={{ marginBottom: 20 }}>
        <label
          className={`${labelStyles.input__label} ${styles.label}`}
          style={{ marginTop: 10 }}
        >
          {"Select Wallet type to credit"}
        </label>
        <Radio.Group
          onChange={onRadioChange}
          value={currencyType}
          style={{ marginTop: 10 }}
        >
          <Radio value={true}>Gift Card</Radio>
          <Radio value={false}>Cryptocurrency</Radio>
        </Radio.Group>
      </div>
      {currencyType && (
          <>
        <div style={{ marginBottom: 20 }}>
          <Select
            options={fiatCurrency.map((item) => ({
              render: item.name,
              value: item,
            }))}
            label="Select Currency"
            value={details.creditCurrency}
            onSelect={onWalletChange}
          />
          </div>
          <div style={{ marginBottom: 20 }}>
          <Select
            options={data.map((item) => ({
              render: item.name,
              value: item.uid,
            }))}
            label="Select Card"
            value={details.card}
            onSelect={onCardChange}
            // className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
          />
          </div>
          {cardDetails && cardDetails.length > 0 && (
            <>
              <div style={{ marginBottom: 20 }}>
                <Select
                  options={
                    cardDetails &&
                    cardDetails.map((item) => ({
                      render: item.description,
                      value: item,
                    }))
                  }
                  value={details.category}
                  onSelect={(value) => {
                    setDetails((state) => ({
                      ...state,
                      cardCategory: value,
                      category: value.id,
                    }));
                  }}
                //   className={`${styles.gitcard__form__body__input} ${styles.countryInput}`}
                  label="Select Card Category"
                  labelClass={styles.label}
                  placeholder={"Card Category"}
                />
              </div>
              <br />
            </>
          )}
        </>
      )}