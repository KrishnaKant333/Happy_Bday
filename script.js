const messages = document.querySelectorAll('.message');
let currentDraggedMessage = null;
let offsetX, offsetY;

messages.forEach((message, index) => {
    // Stack messages initially at random positions within the page
    message.style.top = `${100 + (index * 30)}px`;
    message.style.left = `${100 + (index * 30)}px`;

    message.addEventListener('dragstart', (e) => {
        currentDraggedMessage = message;
        // Get mouse offset within the message element to drag smoothly
        offsetX = e.clientX - message.getBoundingClientRect().left;
        offsetY = e.clientY - message.getBoundingClientRect().top;
        message.style.zIndex = 1000; // Make the dragged message appear on top
        message.style.cursor = 'grabbing'; // Change cursor to grabbing
    });

    message.addEventListener('dragend', () => {
        // Reset the cursor style and z-index after dragging
        currentDraggedMessage.style.zIndex = '';
        currentDraggedMessage.style.cursor = 'grab';
        currentDraggedMessage = null;
    });

    // Allow the dragged message to follow the mouse
    document.addEventListener('dragover', (e) => {
        if (currentDraggedMessage) {
            currentDraggedMessage.style.left = `${e.clientX - offsetX}px`;
            currentDraggedMessage.style.top = `${e.clientY - offsetY}px`;
        }
    });
});
const starContainer = document.getElementById('star-container');
const numberOfStars = 50; // Adjust to add more or fewer stars
const stars = [];

// Function to create stars
for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    // Assign initial random positions
    positionStar(star);

    // Append the star to the container
    starContainer.appendChild(star);
    stars.push(star);
}

// Function to randomly position a star
function positionStar(star) {
    const x = Math.random() * 100; // Percentage of viewport width
    const y = Math.random() * 100; // Percentage of viewport height
    star.style.left = `${x}vw`;
    star.style.top = `${y}vh`;
}

// Function to reposition stars at the end of the twinkle animation
stars.forEach(star => {
    star.addEventListener('animationiteration', () => {
        positionStar(star);
    });
});