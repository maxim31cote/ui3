# 📱 Améliorations Mobile pour UI3 - Style Frigate

## 🎯 Objectifs
Améliorer l'expérience mobile de l'interface UI3 pour Blue Iris en s'inspirant du style épuré de Frigate.

## ✨ Fonctionnalités Implémentées

### 1. **Barre de Navigation Inférieure** 📊
- Déplacé les onglets Live/Clips/Timeline en bas de l'écran
- Style moderne avec fond semi-transparent et effet de flou (backdrop-filter)
- Icônes personnalisées pour chaque onglet
- Indicateur visuel clair pour l'onglet actif (bordure verte en haut)
- Optimisé pour les écrans tactiles (zones de toucher de 60px)

### 2. **Bouton PTZ Flottant** 🎮
- Bouton circulaire flottant en bas à droite
- S'affiche **uniquement** quand une caméra PTZ est sélectionnée
- Design moderne avec gradient violet et ombre portée
- Animation au survol et au clic

### 3. **Overlay PTZ** 🎛️
- Panneau overlay plein écran avec fond semi-transparent
- Affiche tous les contrôles PTZ (pad directionnel, zoom, focus, presets)
- Fond flouté pour voir les caméras en arrière-plan
- Bouton de fermeture (×) en haut à droite
- Fermeture possible en cliquant sur le fond

### 4. **Interface Allégée** 🧹
- Masqué automatiquement en mode portrait :
  - Barre supérieure traditionnelle
  - Sidebar latérale avec les contrôles
  - Boutons moins utilisés (save snapshot, alerts canceled, etc.)
- Gardé seulement les boutons essentiels :
  - Menu principal (en haut à droite)
  - Alertes (icônes flottantes en haut)

### 5. **Affichage des Clips et Timeline** 📹
- Quand l'onglet "Clips" ou "Timeline" est actif :
  - Le panneau latéral s'affiche en overlay plein écran
  - Les caméras restent visibles en arrière-plan (z-index optimisé)
  - Animation fluide de transition

### 6. **Améliorations Visuelles** 🎨
- Vignettes de caméras avec coins arrondis
- Ombres portées pour la profondeur
- Labels de caméras avec dégradé transparent
- Contrôles de lecture améliorés (boutons plus grands)
- Animations douces pour les transitions

## 📁 Fichiers Créés/Modifiés

### 1. `/ui3/ui3-local-overrides.css`
**Nouveau fichier** - Styles CSS pour mobile :
- Responsive design pour mode portrait
- Barre de navigation en bas
- Styles pour le bouton PTZ flottant et l'overlay
- Améliorations des vignettes de caméras
- Optimisations touch-friendly

### 2. `/ui3/ui3-local-overrides.js`
**Nouveau fichier** - JavaScript pour fonctionnalités mobile :
- Création dynamique du bouton PTZ flottant
- Gestion de l'overlay PTZ
- Détection automatique des caméras PTZ
- Clonage et réattachement des événements PTZ
- Observer pour changements de caméra

## 🎨 Styles Principaux

### Classes CSS Importantes
- `.portrait` - Mode portrait (mobile détecté automatiquement par UI3)
- `#ptzFloatingButton` - Bouton PTZ flottant
- `#ptzOverlay` - Panneau overlay pour contrôles PTZ
- `#layouttop` - Barre de navigation (repositionnée en bas en mode portrait)

### Variables CSS Utilisées
Le fichier utilise les variables CSS existantes de UI3 :
- `--main-highlight-color`
- `--text-color`
- `--panel-bg-color`
- Etc.

## 🚀 Comment Tester

1. **Accédez à UI3 sur mobile** ou activez le mode responsive dans Chrome DevTools
2. **Orientez en portrait** - Les modifications s'appliquent automatiquement
3. **Naviguez entre les onglets** - Utilisez la barre en bas
4. **Sélectionnez une caméra PTZ** - Le bouton flottant apparaît en bas à droite
5. **Cliquez sur le bouton PTZ** - L'overlay s'affiche avec tous les contrôles
6. **Testez les contrôles** - Pan, tilt, zoom, focus, presets

## 📱 Comportement Responsive

### Portrait (Mobile)
- Barre de navigation en bas
- Bouton PTZ flottant visible si caméra PTZ active
- Sidebar masquée par défaut
- Clips/Timeline en overlay

### Landscape (Tablette/Desktop)
- Interface normale (inchangée)
- Barre de navigation en haut
- Sidebar visible
- Pas de bouton PTZ flottant

## 🔧 Détection Automatique

Le système détecte automatiquement :
1. **Orientation** - Portrait vs Landscape
2. **Caméra PTZ** - Active ou non
3. **État des contrôles** - Enabled ou disabled
4. **Changements de caméra** - Via MutationObserver

## ⚙️ Configuration

### Pour désactiver les optimisations mobile
Supprimer ou renommer les fichiers :
- `ui3-local-overrides.css`
- `ui3-local-overrides.js`

### Pour personnaliser les couleurs
Modifier les valeurs dans `ui3-local-overrides.css` :
```css
/* Couleur du bouton PTZ */
#ptzFloatingButton {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Couleur de l'onglet actif */
.portrait .topbar_tab.selected {
    border-top: 3px solid #63C35B !important;
}
```

## 🐛 Dépannage

### Le bouton PTZ n'apparaît pas
1. Vérifiez que vous êtes en mode portrait
2. Vérifiez qu'une caméra PTZ est sélectionnée
3. Vérifiez la console du navigateur pour les logs
4. Attendez 1 seconde après le chargement (délai de détection)

### L'overlay ne s'ouvre pas
1. Vérifiez que le fichier `.js` est bien chargé
2. Regardez la console pour des erreurs
3. Vérifiez que jQuery est chargé

### Les contrôles PTZ ne fonctionnent pas
1. Les événements sont clonés depuis les contrôles originaux
2. Vérifiez que les contrôles PTZ originaux fonctionnent
3. Vérifiez les logs de console lors du clic

## 📊 Performances

- **CSS** : ~500 lignes, minimale sur les performances
- **JavaScript** : ~350 lignes, charge asynchrone
- **Impact** : Négligeable, optimisé pour mobile
- **Compatibilité** : Chrome, Safari, Firefox mobile

## 🔮 Améliorations Futures Possibles

1. **Gestures tactiles** - Swipe pour changer de caméra
2. **Vibration** - Retour haptique sur les boutons PTZ
3. **Mode plein écran** - Basculer en plein écran facilement
4. **Raccourcis** - Actions rapides sur les vignettes
5. **Thèmes** - Mode sombre/clair personnalisable
6. **Favoris** - Caméras favorites en accès rapide

## 📝 Notes Techniques

- Les fichiers `*-local-overrides.*` sont chargés automatiquement par UI3
- Ils ne sont pas écrasés lors des mises à jour de UI3
- Le mode portrait est détecté via la classe `.portrait` ajoutée par UI3
- Les contrôles PTZ sont clonés pour éviter de modifier le DOM original

## ✅ Compatibilité

- ✅ iOS Safari 12+
- ✅ Chrome Mobile 80+
- ✅ Firefox Mobile 68+
- ✅ Samsung Internet 12+
- ⚠️ Anciens navigateurs : dégradation gracieuse

---

**Auteur** : Optimisations Mobile UI3  
**Date** : 30 Décembre 2025  
**Version** : 1.0.0
