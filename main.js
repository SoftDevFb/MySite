class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        //Text Element that is passed in
        this.txtElement = txtElement;
        //Word that is passed in
        this.words = words;
        this.txt = '';
        //Which word were on in the array
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        //Main method to create effect
        this.type();
        //Boolean representing state of effect
        this.isDeleting = false;
    }

    //Method to handle all effect, init on LOAD
    type() {
        // Current index of word
        const current = this.wordIndex % this.words.length;
        // Get full text of current word
        const fullTxt = this.words[current];

        // Check if deleting, if it is, remove a character, if not add a character
        if (this.isDeleting) {
            // Remove char using substring which removes char between indices
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        // Insert txt into element
        this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

        // Initial Type Speed
        let typeSpeed = 300;

        if (this.isDeleting) {
            typeSpeed /= 2; //Speeds up delete
        }

        // If word is complete, compare by matching fulltxt of word in array
        if (!this.isDeleting && this.txt === fullTxt) {
            // Makes pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 500;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}


// Init On DOM Load -- Initializes On Page Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init TypeWriter, starts running all above functions
    new TypeWriter(txtElement, words, wait);
}


//Scrolling Progress Bar Function
// When the user scrolls the page, execute scrollFunction 
window.onscroll = function () { scrollFunction();};
//Scrolling function
function scrollFunction() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}