import React from "react";
import { withRouter, Link } from "react-router-dom";
import utils from "../../utilities";
import actions from "../../flux/actions";
import fields from "../../components/fields";
import icons from "../../components/icons";

class Form extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         value: {
            email: "",
            password: "",
            remember: true,
         },
         errors: {},
         touched: {},
         submitting: false,
      };
   }
   validate() {
      return new Promise((resolve, reject) => {
         const errors = Object.keys(this.state.value).reduce(
            (errors, field) => {
               switch (field) {
                  case "email":
                     if (this.state.value.email == "") {
                        errors.email = "email address is required";
                     } else if (this.state.value.email.indexOf("@") == -1) {
                        errors.email = "email address is invalid";
                     }
                     break;
                  case "password":
                     if (this.state.value.password.length == 0) {
                        errors.password = "password is required";
                     }
                     break;
               }
               return errors;
            },
            {}
         );
         this.setState({ errors }, () => {
            Object.keys(errors).length == 0 ? resolve() : reject(errors);
         });
      });
   }
   onChange(e) {
      this.setState((state) => {
         return {
            value: { ...state.value, [e.name]: e.value },
         };
      });
   }
   onBlur(e) {
      this.setState(
         (state) => {
            return {
               touched: { ...state.touched, [e.name]: true },
            };
         },
         () => this.validate().catch(() => null)
      );
   }
   onSubmit(e) {
      e.preventDefault();
      this.setState(
         (state) => {
            return {
               submitting: true,
               touched: Object.keys(state.value).reduce((acc, curr) => {
                  acc[curr] = true;
                  return acc;
               }, {}),
            };
         },
         () => {
            this.validate()
               .then(() => {
                  actions.authentication
                     .login({
                        email: this.state.value.email,
                        password: this.state.value.password,
                     })
                     .then(() => {
                        return this.props.onSubmit();
                     })
                     .catch((response) => {
                        debugger;
                        if (response.status == 500) {
                           this.setState({
                              submitting: false,
                              errors: {
                                 global: "There was an issue connecting",
                              },
                           });
                        } else {
                           this.setState({
                              submitting: false,
                              errors: response.data,
                           });
                        }
                     });
               })
               .catch(() => {
                  this.setState({ submitting: false });
               });
         }
      );
   }
   render() {
      return (
         <form>
            <utils.If test={this.state.errors.global}>
               <div class="text-sm text-gray-700 mb-2 p-2 bg-red-100">
                  <fields.Errors errors={this.state.errors.global} />
               </div>
            </utils.If>
            <div class="mb-2 flex flex-wrap">
               <label class="w-full text-sm font-bold">Email address</label>
               <fields.Errors
                  errors={this.state.touched.email && this.state.errors.email}
               />
               <fields.Email
                  name="email"
                  value={this.state.value.email}
                  touched={this.state.touched.email}
                  onChange={this.onChange.bind(this)}
                  onBlur={this.onBlur.bind(this)}
               />
            </div>
            <div class="mb-2 flex flex-wrap">
               <label class="w-full text-sm font-bold">Password</label>
               <fields.Errors
                  errors={
                     this.state.touched.password && this.state.errors.password
                  }
               />
               <fields.Password
                  name="password"
                  value={this.state.value.password}
                  touched={this.state.touched.password}
                  onChange={this.onChange.bind(this)}
                  onBlur={this.onBlur.bind(this)}
               />
               <Link
                  class="text-xs text-gray-500 hover:underline"
                  to="/resetting/request"
               >
                  I forgot my password
               </Link>
            </div>
            <div class="mb-2 flex flex-wrap">
               <fields.Checkbox
                  label="remember me"
                  value={this.state.value.remember}
                  name="remember"
                  touched={this.state.touched.password}
                  onChange={this.onChange.bind(this)}
                  onBlur={this.onBlur.bind(this)}
               />
            </div>
            <div class="border-t border-gray-100 mb-2"></div>
            <div class="text-right">
               <button
                  class="p-1 text-sm bg-blue-800 text-white hover:bg-blue-700 w-16 focus:outline-none"
                  onClick={(e) => this.onSubmit(e)}
                  disabled={this.state.submitting}
               >
                  <utils.If test={this.state.submitting}>
                     <icons.FaCircleNotch class="animate-spin" />
                     <utils.Else>log in</utils.Else>
                  </utils.If>
               </button>
            </div>
         </form>
      );
   }
}

class Page extends React.Component {
   onSubmit() {
      return this.props.history.push("/");
   }
   render() {
      return (
         <div class="h-full flex items-center">
            <div class="shadow-sm bg-white p-2 w-full md:w-4/12 mx-auto">
               <h1 class="text-2xl text-gray-900 border-b border-gray-200 mb-2">
                  Welcome
               </h1>
               <Form onSubmit={this.onSubmit.bind(this)} />
            </div>
         </div>
      );
   }
}

export default withRouter(Page);
