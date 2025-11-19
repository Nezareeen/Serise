import api from './api';

export function logEnergy(data){
  return api.post('/energy', data);
}
