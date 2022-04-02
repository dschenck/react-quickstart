import React                from 'react'
import { withRouter, Link } from 'react-router-dom'
import Session              from '../contexts/session'
import utils                from '../utilities'
import actions              from '../flux/actions'
import Dropdown             from '../components/dropdowns' 

const Logo = () => {
    return(
        <svg class="h-5 pr-3 fill-current" viewBox="0 0 20 20">
            <path d="M0 2C0 .9.9 0 2 0h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm14 12h4V2H2v12h4c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2zM5 9l2-2 2 2 4-4 2 2-6 6-4-4z"/>
        </svg>
    )
}

const NavLink = props => {
    return (
        <button 
            class="inline-block text-gray-600 no-underline hover:text-black hover:underline py-2 pl-4" 
            onClick={() => props.onClick(props.to)}>
                {props.label}
        </button>
    )
}

class Navbar extends React.Component{
    constructor(props){
        super(props)
        this.state = {open:false}
    }
    toggle(){
        this.setState(state => {
            return {...state, open:!state.open}
        })
    }
    navigate(route){
        this.setState(state => {
            return {...state, open:false}
        }, () => {
            return this.props.history.push(route)
        })
    }
    render(){
        const session = this.props.session

        return(
            <nav class="w-full bg-white border-b border-gray-400 px-4">
                <div class="w-full container mx-auto flex flex-wrap items-center justify-between py-2">
                    <div class="flex items-center">
                        <Logo />
                        <a class="font-bold text-xl"  href="#"> 
                            Inbox
                        </a>
                    </div>
                    <div class="block lg:hidden">
                        <button class="flex items-center px-3 py-2 border border-gray-500 rounded text-gray-500 hover:text-black appearance-none focus:outline-none"
                            onClick={() => this.toggle()}>
                            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20">
                                <title>Menu</title>
                                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                            </svg>
                        </button>
                    </div>
                    <div class={`w-full flex-grow lg:content-center lg:items-center lg:w-auto ${this.state.open ? "" : "hidden"} lg:block mt-2 lg:mt-0 z-20`}>
                        <ul class="lg:flex justify-end items-center">
                                <li class="py-2 lg:py-0">
                                    <NavLink to="/layout" label="layout" onClick={this.navigate.bind(this)} />
                                </li>
                                <li class="py-2 lg:py-0">
                                    <NavLink to="/utilities" label="utilities" onClick={this.navigate.bind(this)} />
                                </li>
                                <li class="py-2 lg:py-0">
                                    <NavLink to="/tree" label="tree builder" onClick={this.navigate.bind(this)} />
                                </li>
                                <li class="py-2 lg:py-0">
                                    <NavLink to="/todos" label="todos" onClick={this.navigate.bind(this)} />
                                </li>
                                <li class="py-2 lg:py-0">
                                    <NavLink to="/dashboard" label="dashboard" onClick={this.navigate.bind(this)} />
                                </li>
                            <utils.If test={session}>
                                <li class="py-2 lg:py-0">
                                    <Dropdown.Dropdown>
                                        <button 
                                            class="text-gray-600 no-underline hover:text-black hover:underline py-2 pl-4 focus:outline-none">
                                            {session && session.user.firstname} <i class="ml-1 text-sm fa fa-caret-down"></i>
                                        </button>
                                        <div class="w-36 shadow-lg bg-white border border-gray-200">
                                            <button class="inline-block text-gray-600 no-underline hover:text-black hover:underline py-2 pl-4"
                                                onClick={actions.authentication.logout}>
                                                logout
                                            </button>
                                        </div>
                                    </Dropdown.Dropdown>
                                </li>
                            </utils.If>
                            <utils.If test={!session}>
                                <li class="py-2 lg:py-0">
                                    <NavLink to="/login" label="login" onClick={this.navigate.bind(this)} />
                                </li>
                            </utils.If>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter((props) => {
    const session = React.useContext(Session.context)
    return <Navbar session={session} history={props.history}/>
})