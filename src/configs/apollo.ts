import {ApolloClient, DefaultOptions} from 'apollo-client';
import {createUploadLink} from 'apollo-upload-client';
import {WebSocketLink} from 'apollo-link-ws';
import {SubscriptionClient} from 'subscriptions-transport-ws';
import {onError} from "apollo-link-error";
import {split, from} from 'apollo-link';
import {store} from "./store";
import {FragmentDefinitionNode, OperationDefinitionNode} from "graphql";
import {getMainDefinition} from "apollo-utilities";
import {InMemoryCache} from "apollo-cache-inmemory";

type DefinitionNode = FragmentDefinitionNode | OperationDefinitionNode;

// @ts-ignore
const {GRAPHQL_ENDPOINT, WEBSOCKET_TYPE} = window.ENV;
const {hostname, port} = new URL(GRAPHQL_ENDPOINT);

const httpLink = createUploadLink({
  uri: `${GRAPHQL_ENDPOINT}/graphql`,
});

const wsClient = new SubscriptionClient(`${WEBSOCKET_TYPE}://${hostname}:${port}/subscriptions`, {
  reconnect: true,
  timeout: 30000,
  lazy: true,
  // connectionParams: async () => {
  //   const token = await getToken();
  //   return {
  //     headers: {
  //       authorization: `Bearer ${token}`,
  //     },
  //   };
  // },
  inactivityTimeout: 0,
});

const wsLink = new WebSocketLink(wsClient);

const errorLink = onError(({graphQLErrors}) => {
  if (graphQLErrors) {
    store.dispatch({
      type: 'global/ERROR',
      payload: {
        message: graphQLErrors.map(({message}) => `[GraphQL error]: Message: ${message}`),
      },
    });
  }
});

const link = from([
  errorLink,
  split(
      // split based on operation type
      ({query}) => {
        const definition: DefinitionNode = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink,
  ),
]);

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  mutate: {
    errorPolicy: 'ignore',
  },
};

const client = new ApolloClient({
  link,
  defaultOptions,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',
});

export {client}
