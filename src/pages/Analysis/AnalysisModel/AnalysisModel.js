import { useState } from 'react'
import BreadCrumbWrapper from '../../../components/BreadCrumbWrapper'
import StoryLine from '../../../components/Analysis/StoryLine/StoryLine'
import Summary from '../../../components/Analysis/Summary/Summary'
import AnalysisData from '../../../components/Analysis/AnalysisData/AnalysisData'

const parameterDetails = [
    {
        label: 'N',
        value: 150.00000
    },
    {
        label: 'Missing',
        value: 23.67474848
    },
    {
        label: 'Unique',
        value: 1.00000000
    },
    {
        label: 'Mean',
        value: 150.00000
    },
    {
        label: 'Standard dev',
        value: 23.6747
    },
    {
        label: 'Variance',
        value: 1.0000000
    },
    {
        label: 'Kurtosis',
        value: 'Lorem ipsum'
    },
    {
        label: 'Min',
        value: 23.6747
    },
    {
        label: '1st quartile',
        value: 1.000000
    },
    {
        label: 'Median',
        value: 23.6747
    },
    {
        label: '2nd Quartile',
        value: 150.00000
    },
    {
        label: 'Max',
        value: 150.00000
    },
    {
        label: 'Skewness',
        value: 'Lorem ipsum'
    },
]

const summaryParametersDetails = [
    {
        label: 'Temperature Combined',
        data: [
            {
                label: 'N',
                value: 150.00000
            },
            {
                label: 'Missing',
                value: 23.67474848
            },
            {
                label: 'Unique',
                value: 1.00000000
            }
        ]
    },
    {
        label: 'pH Combined',
        data: [
            {
                label: 'N',
                value: 150.00000
            },
            {
                label: 'Missing',
                value: 23.67474848
            },
            {
                label: 'Unique',
                value: 1.00000000
            }
        ]
    },
    
]

const storyLineParameters = ['Temperature Combined', 'Pressure Altered']


const AnalysisModel = () => {
    const [parameters] = useState([])
    const [storyLine, setStoryLine] = useState(storyLineParameters)


    return (
        <>
            <BreadCrumbWrapper />
            <StoryLine storyLine={storyLine} setStoryLine={setStoryLine} />
            <div className="custom-user-roles-wrapper">
                <div className="custom-table-wrapper">
                    <Summary summaryParametersDetails={summaryParametersDetails} />
                    <AnalysisData parameters={parameters} />
                </div>
            </div>
        </>
    )
}

export default AnalysisModel