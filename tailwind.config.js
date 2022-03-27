module.exports = {
    theme: {
        extend: {
            fontFamily:{
                sans:["Roboto"]
            }
        }
    },
    variants: {},
    plugins: [],
    content: [
        "./index.html",
        './public/**/*.html',
        './src/**/*.{js,jsx,ts,tsx,vue}',
    ],
    safelist:[
            "w-1/12",
            "w-2/12",
            "w-3/12",
            "w-4/12",
            "w-6/12",
            "w-8/12",
            "w-9/12"
        ],
    corePlugins: {
        gridTemplateColumns: true
    }
}
