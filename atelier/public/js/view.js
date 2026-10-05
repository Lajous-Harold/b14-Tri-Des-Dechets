// Affichage de la conversation : aucune règle de réponse ici.

const PREFIXES = { user: 'Vous', assistant: 'Cap Web' };

export function renderMessages(messages, container) {
  const lignes = messages.map((message) => {
    const ligne = document.createElement('li');
    // textContent : le message reste du texte, jamais du HTML.
    ligne.textContent = `${PREFIXES[message.role]} : ${message.text}`;
    return ligne;
  });
  container.replaceChildren(...lignes);
}
