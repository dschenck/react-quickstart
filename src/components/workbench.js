import React      from 'react'
import uuid       from 'uuid'
import strategies from './strategies'
import operators  from './operators'

export default class Workbench extends React.Component{
    handle(event){
        if(event.name == "collapse"){
            event.node.value.collapsed = true
            return this.props.onChange(this.props.tree)
        }
        if(event.name == "expand"){
            event.node.value.collapsed = false
            return this.props.onChange(this.props.tree)
        }
        if(event.name == "delete"){
            event.node.delete()
            return this.props.onChange(this.props.tree)
        }
        if(event.name == "move-up"){
            if(event.node.left){
                const siblings = event.node.siblings
                siblings.splice(event.node.index - 1, 0, siblings.splice(event.node.index, 1)[0])
                return this.props.onChange(this.props.tree)
            }
        }
        if(event.name == "move-down"){
            if(event.node.right){
                const siblings = event.node.siblings
                siblings.splice(event.node.index + 1, 0, siblings.splice(event.node.index, 1)[0])
                return this.props.onChange(this.props.tree)
            }
        }
        if(event.name == "duplicate"){
            event.node.parent.insert(event.node.clone(), event.node.index + 1)
            return this.props.onChange(this.props.tree)
        }
    }
    render(){
        const children = this.props.tree.children.map((child, i) => {
            if(child.value.type == "strategy"){
                return <strategies.Strategy node={child} key={uuid.v4()} handle={this.handle.bind(this)}/>
            }
            if(child.value.type == "operator"){
                return <operators.Operator node={child} key={uuid.v4()} handle={this.handle.bind(this)}/>
            }
        })
        return(
            <div class="relative pb-10">
                <div class={`relative dragula-container rounded z-10 ${children.length == 0 ? 'border-gray-200 border border-dashed' : ''}`} key={uuid.v4()} data-nodetype="workbench" data-node={this.props.tree.path} style={{minHeight:"48px"}}>
                    {children}
                </div>
            </div>
        )
    }
}
