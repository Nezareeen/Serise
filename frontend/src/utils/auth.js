export function setToken(token){
  if(token) localStorage.setItem('serise_token', token);
}
export function getToken(){
  return localStorage.getItem('serise_token');
}
export function clearToken(){
  localStorage.removeItem('serise_token');
}
export function isAuthenticated(){
  return !!getToken();
}
