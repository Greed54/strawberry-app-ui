import {RouteComponentProps} from "react-router-dom";
import {ActionCreator} from "typescript-fsa";

export interface ContainerStore {
  selectedMenuItem: string;
}

export interface ContainerActions {
  selectMenuItem: ActionCreator<string>;
}

export interface ContainerProps extends RouteComponentProps, ContainerStore {
  actions: ContainerActions;
}

export interface ContainerState {
  collapsed: boolean;
  selectedMenuItem: string;
}
