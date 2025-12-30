// UI3 Mobile Optimizations - Contrôles PTZ flottants
// Ce fichier ajoute les fonctionnalités pour améliorer l'affichage mobile

(function() {
    'use strict';
    
    console.log('🚀 UI3 Mobile PTZ Controls - Initialisation');
    
    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        console.log('✅ DOM chargé, initialisation des contrôles PTZ mobiles');
        
        // Créer les éléments nécessaires
        createPTZElements();
        
        // Attacher les événements
        attachEvents();
        
        // Surveiller les changements de caméra pour afficher/masquer le bouton PTZ
        setupCameraChangeObserver();
    }
    
    /**
     * Créer les éléments HTML pour le bouton PTZ et l'overlay
     */
    function createPTZElements() {
        // Créer le bouton PTZ flottant
        const ptzButton = document.createElement('div');
        ptzButton.id = 'ptzFloatingButton';
        ptzButton.innerHTML = '<svg class="icon" viewBox="0 0 24 24" style="fill: white;"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="2"/><path d="M12 2 L12 6 M12 18 L12 22 M2 12 L6 12 M18 12 L22 12"/></svg>';
        ptzButton.title = 'Contrôles PTZ';
        ptzButton.style.display = 'none'; // Caché par défaut
        
        // Créer l'overlay PTZ
        const ptzOverlay = document.createElement('div');
        ptzOverlay.id = 'ptzOverlay';
        
        // Créer le bouton de fermeture
        const closeButton = document.createElement('button');
        closeButton.id = 'ptzOverlayClose';
        closeButton.innerHTML = '×';
        closeButton.title = 'Fermer';
        
        ptzOverlay.appendChild(closeButton);
        
        // Ajouter au DOM
        document.body.appendChild(ptzButton);
        document.body.appendChild(ptzOverlay);
        
        console.log('✅ Éléments PTZ créés');
    }
    
    /**
     * Attacher les événements aux boutons
     */
    function attachEvents() {
        const ptzButton = document.getElementById('ptzFloatingButton');
        const ptzOverlay = document.getElementById('ptzOverlay');
        const closeButton = document.getElementById('ptzOverlayClose');
        const ptzControlsBox = document.getElementById('ptzControlsBox');
        
        if (!ptzButton || !ptzOverlay || !closeButton) {
            console.warn('⚠️ Impossible de trouver les éléments PTZ');
            return;
        }
        
        // Clic sur le bouton PTZ flottant - Afficher l'overlay
        ptzButton.addEventListener('click', function(e) {
            e.stopPropagation();
            openPTZOverlay();
        });
        
        // Clic sur le bouton de fermeture
        closeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            closePTZOverlay();
        });
        
        // Clic sur le fond de l'overlay pour fermer
        ptzOverlay.addEventListener('click', function(e) {
            if (e.target === ptzOverlay) {
                closePTZOverlay();
            }
        });
        
        // Empêcher la fermeture si on clique sur les contrôles PTZ
        if (ptzControlsBox) {
            ptzControlsBox.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
        
        console.log('✅ Événements attachés');
    }
    
    /**
     * Ouvrir l'overlay PTZ
     */
    function openPTZOverlay() {
        const ptzOverlay = document.getElementById('ptzOverlay');
        const ptzControlsBox = document.getElementById('ptzControlsBox');
        
        if (!ptzOverlay || !ptzControlsBox) return;
        
        // Cloner les contrôles PTZ dans l'overlay
        const ptzClone = ptzControlsBox.cloneNode(true);
        ptzClone.style.display = 'block';
        
        // Vider l'overlay et ajouter le clone
        while (ptzOverlay.children.length > 1) {
            ptzOverlay.removeChild(ptzOverlay.lastChild);
        }
        ptzOverlay.appendChild(ptzClone);
        
        // Afficher l'overlay
        ptzOverlay.classList.add('active');
        
        // Réattacher les événements PTZ au clone
        reattachPTZEvents(ptzClone);
        
        console.log('📱 Overlay PTZ ouvert');
    }
    
    /**
     * Fermer l'overlay PTZ
     */
    function closePTZOverlay() {
        const ptzOverlay = document.getElementById('ptzOverlay');
        if (!ptzOverlay) return;
        
        ptzOverlay.classList.remove('active');
        console.log('📱 Overlay PTZ fermé');
    }
    
    /**
     * Réattacher les événements PTZ aux éléments clonés
     */
    function reattachPTZEvents(ptzClone) {
        // Trouver tous les boutons PTZ et réattacher leurs événements
        const ptzGraphics = ptzClone.querySelectorAll('.ptzGraphic');
        ptzGraphics.forEach(function(graphic) {
            const svgid = graphic.getAttribute('svgid');
            if (svgid) {
                graphic.addEventListener('mousedown', function(e) {
                    handlePTZCommand(svgid, 'start');
                    e.preventDefault();
                });
                
                graphic.addEventListener('mouseup', function(e) {
                    handlePTZCommand(svgid, 'stop');
                    e.preventDefault();
                });
                
                graphic.addEventListener('touchstart', function(e) {
                    handlePTZCommand(svgid, 'start');
                    e.preventDefault();
                });
                
                graphic.addEventListener('touchend', function(e) {
                    handlePTZCommand(svgid, 'stop');
                    e.preventDefault();
                });
            }
        });
        
        // Réattacher les événements des presets
        const presets = ptzClone.querySelectorAll('.ptzpreset');
        presets.forEach(function(preset) {
            const presetNum = preset.getAttribute('presetnum');
            if (presetNum) {
                preset.addEventListener('click', function(e) {
                    handlePresetClick(presetNum);
                    e.preventDefault();
                });
            }
        });
    }
    
    /**
     * Gérer les commandes PTZ
     */
    function handlePTZCommand(command, action) {
        console.log('🎮 Commande PTZ:', command, action);
        
        // Trouver l'élément PTZ original et déclencher son événement
        const originalPTZ = document.querySelector('#ptzControlsBox .ptzGraphic[svgid="' + command + '"]');
        if (originalPTZ) {
            if (action === 'start') {
                originalPTZ.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            } else {
                originalPTZ.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
            }
        }
    }
    
    /**
     * Gérer les clics sur les presets PTZ
     */
    function handlePresetClick(presetNum) {
        console.log('🎯 Preset PTZ:', presetNum);
        
        // Trouver le preset original et déclencher son événement
        const originalPreset = document.querySelector('#ptzControlsBox .ptzpreset[presetnum="' + presetNum + '"]');
        if (originalPreset) {
            originalPreset.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        }
    }
    
    /**
     * Surveiller les changements de caméra pour afficher/masquer le bouton PTZ
     */
    function setupCameraChangeObserver() {
        const ptzButton = document.getElementById('ptzFloatingButton');
        if (!ptzButton) return;
        
        // Fonction pour vérifier si la caméra actuelle supporte PTZ
        function checkPTZSupport() {
            const ptzControlsBox = document.getElementById('ptzControlsBox');
            const isPortrait = document.body.classList.contains('portrait');
            
            if (!isPortrait) {
                ptzButton.style.display = 'none';
                return;
            }
            
            // Vérifier si les contrôles PTZ sont visibles/disponibles
            if (ptzControlsBox && !ptzControlsBox.classList.contains('disabled')) {
                const ptzButtonsMain = ptzControlsBox.querySelector('#ptzButtonsMain');
                if (ptzButtonsMain && !ptzButtonsMain.classList.contains('disabled')) {
                    ptzButton.style.display = 'flex';
                    console.log('✅ Caméra PTZ détectée - bouton affiché');
                } else {
                    ptzButton.style.display = 'none';
                    console.log('⚠️ PTZ désactivé - bouton masqué');
                }
            } else {
                ptzButton.style.display = 'none';
            }
        }
        
        // Vérifier au chargement
        setTimeout(checkPTZSupport, 1000);
        
        // Observer les changements dans le DOM pour détecter les changements de caméra
        const observer = new MutationObserver(function(mutations) {
            checkPTZSupport();
        });
        
        const ptzControlsBox = document.getElementById('ptzControlsBox');
        if (ptzControlsBox) {
            observer.observe(ptzControlsBox, {
                attributes: true,
                attributeFilter: ['class'],
                subtree: true
            });
        }
        
        // Observer aussi les changements d'orientation
        window.addEventListener('orientationchange', function() {
            setTimeout(checkPTZSupport, 300);
        });
        
        window.addEventListener('resize', function() {
            setTimeout(checkPTZSupport, 300);
        });
        
        console.log('✅ Observateur de caméra configuré');
    }
    
    console.log('✅ UI3 Mobile PTZ Controls - Chargé');
})();
