import React from "react";
import { withRouter } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

class RouterFixComp extends React.Component<any, {}> {
  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

const RouterFix = withRouter(RouterFixComp);

export const RouterFixed: React.FunctionComponent = ({ children }) => (
  <RouterFix>{children}</RouterFix>
);
