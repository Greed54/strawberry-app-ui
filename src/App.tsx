import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {history} from './configs/history';
import {theme, ThemeProvider} from './configs/theme';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import WorkDays from "./scenes/content/workdays/WorkDays";
import {Employee} from "./scenes/content/workdays/types";
import TeamManagement from "./scenes/content/teammanagement/TeamsManagementContainer";
import SalaryManagement from "./scenes/content/salarymanagement/SalaryManagement";
import {Provider} from "react-redux";
import {store} from "./configs/store";
import WrapperContainer from "./scenes/container/WrapperContainer";
import { ApolloProvider } from 'react-apollo';
import {client} from "./configs/apollo";

const employees: Array<Employee> =
    [{
      coreId: "1",
      name: "morgane",
      team: "team 1",
      boxes: 10,
      kilograms: 90,
      salary: "270",
      cardId: "ffgg",
      weightNumber: "1, 2"
    },
      {
        coreId: "2",
        name: "morgane",
        team: "team 1",
        boxes: 10,
        kilograms: 90,
        salary: "270",
        cardId: "ffgg",
        weightNumber: "1, 2"
      },
      {
        coreId: "3",
        name: "morgane",
        team: "team 1",
        boxes: 10,
        kilograms: 90,
        salary: "270",
        cardId: "ffgg",
        weightNumber: "1, 2"
      }]
;


class App extends React.Component {

  render() {
    return (
        <Provider store={store}>
          <Router history={history}>
            <ThemeProvider theme={theme}>
              <ApolloProvider client={client}>
              <WrapperContainer>
                <Switch>
                  <Route path="/workdays" component={() => <WorkDays employees={employees} isAllGroupsOpen={false}/>}/>
                  <Route path="/teamsmanagement/" component={TeamManagement}/>
                  <Route path="/salarymanagement/" component={SalaryManagement}/>
                  <Redirect to="/workdays"/>
                </Switch>
              </WrapperContainer>
              </ApolloProvider>
            </ThemeProvider>
          </Router>
        </Provider>
    );
  }
}

export default App;
