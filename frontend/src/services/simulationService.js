import api from './api';

export function startSimulation(payload){
  return api.post('/simulate', payload);
}
