import React from "react";

class Button extends React.Component {
   render() {
      return (
         <button
            class={this.props.className}
            onClick={() => this.props.onClick()}
         >
            {this.props.children}
         </button>
      );
   }
}
