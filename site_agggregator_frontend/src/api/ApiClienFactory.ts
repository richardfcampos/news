import IApiClient from './IApiClient';
import AxiosApiClient from './AxiosApiClient';

class ApiClientFactory {
  static createApiClient(): IApiClient {
    return new AxiosApiClient();
  }
}

export default ApiClientFactory;
