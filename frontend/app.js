document.addEventListener("DOMContentLoaded", () => {
  const API_URL = 'http://localhost:3000/tasks'; // Update with your actual API URL

  // Get form elements
  const taskForm = document.getElementById("task-form");
  const taskTitle = document.getElementById("task-title");
  const taskDesc = document.getElementById("task-desc");
  const taskList = document.getElementById("task-list");
  let editTaskId = null; 

  fetchTasks();

  function fetchTasks() {
    fetch(API_URL)
      .then(response => response.json())
      .then(tasks => {
        taskList.innerHTML = ''; 
        tasks.forEach(task => {
          displayTask(task);
        });
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }


  function displayTask(task) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task-item");
    taskDiv.innerHTML = `
      <p><strong>${task.title}</strong> - ${task.description}</p>
      <button class="edit-btn" data-id="${task.id}">Edit</button>
      <button class="delete-btn" data-id="${task.id}">Delete</button>
    `;

    taskList.appendChild(taskDiv);

  
    taskDiv.querySelector(".delete-btn").addEventListener("click", function () {
      deleteTask(task.id);
    });

    // Attach edit event to the button
    taskDiv.querySelector(".edit-btn").addEventListener("click", function () {
      editTask(task);
    });
  }

 
  taskForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const newTask = {
      title: taskTitle.value,
      description: taskDesc.value,
      completed: false
    };

    // If we are editing a task
    if (editTaskId) {
      updateTask(editTaskId, newTask);
    } else {
      // Send a POST request to create a new task
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTask)
      })
        .then(response => response.json())
        .then(task => {
          displayTask(task);
          taskForm.reset(); // Clear the input fields
        })
        .catch(error => console.error('Error adding task:', error));
    }
  });

  // Delete a task from the API
  function deleteTask(id) {
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    })
    .then(() => {
      // Remove the task from the DOM
      document.querySelector(`button[data-id="${id}"]`).parentElement.remove();
    })
    .catch(error => console.error('Error deleting task:', error));
  }

  // Edit a task (populate the form with existing task data)
  function editTask(task) {
    taskTitle.value = task.title;
    taskDesc.value = task.description;
    editTaskId = task.id; // Store the task ID for updating
  }

  // Update a task
  function updateTask(id, updatedTask) {
    fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })
    .then(response => response.json())
    .then(() => {
      fetchTasks(); // Refresh the task list
      taskForm.reset(); // Clear the input fields
      editTaskId = null; // Reset the editing state
    })
    .catch(error => console.error('Error updating task:', error));
  }
});
