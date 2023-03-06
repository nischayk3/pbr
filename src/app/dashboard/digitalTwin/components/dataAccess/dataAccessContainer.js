import React, { useEffect, useState, useForm } from 'react'
import { Button, Table, InputNumber, Form, Input, Select, Row, Col } from 'antd';
import Precompression from './precompression'
import Turret from './turret'
import Tablet from './tablet'
import './styles.scss'
function DataAccessContainer(props) {
    let { tabsList,handlePreData } = props
    const [header, setHeader] = useState('')
    const [dataSource, setDataSource] = useState([])
    const [turretOutput, setTurretOutput] = useState(0)
    const [preCompressionOutput, setPreCompressionOutput] = useState({})
    const [preCompressionObject, setPreCompressionObject] = useState({})
    const [dataObject, setDataObject] = useState({})
    const [tabletOutput, setTabletOutput] = useState({})
    const [turretFormValues, setTurretFormValues] = useState({})

    useEffect(() => {
        tabsList.forEach(item => {
            if (item.selected == true) {
                setHeader(item.title)
            }

        })

    }, [tabsList])

    useEffect(() => {
        handlePreData({...preCompressionObject,...tabletOutput})
    }, [preCompressionObject,tabletOutput])

    return (
        <div>
            <div className='Header'>{header}</div>
            <div className='subHeader'>Input data to calculate {header.toLocaleLowerCase()}</div>
            {header === 'Turret Speed' ? <Turret setTurretOutput={setTurretOutput} tabletOutput={tabletOutput} turretOutput={turretOutput} setTurretFormValues={setTurretFormValues} turretFormValues={turretFormValues} tabsList={tabsList} /> : null}
            {header === 'Pre-Compression force and Main Compression force' ? <Precompression tabsList={tabsList} preCompressionOutput={preCompressionOutput} setPreCompressionOutput={setPreCompressionOutput} 
            setPreCompressionObject={setPreCompressionObject} preCompressionObject={preCompressionObject} /> : null}
            {header === 'Tablet weight and Tablet hardness' ? <Tablet preCompressionObject={preCompressionObject} tabsList={tabsList} setTabletOutput={setTabletOutput} tabletOutput={tabletOutput}/> : null}
        </div>
    )
}

export default DataAccessContainer