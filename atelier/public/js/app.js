// Point d'entrée de la page Cap Web.
const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');

formulaire.addEventListener('submit', (evenement) => {
  // Pas de rechargement : la page reste en place.
  evenement.preventDefault();
  const texte = champ.value.trim();
  if (texte === '') {
    statut.textContent = 'Écrivez un message avant d’envoyer.';
    champ.focus();
    return;
  }
  const ligne = document.createElement('li');
  // textContent : le message reste du texte, jamais du HTML.
  ligne.textContent = `Vous : ${texte}`;
  liste.append(ligne);
  champ.value = '';
  statut.textContent = '';
});

// Boutons de questions : un clic copie la question dans le champ, sans l'envoyer.
const suggestions = document.querySelector('#suggestions');

suggestions.addEventListener('click', (evenement) => {
  const bouton = evenement.target.closest('button');
  if (!bouton) return;
  champ.value = bouton.textContent;
  champ.focus();
  statut.textContent = 'Question copiée : modifiez-la ou envoyez-la.';
});
