/**
 * Задача.
 * @typedef {Object} Task
 * @prop {string} id - Идентификатор задачи.
 * @prop {string} title - Заголовок задачи.
 * @prop {string} text - Описание задачи.
 * @prop {(string|Date)} date - До какой даты нужно выполнить задачу.
 * @prop {(File|{name: string, id: string}|undefined)} file - Прикреплённый файл (не обязательно).
 * @prop {(boolean|undefined)} isDone - Выполнена ли задача?
 */