import React from "react";

class If extends React.Component {
   render() {
      if (this.props.test) {
         return React.Children.toArray(this.props.children).filter(
            (child, i) => {
               return child.type != Else;
            }
         );
      }
      return React.Children.toArray(this.props.children).filter((child, i) => {
         return child.type == Else;
      });
   }
}

class Else extends React.Component {
   render() {
      return this.props.children;
   }
}

class Case extends React.Component {
   render() {
      return this.props.children;
   }
}

class Switch extends React.Component {
   render() {
      return React.Children.toArray(this.props.children)
         .filter((child, i) => {
            return child.props.test || !("test" in child.props);
         })
         .slice(0, 1);
   }
}

class Ternary extends React.Component {
   render() {
      if (React.Children.count(this.props.children) != 2) {
         throw new Error("Ternaries should receive exactly two children");
      }
      if (this.props.test) {
         return React.Children.toArray(this.props.children)[0];
      }
      return React.Children.toArray(this.props.children)[1];
   }
}

export default {
   Case,
   If,
   Else,
   Switch,
   Ternary,
};
