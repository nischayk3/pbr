import React, { useEffect, useState } from 'react';
import './styles.scss';
import { Form, message, Select } from 'antd';
import { getMoleculeData } from '../../../../../duck/actions/auditTrialAction';
import { materialsParameterTree } from '../../../../../duck/actions/fileUploadAction';
const { Option } = Select;

function ParameterLookup(props) {
    const {
        moleculeList,
        setMoleculeList,
        moleculeId,
        setMoleculeId,
        materialsList,
        setMaterialsList,
        filterdData,
        setFilterdData,
        dataLoadingState,
        setDataLoadingState,
        parentBatches,
        setParentBatches,
        viewSummaryTable,
        setViewSummaryTable,
    } = props;

    const onSelectMoleculeHandler = () => {
        let req = { user_id: localStorage.getItem('username') };
        getMoleculeData(req).then((res) => {
            if (res.statuscode === 200) {
                setMoleculeList(res.data);
            }
            if (res.statuscode === 401) {
                message.error(res.data.message);
            }
            if (res.statuscode === 400) {
                message.error(res.data.message);
            }
        });
    };

    useEffect(() => {
        onSelectMoleculeHandler();
    }, []);

    const onChangeMoleculeHandler = (value) => {
        setMoleculeId(value);
        let req = { moleculeId: value, detailedCoverage: true };
        materialsParameterTree(req).then((res) => {
            {
                res.map((item, index) => {
                    setDataLoadingState(false);
                    setMaterialsList(item.children);
                    setDataLoadingState(true);
                    setParentBatches(item.batches);
                });
            }

            if (res.Status === 401) {
                message.error(res.Message);
            }
            if (res.Status === 400) {
                message.error(res.Message);
            }
            if (res.Status === 404) {
                message.error(res.Message);
            }
        });
    };

    function onChange(value) {
        if (!value) {
            setFilterdData(null);
        } else {
            const filterdDataArr = materialsList.filter((o) =>
                Object.keys(o).some((k) =>
                    String(o[k]).toLowerCase().includes(value.toLowerCase())
                )
            );
            setFilterdData(filterdDataArr);
        }
    }
    return (
        <div className='parameterLookup-FormBlock'>
            <Form.Item label='Molecule' name='molecule'>
                <Select
                    placeholder='Select'
                    // onClick={onSelectMoleculeHandler}
                    onChange={onChangeMoleculeHandler}
                >
                    {moleculeList.map((item, i) => {
                        return (
                            <Option value={item.product_num} key={item.concat}>
                                {item.concat}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item label='Filters' name='filters'>
                <Select
                    showSearch
                    optionFilterProp='children'
                    onChange={onChange}
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    placeholder='Filter Materials'
                    allowClear={true}
                >
                    {materialsList.map((item, index) => {
                        return (
                            <Option value={item.product} key={index}>
                                {item.product}
                            </Option>
                        );
                    })}
                </Select>
            </Form.Item>
        </div>
    );
}

export default ParameterLookup;
