import React from 'react';

import Plot from 'react-plotly.js';

import './styles.scss';

function ReportDesignerScatterChart() {
    var trace1 = {
        x: [1, 2, 3, 4, 5],
        y: [1, 6, 3, 6, 1],
        mode: 'markers',
        type: 'scatter',
        name: 'Shale',
        text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
        marker: { size: 12 },
    };

    var trace2 = {
        x: [1.5, 2.5, 3.5, 4.5, 5.5],
        y: [4, 1, 7, 1, 4],
        mode: 'markers',
        type: 'scatter',
        name: 'Sandstone',
        text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
        marker: { size: 12 },
    };
    return (
        <div className="reportDesigner-scatterChart">
            <Plot
                data={[trace1, trace2]}
                layout={{
                    xaxis: {
                        range: [0.75, 5.25],
                    },
                    yaxis: {
                        range: [0, 8],
                    },
                    // title: 'Data Labels on the Plot',
                    height: 350,
                }}
            />
        </div>
    );
}

export default ReportDesignerScatterChart;
