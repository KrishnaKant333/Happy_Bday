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
