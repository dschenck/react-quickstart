import apis from "../apis";
import store from "../flux/store";

const index = (store) => () => {
    if (Object.keys(store.state.todos).length != 0) {
        return store.emit();
    }
    return apis.todos.index().then((response) => {
        return store.handle({
            type: "todos.index.load.success",
            todos: response.data,
        });
    });
};

const update = (todo) => {
    store.handle({
        type: "todos.todo.update",
        todo: todo,
    });
    return apis.todos.update(todo).then((response) => {
        return store.handle({
            type: "todos.todo.update.success",
            todo: response.data,
        });
    });
};

const remove = (todo) => {
    store.handle({
        type: "todos.todo.remove",
        todo: todo,
    });
    return apis.todos.remove(todo).then((response) => {
        return store.handle({
            type: "todos.todo.remove.success",
            todo: response.data,
        });
    });
};

const create = (todo) => {
    return apis.todos.create(todo).then((response) => {
        return store.handle({
            type: "todos.todo.create.success",
            todo: { ...todo, ...response.data },
        });
    });
};

export default {
    create,
    index: index(store),
    update,
    remove,
    delete: remove,
};
