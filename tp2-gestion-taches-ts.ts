// ========================================
// TYPES ET INTERFACES
// ========================================

enum PriorityLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    URGENT = "urgent"
}

enum TaskStatus {
    TODO = "todo",
    IN_PROGRESS = "in_progress",
    DONE = "done",
    CANCELLED = "cancelled"
}

interface Task {
    id: number;
    title: string;
    description: string;
    priority: PriorityLevel;
    status: TaskStatus;
    createdAt: Date;
    dueDate?: Date;
    completedAt?: Date;
    tags: string[];
}

interface TaskFilter {
    status?: TaskStatus;
    priority?: PriorityLevel;
    tag?: string;
    searchTerm?: string;
}

interface TaskStats {
    total: number;
    todo: number;
    inProgress: number;
    done: number;
    cancelled: number;
    byPriority: Record<PriorityLevel, number>;
}

// ========================================
// CLASSE PRINCIPALE - TASK MANAGER
// ========================================

class TaskManager {
    private tasks: Map<number, Task> = new Map();
    private nextId: number = 1;
    private observers: Array<(tasks: Task[]) => void> = [];

    // Créer une nouvelle tâche
    createTask(
        title: string,
        description: string,
        priority: PriorityLevel = PriorityLevel.MEDIUM,
        tags: string[] = [],
        dueDate?: Date
    ): Task {
        if (!title.trim()) {
            throw new Error("Le titre est obligatoire");
        }

        const task: Task = {
            id: this.nextId++,
            title: title.trim(),
            description: description.trim(),
            priority,
            status: TaskStatus.TODO,
            createdAt: new Date(),
            tags,
            dueDate
        };

        this.tasks.set(task.id, task);
        this.notifyObservers();
        return task;
    }

    // Obtenir une tâche par ID
    getTask(id: number): Task | undefined {
        return this.tasks.get(id);
    }

    // Obtenir toutes les tâches
    getAllTasks(): Task[] {
        return Array.from(this.tasks.values());
    }

    // Mettre à jour une tâche
    updateTask(id: number, updates: Partial<Task>): Task {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Tâche avec l'ID ${id} introuvable`);
        }

        const updatedTask: Task = { ...task, ...updates };
        this.tasks.set(id, updatedTask);
        this.notifyObservers();
        return updatedTask;
    }

    // Changer le statut d'une tâche
    changeStatus(id: number, status: TaskStatus): Task {
        const task = this.tasks.get(id);
        if (!task) {
            throw new Error(`Tâche avec l'ID ${id} introuvable`);
        }

        const updates: Partial<Task> = { status };
        if (status === TaskStatus.DONE) {
            updates.completedAt = new Date();
        }

        return this.updateTask(id, updates);
    }

    // Supprimer une tâche
    deleteTask(id: number): boolean {
        const deleted = this.tasks.delete(id);
        if (deleted) {
            this.notifyObservers();
        }
        return deleted;
    }

    // Filtrer les tâches
    filterTasks(filter: TaskFilter): Task[] {
        let tasks = this.getAllTasks();

        if (filter.status) {
            tasks = tasks.filter(t => t.status === filter.status);
        }

        if (filter.priority) {
            tasks = tasks.filter(t => t.priority === filter.priority);
        }

        if (filter.tag) {
            tasks = tasks.filter(t => t.tags.includes(filter.tag!));
        }

        if (filter.searchTerm) {
            const term = filter.searchTerm.toLowerCase();
            tasks = tasks.filter(t => 
                t.title.toLowerCase().includes(term) ||
                t.description.toLowerCase().includes(term)
            );
        }

        return tasks;
    }

    // Obtenir les statistiques
    getStats(): TaskStats {
        const tasks = this.getAllTasks();
        
        const stats: TaskStats = {
            total: tasks.length,
            todo: 0,
            inProgress: 0,
            done: 0,
            cancelled: 0,
            byPriority: {
                [PriorityLevel.LOW]: 0,
                [PriorityLevel.MEDIUM]: 0,
                [PriorityLevel.HIGH]: 0,
                [PriorityLevel.URGENT]: 0
            }
        };

        tasks.forEach(task => {
            // Compter par statut
            switch (task.status) {
                case TaskStatus.TODO:
                    stats.todo++;
                    break;
                case TaskStatus.IN_PROGRESS:
                    stats.inProgress++;
                    break;
                case TaskStatus.DONE:
                    stats.done++;
                    break;
                case TaskStatus.CANCELLED:
                    stats.cancelled++;
                    break;
            }

            // Compter par priorité
            stats.byPriority[task.priority]++;
        });

        return stats;
    }

    // Obtenir les tâches en retard
    getOverdueTasks(): Task[] {
        const now = new Date();
        return this.getAllTasks().filter(task => 
            task.dueDate && 
            task.dueDate < now && 
            task.status !== TaskStatus.DONE &&
            task.status !== TaskStatus.CANCELLED
        );
    }

    // Trier les tâches
    sortTasks(
        tasks: Task[], 
        by: 'priority' | 'dueDate' | 'createdAt' = 'createdAt',
        order: 'asc' | 'desc' = 'desc'
    ): Task[] {
        const sorted = [...tasks];

        const priorityOrder = {
            [PriorityLevel.URGENT]: 4,
            [PriorityLevel.HIGH]: 3,
            [PriorityLevel.MEDIUM]: 2,
            [PriorityLevel.LOW]: 1
        };

        sorted.sort((a, b) => {
            let comparison = 0;

            switch (by) {
                case 'priority':
                    comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
                    break;
                case 'dueDate':
                    const aDate = a.dueDate?.getTime() || Infinity;
                    const bDate = b.dueDate?.getTime() || Infinity;
                    comparison = aDate - bDate;
                    break;
                case 'createdAt':
                    comparison = a.createdAt.getTime() - b.createdAt.getTime();
                    break;
            }

            return order === 'asc' ? comparison : -comparison;
        });

        return sorted;
    }

    // Exporter en JSON
    exportToJSON(): string {
        const data = {
            exportDate: new Date().toISOString(),
            tasks: this.getAllTasks()
        };
        return JSON.stringify(data, null, 2);
    }

    // Importer depuis JSON
    importFromJSON(json: string): void {
        try {
            const data = JSON.parse(json);
            if (!data.tasks || !Array.isArray(data.tasks)) {
                throw new Error("Format de données invalide");
            }

            this.tasks.clear();
            data.tasks.forEach((task: any) => {
                const newTask: Task = {
                    ...task,
                    createdAt: new Date(task.createdAt),
                    dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
                    completedAt: task.completedAt ? new Date(task.completedAt) : undefined
                };
                this.tasks.set(newTask.id, newTask);
                if (newTask.id >= this.nextId) {
                    this.nextId = newTask.id + 1;
                }
            });

            this.notifyObservers();
        } catch (error) {
            throw new Error(`Erreur d'importation: ${error}`);
        }
    }

    // Pattern Observer pour réactivité
    subscribe(observer: (tasks: Task[]) => void): () => void {
        this.observers.push(observer);
        // Retourne une fonction de désabonnement
        return () => {
            const index = this.observers.indexOf(observer);
            if (index > -1) {
                this.observers.splice(index, 1);
            }
        };
    }

    private notifyObservers(): void {
        const tasks = this.getAllTasks();
        this.observers.forEach(observer => observer(tasks));
    }
}

// ========================================
// UTILITAIRES
// ========================================

class TaskUtils {
    // Formater une date
    static formatDate(date: Date): string {
        return new Intl.DateTimeFormat('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }

    // Obtenir le label de priorité
    static getPriorityLabel(priority: PriorityLevel): string {
        const labels: Record<PriorityLevel, string> = {
            [PriorityLevel.LOW]: 'Basse',
            [PriorityLevel.MEDIUM]: 'Moyenne',
            [PriorityLevel.HIGH]: 'Haute',
            [PriorityLevel.URGENT]: 'Urgente'
        };
        return labels[priority];
    }

    // Obtenir le label de statut
    static getStatusLabel(status: TaskStatus): string {
        const labels: Record<TaskStatus, string> = {
            [TaskStatus.TODO]: 'À faire',
            [TaskStatus.IN_PROGRESS]: 'En cours',
            [TaskStatus.DONE]: 'Terminée',
            [TaskStatus.CANCELLED]: 'Annulée'
        };
        return labels[status];
    }

    // Vérifier si une tâche est en retard
    static isOverdue(task: Task): boolean {
        if (!task.dueDate) return false;
        if (task.status === TaskStatus.DONE || task.status === TaskStatus.CANCELLED) {
            return false;
        }
        return task.dueDate < new Date();
    }

    // Calculer le temps restant
    static getTimeRemaining(dueDate: Date): string {
        const now = new Date();
        const diff = dueDate.getTime() - now.getTime();
        
        if (diff < 0) return "En retard";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

        if (days > 0) {
            return `${days} jour${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} heure${hours > 1 ? 's' : ''}`;
        } else {
            return "Moins d'une heure";
        }
    }
}

// ========================================
// EXEMPLE D'UTILISATION
// ========================================

// Créer une instance du gestionnaire
const taskManager = new TaskManager();

// S'abonner aux changements
taskManager.subscribe((tasks) => {
    console.log(`Nombre de tâches: ${tasks.length}`);
});

// Créer des tâches
const task1 = taskManager.createTask(
    "Apprendre TypeScript",
    "Suivre le cours complet de TypeScript",
    PriorityLevel.HIGH,
    ["formation", "typescript"],
    new Date(2025, 10, 15) // 15 novembre 2025
);

const task2 = taskManager.createTask(
    "Faire les courses",
    "Acheter des légumes et des fruits",
    PriorityLevel.MEDIUM,
    ["personnel"]
);

const task3 = taskManager.createTask(
    "Réunion client",
    "Présenter le nouveau projet",
    PriorityLevel.URGENT,
    ["travail", "réunion"],
    new Date(2025, 9, 31) // 31 octobre 2025
);

// Mettre à jour une tâche
taskManager.updateTask(task2.id, {
    description: "Acheter des légumes, fruits et du pain"
});

// Changer le statut
taskManager.changeStatus(task1.id, TaskStatus.IN_PROGRESS);
taskManager.changeStatus(task2.id, TaskStatus.DONE);

// Filtrer les tâches
console.log("\n=== Tâches à faire ===");
const todoTasks = taskManager.filterTasks({ status: TaskStatus.TODO });
todoTasks.forEach(task => {
    console.log(`- ${task.title} (${TaskUtils.getPriorityLabel(task.priority)})`);
});

// Tâches en retard
console.log("\n=== Tâches en retard ===");
const overdueTasks = taskManager.getOverdueTasks();
overdueTasks.forEach(task => {
    console.log(`- ${task.title} - Échéance: ${TaskUtils.formatDate(task.dueDate!)}`);
});

// Statistiques
console.log("\n=== Statistiques ===");
const stats = taskManager.getStats();
console.log(`Total: ${stats.total}`);
console.log(`À faire: ${stats.todo}`);
console.log(`En cours: ${stats.inProgress}`);
console.log(`Terminées: ${stats.done}`);
console.log(`Urgentes: ${stats.byPriority[PriorityLevel.URGENT]}`);

// Trier les tâches par priorité
console.log("\n=== Tâches triées par priorité ===");
const sortedTasks =