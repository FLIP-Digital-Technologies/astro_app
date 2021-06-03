import React, { useState } from "react";
import { connect } from "react-redux";
import { Layout, Menu, 
  // Avatar
 } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  CaretDown,
  // Profile,
  Power,
  // LogoNav,
  AstroLogoNav,
  AstroLogoWhite,
  // AstroLogoFull,
} from "../../../assets/svg";
import { navigation } from "./data";
// import { history } from "../../../redux/store";

import styles from "./styles.module.scss";
import { logOutUser } from "../../../redux/actions/Auths";
import capitalizeFirstLetter from "../../../utils/helper";

const { Header, Content, Sider, 
  Footer
 } = Layout;

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

function getWindowDimensions() {
  const { screen } = window;
  let width = screen.width;
  let height = screen.height;
  return {
    width,
    height,
  };
}

const DashboardLayout = ({ children, bg, user, logout }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showSideBar, setShowSideBar] = useState(true);
  // const [collapsed, setCollapsed] = useState(false);
  const [windowDimensions,] = useState(
    getWindowDimensions()
  );

  let location = useLocation();
  const { pathname } = location;

  const toggle = () => {
    setShowSideBar(!showSideBar);
  };

  return (
    <Layout>
      {console.log("dimension", windowDimensions)}
      <Sider
        breakpoint="lg"
        collapsedWidth={windowDimensions.width < 866 ? "0" : "80"}
        // defaultCollapsed={true}
        // trigger={React.createElement(
        //   showSideBar ? MenuUnfoldOutlined : MenuFoldOutlined,
        //   {
        //     className: "trigger",
        //     onClick: toggle,
        //     style: { backgroundColor: "transparent" },
        //   }
        // )}
        trigger={null}
        onCollapse={toggle}
        collapsed={showSideBar}
        onBreakpoint={(broken) => {
          setShowSideBar(broken);
        }}
        width={230}
        style={{
          overflow: "auto",
          height: "100vh",
          //   position: "fixed",
          //   left: 0,
          backgroundColor: "#890F3C",
        }}
      >
        <div className={styles.logo}>
          {/* <AstroLogoWhite /> */}
          <AstroLogoNav/>
        </div>
        <Menu
          style={{
            backgroundColor: "#890F3C",
          }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
        >
          {navigation &&
            navigation.map(({ Icon, Name, route }) => (
              <Menu.Item key={route} icon={<Icon style={{ fontSize: 24 }} />}>
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
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "#F7F4F4" }}
        >
          <div className={styles.header}>
            <div
              className={styles.header__left}
              style={{ display: "flex", alignItems: "center" }}
            >
              {windowDimensions.width < 866 && (
                <div
                  style={{ cursor: "pointer", fontSize:20, color:'#921946' }}
                  id={styles.header__left_toggler}
                  onClick={() => setShowSideBar(!showSideBar)}
                >
                  <Toggle />
                </div>
              )}
            </div>
            <div className={styles.header__right}>
              <div
                style={{ display: "flex", alignItems: "center" }}
                onClick={() => setShowDropDown(!showDropDown)}
              >
                <div className={styles.header__right__avatar}>{`${
                  (user && user.Profile.first_name[0].toUpperCase()) || `-`
                } ${
                  (user && user.Profile.last_name[0].toUpperCase()) || `-`
                }`}</div>
                <div className={styles.header__right__name}>{`${
                  (user && capitalizeFirstLetter(user.Profile.first_name)) ||
                  `-`
                } ${
                  (user && capitalizeFirstLetter(user.Profile.last_name)) || `-`
                }`}</div>
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
                        display: "flex",
                        alignItems: "center",
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

        <Content
          style={{
            padding: "0px 0px 0",
            overflowY: "auto",
            backgroundColor: "#F7F4F4",
            // maxWidth:"100%"
          }}
        >
          {children}
        </Content>
        {/* <Footer>
        <footer className="footer">
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${'Astro africa'}`}</span> All rights reserved.</span>
			<div>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Term & Conditions</a>
				<span className="mx-2 text-muted"> | </span>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Privacy & Policy</a>
			</div>
		</footer>
        </Footer> */}
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
