import React from "react";
import uuid from "uuid";
import Block from "./blocks";

export default class Workbench extends React.Component {
   render() {
      const children = this.props.tree.children.map((child, i) => {
         return (
            <Block node={child} key={uuid.v4()} handle={this.props.handle} />
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
               data-id={this.props.tree.value.meta.id}
               data-path={this.props.tree.path}
               style={{ minHeight: "48px" }}
            >
               {children}
            </div>
         </div>
      );
   }
}
