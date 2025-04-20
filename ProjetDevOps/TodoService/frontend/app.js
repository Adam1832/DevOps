document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.getElementById("task-list");
    const taskForm = document.getElementById("task-form");
    const taskTitle = document.getElementById("task-title");

    // Fonction pour récupérer et afficher les tâches
    function fetchTasks() {
        fetch("http://127.0.0.1:64112/tasks")
            .then(response => response.json())
            .then(tasks => {
                taskList.innerHTML = '';  // Réinitialiser la liste
                tasks.forEach(task => {
                    const taskItem = document.createElement("li");
                    taskItem.classList.add("task-item");
                    if (task.done) {
                        taskItem.classList.add("done");
                    }
                    taskItem.innerHTML = `
                        <span>${task.title}</span>
                        <button class="mark-done" data-id="${task.id}">Marquer comme terminé</button>
                    `;
                    taskList.appendChild(taskItem);
                });

                // Ajouter l'écouteur d'événements pour marquer une tâche comme terminée
                document.querySelectorAll(".mark-done").forEach(button => {
                    button.addEventListener("click", (e) => {
                        const taskId = e.target.dataset.id;
                        fetch(`http://127.0.0.1:64112/tasks/${taskId}`, {
                            method: 'PUT'
                        })
                        .then(() => fetchTasks());
                    });
                });
            });
    }

    // Fonction pour ajouter une nouvelle tâche
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = taskTitle.value;
        if (title) {
            fetch("http://127.0.0.1:64112/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ title })
            })
            .then(() => {
                taskTitle.value = "";  // Réinitialiser le champ de texte
                fetchTasks();  // Récupérer à nouveau les tâches
            });
        }
    });

    // Initialiser l'affichage des tâches au démarrage
    fetchTasks();
});
