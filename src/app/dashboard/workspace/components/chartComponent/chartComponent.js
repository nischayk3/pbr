import React from 'react';
import Plot from 'react-plotly.js';
import './styles.scss';

const chartComponent = () => {
    const data = [
        {
            x: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
            y: [52.4945, 52.4945, 52.4945, 52.4945, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283, 52.283],
            text: ["ABL2258", "ABL2259", "ABL2261", "ABL2264", "ABV4295", "ABV4296", "ABV4297", "ABV4298", "ABV4299", "ABY0079", "ABY0080", "ABY0081", "ABY0082", "ABY0083",
                "ABY0084", "ABY0086", "ABY0088"],
            type: 'scatter',
            mode: 'markers+lines'
        }
    ]
    const layout = {
        xaxis: {
            range: [2,4],
            title: {
                text: "ARSENIC"
            }
        },
        yaxis: {
            range: [52.26433823529412, 52.513161764705885],
            title: {
                text: "new function"
            }
        },
        autosize: false,
        width: 800,
        height: 350,
        margin: {
            l: 50,
            r: 50,
            b: 100,
            t: 100,
            pad: 4
        },
        title: {
            text: "scatter Plot chart"
        }
    };

    return (
        <div className='workspace-plot'>
            <Plot
                data={data}
                layout={layout}
            />
            <p style={{display:'flex',justifyContent:'center'}}>Let's see what you have on your plate today!</p>
        </div>
    )
}

export default chartComponent;