// Cerveau de Cap Web : des règles pures, sans accès à la page.

const REPONSE_SALUT = 'Bonjour ! Je suis Cap Web, votre assistant pour bien trier vos déchets.';

// Map plutôt qu'objet : « constructor » ou « toString » ne sont pas des mots connus.
const REPONSES = new Map([
  ['salut', REPONSE_SALUT],
  ['bonjour', REPONSE_SALUT],
  ['aide', 'Posez-moi une question sur le tri, la déchetterie ou la réduction de vos déchets. Les boutons sous le formulaire donnent des exemples.'],
  ['test', 'Test reçu : Cap Web fonctionne.']
]);

const REPLI = 'Je ne connais pas encore la réponse. Essayez « aide » pour voir ce que je sais faire.';

export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte.' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Écrivez un message avant d’envoyer.' };
  }
  return { ok: true, value };
}

export function replyTo(message) {
  // Le message doit être exactement le mot : « tester » ne déclenche pas « test ».
  const mot = String(message).trim().toLowerCase();
  return REPONSES.get(mot) ?? REPLI;
}
