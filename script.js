// Fonction pour masquer toutes les sections sauf une
function hideAllSections() {
    const allSections = document.querySelectorAll('section');
    allSections.forEach((section) => {
        section.style.display = 'none';
    });
}

// Écouteurs d'événements pour les balises <li> du menu
const menuItems = document.querySelectorAll('nav ul li');
menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', (event) => {
        // Obtenez l'ID de la section à afficher (basé sur l'attribut href)
        const sectionId = menuItem.querySelector('a').getAttribute('href').substring(1);
       
        console.log('Clic sur le menu. Section ID :', sectionId);
        hideAllSections();
        showSection(sectionId,true);
       
        // Empêchez le comportement par défaut du lien
        event.preventDefault();
    });
});

// Écouteur d'événements pour le lien "répondez à votre invitation"
const invitationLink = document.getElementById('invitation-link');
// Écouteur d'événements pour le lien "hebergement"
const hebergementLink = document.getElementById('hebergement-link');
// Écouteur d'événements pour le lien "hebergement"
const hebergementLink2 = document.getElementById('hebergement-link2');
// Écouteur d'événements pour le lien "déroulement"
const deroulementLink = document.getElementById('deroulement-link');

invitationLink.addEventListener('click', (event) => {
    // Obtenez l'ID de la section à afficher (basé sur l'attribut href)
    const sectionId = invitationLink.getAttribute('href').substring(1);

    console.log('Clic sur le lien. Section ID :', sectionId);
    hideAllSections();
    showSection(sectionId,true);

    // Empêchez le comportement par défaut du lien
    event.preventDefault();
});

hebergementLink.addEventListener('click', (event) => {
    // Obtenez l'ID de la section à afficher (basé sur l'attribut href)
    const sectionId = hebergementLink.getAttribute('href').substring(1);

    console.log('Clic sur le lien. Section ID :', sectionId);
    hideAllSections();
    showSection(sectionId,true);

    // Empêchez le comportement par défaut du lien
    event.preventDefault();
});

hebergementLink2.addEventListener('click', (event) => {
    // Obtenez l'ID de la section à afficher (basé sur l'attribut href)
    const sectionId = hebergementLink.getAttribute('href').substring(1);

    console.log('Clic sur le lien. Section ID :', sectionId);
    hideAllSections();
    showSection(sectionId,true);

    // Empêchez le comportement par défaut du lien
    event.preventDefault();
});


deroulementLink.addEventListener('click', (event) => {
    // Obtenez l'ID de la section à afficher (basé sur l'attribut href)
    const sectionId = deroulementLink.getAttribute('href').substring(1);

    console.log('Clic sur le lien. Section ID :', sectionId);
    hideAllSections();
    showSection(sectionId,true);

    // Empêchez le comportement par défaut du lien
    event.preventDefault();
});



// Masquer toutes les sections sauf la première au chargement de la page
document.addEventListener('DOMContentLoaded', function () {
    hideAllSections();
    showSection('accueil',true);
});

// Fonction pour afficher la section spécifiée
function showSection(sectionId,recordState) {
    const section = document.getElementById(sectionId);
    console.log('Affichage de la section. Section ID :', sectionId);
    section.style.display = 'block';

    // Masquer les autres sections
    const otherSections = document.querySelectorAll('section:not(#' + sectionId + ')');
    otherSections.forEach((otherSection) => {
        otherSection.style.display = 'none';
    });
    if (recordState){
        const newState = { page: sectionId }; // Remplacez cela par l'état que vous souhaitez enregistrer
        onAppStateChange(newState);
        console.log('Nouvel état de l\'application :', newState);
    }
}

// Compte à rebours pour la section Accueil
const weddingDate = new Date('2025-05-03T00:00:00');
const countdownElement = document.getElementById('countdown');

function updateCountdown() {
    // Vérifie si la section "Accueil" est actuellement affichée
    const accueilSection = document.getElementById('accueil');
    if (accueilSection.style.display === 'block') {
        const currentDate = new Date();
        const timeDifference = weddingDate - currentDate;

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        console.log('Mise à jour du compte à rebours. Jours :', days, 'Heures :', hours, 'Minutes :', minutes, 'Secondes :', seconds);
        countdownElement.textContent = `${days} jours ${hours} heures ${minutes} minutes ${seconds} secondes`;
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

function toggleSlide() {
    const slider = document.querySelector('.slider');
    slider.classList.toggle('slide-active');
 
    // Ajoutez le code pour basculer l'affichage des champs supplémentaires
    const additionalFields = document.getElementById('additionalFields');
    additionalFields.style.display = slider.classList.contains('slide-active') ? 'block' : 'none';
}


// Écouteur d'événement pour le changement du nombre de participants
const nombreParticipantsSelect = document.getElementById('nombre-participants');
const agesParticipantsContainer = document.getElementById('ages-participants');


nombreParticipantsSelect.addEventListener('change', () => {
    const nombreParticipants = parseInt(nombreParticipantsSelect.value);
    createAgesInputs(nombreParticipants);
});

// Liste des tranches d'âge prédéfinies
const tranchesAge = ['0-3 ans', '3-10 ans', '10-18 ans', 'Adulte'];
// Liste des types de menu prédéfinies
const typesRepas = ['Tout','Hallal', 'Casher', 'Végétarien'];
       


// Fonction pour créer les champs d'âge en fonction du nombre de participants
function createAgesInputs(nombreParticipants) {
    // Supprimer les champs d'âge existants s'il y en a
    while (agesParticipantsContainer.firstChild) {
        agesParticipantsContainer.removeChild(agesParticipantsContainer.firstChild);
    }


    // Créer les nouveaux champs d'âge en fonction de la liste prédéfinie
    for (let i = 1; i < nombreParticipants; i++) {
       
        const nomLabel = document.createElement('label');
        nomLabel.textContent = `Nom du participant ${i + 1}:`;

        const nomInput = document.createElement('input');
        nomInput.type = 'text';
        nomInput.name = 'nom-participant-' + (i + 1);

        const prenomLabel = document.createElement('label');
        prenomLabel.textContent = `Prénom du participant ${i + 1}:`;

        const prenomInput = document.createElement('input');
        prenomInput.type = 'text';
        prenomInput.name = 'prenom-participant-' + (i + 1);

        const ageLabel = document.createElement('label');
        ageLabel.textContent = `Tranche d'âge du participant ${i + 1}:`;

        const ageSelect = document.createElement('select');
        ageSelect.name = 'age-participant-' + (i + 1);

        // Ajouter les options de tranche d'âge
        tranchesAge.forEach((tranche) => {
            const option = document.createElement('option');
            option.value = tranche;
            option.textContent = tranche;
            ageSelect.appendChild(option);
        });


     /*   const typeRepasLabel = document.createElement('label');
        typeRepasLabel.textContent = `Type de repas du participant ${i+1}:`;

        const typeRepasSelect = document.createElement('select');
        typeRepasSelect.name = `type-repas-participant-${i+1}`;
        typeRepasSelect.className = 'type-repas-select';

        // Ajouter les options de type de repas
        typesRepas.forEach((type) => {
            const option = document.createElement('option');
            option.value = type.toLowerCase();
            option.textContent = type;
            typeRepasSelect.appendChild(option);
        } );  */


        agesParticipantsContainer.appendChild(nomLabel);
        agesParticipantsContainer.appendChild(nomInput);
        agesParticipantsContainer.appendChild(prenomLabel);
        agesParticipantsContainer.appendChild(prenomInput);
        agesParticipantsContainer.appendChild(ageLabel);
        agesParticipantsContainer.appendChild(ageSelect);
     //   agesParticipantsContainer.appendChild(typeRepasLabel);
     //   agesParticipantsContainer.appendChild(typeRepasSelect);
        agesParticipantsContainer.appendChild(document.createElement('br'));
   
       
       
    }
}

// Appel initial pour créer les champs d'âge en fonction de la valeur initiale
//(parseInt(nombreParticipantsSelect.value));


// Écouteur d'événement pour le bouton "Envoyer"
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', handleFormSubmission);

function handleFormSubmission() {

    // Récupérer la valeur du slider
    const slider = document.querySelector('.slider');
    const participateValue = slider.classList.contains('slide-active') ? true : false;
    console.log('Le participant a repondu:' + participateValue);

    const nom = document.getElementById('nom').value;
    const prenom = document.getElementById('prenom').value;
    let nombreParticipants = document.getElementById('nombre-participants').value;
    //let typeRepasRef = "";
    const tranchesAge = [];
    brunchValue = "";
    couchageValue = "";
    message = "None";



    // Si le toggle est à "oui", procéder à la validation des autres champs
    if (participateValue) {
        // Récupérer les valeurs du formulaire
        participe = 'oui';
        // Get the selected brunch value
        brunchValue = document.querySelector('input[name="brunch"]:checked').value;

        // Get the selected sleeping type value
        couchageValue = document.querySelector('input[name="couchage"]:checked').value;



        // Récupérer la valeur du type de repas
      //  const typeRepasSelect = document.getElementById('type-repas');
      //  typeRepasRef = typeRepasSelect.value;
        const agesInputs = document.querySelectorAll('#ages-participants select[name^="age-participant-"]');
        const nomInputs = document.querySelectorAll('#ages-participants input[name^="nom-participant-"]');
        const prenomInputs = document.querySelectorAll('#ages-participants input[name^="prenom-participant-"]');
        const repasParticipants = document.querySelectorAll('#ages-participants select[name^="type-repas-participant-"]');
        console.log('Contenu de agesInputs :', agesInputs);

        message = document.getElementById('message').value;

        agesInputs.forEach((ageInput,index) => {
            const nom = nomInputs[index].value;
            const prenom = prenomInputs[index].value;
            const age = ageInput.value;
         //   const typeRepas = repasParticipants[index].value;

            // Concaténer prénom, nom et âge et ajouter au tableau tranchesAge
            tranchesAge.push(`${nom} ${prenom} ${age}`);
           
        });
    }else{
        // Si le toggle est à "non", ne pas valider le reste du formulaire
        console.log('Le participant a choisi de ne pas participer au mariage.');
        participe = 'non';
        nombreParticipants = '0';
        brunchValue = 'Non';
        couchageValue = 'Non';
        tranchesAge.push(`'None'`);
        message = 'None';

    }




    // Construire l'objet avec les données du formulaire
    const formData = {
        participe: participe,
        nom: nom,
        prenom: prenom,
    //    repas: typeRepasRef,
        brunch: brunchValue,
        couchage: couchageValue,
        nombreParticipants: nombreParticipants,
        tranchesAge: tranchesAge,
        message: message
    };

    // Appeler la fonction pour envoyer les données au serveur
    sendFormData(formData);
}

// Fonction pour envoyer les données du formulaire au serveur
function sendFormData(formData) {
    const xhr = new XMLHttpRequest();
    const url = 'save-form-data.php'; // Remplacez cela par le chemin de votre script PHP

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(formData));
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('Données du formulaire envoyées avec succès !');
            // Masquer le formulaire
            const form = document.getElementById('invitation-form');
            form.style.display = 'none';
           

            // Afficher le message de confirmation
            const confirmationMessage = document.getElementById('confirmation-message');
            confirmationMessage.style.display = 'block';
        }
    };

   
}

/// Lorsque l'état de votre application change
 function onAppStateChange(newState) {
     // Ajoutez une nouvelle entrée à l'historique du navigateur
     history.pushState(newState, '');
 }

 // Lorsque le bouton de retour du navigateur est cliqué
 window.addEventListener('popstate', function(event) {
     // Récupérez l'état de l'application à partir de l'événement
     console.log('Événement de retour du navigateur.');
     const previousState = event.state;
     console.log('Événement de retour du navigateur. État précédent :', previousState, previousState.page);
     // Mettez à jour votre application en fonction de l'état précédent
     if (previousState && previousState.page) {
         const previousPage = previousState.page;
         console.log('Retour à la page précédente :', previousPage);
         // Affichez la section correspondante
         showSection(previousPage,false);
     }
 });