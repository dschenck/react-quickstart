import React from "react";
import store from "../../flux/store";
import actions from "../../actions";

const Todo = (props) => {
    return (
        <div class="border-b border-gray-200 mb-1">
            <div class="flex">
                <div class="w-11/12">
                    <button
                        class="mr-1 px-2 text-gray-300 hover:text-green-700 focus:outline-none"
                        onClick={() =>
                            props.onChange({ ...props, completed: !props.completed })
                        }
                    >
                        {props.completed ? 
                             <i class="fa fa-rotate-left"></i>: 
                            <i class="fa fa-check" />
                        }
                    </button>
                    <span class={`${props.completed ? "text-gray-500 line-through" :""}`}>{props.title}</span>
                </div>
                <div class="w-1/12 text-right ">
                    <button class="text-gray-300 hover:text-red-700 focus:outline-none" 
                        onClick={() => props.onDelete(props)}>
                        <i class="fa fa-trash" />
                    </button>
                    
                </div>
            </div>

        </div>
    );
};

class TodoForm extends React.Component {
    constructor(props) {
        super();
        this.state = { value: { title: "" }, errors: {} };
    }
    reset() {
        this.setState({ value: { title: "" }, errors: {} });
    }
    onChange(e) {
        this.setState((state, props) => {
            return { value: { ...state.value, [e.name]: e.value } };
        });
    }
    onSubmit(e) {
        e.preventDefault();
        actions.todos.create(this.state.value).then(this.reset());
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <label for="title" class="block">Add todo</label>
                <input
                    type="text"
                    class="bg-gray-100 border-b border-gray-100 focus:border-blue-700 focus:outline-none block w-full h-8 p-1"
                    value={this.state.value.title}
                    placeholder="Buy carottes"
                    onChange={(e) =>
                        this.onChange({ name: "title", value: e.target.value })
                    }
                />
            </form>
        );
    }
}

export default class Component extends React.Component {
    constructor(props) {
        super();
        this.state = { state: "loading", todos: [] };
    }
    componentDidMount() {
        this.unsubscribe = store
            .subscribe((state) => {
                this.setState({
                    state: "ready",
                    todos: Object.values(state.todos),
                });
            })
            .bind(this);
        actions.todos.index();
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    onDelete(todo) {
        actions.todos.delete(todo);
    }
    onChange(todo) {
        actions.todos.update(todo);
    }
    render() {
        return (
            <div class="border-b border-gray-200 px-3 mt-4 bg-white w-1/2 pb-16 mx-auto pt-4">
                <h1 class="text-2xl text-gray-600 mb-2">
                    My reactive todo list
                </h1>
                <div class="mb-4">
                    <TodoForm />
                </div>
                <div>
                    <h1 class="text-2xl text-gray-600 mb-2">
                        To do list
                    </h1>
                    {this.state.todos.sort((a, b) => a.completed - b.completed).map((todo) => (
                        <Todo
                            {...todo}
                            key={todo.id}
                            onDelete={this.onDelete}
                            onChange={this.onChange}
                        />
                    ))}
                </div>
            </div>
        );
    }
}
