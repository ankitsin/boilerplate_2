import apiClient from './axios';
export const routes = {
  getTodo: `/getTodo.json`
};
export function getTodo(params) {
  return apiClient(routes.getTodo, 'get', params);
}
