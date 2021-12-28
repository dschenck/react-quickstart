import React from 'react'
import { HotTable } from '@handsontable/react';

import 'handsontable/dist/handsontable.full.css';


const hotData = [
    ["CL", "H0", "H0", "K0", "K0", "N0", "N0", "U0", "U0", "X0", "X0", "F1", "F1"]
];

class Table extends React.Component {
    constructor() {
        super()
        this.state = {
            data: [
                ["CL", "H0", "H0", "K0", "K0", "N0", "N0", "U0", "U0", "X0", "X0", "F1", "F1"]
            ]
        }
    }
    onChange(changes, event) {
        if (event == "loadData") {
            return
        }
        return this.setState(state => {
            changes.forEach(cell => {
                state.data[cell]
            })
        })
    }
    render() {
        return (
            <div class="flex flex-wrap">
                <div class="w-full">
                    <HotTable
                        data={this.state.data}
                        colHeaders={["commodity", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]}
                        rowHeaders={true}
                        width="100%"
                        height="200"
                        className="htCenter"
                        licenseKey={"non-commercial-and-evaluation"}
                        afterChange={this.onChange.bind(this)}
                    />
                </div>
                <div class="w-full">
                    <pre>{JSON.stringify(this.state.data, null, 4)}</pre>
                </div>
            </div>

        )
    }
}

export default () => {
    return (
        <div class="bg-white mx-auto px-2 pt-20" style={{ maxWidth: "980px" }}>
            <Table />
        </div>

    );
}
