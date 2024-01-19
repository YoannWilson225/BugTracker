let xhr = new XMLHttpRequest();
let url = new URL('https://greenvelvet.alwaysdata.net/bugTracker/api');
let userId, userName, userPassword, userToken, title, description;
const tokenName = 'bugTracker_token';

window.addEventListener('DOMContentLoaded', function() {
    if (window.localStorage.getItem(tokenName)) {

        [userId, userName, userToken] = window.localStorage.getItem(tokenName).split('_');
  
      }
      else if (window.location.href.includes('dashboard.html')) {
          window.location.href = 'index.html';
      }
})