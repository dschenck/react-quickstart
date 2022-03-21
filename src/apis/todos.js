const index = function () {
    return fetch("https://jsonplaceholder.typicode.com/todos").then(
        (response) => {
            return response.json().then((data) => ({
                status: response.status,
                data: data.slice(0, 10),
            }));
        }
    );
};

const update = function (todo) {
    return fetch("https://jsonplaceholder.typicode.com/todos/" + todo.id, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(todo),
    }).then((response) => {
        return response.json().then((data) => ({
            status: response.status,
            data,
        }));
    });
};

const remove = function (todo) {
    return fetch("https://jsonplaceholder.typicode.com/todos/" + todo.id, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "DELETE",
    }).then((response) => {
        return response.json().then((data) => ({
            status: response.status,
            data: { id: todo.id },
        }));
    });
};

const create = function (todo) {
    return fetch("https://jsonplaceholder.typicode.com/todos", {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    }).then((response) => {
        return response.json().then((data) => ({
            status: response.status,
            data: data,
        }));
    });
};

export default {
    create,
    remove,
    delete: remove,
    index,
    update,
};
