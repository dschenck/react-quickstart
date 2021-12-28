import React from 'react'
import uuid from 'uuid'
import Card from '../../components/cards'
import dragula from 'react-dragula'
import 'dragula/dist/dragula.css'

import widget from '../../data/dashboard'

class Widget extends React.Component {
    onResize(e) {
        return this.props.onChange({ ...this.props, layout: { ...this.props.layout, columns: e.columns } })
    }
    render() {
        return (
            <div class={this.props.layout.columns == 12 ? 'w-full' : `w-${this.props.layout.columns}/12`} data-uuid={this.props.uuid}>
                <Card.Card>
                    <Card.Header>
                        {this.props.params.title}
                    </Card.Header>
                    <Card.Body>
                        {this.props.params.text}
                        <div class="text-sm w-full mb-2 mt-2">
                            <button class="px-1 border border-gray-100 w-8 h-6 text-center hover:border-gray-200 focus:outline-none"
                                onClick={() => this.onResize({ columns: 2 })}>
                                2
                            </button>
                            <button class="px-1 border border-gray-100 w-8 h-6 text-center hover:border-gray-200 focus:outline-none"
                                onClick={() => this.onResize({ columns: 3 })}>
                                3
                            </button>
                            <button class="px-1 border border-gray-100 w-8 h-6 text-center hover:border-gray-200 focus:outline-none"
                                onClick={() => this.onResize({ columns: 4 })}>
                                4
                            </button>
                            <button class="px-1 border border-gray-100 w-8 h-6 text-center hover:border-gray-200 focus:outline-none"
                                onClick={() => this.onResize({ columns: 6 })}>
                                6
                            </button>
                            <button class="px-1 border border-gray-100 w-8 h-6 text-center hover:border-gray-200 focus:outline-none"
                                onClick={() => this.onResize({ columns: 12 })}>
                                12
                            </button>
                        </div>
                    </Card.Body>
                    <Card.Footer>
                        {this.props.params.footer}
                    </Card.Footer>
                </Card.Card>
            </div>
        )
    }
}

class View extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            widgets: widget.children.map(child => {
                return { uuid: uuid.v4(), ...child }
            })
        }
    }
    componentDidMount() {
        const drake = dragula({
            isContainer: function (element) {
                return element.classList.contains('dragula-container');
            },
            //direction: "horizontal",
            accepts: (element, target, source, sibling) => {
                return element != target
            }
        })

        drake.on("drop", (element, target, source, sibling) => {
            if (!element || !target) {
                return
            }
            console.log(element, sibling)
        })
    }
    onChange(event) {
        this.setState(state => {
            return {
                widgets: state.widgets.map(child => {
                    if (child.uuid == event.uuid) {
                        return event.value
                    }
                    return child
                })
            }
        })
    }
    render() {
        const cards = this.state.widgets.map((child, i) => {
            return (
                <Widget
                    key={child.uuid}
                    {...child}
                    onChange={e => this.onChange({ uuid: child.uuid, value: e })} />
            )
        })

        return (
            <div class="mx-auto py-4 flex flex-wrap dragula-container" style={{ maxWidth: "960px" }}>
                {cards}
            </div>
        )
    }
}

export default {
    View
}