import api from './api';

export function submitThought(entry){
  return api.post('/overthinking', entry);
}
