const strategies = [
    { "name": "title" },
    { "name": "textbox" },
    { "name": "chart" },
    { "name": "table" },
    { "name": "image" }
]

const operators = [
    { "name": "grid" },
    { "name": "tabs" },
    { "name": "section" }
]

const project = [{
    type: "operator",
    name: "Operator R",
    children: []
}, {
    type: "operator",
    name: "Operator Q",
    children: [
        {
            type: "strategy",
            name: "Strategy A"
        },
        {
            type: "strategy",
            name: "Strategy B"
        },
        {
            type: "operator",
            name: "Operator R",
            children: [
                {
                    type: "strategy",
                    name: "Strategy C"
                },
                {
                    type: "strategy",
                    name: "Strategy D"
                },
                {
                    type: "operator",
                    name: "Operator S",
                    children: [
                        {
                            type: "strategy",
                            name: "Strategy E"
                        },
                        {
                            type: "strategy",
                            name: "Strategy F"
                        }
                    ]
                }
            ]
        },
        {
            type: "operator",
            name: "Operator R",
            children: [
                {
                    type: "strategy",
                    name: "Strategy C"
                },
                {
                    type: "strategy",
                    name: "Strategy D"
                },
                {
                    type: "operator",
                    name: "Operator S",
                    children: [
                        {
                            type: "strategy",
                            name: "Strategy E"
                        },
                        {
                            type: "strategy",
                            name: "Strategy F"
                        }
                    ]
                }
            ]
        }
    ]
}]

export default {
    strategies,
    operators,
    project
}