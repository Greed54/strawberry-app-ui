import moment from "moment";
import winston from "winston";
import { v1 as uuidv1 } from 'uuid';

const timeStampFormat = 'YYYY-MM-DD HH:mm:ss.SSS';

export interface LoggerParams {
  context: any;
  operationName: string;
}

const transports = [
  new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    humanReadableUnhandledException: true,
    prettyPrint: true,
    timestamp: () =>
        moment.utc().format(timeStampFormat),
    formatter: (options) => {
      const {meta: {operationName}, level, message, timestamp} = options;
      return `${timestamp()} | ${level.toUpperCase()} | Thread-1 | ${operationName} | ${message || ''}`;
    },
  }),
];

const Logger = new winston.Logger({transports});

const createMessage = (meta: any, data?: any) => {
  return `${meta ? `meta: ${JSON.stringify(meta)}` : ''} ${data ? `data: ${JSON.stringify(data)}` : ''}`;
};

const formatParams = (params: LoggerParams) => {
  const {request, user} = params.context;
  const {body} = request;
  const {operationName, variables} = body;
  const username = user && user.username;
  const meta = {
    requestId: uuidv1(),
    user: username,
  };
  const requestStartTime = moment.utc();
  Logger.log(
      'info',
      `BFF Request (${createMessage(meta, variables)})`,
      {operationName},
  );
  return {
    ...params,
    operationName,
    context: {...params.context, meta: {...meta, requestStartTime, operationName}},
  };
};

const formatResponse = (res: any, params: LoggerParams) => {
  const {errors, data} = res;
  const {operationName, context} = params;
  const {meta} = context;
  const {requestStartTime, user, requestId} = meta;
  if (!errors && data) {
    const requestEndTime = moment.utc();
    const requestTime = requestEndTime.diff(requestStartTime, 'milliseconds');
    const resMeta = {
      requestId,
      user,
      requestTime: `${requestTime} ms`,
    };
    Logger.log(
        'info',
        `BFF Response (${createMessage(resMeta)})`,
        {operationName},
    );
  }
  if (errors) {
    const {message, locations} = errors[0];
    const errorMeta = {
      requestId,
      user,
      message,
      locations,
    };
    Logger.log(
        'error',
        `BFF Error (${createMessage(errorMeta)})`,
        {operationName},
    );
  }

  return res;
};

export {Logger, createMessage, formatParams, formatResponse}
