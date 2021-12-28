import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

['highcharts/highcharts-more', 'highcharts/modules/heatmap'].forEach(ext => {
    require(ext)(Highcharts);
})

import theme from './highcharts.defaults.js'
Highcharts.setOptions(theme)

export default class Chart extends React.Component {
    render() {
        return (
            <HighchartsReact highcharts={Highcharts} options={this.props.chart} />
        )
    }
}