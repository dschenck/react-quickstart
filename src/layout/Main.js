import React from "react";

export default class Main extends React.Component {
    render() {
        return (
            <div class="bg-gray-100  flex-grow container px-2 mx-auto">
                {this.props.children}
            </div>
        );
    }
}
