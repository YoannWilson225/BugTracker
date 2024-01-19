window.addEventListener('DOMContentLoaded', function () {
    let form = window['register-form'];

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        
        userName = this.username.value;
        userPassword = this.password.value;
        confirmPasswword = this.password_confirm.value;

        if (userPassword === confirmPasswword) {
            xhr.open('GET', `${url}/signup/${userName}/${userPassword}`);
            xhr.send();

            xhr.onload = function () {
                if (xhr.status != 200) {
                    console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
                    return;
                }

                let response = JSON.parse(xhr.response);

                if (response.result.status === 'done') {
                    let successMessage = document.getElementById('successmessage');
                    successMessage.style.display = 'block';
                    successMessage.innerHTML = `<p>Bienvenue ${userName}</p>`
                    window.localStorage.setItem(tokenName, `${response.result.id}_${userName}_${response.result.token}`);
                    setTimeout(function () {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                }

            };

            xhr.error = function () {
                console.log(xhr);
            };
        }else {
            let errorMessage = document.getElementById('errormessage');
            errorMessage.style.display = 'block';
        }
    });

});