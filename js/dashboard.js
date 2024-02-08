window.addEventListener('DOMContentLoaded', function () {
    let logoutbtn = document.getElementById('logout');

    logoutbtn.onclick = function () {

        xhr.open('GET', `${url}/logout/${userToken}`);
        xhr.send();

        xhr.onload = function () {
            if (xhr.status != 200) {
                console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
                return;
            }

            let response = JSON.parse(xhr.response);

            if (response.result.status === 'done') {
                let logoutMessage = document.getElementById('logoutmessage');
                logoutMessage.style.display = 'block';
                window.localStorage.removeItem(tokenName);

                setTimeout(function () {
                    window.location.href = 'index.html';
                }, 1000);
            }else{
                alert('déconnexion impossible');
            }
        };

        xhr.error = function () {
            console.log(xhr);
        };
    };
});