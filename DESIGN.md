# Grand Line — Portfolio de Sandratra

Une direction visuelle maritime inspirée de One Piece : océan profond, ivoire, cuivre patiné, grand titre éditorial et portrait façon affiche Wanted.

## Lancer le site

- `npm install` si les dépendances ne sont pas encore présentes.
- `npm run dev -- --host 127.0.0.1` pour ouvrir le site local sur http://127.0.0.1:4321.
- `npm run build` pour générer le site statique dans `dist/`.

## Modifier le portfolio

- `src/data/portfolio.ts` : expériences et compétences, reprises et traduites depuis le portfolio existant.
- `src/styles/global.css` : direction artistique et adaptations mobile.
- `src/scripts/interactions.ts` : mouvement, ouverture des missions et copie de l’e-mail.
- `src/components/` : les sections du carnet de bord.

La profondeur repose sur un décor réaliste généré, une parallaxe au pointeur, une boussole composée de calques CSS 3D et un portrait inclinable. Le bouton Mouvement mémorise le choix localement ; la préférence système de réduction des animations est respectée. Le contenu reste accessible lorsque les scripts sont désactivés. Les visuels de projets sont des compositions typographiques originales servant de couvertures de missions.

## Décor généré

Outil : **imagegen intégré**, sans CLI. Image conservée dans le projet : [public/images/grand-line.webp](public/images/grand-line.webp), 1672 × 941, environ 227 Ko. Le PNG original est conservé à son emplacement de génération. Conversion WebP avec Sharp pour limiter le poids à télécharger.

### Prompt final utilisé

Use case: stylized-concept
Asset type: cinematic background artwork for a developer portfolio website, 16:9 landscape, no typography.
Primary request: A sophisticated realistic One Piece inspired seascape with the Thousand Sunny ship, rendered with physically realistic materials, like a luxury cinematic adventure film still.
Scene: immense deep teal ocean at dusk with softly rolling waves, layered distant limestone islands, smoky storm clouds opening to warm pale gold sunlight in the upper right, subtle atmospheric haze. A beautiful wooden sailing ship with the iconic lion figurehead and cream sails seen in three-quarter rear/side view, occupying the rightmost third at middle height. Small straw hat pirate emblem on main sail. Very small distant birds. Rich detailed timber, rope, weathered sails, natural ocean reflections, exquisite realistic 3D render.
Composition: very wide panoramic composition, ship fully visible around x=76%, y=53%, enough water beneath. LEFT HALF IS QUIET DARK teal atmospheric sky/ocean negative space for large cream page heading. Horizon near the middle. No characters close to camera, no foreground props. Moody muted sea green and inky teal dominate, antique warm gold highlights. Premium art direction, fine analog film grain, deep restrained contrast, serene and adventurous, not oversaturated.
Constraints: no words, no letters, no watermark, no UI, no borders, no interface mockup. Only the cinematic scene. Landscape 1536x1024 or wider.


## Portrait Wanted généré

Portrait créé avec **imagegen intégré**, à partir de la photo fournie par Sandratra. Identité et pose conservées, interprétation artistique inspirée de One Piece, hamac sur un navire et palette or / bleu-vert. Le cadre et les textes Wanted restent composés en HTML.

Fichier : [public/images/sandratra-one-piece.webp](public/images/sandratra-one-piece.webp), 1374 × 1145 pixels. Conversion WebP de qualité 92 pour l’affichage web. L’ancienne photo reste conservée dans le projet.

### Prompt final du portrait

Use case: style-transfer, identity-preserve.
Asset type: artistic character portrait for the photo area of an existing One Piece Wanted poster on a portfolio. Generate ONLY the portrait illustration, not the poster or any typography.
Input image: the attached photograph is the edit target and the identity reference. Preserve the recognizable identity of this exact adult man: warm medium-brown skin, swept tousled black hair, distinctive face shape, dark eyes and eyebrows, nose shape, subtle moustache and small pointed goatee, relaxed slightly mischievous expression. He must look like the man in the reference translated into an anime pirate adventurer, not like Luffy, Zoro, Shanks or a generic anime character. Do not give him scars.
Primary request: transform the reference into a beautiful, expressive One Piece style hand-drawn anime/manga illustration, with bold confident ink outlines, angular expressive features, refined cel shading, painterly weathered colors and delicate hatching. Keep his relaxed reclining pose with arms behind his head and his black beaded bracelet. Keep a simple light grey sleeveless shirt, simplify its busy printed artwork into subtle worn fabric texture.
Scene: he is resting in a deep teal hammock on a wooden pirate ship, with a softly suggested warm sail, ropes, blue-green sea and sunlit sky in the background. This is an adventurous, calm, charismatic pirate portrait, composed like an illustrated character introduction. A straw hat may hang discreetly beside the hammock as a small One Piece reference; never obscure his hair or face.
Composition: landscape near-square 6:5 aspect ratio. Reframe tightly around his face, shoulders and the relaxed upper arms; his entire head is inside the frame, face centered around x=50%, y=45%, large enough to remain immediately recognizable in a 250px-wide website portrait. Remove the large empty grassy upper half from the original photograph. Natural anatomy. Safe margins for a very slight edge crop.
Palette and mood: antique golden sunlight, parchment and muted teal, deep brown ink, warm subtle shadows; restrained colors, excellent contrast and intricate ink details. Nostalgic adventure with an elegant artistic finish, not photorealistic, not 3D.
Constraints: preserve the subject's likeness, skin tone, hairstyle and facial hair. No words, no text, no logo, no watermark, no Wanted lettering, no border, no parchment poster frame, no extra people, no weapons.
