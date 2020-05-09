import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {history} from './configs/history';
import {theme, ThemeProvider} from './configs/theme';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import TeamManagement from "./scenes/content/teammanagement/TeamsManagementContainer";
import SalaryManagement from "./scenes/content/salarymanagement/SalaryManagement";
import {Provider} from "react-redux";
import {store} from "./configs/store";
import WrapperContainer from "./scenes/container/WrapperContainer";
import {ApolloProvider} from 'react-apollo';
import {client} from "./configs/apollo";
import WorkDays from "./scenes/content/workdays/WorkDaysContainer";

class App extends React.Component {
  render() {
    return (
        <Provider store={store}>
          <Router history={history}>
            <ThemeProvider theme={theme}>
              <ApolloProvider client={client}>
                <WrapperContainer>
                  <Switch>
                    <Route path="/workdays" component={WorkDays}/>
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
