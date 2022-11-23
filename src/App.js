import {useState} from 'react';
import './App.css';
import Input from './components/input/input';
import Tasks from './components/tasks/tasks';
import UdateTaskPanel from './components/update-panel/update-task-panel';
import useDatabase from './useDatabase';

import './typedef';

function App() {
        const db = useDatabase();

        const [isOpen, setIsOpen] = useState(false);
        const [task, setTask] = useState({});

        /**
         * Отправляет задачю в блок изменения.
         * @param {Task} task - Задача для изменения.
         */
        function openTask(task) {
            setTask({...task});
            setIsOpen(true);
        }

    return (
        <div className="App">
            <div>
                <Input addTask={db.addTask}/>
                <UdateTaskPanel
                    task={task}
                    setTask={setTask}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    updateTask={db.updateTask}
                    deleteFile={db.deleteFile}
                />
            </div>
            <Tasks
                tasks={db.tasks} 
                markAsDone={db.markAsDone}
                deleteTask={db.daleteTask}
                downloadFile={db.downloadFile}
                openTask={openTask}
            />
        </div>
    );
}

export default App;
