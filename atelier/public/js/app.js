// Point d'entrée de la page Cap Web.
const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');

formulaire.addEventListener('submit', (evenement) => {
  // Pas de rechargement : la page reste en place.
  evenement.preventDefault();
  statut.textContent = 'Interface prête.';
});
