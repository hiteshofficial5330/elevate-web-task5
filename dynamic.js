'use strict';

// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Select DOM Elements ---
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // --- 2. Add Event Listener for the form ---
    // We listen for the 'submit' event on the form [cite: 12]
    taskForm.addEventListener('submit', function(event) {
        // Prevent the form's default submission (which reloads the page) 
        event.preventDefault(); 

        // Get the trimmed text from the input
        const taskText = taskInput.value.trim();

        // Validate: If input is empty, don't add the task
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // --- 3. Create and Add the New Task ---
        addTask(taskText);

        // Clear the input field after adding
        taskInput.value = '';
        taskInput.focus(); // Put cursor back in input
    });

    // --- 4. Function to Add a Task to the DOM ---
    function addTask(taskText) {
        // Create a new list item (li)
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item'; // Add CSS class

        // Set the inner HTML of the li
        // This includes the task text and the buttons [cite: 15]
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div class="task-buttons">
                <button class="complete-btn" aria-label="Mark as complete">
                    <i class="fas fa-check-circle"></i>
                </button>
                <button class="remove-btn" aria-label="Remove task">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;

        // Append the new task item to the list [cite: 13]
        taskList.appendChild(taskItem);
    }

    // --- 5. Event Delegation for Task Clicks ---
    // Instead of adding a listener to every button, we add ONE listener to the parent list.
    // This is more efficient and is the answer to "Explain event delegation".
    taskList.addEventListener('click', function(event) {
        const clickedElement = event.target;

        // Check if the "Remove" button or its icon was clicked
        if (clickedElement.closest('.remove-btn')) {
            // Find the parent list item and remove it
            const taskItem = clickedElement.closest('.task-item');
            taskItem.remove(); // Removes the task [cite: 15]
        }
        
        // Check if the "Complete" button or the task text (span) was clicked
        if (clickedElement.closest('.complete-btn') || clickedElement.tagName === 'SPAN') {
            // Find the parent list item
            const taskItem = clickedElement.closest('.task-item');
            // Toggle the 'completed' class [cite: 14, 27]
            taskItem.classList.toggle('completed');
        }
    });

});