import React from 'react'
import utils from '../utilities'

const Template = (props) => {
    return(
        <div data-node={props.name} data-nodetype="strategy-template" class="border border-green-400 mb-2">
            <div class="bg-green-600 w-full p-2 border-l-4 border-green-600 bg-opacity-10">
                <div class="flex justify-between align-center mb-1">
                    <p class="text-teal-700">{props.name}</p>
                </div>
            </div>
        </div>
    )
}

const Strategy = (props) => {
    return(
        <div data-node={props.node.path} data-nodetype="strategy" class="border border-green-400 mb-2">
            <div class="bg-green-600 w-full p-2 border-l-4 border-green-600 bg-opacity-10">
                <div class="flex justify-between align-center">
                    <p class="text-teal-700">
                        <span class="font-extrabold p-1 bg-blue-800 rounded text-white text-xs mr-1">
                            {props.node.path.replace(/\//g, ".").slice(1)}
                        </span>
                        {props.node.value.name}
                    </p>
                    <div class="flex">
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
            </div>
        </div>
    )
}

export default { 
    Template, 
    Strategy
}