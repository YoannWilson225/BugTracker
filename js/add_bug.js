window.addEventListener('DOMContentLoaded', function () {

    let addBtn = document.getElementById('add');

    addBtn.addEventListener('click', function (e) {
         
        title = document.getElementById('title').value;
        description = document.getElementById('description').value;

        if (title == '' || description == '') {
            let videMessage = 'Veuillez remplir tous les champs avant de soumettre ';
            let alertVideMessage = document.getElementById('videInput');
            alertVideMessage.textContent = videMessage;
            alertVideMessage.style.display = 'block';
            setTimeout(() => {
                alertVideMessage.style.display = 'none';
            }, 1000);
        }else {

        let data = {title, description};

        xhr.open('POST', `${url}/add/${userToken}/${userId}`);
    
        xhr.send(JSON.stringify(data));

        xhr.onload = function () {
            if (xhr.status != 200) {
                console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
                return;
            }

            let response = JSON.parse(xhr.response);
            
            if (response.result.status === 'failure') {
                console.log('bug non ajouté');
            }
            else if (response.result.status === 'done') {
                let sucess = 'Ce bug a bien été ajouté !';
            let alertSucess = document.getElementById('addsuccess');
            alertSucess.textContent = sucess;
            alertSucess.style.display = 'block'; 
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                 }, 1200);
            }
        };

        xhr.error = function () {
            console.log(xhr);
        };
        }
    });

});