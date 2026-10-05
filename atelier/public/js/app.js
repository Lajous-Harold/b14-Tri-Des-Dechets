// Point d'entrée de la page Cap Web : relie le formulaire, le cerveau et la vue.
import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');

const boutonEffacer = document.querySelector('#effacer');

const CLE_MEMOIRE = 'capweb.historique';

// La conversation : des objets { role, text }, role valant user ou assistant.
const historique = chargerHistorique();
renderMessages(historique, liste);

function chargerHistorique() {
  try {
    const brut = localStorage.getItem(CLE_MEMOIRE);
    if (brut === null) return [];
    const valeur = JSON.parse(brut);
    if (!Array.isArray(valeur)) throw new Error('mémoire inattendue');
    return valeur;
  } catch {
    // Valeur abîmée : on repart d'une conversation vide, sans planter.
    statut.textContent = 'La conversation enregistrée était illisible : elle repart de zéro.';
    return [];
  }
}

function enregistrerHistorique() {
  localStorage.setItem(CLE_MEMOIRE, JSON.stringify(historique));
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
  historique.push({ role: 'user', text: resultat.value });
  historique.push({ role: 'assistant', text: replyTo(resultat.value) });
  renderMessages(historique, liste);
  enregistrerHistorique();
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

boutonEffacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) return;
  historique.length = 0;
  localStorage.removeItem(CLE_MEMOIRE);
  renderMessages(historique, liste);
  statut.textContent = 'Conversation effacée.';
});
