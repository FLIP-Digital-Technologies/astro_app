import React, { useState } from "react";
import { Table } from "antd";
import { TransactionIcon, Eye, ArrowRight } from "../../assets/svg";
import { Modal } from "antd";
import styles from "../styles.module.scss";
import Button from "../../components/button";
import { date, Money } from "../../utils/helper";

export const BuyGiftCardTab = ({ fetchTrans, transaction, handleAction }) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });
  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Card Ordered",
      dataIndex: "cardSlug",
      render: (cardSlug, rec) => (
        <div>
        <p>
          Ordered: {cardSlug.replace("-", " ").replace("_", " ")}
          <br/>
          Quantity: {rec.cardDetails && rec.cardDetails.quantity}
        </p>
        </div>
      ),
    },
    {
      title: "Card Amount | USD Amount",
      dataIndex: "cardDetails",
      render: (cardDetails) => (
        <p>
          {cardDetails && cardDetails.cardCurrency}
          {cardDetails && cardDetails.cardValue} | USD 
          {cardDetails && cardDetails.estimatedUSDValue.amount}
        </p>
      ),
    },
    {
      title: "Wallet",
      dataIndex: "referenceCurrency"
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="P2P Transaction" />
      )}
    </div>
  );
};

export const PTwoPTab = ({ fetchTrans, transaction, handleAction }) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });
  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: (rate) => (
        <p>
          The {rate.quote} transfer at {rate.value}
        </p>
      ),
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Amount Sent",
      dataIndex: "amountSent",
      render: (amountSent) => (
        <p>
          {Money(amountSent && amountSent.value, amountSent && amountSent.currency)}
        </p>
      ),
    },{
      title: "Amount Received",
      dataIndex: "amountReceived",
      render: (amountReceived) => (
        <p>
          {Money(amountReceived && amountReceived.value, amountReceived && amountReceived.currency)}
        </p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="P2P Transaction" />
      )}
    </div>
  );
};

export const BillPaymentTab = ({ fetchTrans, transaction, handleAction }) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });
  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Bill Payed For",
      dataIndex: "details",
      render: (details) => (
        <p>
          {details && details.serviceName}
        </p>
      ),
    },{
      title: "Currency",
      dataIndex: "referenceCurrency"
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="Bill Payment" />
      )}
    </div>
  );
};

export const DepositsTab = ({ fetchTrans, transaction, handleAction }) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });
  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Reference",
      dataIndex: "trxReference",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="Deposits" />
      )}
    </div>
  );
};

export const WithdrawalsTab = ({ fetchTrans, transaction, handleAction }) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });

  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Bank Account",
      dataIndex: "bankAccount",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction && transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="Withdrawals" />
      )}
    </div>
  );
};

export const GiftCardTradesTab = ({
  fetchTrans,
  transaction,
  handleAction,
}) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });

  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  React.useEffect(() => {
    fetchTrans({ skip: 0, limit: 10 });
    // eslint-disable-next-line
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Card Code",
      dataIndex: "cardCode",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="Gift Card" />
      )}
    </div>
  );
};

export const BTCTradesTab = ({ fetchTrans, transaction, handleAction }) => {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: transaction && transaction.meta && transaction.meta.limit,
    total: transaction && transaction.meta && transaction.meta.count,
  });

  React.useEffect(() => {
    setPagination((pagination) => ({
      current: pagination.current,
      pageSize: transaction && transaction.meta && transaction.meta.limit,
      total: transaction && transaction.meta && transaction.meta.count,
    }));
    setLoading(false);
  }, [transaction]);

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      pagination,
    });
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (createdAt) => `${date(createdAt)}`,
    },
    {
      title: "Reference",
      dataIndex: "reference",
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Transaction Type",
      dataIndex: "transactionType",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "x",
      render: (id) => (
        <p style={{ cursor: "pointer" }} onClick={() => handleAction(id)}>
          View Details
        </p>
      ),
    },
  ];

  const fetch = async (params = {}) => {
    setLoading(true);
    await fetchTrans({
      skip: (params.pagination.current - 1) * params.pagination.pageSize,
      limit: params.pagination.pageSize,
    });
    setPagination({
      ...params.pagination,
      total: transaction.meta && transaction.meta.count,
    });
  };
  return (
    <div style={{ overflowX: "auto" }}>
      {transaction &&
      transaction.transactions &&
      transaction.transactions.length > 0 ? (
        <Table
          columns={columns}
          // rowKey={(record) => record.login.uuid}
          dataSource={transaction.transactions}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            total: transaction.meta && transaction.meta.count,
          }}
          loading={loading}
          onChange={handleTableChange}
        />
      ) : (
        <EmptyEntryWithTitle title="BTC" />
      )}
    </div>
  );
};

export const SuccessfulModal = ({
  onClick = () => {},
  title = "Payment Successful!",
  btnText = "Continue",
}) => {
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleCancel = () => {
    setIsModalVisible(false);
    onClick();
  };

  return (
    <>
      <Modal
        footer={null}
        title={null}
        centered={true}
        closable={false}
        // closeIcon={<GoBack />}
        visible={isModalVisible}
        onCancel={handleCancel}
      >
        <div className={styles.transactions__empty} style={{ height: 300 }}>
          <div
            className={styles.transactions__empty__content}
            style={{ marginTop: 50, width: "100%" }}
          >
            <span
              className={styles.transactions__empty__content__text}
              style={{ color: "#012169", fontWeight: "bold" }}
            >
              {title}
            </span>
            <RocketIcon className={styles.transactions__empty__content__eye} />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                marginTop: 50,
              }}
            >
              <Button
                text={btnText}
                onClick={() => {
                  handleCancel();
                  onClick();
                }}
                form="full"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export const TransactionEntry = ({ color }) => {
  return (
    <div className={styles.transactions__entry}>
      <div className={styles.transactions__entry__left}>
        <div
          className={`${styles.transactions__entry__badge} ${styles[color]}`}
        >
          <TransactionIcon />
        </div>
        <div className={styles.transactions__entry__info}>
          <span className={styles.transactions__entry__info__main}>Wallet</span>
          <span className={styles.transactions__entry__info__sub}>
            Nov 12, 2020
          </span>
        </div>
      </div>
      <div className={styles.transactions__entry__amount}>$4,500</div>
    </div>
  );
};

export const EmptyEntry = () => {
  return (
    <div className={styles.transactions__empty}>
      <div className={styles.transactions__empty__content}>
        <Eye className={styles.transactions__empty__content__eye} />
        <span className={styles.transactions__empty__content__text}>
          No withdrawals here, yet
        </span>
        <div
          className={styles.transactions__empty__content__info}
          style={{ cursor: "pointer" }}
        >
          <span>Top up your account</span>
          <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export const EmptyEntryWithTitle = ({
  title,
  action = true,
  onClick = () => {},
  actionText = "Top up your account",
}) => {
  return (
    <div className={styles.transactions__empty} style={{ height: 300 }}>
      <div
        className={styles.transactions__empty__content}
        style={{ marginTop: 60 }}
      >
        <Eye className={styles.transactions__empty__content__eye} />
        <span className={styles.transactions__empty__content__text}>
          No {title} here, yet
        </span>
      </div>
    </div>
  );
};

function RocketIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="81"
      height="80"
      fill="none"
      viewBox="0 0 81 80"
    >
      <path fill="url(#pattern0)" d="M0.5 0H80.5V80H0.5z"></path>
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.00833)" xlinkHref="#image0"></use>
        </pattern>
        <image
          id="image0"
          width="120"
          height="120"
          xlinkHref="data:image/png;base64,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"
        ></image>
      </defs>
    </svg>
  );
}
