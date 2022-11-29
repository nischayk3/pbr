import React, { useEffect, useState } from "react";
import { Card, Row, Col, Empty, Input } from "antd";
import './cardArea.scss'
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTemplateData } from "../../../../../../services/eLogBookService";
import { useDispatch } from "react-redux";
import { showLoader, showNotification, hideLoader } from "../../../../../../duck/actions/commonActions";
import { sendTemplateData, sendSelectedMolecule } from "../../../../../../duck/actions/eLogBook";


export default function DataEntryCardArea(props) {
    const dispatch = useDispatch()
    const selectedMolecule = useSelector(state => state.elogReducer.selectedMolecule)
    const history = useHistory()
    const [filterData, setFilterData] = useState([])
    let template_data = props.templateData


    const getTemplateResponse = async (record) => {
        dispatch(showLoader())
        let template_req = {
            'name': record.name,
            'version': record.version,
            'temp_disp_id': record.template_disp_id,
            'molecule': record.molecule
        }
        try {
            let template_response = await getTemplateData(template_req)
            if (template_response.statuscode == 200) {
                dispatch(showNotification('success', 'Loading.. data'))
                if (template_response.Data && template_response) {
                    let data_dispatch = [...template_response.Data]
                    console.log(data_dispatch)
                    data_dispatch.forEach(v => { v.current = 1; v.minIndex = 0, v.maxIndex = 1 });
                    dispatch(sendTemplateData(data_dispatch))

                }
                setTimeout(() => {
                    history.push(`/dashboard/elog_book/data_entry_forms/${record.name}`)
                }, 1000)
            }
        }
        catch (err) {
            dispatch(showNotification('error', 'Error'))
        }
        finally {
            dispatch(hideLoader())
        }
    }

    const searchTemplate = (value) => {
        if (value) {
            const filterData = template_data.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(value.toLowerCase())
                )
            );
            setFilterData(filterData);
        }
        else {
            setFilterData([])
        }
    };

    return (

        <Card className="content-cards">
            <div>
                {template_data.length > 0 && selectedMolecule && <span className="selected_mol">{selectedMolecule} - Templates</span>}
                {template_data.length > 0 && selectedMolecule && <Input.Search className="head-input" placeholder="Search a form or template" />}
            </div>
            <div className="content-card">
                <Row>
                    {template_data && template_data.length ? template_data.map((i, idx) => (

                        <Col span={8} key={idx} >
                            <div className="template-card-div" onClick={() => getTemplateResponse(i)
                            }>
                                <br />
                                <div className="template-card-head">
                                    <div className="template-card-status-circle">
                                        <p className="template-card-heading" >{i.template_disp_id + '_' + i.version}</p>
                                    </div>
                                </div>
                                <div className="template-card-content">
                                    <div className="template-card-subheading">Product &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<span className="template-card-subheading-data">{i.molecule}</span></div>
                                    <div className="template-card-subheading">Site     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<span className="template-card-subheading-data">{i.site}</span></div>
                                    <div className="template-card-subheading">Status   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<span className="approved-bar template-card-subheading-data-inside">{i.status}</span></div>
                                </div>
                            </div>
                        </Col>
                    )) : <Empty className="empty-temp" description={<span className="empty-text ">Please select a product to view templates available</span>} />}
                </Row>
            </div>

        </Card>
    )
}