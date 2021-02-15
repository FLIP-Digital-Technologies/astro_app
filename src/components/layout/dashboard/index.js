import React, { useState } from "react";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  CaretDown,
  // Profile,
  Power,
  LogoNav,
} from "../../../assets/svg";
import { navigation } from "./data";
// import { history } from "../../../redux/store";

import styles from "./styles.module.scss";
import { logOutUser } from "../../../redux/actions/Auths";

const { Header, Content, Sider } = Layout;

function Toggle() {
  return (
    <span role="img" aria-label="bars" className="anticon anticon-bars">
      <svg
        viewBox="0 0 1024 1024"
        focusable="false"
        data-icon="bars"
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"></path>
      </svg>
    </span>
  );
}

const DashboardLayout = ({ children, bg, user, logout }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);

  let location = useLocation();
  const { pathname } = location;

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        trigger={null}
        collapsed={showSideBar}
        onBreakpoint={(broken) => {
          setShowSideBar(broken);
        }}
        width={300}
        style={{
          overflow: "auto",
          height: "100vh",
          //   position: "fixed",
          //   left: 0,
          backgroundColor: "#00519e",
        }}
      >
        {/* <LogoWhite className={styles.logo} /> */}
        <div className={styles.logo}>
          <LogoNav />
        </div>
        <Menu
          style={{
            backgroundColor: "#00519e",
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
        >
          {navigation &&
            navigation.map(({ Icon, Name, route }) => (
              <Menu.Item key={route} icon={<Icon />}>
                <Link to={route}>{Name}</Link>
              </Menu.Item>
            ))}
        </Menu>
      </Sider>
      <Layout
        className="site-layout"
        style={
          bg ? { backgroundColor: "#fff", minWidth: 300 } : { minWidth: 300 }
        }
      >
        <Header className="site-layout-background" style={{ padding: 0 }}>
          <div className={styles.header}>
            <div
              className={styles.header__left}
              style={{ display: "flex", alignItems: "center" }}
            >
              <div
                style={{ cursor: "pointer" }}
                id={styles.header__left_toggler}
                onClick={() => setShowSideBar(!showSideBar)}
              >
                <Toggle />
              </div>
              {/* {generateRoute(pathname)} */}
            </div>
            <div className={styles.header__right}>
              {/* <Bell /> */}
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <div className={styles.header__right__avatar}>{`${
                  (user && user.firstName[0]) || `-`
                } ${(user && user.lastName[0]) || `-`}`}</div>
                <div className={styles.header__right__name}>{`${
                  (user && user.firstName) || `-`
                } ${(user && user.lastName) || `-`}`}</div>
                <CaretDown />
                {showDropDown && (
                  <div
                    className={styles.dropDown}
                    style={{
                      top: 50,
                      backgroundColor: "#fff",
                      right: 20,
                      boxShadow: "4px 19px 20px 5px #cecece",
                      zIndex: 9,
                    }}
                  >
                    <div
                      style={{
                        padding: "0px 15px",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                      }}
                      onClick={() => logout()}
                    >
                      <Power /> <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Header>
        <Content style={{ padding: "24px 10px 0", overflowY: "auto" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => {
    dispatch(logOutUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLayout);
