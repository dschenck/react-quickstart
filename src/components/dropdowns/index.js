import React from "react";
import * as routing from "react-router-dom";

const Context = React.createContext();

class Dropdown extends React.Component {
   constructor(props) {
      super(props);
      this.state = { open: false };
      this.ref = React.createRef();
      this.handler = ((e) => {
         if (!this.ref.current.contains(e.target)) {
            this.setState({ open: false });
         }
      }).bind(this);
   }
   componentDidMount() {
      document.addEventListener("mousedown", this.handler);
   }
   componentWillUnmount() {
      document.removeEventListener("mousedown", this.handler);
   }
   render() {
      const children = React.Children.map(this.props.children, (child, i) => {
         if (child.type == "button") {
            return React.cloneElement(child, {
               onClick: () => this.setState((state) => ({ open: !state.open })),
            });
         }
         return (
            <div class={`${this.state.open ? "absolute" : "hidden"} -right-1`}>
               {child}
            </div>
         );
      });
      return (
         <Context.Provider
            value={{ close: () => this.setState({ open: false }) }}
         >
            <div ref={this.ref} class="inline-block relative">
               {children}
            </div>
         </Context.Provider>
      );
   }
}

class Link extends React.Component {
   render() {
      return (
         <Context.Consumer>
            {(context) => {
               return (
                  <routing.Link {...this.props} onClick={() => context.close()}>
                     {this.props.children}
                  </routing.Link>
               );
            }}
         </Context.Consumer>
      );
   }
}

export default {
   Context,
   Dropdown,
   Link,
};
