window.addEventListener('DOMContentLoaded', function () {
    
    xhr.open('GET', `${url}/list/${userToken}/${userId}`);
    xhr.send();

    xhr.onload = function () {
        if (xhr.status != 200) {
            console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
            return;
        }

        let response = JSON.parse(xhr.response);

        if (response.result.status === 'done') {
            let bugs = response.result.bug;

            let nbrBug = bugs.length;
            document.getElementById('nbrBug').textContent = nbrBug;

            let divNotBug = document.querySelector('.notBug');
                if(nbrBug <= 0){
                    divNotBug.style.display = 'block';
                }else {
                    divNotBug.style.display = 'none';
                }

            let nbrBugNonTraite = bugs.filter(bug => bug.state == 0).length;
            document.getElementById('nbrBugNonTraite').textContent = nbrBugNonTraite;

            let nbrBugEnCour = bugs.filter(bug => bug.state == 1).length;
            document.getElementById('nbrBugEncour').textContent = nbrBugEnCour;


            let nbrBugTraite = bugs.filter(bug => bug.state == 2).length;
            document.getElementById('nbrBugTraite').textContent = nbrBugTraite;

            // Récupérer la liste des utilisateurs

            xhr.open('GET', `${url}/users/${userToken}`);
            xhr.send();
           
            xhr.onload = function () {
                if (xhr.status != 200) {
                    console.error(`Erreur ${xhr.status} : ${xhr.statusText}`);
                    return;
                }
    
                let response = JSON.parse(xhr.response);
                
                if (response.result.status === 'done' ) {
  
                    let allUser = response.result.user;

                    const showUser = allUser.flatMap(function (current) {
                        return current;
       });

                bugs.forEach(bug => {

                    console.log(bug);

                    let tableBody = document.querySelector('.tablebody');

                    let timeStamp = bug.timestamp*1000;
                    const date= new Date(timeStamp);
                    dateFormat = date.toLocaleDateString('fr-FR',{
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'});

                        let BugId = bug.id;
                        let bugUserId= bug.user_id;

                        if (bug.state == 0) {                     
                            bug.state  = 'Non traité';
                            stateColor = 'danger';
                        }

                        if (bug.state  == 1) {
                            bug.state  = 'En cours';
                            stateColor = 'info';
                        }

                        if (bug.state  == 2) {
                            bug.state  = 'Traité';
                            stateColor = 'success';
                        }
                        
                    tableBody.innerHTML +=`
                        <tr>
                        <td><span class="bold">${bug.title}</span> <br> ${bug.description}</td>
                        <td>${dateFormat}</td>
                        <td>${showUser[bugUserId]}</td>
                        <td>
                        <a href="#" class="badge bg-${stateColor}" onclick="changeState(${BugId})" style="text-decoration:none;">${bug.state}</a>
                        </td>
                        <td>
                        <a href="#" class="btn btn-outline-danger" onclick="deleteBug(${BugId})">Supprimer</a></td>
                        </tr>`;

                    });   

                    console.log(response);
                }
            };
            
            xhr.error = function () {
                console.log(xhr);
            };

        }else{
            console.log('Bug liste non chargée')
        }
    };

    xhr.error = function () {
        console.log(xhr);
    };
});
