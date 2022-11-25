import './tasks.css';
import TaskBlock from './task-block/task-block';

import '../../typedef';

/**
 * @param {Object} props
 * @param {Task[]} props.tasks
 * @param {function(string, boolean): void} props.markAsDone
 * @param {function(string): void} props.deleteTask
 * @param {function(string, string): void} props.downloadFile
 * @param {function(Task): void} props.openTask
 */
function Tasks({tasks, markAsDone, deleteTask, downloadFile, openTask}) {
    return (tasks && tasks.length > 0 &&
        <div className='tasks'>
            <h2>Задачи</h2>
            {tasks.map((task, key) => (
                <TaskBlock key={key}
                    task={task}
                    markAsDone={markAsDone}
                    deleteTask={deleteTask}
                    downloadFile={downloadFile}
                    openTask={openTask}
                />
            ))}
        </div>
    )
}

export default Tasks;