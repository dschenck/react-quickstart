import React          from 'react'
import { withRouter } from 'react-router-dom'
import actions        from '../../flux/actions'

class Page extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div class="flex items-center">
                <div class="shadow-sm bg-white p-2 w-full md:w-4/12 mx-auto">
                    <h1 class="text-2xl text-gray-600 border-b border-gray-200 mb-2">Request sent</h1>
                    <p class="text-sm text-gray-700 mb-2 p-2 bg-gray-100">
                        You will shortly receive a link to define a new password. 
                    </p>
                </div>
            </div>
        )
    }
}

export default withRouter(Page)