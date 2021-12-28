import React from 'react'

class Card extends React.Component {
    render() {
        return (
            <div class="mb-4 bg-white p-2 border border-gray-100">
                {this.props.children}
            </div>
        )
    }
}

class Header extends React.Component {
    render() {
        if (!this.props.text && !this.props.children) {
            return null
        }

        return (
            <div class="border-b border-gray-200">
                {this.props.text}
                {this.props.children}
            </div>
        )
    }
}

class Body extends React.Component {
    render() {
        return (
            <div class="py-0 overflow-x-scroll">
                {this.props.children}
            </div>
        )
    }
}

class Footer extends React.Component {
    render() {
        if (!this.props.text && !this.props.children) {
            return null
        }

        return (
            <div class="border-t border-gray-200 mb-6 text-xs">
                {this.props.text}
                {this.props.children}
            </div>
        )
    }
}

export default {
    Card,
    Header,
    Body,
    Footer
}