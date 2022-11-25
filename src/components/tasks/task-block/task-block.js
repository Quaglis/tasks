import './task-block.css';
import dayjs from "dayjs";
import 'dayjs/locale/ru';

import '../../../typedef';

dayjs.locale('ru');

/**
 * @param {Object} props
 * @param {Task} props.task
 * @param {function(string, boolean): void} props.markAsDone
 * @param {function(string): void} props.deleteTask
 * @param {function(string, string): void} props.downloadFile
 * @param {function(Task): void} props.openTask
 */
function TaskBlock({task, markAsDone, deleteTask, downloadFile, openTask}) {
    return (
        <div className="task">
            <header>
                <label>
                    <input type="checkbox" checked={task.isDone} onChange={(() => markAsDone(task.id, !task.isDone))}/>
                    {task.isDone ? 'завершено' : 'не завершено'}
                </label>
                <span className={!task.isDone && dayjs(task.date).isBefore(dayjs()) ? "time-limit" : ""}>
                    {dayjs(task.date).format('HH:mm DD MMM YYYY')}
                </span>
            </header>
            <div>
                <h1>{task.title}</h1>
                <div className="edit-btns">
                    <button onClick={() => openTask(task)}>✎</button>
                    <button onClick={() => deleteTask(task.id)}>✖</button>
                </div> 
            </div>
            <span>{task.text}</span>
            {task.file && 
                <button onClick={e => {
                        e.preventDefault();
                        downloadFile(task.file.id, task.file.name);
                    }}
                >⇓ {task.file.name} ⇓</button>}
        </div>
    )
}

export default TaskBlock;