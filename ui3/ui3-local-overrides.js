// UI3 Local Overrides - Material Design 3 Mobile Enhancements
// Ce fichier est chargé automatiquement par ui3.htm après ui3.js

(function() {
    'use strict';

    console.log('🎨 UI3 Local Overrides - Material Design 3 Mobile');

    // Wait for UI3 to be fully initialized
    function initMobileOverrides() {
        if (typeof ui3 === 'undefined' || !ui3.initialized) {
            setTimeout(initMobileOverrides, 100);
            return;
        }

        console.log('✅ UI3 initialisé - Activation des améliorations mobiles');

        // Only apply mobile enhancements in portrait mode
        if (!window.matchMedia('(orientation: portrait)').matches) {
            console.log('ℹ️ Mode paysage détecté - améliorations mobiles désactivées');
            return;
        }

        // Create system status bar
        createSystemStatusBar();

        // Create group selector
        createGroupSelector();

        // Create bottom navigation
        createBottomNavigation();

        // Apply mobile optimizations
        initMobileOptimizations();
    }

    // Create system status bar at top
    function createSystemStatusBar() {
        if (document.getElementById('system-status-bar')) {
            return; // Already exists
        }

        var statusBar = document.createElement('div');
        statusBar.id = 'system-status-bar';
        
        statusBar.innerHTML = 
            '<div class="status-left">' +
                '<span class="status-item"><span class="status-icon">📡</span><span id="status-server"></span></span>' +
            '</div>' +
            '<div class="status-center">' +
                '<span class="status-item" id="status-time"></span>' +
            '</div>' +
            '<div class="status-right">' +
                '<span class="status-item"><span class="status-icon">📹</span><span id="status-cameras"></span></span>' +
                '<span class="status-item"><span class="status-icon">💾</span><span id="status-recording"></span></span>' +
            '</div>';
        
        document.body.insertBefore(statusBar, document.body.firstChild);
        
        console.log('✅ Barre d\'état système créée');

        // Update status periodically
        updateSystemStatus();
        setInterval(updateSystemStatus, 5000);
    }

    // Update system status bar content
    function updateSystemStatus() {
        // Update time
        var timeEl = document.getElementById('status-time');
        if (timeEl) {
            var now = new Date();
            timeEl.textContent = now.getHours().toString().padStart(2, '0') + ':' + 
                               now.getMinutes().toString().padStart(2, '0');
        }

        // Update server name
        var serverEl = document.getElementById('status-server');
        if (serverEl && typeof ui3 !== 'undefined') {
            serverEl.textContent = ui3.serverName || 'BlueIris';
        }

        // Update camera count
        var camerasEl = document.getElementById('status-cameras');
        if (camerasEl && typeof cameras !== 'undefined') {
            var activeCams = 0;
            for (var i = 0; i < cameras.length; i++) {
                if (cameras[i].isEnabled) activeCams++;
            }
            camerasEl.textContent = activeCams;
        }

        // Update recording status
        var recordingEl = document.getElementById('status-recording');
        if (recordingEl && typeof cameras !== 'undefined') {
            var recording = 0;
            for (var i = 0; i < cameras.length; i++) {
                if (cameras[i].isRecording) recording++;
            }
            recordingEl.textContent = recording > 0 ? recording : '—';
        }
    }

    // Create group selector button (top right)
    function createGroupSelector() {
        if (document.getElementById('group-selector')) {
            return; // Already exists
        }

        var selector = document.createElement('div');
        selector.id = 'group-selector';
        
        selector.innerHTML = 
            '<svg viewBox="0 0 24 24">' +
                '<path d="M3 3h8v8H3V3zm10 0h8v8h-8V3zM3 13h8v8H3v-8zm10 0h8v8h-8v-8z"/>' +
            '</svg>' +
            '<span id="group-selector-text">Toutes</span>';
        
        document.body.appendChild(selector);
        
        // Click handler - open camera list
        selector.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Simulate clicking on system name to open camera list
            var systemName = document.getElementById('systemnamewrapper');
            if (systemName) {
                systemName.click();
            }
        });
        
        console.log('✅ Sélecteur de groupe créé');
    }

    // Create bottom navigation bar
    function createBottomNavigation() {
        if (document.querySelector('.mobile-bottom-nav')) {
            return; // Already exists
        }

        var nav = document.createElement('div');
        nav.className = 'mobile-bottom-nav';
        
        nav.innerHTML = 
            '<button class="mobile-nav-item active" data-tab="live">' +
                '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8"/></svg>' +
                '<span>Live</span>' +
            '</button>' +
            '<button class="mobile-nav-item" data-tab="clips">' +
                '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/></svg>' +
                '<span>Clips</span>' +
            '</button>' +
            '<button class="mobile-nav-item" data-tab="timeline">' +
                '<svg viewBox="0 0 24 24">' +
                    '<line x1="4" y1="12" x2="20" y2="12"/>' +
                    '<circle cx="8" cy="12" r="2"/>' +
                    '<circle cx="16" cy="12" r="2"/>' +
                '</svg>' +
                '<span>Timeline</span>' +
            '</button>' +
            '<button class="mobile-nav-item" data-tab="menu">' +
                '<svg viewBox="0 0 24 24">' +
                    '<line x1="4" y1="8" x2="20" y2="8"/>' +
                    '<line x1="4" y1="16" x2="20" y2="16"/>' +
                '</svg>' +
                '<span>Menu</span>' +
            '</button>';
        
        document.body.appendChild(nav);
        
        console.log('✅ Navigation mobile créée');

        // Add click handlers
        var navItems = nav.querySelectorAll('.mobile-nav-item');
        navItems.forEach(function(item) {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                var tabName = this.getAttribute('data-tab');
                
                // Update active state
                navItems.forEach(function(i) { 
                    i.classList.remove('active'); 
                });
                this.classList.add('active');
                
                console.log('🔄 Navigation vers:', tabName);
                
                // Click on corresponding UI3 element
                if (tabName === 'menu') {
                    var menuBtn = document.getElementById('btn_main_menu');
                    if (menuBtn) {
                        menuBtn.click();
                    }
                } else {
                    var ui3Tab = document.getElementById('topbar_tab_' + tabName);
                    if (ui3Tab) {
                        ui3Tab.click();
                    }
                }
            });
        });
    }

    // Mobile optimizations
    function initMobileOptimizations() {
        // Prevent zoom on double tap
        var lastTouchEnd = 0;
        document.addEventListener('touchend', function(event) {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);

        // Add viewport height CSS variable for mobile browsers
        function setVh() {
            var vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', vh + 'px');
        }
        setVh();
        window.addEventListener('resize', setVh);

        console.log('✅ Optimisations mobiles activées');
    }

    // Start initialization
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMobileOverrides);
    } else {
        initMobileOverrides();
    }

})();
