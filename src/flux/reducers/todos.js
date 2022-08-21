export default (state = {}, action) => {
   switch (action.type) {
      case "todos.index.load.success":
         return action.todos.reduce((acc, todo) => {
            acc[todo.id] = todo;
            return acc;
         }, {});
      case "todos.todo.update":
      case "todos.todo.update.success":
         return Object.values(state).reduce((acc, todo) => {
            acc[todo.id] = todo.id == action.todo.id ? action.todo : todo;
            return acc;
         }, {});
      case "todos.todo.remove":
      case "todos.todo.remove.success":
         return Object.values(state).reduce((acc, todo) => {
            if (todo.id != action.todo.id) {
               acc[todo.id] = todo;
            }
            return acc;
         }, {});
      case "todos.todo.create.success":
         return { ...state, [action.todo.id]: action.todo };
   }
   return state;
};
