window.addEventListener('DOMContentLoaded', function () {

    let lastActivity = Date.now();
function resetActivity() {
    lastActivity = Date.now();
}

  window.addEventListener("mousemove", resetActivity);
  window.addEventListener("keypress", resetActivity);

  setInterval(() => {
    const now = Date.now();
    const timeSinceLastActivity = now - lastActivity;
    const maxInactivityTime = 1200000; // 20 minutes
    
    if (timeSinceLastActivity > maxInactivityTime) {
      // L'utilisateur est inactif
      window.localStorage.removeItem(tokenName);
      window.location.href = "index.html";
    }
    else if (timeSinceLastActivity < 1000) {
        // L'événement a été enregistré il y a moins d'une seconde, ignorez-le
        return;
    }
  },1000);
    
        xhr.open('GET', `${url}/list/${userToken}/0`);
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

           let tableBody = document.querySelector('.tablebody');

                    bugs.forEach(bug => {

                        console.log(bug);

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
                            <td>${showUser[bug.user_id]}</td>
                            <td>
                            <a href="#" class="badge bg-${stateColor}" onclick="changeState(${BugId})" style="text-decoration:none;">${bug.state}</a>
                            </td>
                            <td>
                            <a href="#" class="btn btn-outline-danger" onclick="deleteBug(${BugId})">Supprimer</a></td>
                            </tr>`;
                        });   

                        console.log(response);
                        
                        if (response.result.user.includes(userName)) {
                            if (!window.location.href.includes('dashboard.html')) {
                                window.location.href = 'dashboard.html';
                            }
                        }
                        else {
                            window.localStorage.removeItem(tokenName);
                            
                            if (!window.location.href.includes('index.html')) {
                                window.location.href = 'index.html';
                            }
                        }
                    }
                };
                
                xhr.error = function () {
                    console.log(xhr);
                };
   
            }else{
                console.log('Bug liste non chargée')
            }
        };

        xhr.timeout = 1200000;

        xhr.error = function () {
            console.log(xhr);
        };
   });
    