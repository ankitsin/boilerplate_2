import qs from 'qs';
import axios from 'axios';

const TIMEOUT = 60000;
function apiClient(url = '', httpMethod = 'get', params = {}, data = {}, headers = {}, cancelRequestToken = '') {
  return axios({
    url,
    timeout: TIMEOUT,
    method: httpMethod,
    data,
    headers,
    params,
    cancelToken: cancelRequestToken,
    paramsSerializer(param) {
      return qs.stringify(param, { arrayFormat: 'repeat' });
    }
  })
    .catch((error) => {
      throw error;
    });
}

export default apiClient;
