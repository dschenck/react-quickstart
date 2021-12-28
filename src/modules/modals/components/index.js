import React from 'react'
import actions from '../actions'
import store from '../store'

export default class Component extends React.Component {
    constructor(props) {
        super(props)
        this.state = { modals: [] }
    }
    componentDidMount() {
        store.on("change", () => {
            this.setState(() => {
                return { modals: store.modals || [] }
            })
        })
    }
    get last() {
        return this.state.modals[this.state.modals.length - 1]
    }
    render() {
        if (this.last === undefined) {
            return null
        }

        return (
            <div class="flex fixed w-full h-full z-40 bg-gray-800 bg-opacity-50">
                {this.last.render(() => actions.close(this.last.id))}
            </div>
        )
    }
}