import React          from 'react'
import { withRouter } from 'react-router-dom'
import actions        from '../../flux/actions'

class Page extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            value:{
                email:""
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
            actions.authentication.resetting.request({
                email:this.state.value.email
            }).then(() => {
                return this.props.history.replace("/resetting/sent")
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
            <div class="h-full flex items-center" style={{backgroundImage:"url('https://images.unsplash.com/photo-1565213804504-ce974456b98b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1404&q=80')"}}>
                <div class="shadow-sm bg-white p-2 w-full md:w-4/12 mx-auto">
                    <h1 class="text-2xl text-gray-600 border-b border-gray-200 mb-2">Reset your password</h1>
                    <p class="text-sm text-gray-700 mb-2 p-2 bg-gray-100">
                        <i class="fa fa-info-circle mr-1"></i>
                        To reset your password, please enter your email address below. Once submitted, we will shortly send you a link to define a new password. 
                    </p>
                    <form>
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
                        <div class="border-t border-gray-100 mb-2"></div>
                        <div class="text-right">
                            <button 
                                class="p-1 text-sm bg-blue-800 text-white hover:bg-blue-700 w-16 focus:outline-none"
                                onClick={e => this.onSubmit(e)}
                                disabled={this.state.submitting}>
                                {this.state.submitting ? "request" : "request"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Page)