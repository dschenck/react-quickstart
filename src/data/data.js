const strategies = [
   { name: "title" },
   { name: "textbox" },
   { name: "markdown" },
   { name: "chart" },
   { name: "table" },
   { name: "image" },
   { name: "video" },
];

const operators = [{ name: "div" }, { name: "flexbox" }, { name: "tabs" }];

const project = [
   {
      type: "operator",
      name: "flexbox",
      children: [],
   },
   {
      type: "operator",
      name: "div",
      children: [
         {
            type: "strategy",
            name: "textbox",
         },
         {
            type: "strategy",
            name: "chart",
         },
         {
            type: "operator",
            name: "flexbox",
            children: [
               {
                  type: "strategy",
                  name: "table",
               },
               {
                  type: "strategy",
                  name: "image",
               },
               {
                  type: "operator",
                  name: "div",
                  children: [
                     {
                        type: "strategy",
                        name: "video",
                     },
                     {
                        type: "strategy",
                        name: "markdown",
                     },
                  ],
               },
            ],
         },
         {
            type: "operator",
            name: "flexbox",
            children: [
               {
                  type: "strategy",
                  name: "table",
               },
               {
                  type: "strategy",
                  name: "image",
               },
               {
                  type: "operator",
                  name: "div",
                  children: [
                     {
                        type: "strategy",
                        name: "video",
                     },
                     {
                        type: "strategy",
                        name: "markdown",
                     },
                  ],
               },
            ],
         },
      ],
   },
];

export default {
   strategies,
   operators,
   project,
};
