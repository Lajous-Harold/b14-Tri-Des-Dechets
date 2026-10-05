// Point d'entrée de la page Cap Web.
import { validateMessage, replyTo } from './brain.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');

function ajouterLigne(texte) {
  const ligne = document.createElement('li');
  // textContent : le message reste du texte, jamais du HTML.
  ligne.textContent = texte;
  liste.append(ligne);
}

formulaire.addEventListener('submit', (evenement) => {
  // Pas de rechargement : la page reste en place.
  evenement.preventDefault();
  const resultat = validateMessage(champ.value);
  if (!resultat.ok) {
    statut.textContent = resultat.error;
    champ.focus();
    return;
  }
  ajouterLigne(`Vous : ${resultat.value}`);
  ajouterLigne(`Cap Web : ${replyTo(resultat.value)}`);
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
