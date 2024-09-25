document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskTime = document.getElementById('task-time');
    const timeUnit = document.getElementById('time-unit');
    const taskType = document.getElementById('task-type');
    const taskList = document.getElementById('task-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');

    // Function to convert time to milliseconds
    function convertToMilliseconds(timeValue, unitValue) {
        switch (unitValue) {
            case 'minutes': return timeValue * 60000;
            case 'hours': return timeValue * 3600000;
            case 'days': return timeValue * 86400000;
            case 'weeks': return timeValue * 604800000;
            case 'months': return timeValue * 2628000000;
            default: return 0;
        }
    }

    // Function to create a new task element
    function createTaskElement(taskValue, timeValue, unitValue, type) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const taskText = document.createElement('span');
        taskText.className = 'task';
        taskText.textContent = `${taskValue} - ${timeValue} ${unitValue} (${type})`;

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const completeBtn = document.createElement('button');
        completeBtn.className = 'complete-btn';
        completeBtn.textContent = 'Complete';
        completeBtn.onclick = () => {
            li.style.textDecoration = 'line-through';
        };

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = 'Edit';
        editBtn.onclick = () => {
            taskInput.value = taskValue;
            taskTime.value = timeValue;
            timeUnit.value = unitValue;
            taskType.value = type;
            li.remove();
        };

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => {
            li.remove();
        };

        taskButtons.appendChild(completeBtn);
        taskButtons.appendChild(editBtn);
        taskButtons.appendChild(deleteBtn);
        li.appendChild(taskText);
        li.appendChild(taskButtons);
        taskList.appendChild(li);
    }

    // Event listener for form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const taskValue = taskInput.value.trim();
        const timeValue = taskTime.value.trim();
        const unitValue = timeUnit.value;
        const type = taskType.value;

        if (taskValue && timeValue) {
            createTaskElement(taskValue, timeValue, unitValue, type);
            form.reset(); // Clear the form
        }
    });

    // Event listener for deleting all tasks
    deleteAllBtn.addEventListener('click', () => {
        taskList.innerHTML = ''; // Clear the task list
    });
});
