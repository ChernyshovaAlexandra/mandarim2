import React from "react";
import { connect } from "react-redux";
import {
} from "./store/actions";

export const Hoc = (Components) => {
  const mapStateToProps = (state) => ({ state });
  const mapDispatchToProps = (dispatch) => {
    return {
     
    };
  };

  class HOComponent extends React.Component {
    render() {
      return <Components {...this.props} />;
    }
  }
  return connect(mapStateToProps, mapDispatchToProps)(HOComponent);
};
