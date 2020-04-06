import HttpClient from "./httpClient";

const headers = {'Content-Type': 'application/json'};
const restClient = new HttpClient({headers});

class CommandRest {
  endpoint?: string;

  constructor(endpoint?: string) {
    this.endpoint = endpoint;
  }

  public produce(commandName: string, record: any, logMeta: any = {}) {
    const recordJson = JSON.stringify(record);

    const url = `${this.endpoint}/api/${commandName}`;

    return restClient.post(logMeta, url, recordJson)
    .then((res: { data: any; }) => {
      return Promise.resolve(res.data);
    })
    .catch((error: any) => {
      return Promise.reject(error);
    })
  }
}

export default CommandRest;
