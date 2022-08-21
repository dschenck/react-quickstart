import React from "react";
import { withRouter } from "react-router-dom";
import actions from "../../flux/actions";

class Page extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: {
            password: "",
         },
         errors: {},
         dirty: true,
         submitting: false,
      };
   }
   onChange(e) {
      this.setState((state) => {
         return {
            value: { ...state.value, [e.name]: e.value },
            dirty: true,
         };
      });
   }
   onBlur(e) {}
   onSubmit(e) {
      e.preventDefault();
      this.setState({ submitting: true }, () => {
         actions.authentication
            .login({
               email: this.state.value.email,
               password: this.state.value.password,
            })
            .then(() => {
               return this.props.history.push("/");
            })
            .catch((response) => {
               if (response.status == 500) {
                  this.setState({
                     submitting: false,
                     errors: { global: "There was an issue connecting" },
                  });
               } else {
                  this.setState({
                     submitting: false,
                     errors: response.data,
                  });
               }
            });
      });
   }
   render() {
      return (
         <div class="flex items-center">
            <div class="shadow-sm bg-white p-2 w-full md:w-4/12 mx-auto">
               <h1 class="text-2xl text-gray-600 border-b border-gray-200 mb-2">
                  New password
               </h1>
               <form>
                  <div class="mb-2">
                     <label class="w-full text-sm font-bold">Password</label>
                     <input
                        class="w-full border border-gray-200 focus:outline-none text-sm p-1 bg-gray-100"
                        name="password"
                        type="password"
                        value={this.state.value.password}
                        onChange={(e) =>
                           this.onChange({
                              name: "password",
                              value: e.target.value,
                           })
                        }
                     />
                  </div>
                  <div class="border-t border-gray-100 mb-2"></div>
                  <div class="text-right">
                     <button
                        class="p-1 text-sm bg-blue-800 text-white hover:bg-blue-700 w-16 focus:outline-none"
                        onClick={(e) => this.onSubmit(e)}
                        disabled={this.state.submitting}
                     >
                        {this.state.submitting ? "reset" : "reset"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}

export default withRouter(Page);
