import './update-task-panel.css';
import { useEffect, useState } from 'react';

import '../../typedef';

/**
 * @param {Object} props
 * @param {Task} props.task
 * @param {function(Task): void} props.setTask
 * @param {boolean} props.isOpen
 * @param {function(boolean): void} props.setIsOpen
 * @param {function(Task): void} props.updateTask
 * @param {function(string, string): void} props.deleteFile
 */
function UdateTaskPanel({task, setTask, isOpen, setIsOpen, updateTask, deleteFile}) {
    
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(task.title === '' || task.text === '' || task.date === '');
    }, [task]);

    return (isOpen &&
        <div className="update-panel">
            <h2>Изменить задачу</h2>
            <input 
                type="text" 
                placeholder="Заголовок"
                value={task.title}
                onChange={e => setTask({...task, title: e.target.value})}
            />
            <textarea 
                type="text"
                placeholder="Описание"
                value={task.text} 
                onChange={e => setTask({...task, text: e.target.value})}
            />
            <input 
                type="datetime-local"
                value={task.date} 
                onChange={e => setTask({...task, date: e.target.value})}
            />
            {task.file && task.file !== '' && task.file.id 
            ? 
                <div>
                    <b>{task.file.name}</b>
                    <button 
                        onClick={() => {
                            deleteFile(task.file.id, task.id);
                            task.file = '';
                        }}
                    >✖</button>
                </div>
            :   
                <input 
                    type="file" 
                    placeholder="Добавить файл"
                    onChange={e => setTask({...task, file: e.target.files[0]})}
                />
            }
            <div>
                <button 
                    onClick={() => {
                        updateTask(task);
                        setIsOpen(false);
                    }}
                    disabled={disabled}
                >применить</button>
                <button onClick={() => setIsOpen(false)}>отменить</button>
            </div>
        </div>    
    )
}

export default UdateTaskPanel;