import React from "react";

export default class Main extends React.Component {
   render() {
      return (
         <div
            class="bg-gray-100 flex-grow p-2 bg-cover"
            style={{
               backgroundImage:
                  "url('https://images.unsplash.com/photo-1565213804504-ce974456b98b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1404&q=80')",
            }}
         >
            <div class="container mx-auto">{this.props.children}</div>
         </div>
      );
   }
}
