import {actionCreatorFactory} from "typescript-fsa";
import {reducerWithInitialState} from "typescript-fsa-reducers";
import {ContainerStore} from "./types";

const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';
const actionCreator = actionCreatorFactory('container');

export const actions = {
  selectMenuItem: actionCreator<string>(SELECT_MENU_ITEM)
};

const initialState: ContainerStore = {
  selectedMenuItem: '31'
};

export default reducerWithInitialState<ContainerStore>(initialState)
.case(actions.selectMenuItem, (state, payload): ContainerStore => ({...state, selectedMenuItem: payload}));
