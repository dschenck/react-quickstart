import React      from 'react'
import uuid       from 'uuid';
import utils      from '../utilities'
import strategies from './strategies'

const Template = (props) => {
    return(
        <div data-node={props.name} data-nodetype="operator-template" class="border border-blue-200 mb-2">
            <div class="bg-blue-600 w-full p-2 border-l-4 border-blue-800 bg-opacity-5" >
                <div class="flex justify-between align-center mb-1">
                    <p class="text-blue-800">{props.name}</p>
                </div>
            </div>
        </div>
    )
}

const Operator = (props) => {
    const children = props.node.children.map((child, i) => {
        if(child.value.type == "strategy"){
            return <strategies.Strategy node={child} key={uuid.v4()} handle={props.handle}/>
        }
        if(child.value.type == "operator"){
            return <Operator node={child} key={uuid.v4()} handle={props.handle}/>
        }
    })
    
    return(
        <div data-node={props.node.path} data-nodetype="operator" class="border border-blue-200 mb-2">
            <div class="bg-blue-600 w-full p-2 border-l-4 border-blue-800 bg-opacity-5" >
                <div class="flex justify-between align-center mb-1">
                    <p class="text-blue-800">
                        <span class="font-extrabold p-1 bg-blue-800 rounded text-white text-xs mr-1">
                            {props.node.path.replace(/\//g, ".").slice(1)}
                        </span>
                        {props.node.value.name}
                    </p>
                    <div class="flex">  
                        <utils.If test={!props.node.value.collapsed}>
                            <button class="text-sm p-1 text-gray-400 hover:text-gray-800"
                                onClick={() => props.handle({name:"collapse", node:props.node})}>
                                <i class="fa fa-minus"></i>
                            </button>
                            <utils.Else>
                                <button class="text-sm p-1 text-gray-400 hover:text-gray-800"
                                    onClick={() => props.handle({name:"expand", node:props.node})}>
                                    <i class="fa fa-plus"></i>
                                </button>
                            </utils.Else>
                        </utils.If> 
                        <utils.If test={!props.node.first}>
                            <button class="text-sm p-1 text-gray-400 hover:text-gray-800"
                                onClick={() => props.handle({name:"move-up", node:props.node})}>
                                <i class="fa fa-arrow-up"></i>
                            </button>
                        </utils.If> 
                        <utils.If test={!props.node.last}>
                            <button class="text-sm p-1 text-gray-400 hover:text-gray-800"
                                onClick={() => props.handle({name:"move-down", node:props.node})}>
                                <i class="fa fa-arrow-down"></i>
                            </button>
                        </utils.If>
                        <button class="text-sm p-1 text-gray-400 hover:text-gray-800"
                            onClick={() => props.handle({name:"delete", node:props.node})}>
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="text-sm p-1 text-gray-400 hover:text-gray-800"
                            onClick={() => props.handle({name:"duplicate", node:props.node})}>
                            <i class="fas fa-clone"></i>
                        </button>
                    </div>
                </div>
                <div class={`${props.node.value.collapsed ? "hidden" : "relative"}`}>
                    <utils.If test={children.length == 0}>
                        <div class="absolute border border-gray-200 border-dashed w-full h-full text-gray-400 text-center text-sm align-middle p-4 z-0">
                            drop elements here
                        </div>
                    </utils.If>
                    <div class="relative dragula-container rounded z-10" data-node={props.node.path} data-nodetype="operator" style={{minHeight:"48px"}}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default { 
    Template, 
    Operator
}