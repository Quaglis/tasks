import './input.css';
import {useState, useEffect} from 'react';

import '../../typedef';

/**
 * @param {Object} props
 * @param {function(Task): void} props.addTask
 */
function Input({addTask}) {

    const [task, setTask] = useState({title: '', text: '', date: '', file: ''});
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setDisabled(task.title === '' || task.text === '' || task.date === '');
    }, [task])

    return (
        <form className='input'>
            <h2>Создать задачу</h2>
            <input type="text" 
                placeholder="Заголовок"
                value={task.title}
                onChange={e => setTask({...task, title: e.target.value})}
            />
            <textarea type="text"
                placeholder="Описание"
                value={task.text} 
                onChange={e => setTask({...task, text: e.target.value})}
            />
            <input type="datetime-local"
                value={task.date} 
                onChange={e => setTask({...task, date: e.target.value})}
            />
            <input type="file"
                onChange={e => setTask({...task, file: e.target.files[0]})}
            />
            <button
                onClick={e => {
                    e.preventDefault();
                    addTask(task);
                }} 
                disabled={disabled}
            >создать запись</button>
        </form>
    )
}

export default Input;