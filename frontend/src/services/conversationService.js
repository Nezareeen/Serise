import api from './api';

export function fetchConversations(){
  return api.get('/conversations');
}
