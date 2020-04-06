import {Store} from "../../types/store";
import React from 'react';
import {bindActionCreators, compose} from "redux";
import {actions} from "./duck";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import Container from "./Container";
import {ContainerActions} from "./types";

const mapStateToProps = (state: Store) => ({
  selectedMenuItem: state.container.selectedMenuItem
});

const containerActions: ContainerActions = {
  selectMenuItem: actions.selectMenuItem
};

const mapDispatchToProps = (dispatch: any) => ({
  actions: bindActionCreators(containerActions as any, dispatch)
});

export default compose(
    withRouter,
    connect(
        mapStateToProps,
        mapDispatchToProps
    )
)(Container) as React.ComponentType;
