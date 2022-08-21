import React from "react";

export default class Field extends React.Component {
   get validators() {
      return [];
   }
   onChange(e) {
      if (this.props.onChange) {
         this.props.onChange({ name: this.props.name, value: e.value });
      }
   }
   onFocus(e) {
      if (this.props.onFocus) {
         this.props.onFocus({ name: this.props.name, value: e.value });
      }
   }
   onBlur(e) {
      if (this.props.onBlur) {
         this.props.onBlur({ name: this.props.name, value: e.value });
      }
   }
   render() {
      return null;
   }
}
