import {Prisma} from "prisma-binding";
import {GraphQLServer} from "graphql-yoga";
import CommandRest from "./services/commandRest";
import HttpClient from "./services/httpClient";
import {formatParams, formatResponse} from "./helpers/logger";
import {Query} from "./resolvers/query";
import {Mutation} from "./resolvers/mutation";
import {
  COMMAND_REST_ENDPOINT,
  DEBUG,
  GRAPHQL_SERVER_PORT,
  PRISMA_ENDPOINT,
  PRISMA_SCHEMA_PATH,
  SERVER_SCHEMA_PATH
} from "./config/const";
import {Subscription} from "./resolvers/subscription";


const resolvers = {
  Query,
  Mutation,
  Subscription
};

const restClientConfig = {
  headers: {'Content-Type': 'application/json'},
};

const commandRest = new CommandRest(COMMAND_REST_ENDPOINT);
const restClient = new HttpClient(restClientConfig);

const db = new Prisma({
  typeDefs: PRISMA_SCHEMA_PATH,
  endpoint: PRISMA_ENDPOINT,
  debug: (DEBUG === 'true')
});

const server = new GraphQLServer({
  typeDefs: SERVER_SCHEMA_PATH,
  resolvers: resolvers,
  resolverValidationOptions: {
    requireResolversForResolveType: false
  },
  context: req => ({
    ...req,
    commandRest,
    restClient,
    db
  })
});

const options = {
  formatParams,
  formatResponse,
  port: GRAPHQL_SERVER_PORT,
  endpoint: '/graphql',
  subscriptions: {
    path: '/subscriptions',
    keepAlive: 15000,
    // onConnect: async (connectionParams) => {
    //   if (!connectionParams.headers || !connectionParams.headers.authorization) return false;
    //   const grant = await keycloak.getGrant(connectionParams);
    //   return grant;
    // },
  },
  playground: '/playground',
  bodyParserOptions: {limit: '10mb', type: 'application/json'},
};

server.express.use('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

server.start(options, ({port}) => console.log(`Server started, listening on port ${port} for incoming requests.`));
