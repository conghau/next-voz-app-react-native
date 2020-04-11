import { requestWithAuth } from "../utils/request";

export const loginAction = ({ username, password }) => {
  return requestWithAuth().post('/voz/login', { username, password });
};

export const getTheadDetail = ({ threadId, currentPage }) => {
  return requestWithAuth().get(`/voz/thread-detail?thread=${threadId}&page=${currentPage}`)
};
export const getTheadDetailXfToken = ({ threadId }) => {
  return requestWithAuth().get(`/voz/thread-detail-xf-token?thread=${threadId}`)
};

export const postReply = (data) => {
  return requestWithAuth().post(`/voz/post/reply`, data)
}
