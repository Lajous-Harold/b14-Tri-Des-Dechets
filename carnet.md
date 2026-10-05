# Carnet de bord J1 · Appareillage

Un carnet par binôme, rempli au fil de l'eau avec vos propres mots. Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») vaut mieux qu'une phrase parfaite recopiée. Aucune donnée personnelle, aucune clé ni jeton, ni l'adresse complète que `dsh web` affiche (elle contient un jeton). C'est aussi votre journal de décisions (astuce 13) : ce que vous avez demandé, ce qui a cassé, ce que vous avez refusé, et pourquoi.

Binôme : b14

Thème provisoire et public visé : b14 - Tri des déchets. Habitants : bien trier, déchetterie, réduire ses déchets

Trois questions auxquelles l'assistant pourrait répondre :

1. Astuces de réutilisation.
2. Quel type de conteneur collecte telle ordure ?
3. Quel sont les jours de ramassage dans mon quartier ?

Rôles de départ et moments d'échange : je manipule, puis je vérifie chaque étape avec la preuve de la fiche avant de la valider.

## Cahier personnel (remis par le formateur en J1-01)

Recopiez les valeurs telles que le formateur vous les a remises. Ne les changez pas, ne les échangez pas avec un autre binôme.

- Limite de caractères d'un message (le nombre N) : 200
- Premier mot reconnu, en plus de « salut », « aide » et « test » : musique
- Second mot reconnu : cerise

## Commandes essayées

Notez le dossier de lancement, la commande et sa sortie exacte, surtout quand un outil a bloqué.

- Dossier : `cap-web-j1/atelier`
- Commande et résultat : `npm start` → `Cap Web prêt sur http://127.0.0.1:3000/`. `npm test` → 9 tests, 9 pass au départ ; 18 tests, 18 pass en fin de journée (9 du serveur, 9 de `brain.js`). Côté Git, `git status` à la racine : le paquet était déjà un dépôt (cloné), donc pas de `git init`.

Pour chaque checkpoint : cochez la case quand toute la preuve de la fiche est réunie, collez la preuve (texte, commande ou phrase), puis notez ce que vous avez prédit, essayé, observé, et une difficulté qui reste.

## Le chat web (N0 Subir)

### J1-01 · 🧭 Équipage — [fiche](checkpoints/J1-01-equipage.md)

- [x] Validé
- Preuve (page de départ affichée sur votre poste, cahier personnel recopié ci-dessus) : la page de départ s'affiche à `http://127.0.0.1:3000` avec « Votre point de départ est prêt. ». Cahier recopié ci-dessus.
- Le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ? Oui, `<p id="status" role="status"></p>` est vide dans `index.html`. C'est `public/js/app.js` qui écrit la phrase avec `textContent` au chargement du module.
- Décision prise : je garde le thème b14 (tri des déchets) ; aucune question ne contient « envoyer ».
- Difficulté qui reste : aucune.

### J1-02 · 💬 Premier prompt — [fiche](checkpoints/J1-02-premier-prompt.md)

- [x] Validé
- Preuve : `essais-n0/chatbot-v1.html` s'ouvre ; le prompt et la première réponse sont collés ci-dessous, en entier, sans donnée personnelle.
- Mon prompt, tel quel :

  > Fais-moi un chatbot sur le tri des déchets pour les habitants, dans une seule page HTML que j'ouvre dans mon navigateur.

- La première réponse du chat (texte et code), telle quelle :

  > Voici un chatbot simple sur le tri des déchets, dans un seul fichier HTML. Il suffit de copier ce code dans un fichier `.html` et de l'ouvrir dans votre navigateur.
  >
  > (code ci-dessous)
  >
  > **Fonctionnalités :**
  > - Réponses par mots-clés (verre, plastique, papier, compost, piles, déchetterie…)
  > - Envoi avec la touche Entrée ou le bouton
  > - Design simple et responsive
  >
  > Vous pouvez facilement ajouter de nouvelles réponses dans l'objet `responses` !

  <details><summary>Code de la réponse (132 lignes, identique à <code>essais-n0/chatbot-v1.html</code>)</summary>

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TriBot, ton assistant tri des déchets</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #e8f5e9;
      display: flex;
      justify-content: center;
      padding: 20px;
    }
    .chat-container {
      width: 420px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      overflow: hidden;
    }
    .chat-header {
      background: #2e7d32;
      color: white;
      padding: 15px;
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    #chat-box {
      height: 400px;
      overflow-y: auto;
      padding: 15px;
    }
    .message {
      margin: 8px 0;
      padding: 10px 14px;
      border-radius: 18px;
      max-width: 80%;
    }
    .user {
      background: #c8e6c9;
      margin-left: auto;
      text-align: right;
    }
    .bot {
      background: #f1f1f1;
    }
    .input-area {
      display: flex;
      border-top: 1px solid #ddd;
    }
    #user-input {
      flex: 1;
      padding: 12px;
      border: none;
      outline: none;
      font-size: 15px;
    }
    #send-btn {
      background: #2e7d32;
      color: white;
      border: none;
      padding: 0 20px;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="chat-container">
    <div class="chat-header">TriBot</div>
    <div id="chat-box"></div>
    <div class="input-area">
      <input type="text" id="user-input" placeholder="Pose ta question sur le tri...">
      <button id="send-btn" onclick="sendMessage()">Envoyer</button>
    </div>
  </div>

  <script>
    const responses = {
      "bonjour": "Bonjour ! Je suis TriBot. Pose-moi une question sur le tri des déchets !",
      "salut": "Salut ! Je suis TriBot. Pose-moi une question sur le tri des déchets !",
      "verre": "Le verre (bouteilles, pots, bocaux) va dans le conteneur à verre, sans bouchon ni couvercle. Attention : la vaisselle et les miroirs n'y vont pas !",
      "plastique": "Tous les emballages en plastique (bouteilles, pots de yaourt, films) vont dans le bac jaune. Inutile de les laver, il suffit de bien les vider.",
      "papier": "Papiers, journaux et cartons vont dans le bac jaune (ou bleu selon ta commune). Pense à aplatir les cartons !",
      "carton": "Papiers, journaux et cartons vont dans le bac jaune (ou bleu selon ta commune). Pense à aplatir les cartons !",
      "compost": "Les épluchures, le marc de café et les restes de repas peuvent aller au compost. Évite la viande et le poisson si c'est un compost de jardin.",
      "pile": "Les piles et batteries se rapportent en magasin ou en déchetterie. Ne les jette jamais à la poubelle !",
      "déchetterie": "La déchetterie accepte les encombrants, les gravats, les déchets verts, l'électroménager et les produits dangereux. Renseigne-toi sur les horaires auprès de ta mairie.",
      "ramassage": "Les jours de ramassage dépendent de ta commune. Consulte le site de ta mairie ou le calendrier de collecte distribué dans ta boîte aux lettres.",
      "réutiliser": "Avant de jeter, pense à réutiliser : bocaux pour ranger, vêtements à donner, objets à réparer dans un Repair Café !"
    };

    function getBotResponse(message) {
      const msg = message.toLowerCase();
      for (const key in responses) {
        if (msg.includes(key)) {
          return responses[key];
        }
      }
      return "Désolé, je n'ai pas compris. Essaie de me parler de verre, de plastique, de compost ou de déchetterie !";
    }

    function addMessage(text, sender) {
      const chatBox = document.getElementById("chat-box");
      const div = document.createElement("div");
      div.className = "message " + sender;
      div.innerHTML = text;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
    }

    function sendMessage() {
      const input = document.getElementById("user-input");
      const text = input.value;
      addMessage(text, "user");
      input.value = "";
      setTimeout(() => {
        addMessage(getBotResponse(text), "bot");
      }, 500);
    }

    document.getElementById("user-input").addEventListener("keypress", function(e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });

    addMessage("Bonjour ! Je suis TriBot. Je peux t'aider à bien trier tes déchets : verre, plastique, papier, compost, déchetterie...", "bot");
  </script>
</body>
</html>
```

  </details>

- Trois lignes d'observation (ce que j'ai vu en utilisant la page) :
  1. « Où jeter le verre ? » reçoit la réponse sur le conteneur à verre, environ une demi-seconde après mon message.
  2. « Quelle heure est-il ? » reçoit le repli « Désolé, je n'ai pas compris… ».
  3. Un message vide est quand même envoyé : une bulle verte vide apparaît, puis le repli du bot.
- Difficulté qui reste : le chat annonce un design « responsive », mais la boîte fait 420 px de large en dur.

### J1-03 · 💥 Ça marche… jusqu'à quand — [fiche](checkpoints/J1-03-jusqua-quand.md)

- [x] Validé
- Liste de contrôle de la version 1 (cinq à huit comportements essayés) :
  1. Le message d'accueil de TriBot s'affiche au chargement.
  2. Entrée envoie le message.
  3. Le bouton Envoyer envoie le message.
  4. Mon message s'affiche à droite, sur fond vert.
  5. « Où jeter le verre ? » reçoit la réponse sur le verre (mot-clé dans une phrase).
  6. Une phrase hors thème reçoit le repli.
  7. La boîte défile seule jusqu'au dernier message.
- Journal des régressions, une entrée par modification : ce que j'ai demandé · ce qui marche maintenant · ce qui marchait et ne marche plus · ce que je n'avais pas vu, et comment je l'ai trouvé.
  - Modification 1 (`chatbot-v2.html`) : « Ajoute un bouton Effacer qui vide la conversation. » · Effacer vide bien la boîte · rien de cassé dans la liste, mais le chat a renommé « TriBot » en « Assistant Tri » et changé le message d'accueil sans qu'on le demande ; Effacer supprime aussi l'accueil, la boîte reste vide sans indication · trouvé en rejouant la ligne 1 de la liste et en comparant les textes avec la v1.
  - Modification 2 (`chatbot-v3.html`) : « Garde les messages après rechargement de la page. » · F5 garde la conversation · Effacer ne marche plus vraiment : après Effacer puis F5, tout revient (13 lignes au lieu de 0), car seul l'affichage est vidé, pas le `localStorage` ; et le message d'accueil est ajouté et enregistré à chaque F5 (11 lignes avant, 12 après) · trouvé en rejouant « Effacer » de la v2 suivi d'un F5.
  - Modification 3 (`chatbot-v4.html`) : « Refuse les messages vides. » · un message vide affiche une alerte « Le message ne peut pas être vide ! » et n'ajoute rien · la ligne 5 est cassée : « Où jeter le verre ? » reçoit maintenant le repli, seul le mot exact « verre » marche. Le chat a réécrit `getBotResponse` (`includes` remplacé par une recherche exacte) sans le dire · trouvé en rejouant la ligne 5 de la liste.
- Chasse à l'angle mort (ce qui a été trouvé, et par qui) : trouvé en rejouant sur la v4 les essais de la fiche (message vide, 500 caractères, `<b>gras</b>`, deux messages rapides, F5, 360 px). `<b>gras</b>` s'affiche en gras (le code utilise `innerHTML`, et c'est le cas de toutes les versions). Un mot de 60 lettres déborde de sa bulle de 301 px et se retrouve coupé (le `overflow: hidden` de la boîte le cache). À 360 px, le bouton Envoyer dépasse du cadre de 8 px et se retrouve rogné. Le focus du champ est invisible (`outline: none`). Deux messages très rapides : pas de problème, les réponses arrivent dans l'ordre.
- Deux phrases de conclusion : la modification 3 a cassé le plus grave, la réponse sur le thème, alors qu'elle ne parlait que des messages vides. Sans la liste de contrôle, on aurait testé uniquement le message vide et livré un bot qui ne comprend plus les phrases.
- Difficulté qui reste : chaque « petite » demande au chat renvoie tout le fichier réécrit, impossible de voir ce qui a changé sans comparer les fichiers à la main.

### J1-04 · 🎲 Même prompt, autre réponse — [fiche](checkpoints/J1-04-meme-prompt.md)

- [x] Validé
- Le prompt de référence (identique aux trois essais, mot pour mot, dans trois conversations neuves) : « Fais-moi un chatbot sur le tri des déchets pour les habitants, dans une seule page HTML que j'ouvre dans mon navigateur. »
- Le tableau des écarts (trois colonnes A, B, C ; au moins quatre critères ; des faits, pas des impressions) :

  | Critère | A (`essai-A.html`) | B (`essai-B.html`) | C (`essai-C.html`) |
  | --- | --- | --- | --- |
  | Structure du code | 101 lignes, un fichier, script en bas, règles en tableau de mots-clés, vrai `<form>` | 103 lignes, un fichier, script en bas, objet `knowledge`, pas de `<form>` | 88 lignes, un fichier, script en bas, appel `fetch` vers `api.openai.com` |
  | Comportement à l'envoi | « Où jeter le verre ? » → réponse verre, immédiate | réponse verre après « Éco-Assistant écrit… » (800 ms) | aucune réponse : « Veuillez entrer votre clé API OpenAI » |
  | Message vide | ignoré, rien ne s'affiche | envoyé : bulle vide puis repli | ignoré |
  | `<b>gras</b>` | affiché tel quel (`textContent`) | affiché en gras (`innerHTML`) | message bloqué par la clé, mais le code utilise `innerHTML` |
  | F5 | conversation perdue | conversation perdue | conversation perdue |
  | Ce qui diffère | nom « Tri des Déchets », `h1` dans un `header` | nom « Éco-Assistant », 4 boutons de suggestions qui envoient directement | nom « TriMalin », **demande une clé d'API** : refusée, aucune clé saisie |

- Une phrase de conclusion (ce que ces écarts autorisent, ce qu'ils interdisent de supposer) : ces écarts m'autorisent à considérer chaque réponse comme un brouillon possible parmi d'autres ; ils m'interdisent de supposer qu'une propriété (sécurité du texte, refus du vide, absence de clé d'API) sera là la prochaine fois si je ne l'ai pas demandée et vérifiée.
- Difficulté qui reste : la page C demandait une clé d'API ; je l'ai notée et je n'ai rien saisi.

## L'agent (N1 Demander)

### J1-05 · 🛠 dsh en main — [fiche](checkpoints/J1-05-dsh-en-main.md)

- [ ] Validé
- Preuve (`dsh --version`, mode Read Only, modèle `capweb-ia`, `git status -- atelier` propre ; **jamais la clé**) : photo de départ faite (`git commit -m "J1 : point de départ avant dsh"`, puis `git status -- atelier` : propre). dsh non installé : checkpoint facultatif, la fiche de clés est arrivée avec les aides du jour 2.
- La consigne exacte envoyée à l'agent et sa réponse : non fait.
- Pour chaque fichier cité : existe ou non, description juste ou fausse, pourquoi ; et un fichier qu'il n'a pas cité : non fait.
- Difficulté qui reste : la fiche de clés est arrivée tard, avec les aides du jour 2.

### J1-06 · 🧱 Anatomie d'un prompt — [fiche](checkpoints/J1-06-anatomie-dun-prompt.md)

- [x] Validé (le `maxlength` est arrivé avec le cahier, voir plus bas)
- Preuve (deux prompts, deux résultats, grille remplie, commit du squelette) : commit « J1 : squelette de Cap Web (prompt structuré) ».
- Prompt vague et ce que montre la page (trois lignes, fichiers touchés) :

  > Écris la page de Cap Web : un formulaire, une liste de messages et un statut.

  1. `index.html` réécrit sans `main` ni `lang`, avec des `div` ; `styles.css` réécrit avec un `@import` Google Fonts en `https://` ; nouveau fichier `public/script.js` ; `app.js` n'est plus chargé.
  2. La console montre `404 /script.js` : le serveur ne sert pas ce fichier. À l'envoi, la page se recharge et l'adresse devient `/?`.
  3. `npm test` : 8 pass, 1 fail, « la page d'accueil doit contenir un repère <main> ». Remis à zéro avec `git restore` sur les deux fichiers, puis suppression de `script.js`.
- Prompt structuré, en six parties, tel qu'envoyé :

  ```text
  RÔLE : Tu es développeur web. Tu écris du HTML, du CSS et du JavaScript sans bibliothèque, pour des débutants.
  TÂCHE : Écris le squelette de la page de « Cap Web », un assistant sur le tri des déchets pour les habitants : un formulaire, une liste de messages, une ligne de statut.
  CONTRAINTES :
  - Modifie uniquement public/index.html, public/styles.css et public/js/app.js. Le serveur ne sert que ces trois fichiers : n'en crée aucun autre.
  - Garde ces identifiants : form#chat-form, textarea#message, ul#messages, p#status.
  - Le champ #message est limité à <limite du cahier, pas encore reçue> caractères (maxlength).
  - Le contenu de la page est dans un main. Un seul h1 (« Cap Web »), un label lié au champ, un bouton « Envoyer », p#status avec role="status", html lang="fr". Aucune bibliothèque, aucune adresse https://.
  FORMAT DE SORTIE : d'abord la liste de tes hypothèses (cinq au plus), puis tu t'arrêtes. Après mon « ok », tu écris les trois fichiers, puis tu réponds par la liste des fichiers écrits.
  EXEMPLES ET CONTRE-EXEMPLES : voulu : <button type="submit">Envoyer</button>. Refusé : <div onclick="envoyer()">Envoyer</div> (ce n'est pas un bouton) ; un fichier script.js à côté de app.js (le serveur répondrait 404).
  CRITÈRE D'ARRÊT : app.js empêche seulement le rechargement de la page à l'envoi et écrit alors « Interface prête. » dans le statut ; il n'ajoute aucun message à la liste. Quand les trois fichiers sont écrits, tu t'arrêtes.
  ```

- Les hypothèses de l'agent, et ma réponse :
  1. Ordre dans `main` : `h1`, une phrase d'introduction, `ul#messages`, le formulaire, `p#status`.
  2. Le `textarea` porte `name="message"` et le label « Votre message ».
  3. CSS sans framework, largeur maximale d'environ 40rem, centré.
  4. La limite n'est pas donnée : pas de `maxlength` pour l'instant.
  5. `app.js` reste un module (`type="module"`), comme au départ.

  Ma réponse : « ok. Pour la 4, on ajoutera le maxlength dès qu'on aura la limite du cahier. »
- La grille (✔ ou ✘ et un mot, pour « vague » puis « structuré ») :

  | Critère | Prompt vague | Prompt structuré |
  | --- | --- | --- |
  | La page s'affiche sans erreur (F12, onglet Console) | ✘ 404 `script.js` | ✔ aucune erreur |
  | Formulaire, liste et statut sont là, avec les quatre identifiants | ✘ `chatForm`, `userInput`, `statusBar` | ✔ les quatre |
  | Seuls les trois fichiers autorisés ont changé (`git status -- atelier`) | ✘ `script.js` nouveau | ✔ trois fichiers |
  | `npm test` reste vert | ✘ pas de `main` | ✔ 9/9 |
  | Aucune bibliothèque, aucune adresse `https://` | ✘ Google Fonts | ✔ aucune |
  | Vous savez expliquer chaque partie de la page en une phrase | ✔ courte | ✔ oui |

- Une phrase : entre les deux résultats, ce qui a le plus changé, c'est le respect des fichiers servis, parce que la partie CONTRAINTES (et le contre-exemple `script.js`) de mon prompt disait que le serveur ne sert que trois fichiers.
- Difficulté qui reste : le cahier est arrivé après le squelette ; le `maxlength="200"` a été ajouté avec l'étape 4 de J1-09.

### J1-07 · 👣 Petits pas — [fiche](checkpoints/J1-07-petits-pas.md)

- [x] Validé
- Preuve (découpage écrit avant la première demande, trois diffs relus, un refus écrit, un commit par étape acceptée, trois boutons de questions qui fonctionnent) : trois commits « étape 1/2/3 » ; les boutons copient la question, mettent le focus dans le champ et le statut dit « Question copiée : modifiez-la ou envoyez-la. ».
- La tâche, mes trois questions et mon découpage en trois étapes (écrit avant la première demande d'écriture) : afficher les trois questions (« Astuces de réutilisation. », « Quel type de conteneur collecte telle ordure ? », « Quel sont les jours de ramassage dans mon quartier ? ») en boutons ; un clic copie sans envoyer. (1) `index.html` seul : `ul#suggestions` de trois `button type="button"` ; (2) `app.js` seul : le clic copie le texte dans le champ ; (3) `app.js` : focus dans le champ et statut.
- Ce que l'agent a proposé comme découpage, ce que j'ai gardé, pourquoi : il proposait de fusionner les étapes 2 et 3 (« c'est le même écouteur »). J'ai gardé mes trois étapes : deux diffs de 10 et 2 lignes se relisent plus vite qu'un seul, et l'étape 3 se teste à part.
- Mon refus écrit : à l'étape 2, l'agent a ajouté `formulaire.requestSubmit()` après la copie, donc un envoi automatique, et une règle CSS pour `#suggestions` dans `styles.css`. Refusé : la tâche dit « sans l'envoyer », et `styles.css` n'était pas nommé. `git restore atelier/public/js/app.js atelier/public/styles.css`, puis j'ai demandé : « Étape 2 seulement : dans public/js/app.js, un clic sur un bouton de #suggestions copie son texte dans #message. Aucun envoi, aucun autre fichier. »
- Difficulté qui reste : aucune.

**Journal des décisions.** Une ligne par demande faite à l'agent, de J1-07 à J1-09 (les trois étapes de J1-07, puis la correction de J1-08, puis les six demandes de J1-09) : la demande copiée, le diff relu (fichiers, nombre de lignes, une chose que je n'avais pas demandée ?), le verdict et pourquoi.

| N°  | Demande | Diff relu | Verdict et pourquoi |
| --- | ------- | --------- | ------------------- |
| 1   | Étape 1 : `ul#suggestions` de trois boutons `type="button"` dans `index.html` | `index.html`, +6 ; rien d'autre | Accepté : les boutons s'affichent et ne font rien |
| 2   | Étape 2 : un clic copie la question dans le champ | 1er essai : `app.js` + `styles.css`, avec `requestSubmit()` ; 2e essai : `app.js`, +10 | 1er refusé (envoi automatique, fichier non demandé), 2e accepté : le statut ne change pas au clic |
| 3   | Étape 3 : focus dans le champ et statut « Question copiée… » | `app.js`, +2 | Accepté : testé à la souris et avec Espace au clavier |
| 4   | J1-08 : mot de 60 lettres qui déborde à 360 px, `styles.css` seulement | `styles.css`, +1 (`overflow-wrap: anywhere` sur `#messages li`) | Accepté : 214 px de débordement avant, 0 après |
| 5   | J1-09 n°1 : l'envoi, « Vous : … », message vide refusé | `app.js`, +14 −2 ; `textContent` | Accepté : `<b>gras</b>` reste du texte |
| 6   | J1-09 n°2 : `brain.js` (`validateMessage`, `replyTo`) + liste blanche | `brain.js` nouveau (30 lignes), `server/app.js` +4 −2 (une ligne par liste) | Accepté : `Map` plutôt qu'objet, donc « constructor » reçoit le repli ; aucun `document` |
| 7   | J1-09 n°3 : brancher `app.js` sur `brain.js` | `app.js`, +14 −7 | Accepté : « tester » reçoit le repli |
| 8   | J1-09 n°4 : mes deux mots (musique, cerise) et ma limite (200) | `brain.js` +10 −1 (une constante `LIMITE`, deux entrées dans la `Map`), `index.html` +1 −1 (`maxlength`) | Accepté : 200 passe, 201 est refusé, l'erreur cite la limite ; « donnez les » sans trait d'union refusé dans la réponse à musique, reformulé |
| 9   | J1-09 n°5 (`/plan`) : `view.js`, `renderMessages`, tableau `historique` | `view.js` nouveau (13 lignes), `app.js` +7 −9, `server/app.js` +4 −2 | Accepté : plus de `createElement` dans `app.js` |
| 10  | J1-09 n°6 : mémoire `capweb.historique` et bouton Effacer | `app.js` +33 −1, `index.html` +2 | Accepté : valeur abîmée gérée par `try/catch` |

### J1-08 · 🔎 Revue de la page — [fiche](checkpoints/J1-08-revue-de-la-page.md)

- [x] Validé
- Preuve (trois défauts, un corrigé avec son avant et son après, diff relu, revue adverse vérifiée) : commit « J1 : correction, mot très long qui déborde à 360 px ».
- Mes défauts, un par ligne :

  | Lentille (structure, clavier, écrans) | Où (élément ou fichier) | Comment je l'ai vu |
  | ------------------------------------- | ----------------------- | ------------------ |
  | Structure | `index.html`, `ul#messages` | la liste n'a ni `aria-label` ni titre qui la nomme ; pas de `header` ni de `footer` non plus |
  | Clavier | `styles.css` ligne 75, `button:focus { outline: none; }` | Tab jusqu'à Envoyer : aucun contour, aucune ombre, impossible de savoir où est le focus |
  | Écrans | `styles.css`, `#messages li` | à 360 px, `<li>` de 60 lettres ajouté dans Éléments : `scrollWidth - clientWidth` = 214 |

- La revue adverse : trois affirmations de l'agent, la référence qu'il a donnée (fichier, ligne), mon verdict (vrai, faux, rejeté sans référence) et comment j'ai vérifié :
  1. « `styles.css` l. 75-77 : `button:focus { outline: none }`, le focus du bouton est invisible » → **vrai**, vu au clavier (Tab).
  2. « `index.html` l. 14 : `ul#messages` sans nom accessible » → **vrai**, aucun `aria-label` dans Éléments.
  3. « `index.html` : le `textarea` n'a pas d'étiquette » → **faux** : `label for="message"` existe, et un clic sur « Votre message » met le curseur dans le champ.
- Le défaut corrigé : avant, à 360 px avec le mot de 60 lettres, `scrollWidth - clientWidth` = **214**. Demande : « RÔLE : développeur CSS. TÂCHE : à 360 px, un message d'un mot de 60 lettres dans #messages fait défiler la page horizontalement. CONTRAINTES : ne modifie que styles.css, pas d'overflow: hidden sur html ou body. FORMAT : le diff, puis une phrase pour vérifier. CONTRE-EXEMPLE : la page qui défile à 360 px. ARRÊT : quand ce seul défaut est corrigé, tu t'arrêtes. » Diff : `styles.css`, 1 ligne ajoutée (`overflow-wrap: anywhere;` dans `#messages li`), rien d'autre. Après, même geste : **0** à 360, 768 et 1280 px.
- Difficulté qui reste : le focus invisible et la liste sans nom restent à corriger (défi bonus 1).

### J1-09 · 🧠 Un cerveau à règles, par prompts — [fiche](checkpoints/J1-09-cerveau-a-regles.md)

- [x] Validé
- Preuve (comportements vérifiés : « Vous : … », message vide, `<b>gras</b>`, mes deux mots, ma limite ; `/js/brain.js` et `/js/view.js` affichés ; F5 ; « Effacer ») : « salut » → « Vous : salut » puis « Cap Web : Bonjour !… » ; trois espaces → « Écrivez un message avant d'envoyer. », aucune ligne, focus dans le champ ; `<b>gras</b>` affiché avec ses chevrons ; « BONJOUR » → réponse de « salut » ; «  aide  », « test » répondent ; « tester » → repli ; `/js/brain.js` et `/js/view.js` → 200 `text/javascript` ; dans la console, `(await import('/js/brain.js')).replyTo(' SALUT ')` → réponse de « salut » ; F5 : 16 lignes avant, 16 après ; Effacer, annuler : 16 ; accepter : 0, et toujours 0 après F5. «  musique  » et « CERISE » reçoivent leur réponse propre ; `validateMessage('a'.repeat(200)).ok` → `true`, avec 201 → `false`.
- Mes six demandes et leurs verdicts : dans le journal des décisions ci-dessus.
- Le rôle de chaque fichier, en une phrase chacun :
  - `app.js` : il relie la page au reste : il écoute le formulaire, les boutons de questions et Effacer, tient le tableau `historique` et le range dans `localStorage`.
  - `brain.js` : les règles pures, sans page : valider un message (`validateMessage`) et choisir une réponse (`replyTo`).
  - `view.js` : l'affichage seul : `renderMessages` remplace le contenu de la liste par un `li` par message, en `textContent`.
- Ce que j'ai vu quand j'ai mis `{pas du json` dans la mémoire : la page ne plante pas, la liste est vide et le statut dit « La conversation enregistrée était illisible : elle repart de zéro. » ; le message suivant s'enregistre normalement.
- Difficulté qui reste : l'étape 4 a été faite après les étapes 5 et 6, le cahier étant arrivé en retard.

### J1-10 · 🧪 Épreuve de l'explication — [fiche](checkpoints/J1-10-epreuve-explication.md)

- [x] Validé
- Preuve (`npm test` vert avec cinq tests dont ma limite, commit de sauvegarde, remise faite) : `atelier/tests/brain.test.js`, 9 tests (vide, espaces, nettoyage, 200 passe, 201 refusé, SALUT et salut, musique, cerise, tester) ; `npm test` : 18 tests, 18 pass ; commit « J1 : Cap Web répond ».
- Le test rouge : `LIMITE = 200` changé en `210` dans `brain.js`, puis `npm test` : « not ok 5 - refuse un caractère de plus que la limite », message « Expected values to be strictly equal: true !== false ». Il m'a appris que le test de la limite vérifie bien la frontière N+1, et pas seulement « un message très long ». `git restore atelier/public/js/brain.js`, puis vert.
- Épreuve de l'explication, éditeur fermé :
  - Ce que je n'ai pas su expliquer : du premier coup, pourquoi `replaceChildren` a besoin de `...lignes` (sans les trois points, la liste afficherait `[object HTMLLIElement]`), et le rôle de `?? REPLI` dans `replyTo` (la `Map` renvoie `undefined` pour un mot inconnu, et `??` le remplace par le repli).
- Difficulté qui reste : aucune côté tests.

## Quatre questions pour finir

1. Pourquoi `textContent` et pas `innerHTML` ? `textContent` insère du texte : `<b>gras</b>` s'affiche tel quel. `innerHTML` interprète le message comme du HTML, donc un utilisateur peut injecter des balises ou un script (XSS). On l'a vu sur `chatbot-v1` à `v4` et sur `essai-B`.
2. Pourquoi trois fichiers plutôt qu'un seul ? Chacun a une seule raison de changer : les règles (`brain.js`) se testent avec Node sans navigateur, l'affichage (`view.js`) ne connaît pas les règles, et `app.js` ne fait que relier les deux.
3. L'agent a écrit le code : comment savez-vous qu'il est juste, et qu'est-ce qui l'a vu échouer ? Chaque diff relu et testé dans le navigateur ; `npm test` pour le serveur et la liste blanche, et mes tests de `brain.js`, écrits par moi et pas par l'agent. Le test « refuse un caractère de plus que la limite » est devenu rouge quand j'ai décalé la limite de 10.
4. Quelle astuce avez-vous le plus utilisée aujourd'hui, et laquelle avez-vous oubliée ? La plus utilisée : la 2, petits pas avec un diff relu par étape. La moins utilisée : la 6 (relancer trois fois), en dehors de J1-04.

## Aides utilisées

- Indices, aide-mémoire, voisins : fiche J1-06 pour la remise à zéro avec `git restore` ; aide-mémoire JS pour `replaceChildren(...elements)`.
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse : tout le code de `atelier` vient de l'agent ; chaque affirmation de la revue adverse a été vérifiée dans le navigateur (une était fausse).

## Notes personnelles (chacun)

Pour préparer l'explication de votre part du code. Chacun écrit avec ses mots.

- Nom : Harold
- Ce que j'ai compris : la chaîne formulaire → `validateMessage` → `historique` → `renderMessages` → `localStorage` ; pourquoi `Map` plutôt qu'un objet pour les réponses (un objet hérite de `constructor`, `toString`…) ; pourquoi `replaceChildren` a besoin de `...lignes`.
- Ce que je n'ai pas encore compris : rien de bloquant ; à vérifier : une mémoire valide en JSON mais mal formée (`[1, 2]`) passe le `Array.isArray` et afficherait « undefined : undefined ».

Git sert à sauvegarder chaque étape acceptée : lisez les différences et nommez les fichiers à enregistrer, jamais `git add -A`. Attendez la consigne du formateur avant tout envoi vers un dépôt commun.

[README du jour](README.md) · [Aide-mémoire HTML/CSS](ressources/aide-memoire.md) · [Aide-mémoire JavaScript](ressources/aide-memoire-js.md) · [Notice dsh](ressources/dsh.md)
