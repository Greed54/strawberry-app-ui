import path from 'path';
import {config} from "dotenv-safe";
config({
  path: process.env.DOT_CONFIG ? `.${process.env.DOT_CONFIG}.env` : '.dev.env',
});

const {
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  COMMAND_REST_ENDPOINT,
  DEBUG
} = process.env;

const PRISMA_SCHEMA_PATH = path.resolve(__dirname, '..', 'generated', 'prisma.graphql');
const SERVER_SCHEMA_PATH = path.join(__dirname, '..', 'schema.graphql');
const SERVER_EXTEND_SCHEMA_PATH = path.join(__dirname, '..', 'extend-schema.graphql');
const GRAPHQL_SERVER_PORT = 4001;

export {
  PRISMA_ENDPOINT,
  PRISMA_SECRET,
  COMMAND_REST_ENDPOINT,
  DEBUG,
  PRISMA_SCHEMA_PATH,
  SERVER_SCHEMA_PATH,
  SERVER_EXTEND_SCHEMA_PATH,
  GRAPHQL_SERVER_PORT
}
