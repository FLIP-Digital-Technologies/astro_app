import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const CustomRoute = (props) => {
  const profileCompletion = localStorage.getItem("pinCheck");
  const [returnedRoute, setReturnedRoute] = useState("");
  useEffect(() => {
    // console.log('df',profileCompletion)
    switch (props.condition) {
      case "completeRegistration":
        return setReturnedRoute(
          profileCompletion ? (
            <Route {...props} />
          ) : (
            <Redirect to="/app/onboarding" />
          )
        );
      case "buyGiftcard":
        return setReturnedRoute(
          profileCompletion === true ? (
            <Route {...props} />
          ) : (
            <Redirect to="/app/onboarding" />
          )
        );
      case "sellGiftcard":
        return setReturnedRoute(
          profileCompletion === true ? (
            <Route {...props} />
          ) : (
            <Redirect to="/app/onboarding" />
          )
        );
      case "bills":
        return setReturnedRoute(
          profileCompletion === true ? (
            <Route {...props} />
          ) : (
            <Redirect to="/app/onboarding" />
          )
        );
      default:
        return setReturnedRoute(<Route {...props} />);
    }
    // eslint-disable-next-line
  }, [props.user, props.path]);
  return (<>
  {returnedRoute}
  
  </>);
};

const mapStateToProps = (state) => ({
    user: state.user.user,
    loading: state.user.loading
});
export default connect(mapStateToProps, null)(CustomRoute);
