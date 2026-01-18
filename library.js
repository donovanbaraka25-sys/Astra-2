(function() {
    console.log("Library Module Loaded.");

    // --- 1. THE SILENCER (Fixes your popup bug) ---
    // This removes the "name-modal" from index.html if user is logged in
    const checkUser = localStorage.getItem('username');
    if (checkUser) {
        const zombieModal = document.getElementById('name-modal');
        if (zombieModal) {
            zombieModal.style.display = 'none'; // Hide it
            zombieModal.remove(); // Kill it entirely for safety
        }
    }

    // --- 2. ATOMIC DATA (The Books/Modules) ---
    const libraryData = [
        { 
            id: 1, 
            title: "Crop Cycle", 
            strand: "Environment", 
            icon: "🌱", 
            level: "ME", // Meeting Expectation
            percent: 80,
            color: "#4CAF50", // Green
            mission: "Map the 3 stages of maize growth."
        },
        { 
            id: 2, 
            title: "Binary Logic", 
            strand: "Numbers", 
            icon: "0️⃣1️⃣", 
            level: "AE", // Approaching
            percent: 50,
            color: "#FFC107", // Yellow
            mission: "Complete the logic gate puzzle."
        },
        { 
            id: 3, 
            title: "Color Theory", 
            strand: "Creative", 
            icon: "🎨", 
            level: "BE", // Below
            percent: 20,
            color: "#F44336", // Red
            mission: "Mix primary colors to make purple."
        },
        { 
            id: 4, 
            title: "Solar Sys", 
            strand: "Environment", 
            icon: "🪐", 
            level: "EE", // Exceeding
            percent: 100,
            color: "#2196F3", // Blue
            mission: "Identify the gas giants."
        }
    ];

    // --- 3. RENDER FUNCTION ---
    window.filterLibrary = function(filter, btnElement) {
        // Update Buttons
        if (btnElement) {
            document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
            btnElement.classList.add('active');
        }

        const grid = document.getElementById('library-grid');
        grid.innerHTML = ''; // Clear grid

        libraryData.forEach(item => {
            if (filter === 'all' || item.strand === filter) {
                // Create Card HTML matching your Dark UI
                const card = document.createElement('div');
                card.className = 'lib-card';
                card.onclick = () => openLibModal(item);
                
                card.innerHTML = `
                    <div class="card-icon">${item.icon}</div>
                    <div>
                        <h4 class="card-title">${item.title}</h4>
                        <span class="card-meta">${item.strand}</span>
                    </div>
                    <div class="status-dot" style="background:${item.color}; box-shadow: 0 0 8px ${item.color}"></div>
                `;
                grid.appendChild(card);
            }
        });
    };

    // --- 4. MODAL LOGIC ---
    window.openLibModal = function(item) {
        const modal = document.getElementById('lib-modal');
        document.getElementById('modal-title').innerText = item.title;
        document.getElementById('modal-strand').innerText = item.strand;
        document.getElementById('modal-mission').innerText = item.mission;
        document.getElementById('modal-level').innerText = item.level;
        
        // Animate Bar
        const bar = document.getElementById('modal-bar');
        bar.style.width = '0%'; // Reset
        bar.style.backgroundColor = item.color;
        
        modal.classList.remove('hidden');
        
        // Slight delay for animation
        setTimeout(() => { bar.style.width = item.percent + '%'; }, 100);
    };

    window.closeLibModal = function() {
        document.getElementById('lib-modal').classList.add('hidden');
    };

    // Initialize
    filterLibrary('all', null);

})();
