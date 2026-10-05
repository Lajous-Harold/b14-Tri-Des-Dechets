// Point d'entrée de la page Cap Web.
const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');

formulaire.addEventListener('submit', (evenement) => {
  // Pas de rechargement : la page reste en place.
  evenement.preventDefault();
  statut.textContent = 'Interface prête.';
});

// Boutons de questions : un clic copie la question dans le champ, sans l'envoyer.
const champ = document.querySelector('#message');
const suggestions = document.querySelector('#suggestions');

suggestions.addEventListener('click', (evenement) => {
  const bouton = evenement.target.closest('button');
  if (!bouton) return;
  champ.value = bouton.textContent;
  champ.focus();
  statut.textContent = 'Question copiée : modifiez-la ou envoyez-la.';
});
