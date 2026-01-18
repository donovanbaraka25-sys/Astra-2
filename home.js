(function() {
    // We attach to window so the HTML button can always find the function
    window.homeManager = {
    user: {
        name: localStorage.getItem('username'), 
        upi: localStorage.getItem('user_upi') || "777888999"
    },

    kenyanGreetings: ["Jambo", "Sasa", "Habari", "Hujambo", "Mambo", "Niaje", "Wazi", "Hawayuuu"],
    
    // ... (keep your greetings array)
     greetings: [
            "Jambo! Your journey toward mastery continues.",
            "Stay focused! You are building a great identity.",
            "Work hard, dream big.",
            "Small steps every day lead to big results.",
            "Consistency is the key to mastery.",
            "Your potential is limitless. Keep pushing!",
            "Success is a habit, not an event.",
            "The expert in anything was once a beginner.",
            "Focus on progress, not perfection.",
            "Your future self will thank you for today's work.",
            "Knowledge is the only treasure that grows when shared.",
            "Great things never come from comfort zones.",
            "Discipline turns goals into reality.",
            "Every session today is a brick in your future empire.",
            "Rise and grind! Excellence awaits.",
            "Code is poetry. Write your masterpiece.",
            "Be the architect of your own future.",
            "Today is a great day to learn something new."
        ],


    init: function() {
        // If no name is saved, show the modal immediately
        if (!this.user.name) {
            this.toggleNameModal(true);
        }
        this.updateUI();
    },

    // Logic to show/hide the pop-up
    toggleNameModal: function(show) {
        const modal = document.getElementById('name-modal-overlay');
        if (show) {
            modal.classList.add('active');
        } else {
            modal.classList.remove('active');
        }
    },

    // This captures the name and updates the screen
    saveNameFromModal: function() {
        const inputField = document.getElementById('name-input-field');
        const newName = inputField.value.trim();

        if (newName !== "") {
            // 1. Save to LocalStorage for persistence
            localStorage.setItem('username', newName);
            
            // 2. Update the local object
            this.user.name = newName;
            
            // 3. Close the pop-up
            this.toggleNameModal(false);
            
            // 4. Refresh the greeting on the page
            this.updateUI(); 
        } else {
            // Shake effect or red border if empty
            inputField.style.borderColor = "#f87171";
            inputField.placeholder = "Please enter a name";
        }
    },

    updateUI: function() {
        const greetingElement = document.getElementById('user-greeting');
        const mottoElement = document.getElementById('user-motto');
        
        // Random Salutation
        const randomSalutation = this.kenyanGreetings[Math.floor(Math.random() * this.kenyanGreetings.length)];

        // Update greeting with the name
        if (this.user.name) {
            greetingElement.innerText = `${randomSalutation}, ${this.user.name}!`;
        } else {
            greetingElement.innerText = `${randomSalutation}!`;
        }

        // Update the motto/message
        const randomMsg = this.greetings[Math.floor(Math.random() * this.greetings.length)];
        if (mottoElement) mottoElement.innerText = randomMsg;

        // UPI Formatting
        const upiElement = document.getElementById('user-upi');
        if (upiElement && this.user.upi) {
            const formatted = this.user.upi.match(/.{1,3}/g).join(' ');
            upiElement.innerText = `UPI: ${formatted}`;
        }
    }
};

// Start the app
homeManager.init();


    // Run the app!
    homeManager.init();
})();


