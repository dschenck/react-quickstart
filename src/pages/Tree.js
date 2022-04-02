import React  from 'react'
import dragula  from 'react-dragula'
import 'dragula/dist/dragula.css'

import Tree       from '../lib/tree'
import Library    from '../components/library'
import Workbench  from '../components/workbench' 
import data       from '../data/data'

export default class Page extends React.Component{
    constructor(){
        super()
        this.state = {tree: new Tree({children:data.project})}
    }
    componentDidMount(){
        this.drake = dragula({
            isContainer: function (element) {
                return element.classList.contains('dragula-container');
            }, 
            accepts: (element, target, source, sibling) => {
                if(["workbench","operator"].indexOf(target.dataset.nodetype) == -1){
                    return false
                }
                return !target.dataset.node.startsWith(element.dataset.node)
            },
            copy: (element, source) => {
                return ["strategy-template","operator-template"].indexOf(element.dataset.nodetype) != -1
            }
        })
        this.drake.on("drop", (element, target, source, sibling) => {
            if(!element || !target){
                return
            }
            if(["workbench","operator","strategy"].indexOf(element.dataset.nodetype) != -1){
                const tree = this.state.tree.clone()
                tree.get(element.dataset.node).move(
                    target.dataset.node, 
                    sibling === null ? null : tree.get(sibling.dataset.node).index
                )
                return this.setState({tree})
            }
            if(element.dataset.nodetype == "strategy-template"){
                const tree = this.state.tree.clone()
                const node = {type:"strategy", name:element.dataset.node}
                tree.get(target.dataset.node).insert(node, sibling === null ? null : tree.get(sibling.dataset.node).index)
                return this.setState({tree})
            }
            if(element.dataset.nodetype == "operator-template"){
                const tree = this.state.tree.clone()
                const node = {type:"operator", name:element.dataset.node, children:[]}
                tree.get(target.dataset.node).insert(node, sibling === null ? null : tree.get(sibling.dataset.node).index)
                return this.setState({tree})
            }
        })
    }
    componentWillUnmount(){
        this.drake.destroy()
    }
    render(){
        return(
            <div>
                <h1 class="text-2xl text-gray-600 pb-2">Nested Tree Builder</h1>
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                    <div class="box">
                        <h1 class="text-xl mb-2 border-b border-gray-200">Library</h1>
                        <Library strategies={data.strategies} operators={data.operators}/>
                    </div>
                    <div class="box">
                        <h1 class="text-xl mb-2 border-b border-gray-200">Workbench</h1>
                        <Workbench tree={this.state.tree} onChange={tree => this.setState({tree})}/>
                    </div>
                    <div class="box">
                        <h1 class="text-xl mb-2 border-b border-gray-200">JSON</h1>
                        <pre class="text-xs">{JSON.stringify(this.state.tree.js(), null, 2)}</pre>
                    </div>
                </div>
            </div>
        )
    }
}