import React from "react";
import uuid from "uuid";
import Card from "../../components/cards";
import dragula from "react-dragula";
import "dragula/dist/dragula.css";

import widget from "../../data/dashboard";

class Widget extends React.Component {
    onResize(e) {
        return this.props.onChange({
            ...this.props,
            layout: { ...this.props.layout, columns: e.columns },
        });
    }
    render() {
        const ResizeButton = (props) => {
            return(
                <button
                    class={`${props.selected ? "bg-blue-800 text-white" : ""} px-1 border border-gray-100 w-8 h-6 text-center hover:border-gray-200 focus:outline-none`}
                    onClick={() => this.onResize({ columns:props.columns })}
                >
                    {props.columns}
                </button>
            )
        }

        return (
            <div
                class={
                    this.props.layout.columns == 12
                        ? "w-full"
                        : `w-${this.props.layout.columns}/12`
                }
                data-uuid={this.props.uuid}
            >
                <Card.Card>
                    <Card.Header>{this.props.params.title}</Card.Header>
                    <Card.Body>
                        {this.props.params.text}
                        <div class="text-sm w-full mb-2 mt-2">
                            {[2,3,4,6,9,12].map((c,i) => <ResizeButton key={i} columns={c} selected={this.props.layout.columns == c} />)}
                        </div>
                    </Card.Body>
                    <Card.Footer>{this.props.params.footer}</Card.Footer>
                </Card.Card>
            </div>
        );
    }
}

class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            widgets: widget.children.map((child) => {
                return { uuid: uuid.v4(), ...child };
            }),
        };
    }
    componentDidMount() {
        const drake = dragula({
            isContainer: function (element) {
                return element.classList.contains("dragula-container");
            },
            //direction: "horizontal",
            accepts: (element, target, source, sibling) => {
                return element != target;
            },
        });

        drake.on("drop", (element, target, source, sibling) => {
            if (!element || !target) {
                return;
            }
        });
    }
    onChange(event) {
        this.setState((state) => {
            return {
                widgets: state.widgets.map((child) => {
                    if (child.uuid == event.uuid) {
                        return event.value;
                    }
                    return child;
                }),
            };
        });
    }
    render() {
        const cards = this.state.widgets.map((child, i) => {
            return (
                <Widget
                    key={child.uuid}
                    {...child}
                    onChange={(e) =>
                        this.onChange({ uuid: child.uuid, value: e })
                    }
                />
            );
        });

        return (
            <React.Fragment>
                <h1 class="text-2xl text-gray-600 pb-2">Dashboard</h1>
                <div
                    class="mx-auto flex flex-wrap dragula-container"
                >
                    {cards}
                </div>
            </React.Fragment>
        );
    }
}

export default {
    View,
};
