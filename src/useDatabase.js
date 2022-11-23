import {useEffect, useState} from 'react';
import {ref, onValue, set, get} from 'firebase/database';
import {database} from './firebase';
import {v4 as uuidv4} from 'uuid';

import './typedef';

/** @module useDatabase */

/**
 * Хук для управления БД.
 * @return {{
 *      tasks: Task[], 
 *      addTask: addTask,
 *      markAsDone: markAsDone,
 *      updateTask: updateTask,
 *      daleteTask: daleteTask,
 *      uploadFile: uploadFile,
 *      downloadFile: downloadFile,
 *      deleteFile: deleteFile
 * }}
 */
function useDatabase() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        onValue(ref(database, '/tasks'), snapshot => {
            let obj = snapshot.val();
            let arr = [];
            let i = 0;
            for (let j in obj){
                arr[i] = obj[j];
                arr[i++].id = j;
            }
            arr.sort((a, b) => {
                if (a.date > b.date) return 1;
                else if (a.date === b.date) return 0;
                return -1;
            })
            setTasks(arr)
        });   
    }, []);
    
    /**
     * Добавляет новую задачу в БД.
     * @param {Task} data - Данные, в виде задачи (id не будет учтён, маркер isDone установится в false).
     */
    function addTask(data) {
        let task = { ...data, isDone: false};

        if (task.is) delete task.id;
        
        if (data.file && data.file !== '') {
            let id = uuidv4();
            task.file = { name: data.file.name, id: id };
            uploadFile(data.file, id);
        }
        else
            delete task.file;
        
        set(ref(database, '/tasks/' + uuidv4()), task);
    }

    /**
     * Устанавливает флаг выполнения задачи.
     * @param {string} taskId - Идентификатор задачи.
     * @param {boolean} mark - Маркер выполнения задачи.
     */
    function markAsDone(taskId, mark) {
        set(ref(database, `/tasks/${taskId}/isDone/`), mark);
    }

    /**
     * Обновляет данные задачи в БД.
     * @param {Task} task - Копия задачи с изменёнными параметрами.
     */
    function updateTask(task) {
        let data = {};

        if (task.title !== '') data.title = task.title;
        if (task.text !== '') data.text = task.text;
        if (task.date !== '') data.date = task.date;
        if (task.title !== '') data.title = task.title;
        if (task.file && task.file !== '') {
            if (task.file.id) 
                data.file = task.file;
            else {
                let uuid = uuidv4();
                uploadFile(task.file, uuid);
                data.file = { name: task.file.name, id: uuid };
            }

        }
        data.isDone = !!task.isDone;

        set(ref(database, '/tasks/' + task.id), data);
    }

    /**
     * Удаляет задачу из БД.
     * @param {string} taskId - Идентификатор задачи.
     */
    function daleteTask(taskId) {
        let index = tasks.findIndex(item => item.id === taskId);
        if (tasks[index].file)
            deleteFile(tasks[index].file.id);

        set(ref(database, '/tasks/' + taskId), null);
    }

    /**
     * Загружает файл в БД.
     * @param {File} file - Файл, который нужно загрузить.
     * @param {string} fileId - Идентификатор файла.
     */
    function uploadFile(file, fileId) {
        let reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => set(ref(database, `/files/${fileId}`), reader.result);
    }

    /**
     * Скачивает файл из БД.
     * @param {string} fileId - Идентификатор файла.
     * @param {string} name - Название для скачеваемого файла (не влияет на загрузку).
     */
    function downloadFile(fileId, name) {
        get(ref(database, `/files/${fileId}`)).then(snapshot => {
            let file = snapshot.val();
            let link = document.createElement('a');

            link.href = file;
            link.download = name;
            link.click();
        });
    }

    /**
     * Удаляет файл из БД и ссылку на него у задачи.
     * @param {string} fileId - Идентификатор файла.
     * @param {string} taskId - Идентификатор задачи.
     */
    function deleteFile(fileId, taskId) {
        set(ref(database, `/files/${fileId}`), null);
        set(ref(database, `/tasks/${taskId}/file`), null);
    }

    return {
        tasks,
        addTask,
        markAsDone,
        updateTask,
        daleteTask,
        uploadFile,
        downloadFile,
        deleteFile
    }

}

export default useDatabase;