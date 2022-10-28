import React from "react";
import dragula from "react-dragula";
import "dragula/dist/dragula.css";

import Tree from "../lib/tree";
import Library from "../components/library";
import Workbench from "../components/workbench";
import data from "../data/data";

import * as uuid from "uuid";

export default class Page extends React.Component {
   constructor() {
      super();
      this.state = {
         tree: new Tree({ children: data.project }).map((child) => {
            return { ...child.value, meta: { id: uuid.v4() } };
         }),
      };
   }
   componentDidMount() {
      this.drake = dragula({
         isContainer: function (element) {
            return element.classList.contains("dragula-container");
         },
         accepts: (element, target, source, sibling) => {
            if (
               ["workbench", "operator"].indexOf(target.dataset.nodetype) == -1
            ) {
               return false;
            }
            return !target.dataset.path.startsWith(element.dataset.path);
         },
         copy: (element, source) => {
            return (
               ["strategy-template", "operator-template"].indexOf(
                  element.dataset.nodetype
               ) != -1
            );
         },
      });
      this.drake.on("drop", (element, target, source, sibling) => {
         if (!element || !target) {
            return;
         }
         if (
            ["workbench", "operator", "strategy"].indexOf(
               element.dataset.nodetype
            ) != -1
         ) {
            return this.setState((state) => {
               return {
                  tree: state.tree.move(
                     state.tree.find(
                        (node) => node.value.meta.id == element.dataset.id
                     ),
                     state.tree.find(
                        (node) => node.value.meta.id == target.dataset.id
                     ),
                     sibling
                        ? state.tree.find(
                             (node) => node.value.meta.id == sibling.dataset.id
                          )
                        : undefined
                  ),
               };
            });
         }
         if (element.dataset.nodetype == "strategy-template") {
            return this.setState({
               tree: this.state.tree.map((child) => {
                  if (child.value.meta.id == target.dataset.id) {
                     return child.insert(
                        {
                           type: "strategy",
                           name: element.dataset.nodename,
                           meta: { id: uuid.v4() },
                        },
                        sibling
                           ? child.find(
                                (node) =>
                                   node.value.meta.id == sibling.dataset.id
                             ).index
                           : undefined
                     );
                  }
                  return child;
               }),
            });
         }
         if (element.dataset.nodetype == "operator-template") {
            return this.setState({
               tree: this.state.tree.map((child) => {
                  if (child.value.meta.id == target.dataset.id) {
                     return child.insert(
                        {
                           type: "operator",
                           name: element.dataset.nodename,
                           children: [],
                           meta: { id: uuid.v4() },
                        },
                        sibling
                           ? child.find(
                                (node) =>
                                   node.value.meta.id == sibling.dataset.id
                             ).index
                           : undefined
                     );
                  }
                  return child;
               }),
            });
         }
      });
   }
   componentWillUnmount() {
      this.drake.destroy();
   }
   onChange(tree) {
      return this.setState({ tree });
   }
   handle(event) {
      if (event.name == "collapse") {
         return this.onChange(
            this.state.tree.map((node) => {
               if (node == event.node) {
                  return {
                     ...node.value,
                     meta: { ...node.value.meta, collapsed: true },
                  };
               }
               return node;
            })
         );
      }
      if (event.name == "expand") {
         return this.onChange(
            this.state.tree.map((node) => {
               if (node == event.node) {
                  return {
                     ...node.value,
                     meta: { ...node.value.meta, collapsed: false },
                  };
               }
               return node;
            })
         );
      }
      if (event.name == "delete") {
         return this.onChange(this.state.tree.delete(event.node));
      }
      if (event.name == "move-up") {
         return this.onChange(
            this.state.tree.move(event.node, event.node.parent, event.node.left)
         );
      }
      if (event.name == "move-down") {
         return this.onChange(
            this.state.tree.move(
               event.node,
               event.node.parent,
               event.node.right
            )
         );
      }
      if (event.name == "duplicate") {
         return this.onChange(
            this.state.tree.map((node) => {
               if (node == event.node.parent) {
                  return node.insert(
                     event.node.map((node) => {
                        return {
                           ...node.value,
                           meta: { ...node.meta, id: uuid.v4() },
                        };
                     }),
                     event.node.index + 1
                  );
               }
               return node;
            })
         );
      }
   }
   render() {
      return (
         <div>
            <h1 class="text-2xl text-gray-600 pb-2">Nested Tree Builder</h1>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
               <div class="box">
                  <h1 class="text-xl mb-2 border-b border-gray-200">Library</h1>
                  <Library
                     strategies={data.strategies}
                     operators={data.operators}
                  />
               </div>
               <div class="box">
                  <h1 class="text-xl mb-2 border-b border-gray-200">
                     Workbench
                  </h1>
                  <Workbench
                     tree={this.state.tree}
                     handle={this.handle.bind(this)}
                  />
               </div>
               <div class="box">
                  <h1 class="text-xl mb-2 border-b border-gray-200">JSON</h1>
                  <pre class="text-xs">
                     {JSON.stringify(
                        this.state.tree
                           .map((node) => {
                              const { meta, ...value } = node.value;
                              return value;
                           })
                           .js().children,
                        null,
                        2
                     )}
                  </pre>
               </div>
            </div>
         </div>
      );
   }
}
