import React from "react";
import uuid from "uuid";
import Block from "./blocks";

export default class Workbench extends React.Component {
   handle(event) {
      if (event.name == "collapse") {
         return this.props.onChange(
            this.props.tree.map((node) => {
               if (node.meta.id == event.node.meta.id) {
                  return node.transform((node, Node) => {
                     return Node(node.value, {
                        ...node.meta,
                        collapsed: true,
                     });
                  });
               }
               return node;
            })
         );
      }
      if (event.name == "expand") {
         return this.props.onChange(
            this.props.tree.map((node) => {
               if (node.meta.id == event.node.meta.id) {
                  return node.transform((node, Node) => {
                     return Node(node.value, {
                        ...node.meta,
                        collapsed: false,
                     });
                  });
               }
               return node;
            })
         );
      }
      if (event.name == "delete") {
         return this.props.onChange(this.props.tree.delete(event.node));
      }
      if (event.name == "move-up") {
         return this.props.onChange(
            this.props.tree.move(event.node, event.node.parent, event.node.left)
         );
      }
      if (event.name == "move-down") {
         return this.props.onChange(
            this.props.tree.move(
               event.node,
               event.node.parent,
               event.node.right
            )
         );
      }
      if (event.name == "duplicate") {
         return this.props.onChange(
            this.props.tree.map((node) => {
               if (node.meta.id == event.node.parent.meta.id) {
                  return node.insert(event.node.clone(), event.node.index + 1);
               }
               return node;
            })
         );
      }
   }
   render() {
      const children = this.props.tree.children.map((child, i) => {
         return (
            <Block
               node={child}
               key={uuid.v4()}
               handle={this.handle.bind(this)}
            />
         );
      });

      return (
         <div class="relative pb-10">
            <div
               class={`relative dragula-container rounded z-10 ${
                  children.length == 0
                     ? "border-gray-200 border border-dashed"
                     : ""
               }`}
               key={uuid.v4()}
               data-nodetype="workbench"
               data-id={this.props.tree.meta.id}
               data-node={this.props.tree.path}
               style={{ minHeight: "48px" }}
            >
               {children}
            </div>
         </div>
      );
   }
}
