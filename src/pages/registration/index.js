import React          from 'react'
import { withRouter } from 'react-router-dom'
import actions        from '../../flux/actions'

class Form extends React.Component{
    
}

class Page extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:{
                email:"",
                password:"", 
                firstname:"",
                lastname:""
            }, 
            errors:{}, 
            dirty:true,
            submitting:false
        }
    }
    onChange(e){
        this.setState(state => {
            return {value:{...state.value, [e.name]:e.value}, dirty:true}
        })
    }
    onBlur(e){
        if(e.name == "email"){
            if(this.state.value.email.indexOf("@") == -1){
                this.setState(state => {
                    return {errors:{...state.errors, email:"must be a valid email address"}}
                })
            }
            else{
                this.setState(state => {
                    return {errors:{...state.errors, email:undefined}}
                })
            }
        }
    }
    onSubmit(e){
        e.preventDefault();
        this.setState({submitting:true}, () => {
            actions.authentication.register({
                ...this.state.value
            }).then(() => {
                return this.props.history.push("/")
            }).catch(response => {
                if(response.status == 500){
                    this.setState({
                        submitting:false,
                        errors:{"global":"There was an issue connecting"}
                    })
                }
                else{
                    this.setState({
                        submitting:false,
                        errors:response.data
                    })
                }
            })
        })
    }
    render(){
        return(
            <div class="flex items-center">
                <div class="shadow-sm bg-white p-2 w-full md:w-4/12 mx-auto">
                    <h1 class="text-2xl text-gray-600 border-b border-gray-200 mb-2">Welcome</h1>
                    <form>
                        <div class="mb-2 grid grid-cols-2 gap-2">
                            <div>
                                <label class="w-full text-sm font-bold">
                                    First name
                                </label>
                                <span class="w-full text-red-700 text-sm">{this.state.errors.firstname}</span>
                                <input 
                                    class="w-full border border-gray-200 focus:outline-none text-sm p-1 bg-gray-100" 
                                    name="firstname" 
                                    type="text"
                                    value={this.state.value.firstname}
                                    onChange={e => this.onChange({name:"firstname", value:e.target.value})}
                                    onBlur={e => this.onBlur({name:"firstname"})}/>
                            </div>
                            <div>
                                <label class="w-full text-sm font-bold">
                                    Last name
                                </label>
                                <span class="w-full text-red-700 text-sm">{this.state.errors.lastname}</span>
                                <input 
                                    class="w-full border border-gray-200 focus:outline-none text-sm p-1 bg-gray-100" 
                                    name="lastname" 
                                    type="text"
                                    value={this.state.value.firstname}
                                    onChange={e => this.onChange({name:"lastname", value:e.target.value})}
                                    onBlur={e => this.onBlur({name:"lastname"})}/>
                            </div>
                        </div>
                        <div class="mb-2 flex flex-wrap">
                            <label class="w-full text-sm font-bold">
                                Email address
                            </label>
                            <span class="w-full text-red-700 text-sm">{this.state.errors.email}</span>
                            <input 
                                class="w-full border border-gray-200 focus:outline-none text-sm p-1 bg-gray-100" 
                                name="email" 
                                type="email"
                                value={this.state.value.email}
                                onChange={e => this.onChange({name:"email", value:e.target.value})}
                                onBlur={e => this.onBlur({name:"email"})}/>
                            </div>
                        <div class="mb-2">
                            <label class="w-full text-sm font-bold">
                                Password
                            </label>
                            <input 
                                class="w-full border border-gray-200 focus:outline-none text-sm p-1 bg-gray-100" 
                                name="password" 
                                type="password"
                                value={this.state.value.password}
                                onChange={e => this.onChange({name:"password", value:e.target.value})}/>
                        </div>
                        <div class="border-t border-gray-100 mb-2"></div>
                        <div class="text-right">
                            <button 
                                class="p-1 text-sm bg-blue-800 text-white hover:bg-blue-700 w-16 focus:outline-none"
                                onClick={e => this.onSubmit(e)}
                                disabled={this.state.submitting}>
                                register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default {
    Register:withRouter(Page)
}