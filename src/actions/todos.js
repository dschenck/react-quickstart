import apis from "../apis";
import store from "../flux/store";

const index = () => () => {
   return apis.todos.index();
};

const update = (todo) => {
   return apis.todos.update(todo);
};

const remove = (todo) => {
   return apis.todos.remove(todo);
};

const create = (todo) => {
   return apis.todos.create(todo);
};

export default {
   create,
   index,
   update,
   remove,
   delete: remove,
};
