import React, { useState, useEffect } from 'react'
import BreadCrumbWrapper from '../../../../components/BreadCrumbWrapper'
import {
    Card,
    Col,
    Row,
    Input,
    Divider,
    message,
    Upload,
    Select,
    Progress,
    Button
} from 'antd';
import { useDispatch } from 'react-redux';
import { showNotification, showLoader, hideLoader } from '../../../../duck/actions/commonActions.js';
import pdfIcon from '../../../../assets/images/pdfIcon.svg';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { projectFilterSearch, projectFileUpload, uploadProjectData } from '../../../../services/pbrService.js'
import SelectSearchField from '../../../../components/SelectSearchField/SelectSearchField';
import ScreenHeader from '../../../../components/ScreenHeader/screenHeader'
import illustrations from '../../../../assets/images/banner-pbr.svg';
import "./styles.scss"
/* istanbul ignore next */
function FileUpload() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [uploadFile, setUploadFile] = useState([]);
    const [uploadFileName, setUploadFileName] = useState([]);
    const [uploadFileDetail, setUploadFileDetail] = useState([]);
    const [paramList, setParamList] = useState({
        projectList: [],
        groupList: [],
        subGroupList: [],
    });
    const [selectParam, setselectParam] = useState({
        project: '',
        group: '',
        subGroup: '',
    });

    useEffect(() => {
        getProjectFilterData()
    }, [])

    const beforeUpload = (file) => {
        return false
      };

    const getProjectFilterData = async (
        projectValue,
        groupValue,
        subGroupValue,
        projectText,
        groupText,
        subGroupText
    ) => {
        let req = {
            group: groupValue ? groupValue : "",
            group_text: groupText ? groupText : "",
            project: projectValue ? projectValue : "",
            project_text: projectText ? projectText : "",
            subgroup: subGroupValue ? subGroupValue : "",
            subgroup_text: subGroupText ? subGroupText : ""
        }
        try {
            const res = await projectFilterSearch(req)
            if (res["status-code"] == 200) {
                setParamList(prevState => {
                    return {
                        ...prevState,
                        projectList: res && res.project,
                        groupList: res && res.group,
                        subGroupList: res && res.subgroup
                    };
                });
            }
            /* istanbul ignore next */
            else if (res["status-code"] != 200) {
                dispatch(showNotification('error', res?.Message));
            } else {
                dispatch(showNotification('error', "Unable to fetch data"));
            }
        } catch (err) {
            dispatch(showNotification('error', err));
        }

    }

    const onChangeParam = (value, field) => {
        if (value != null) {
            if (field === 'project') {
                getProjectFilterData(
                    value,
                    selectParam['group'],
                    selectParam['subGroup'],
                    '',
                    '',
                    ''
                );
                setselectParam(prevState => {
                    return { ...prevState, project: value };
                });
            } else if (field === 'group') {
                getProjectFilterData(
                    selectParam['project'],
                    value,
                    selectParam['subGroup'],
                    '',
                    '',
                    ''
                );
                setselectParam(prevState => {
                    return { ...prevState, group: value };
                });
            } else if (field === 'subGroup') {
                getProjectFilterData(
                    selectParam['project'],
                    selectParam['group'],
                    value,
                    '',
                    '',
                    ''
                );
                setselectParam(prevState => {
                    return { ...prevState, subGroup: value };
                });
            }
        }
    };

    const clearSearch = (e, field) => {
        /* istanbul ignore next */
        if (field === 'project') {
            setselectParam(prevState => {
                return { ...prevState, project: '' };
            });
            getProjectFilterData(
                "",
                selectParam['group'],
                selectParam['subGroup'],
                '',
                '',
                ''
            );
        }/* istanbul ignore next */
        else if (field === 'group') {
            setselectParam(prevState => {
                return { ...prevState, group: '' };
            });
            getProjectFilterData(
                selectParam['project'],
                "",
                selectParam['subGroup'],
                '',
                '',
                ''
            );
        }
        /* istanbul ignore next */
        else if (field === 'subGroup') {
            setselectParam(prevState => {
                return { ...prevState, subGroup: '' };
            });
            getGenealogyFilterData(
                selectParam['project'],
                selectParam['group'],
                "",
                '',
                '',
                ''
            );
        }
    };

    const optionProject = paramList['projectList'].map((item, index) => (
        <Select.Option key={index} value={item}>
            {item}
        </Select.Option>
    ));
    const optionsGroup = paramList['groupList'].map((item, index) => (
        <Select.Option key={index} value={item}>
            {item}
        </Select.Option>
    ));
    const optionsSubGroup = paramList['subGroupList'].map((item, index) => (
        <Select.Option key={index} value={item}>
            {item}
        </Select.Option>
    ));
   

    const handleChange = async (info) => {
       
        const fileName = [];
        const fileSize = [];
        const fileDetail = [];
        // var formData = new FormData();
        info && info.fileList.map((item) => {
            fileDetail.push({
                fileName: item.name,
                fileSize: item.size,
                actualFile: item.originFileObj
            })
            fileName.push(item.name)
            fileSize.push(item.size)
        })
        setUploadFileDetail(fileDetail);
        setUploadFileName(fileName);
        // info.fileList = []
    };
    
    const handleCancel = (val) => {
        // setUploadFile(uploadFileDetail);
        let arr = [...uploadFileDetail]
        arr = arr.filter(item => item.fileName != val?.fileName)
        setUploadFileDetail(arr);
    }

    const fileUpload = async (val) => {
        dispatch(showLoader());
        var formData = new FormData();
        formData.append('file', val?.actualFile);
        formData.append('fileSize', val?.fileSize)
        formData.append('project', selectParam['project'])
        const fileResponse = await projectFileUpload(formData);
        if (fileResponse.Status == 202) {
            let login_response = JSON.parse(localStorage.getItem('login_details'));
            let req = {
                changedBy: null,
                createdBy: login_response.firstname + login_response.lastname,
                custKey: "",
                fileSize: [val?.fileSize],
                filename: [val?.fileName],
                group: selectParam['group'],
                project: selectParam['project'],
                status: 'N',
                subgroup: selectParam['subGroup'],
                uploadReason: 'PBR Document'
            }
            let res = await uploadProjectData(req)
            if (res.Status == 202) {
                let arr = [...uploadFileDetail]
                arr = arr.filter(item => item.fileName != val?.fileName)
                setUploadFileDetail(arr);
                dispatch(showNotification('success', res?.Message));
                dispatch(hideLoader());
            } else {
                dispatch(showNotification('error', res?.Message));
                dispatch(hideLoader());
            }
        } else {
            dispatch(showNotification('error', fileResponse?.Message));
            dispatch(hideLoader());
        }
    }
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload New File
            </div>
        </div>
    );
    return (
        <div className='pbr-container'>
            <div className='custom-wrapper pbr-wrapper'>
                <BreadCrumbWrapper />
            </div>
            <Row className='p-28'>
                <Col span={24} className='banner'>
                    <ScreenHeader
                        bannerbg={{
                            background:
                                'linear-gradient(180deg, rgba(199, 144, 129, 0.15) 0%, rgba(223, 165, 121, 0.56) 100%)',
                        }}
                        title={`Howdy ${localStorage.getItem('username')},`}
                        description={`Got some files to upload today? Let's get started`}
                        source={illustrations}
                        sourceClass='pbr-image'
                    />
                </Col>
            </Row>
            <Row className='landing-content p-28'>
                <Col span={24}>
                    <Card bordered={false}>
                        <Row>
                            <Col span={4} />
                            <Col span={16} >
                                <div style={{ padding: 24 }}>
                                    <h3>Files</h3>
                                    <Divider style={{ marginTop: 5 }} />
                                    <h3>Where do you want to place your new files?</h3>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
                                        <div style={{ width: 235 }}>
                                            {/* <p>Project</p>
                                            <Select placeholder="Project" style={{ width: 235 }} /> */}
                                            <SelectSearchField
                                                showSearch
                                                label='Project *'
                                                placeholder='Select Project'
                                                onChangeSelect={value => onChangeParam(value, 'project')}
                                                // onSearchSelect={type => onSearchParam(type, 'plant')}
                                                options={optionProject}
                                                handleClearSearch={e => clearSearch(e, 'project')}
                                                // error={isEmptyPlant ? 'Please select project' : null}
                                                selectedValue={selectParam['project'] ? selectParam['project'] : null}
                                            />
                                        </div>
                                        <div style={{ width: 235 }}>
                                            {/* <p>Group</p>
                                            <Select placeholder="Group" style={{ width: 235 }} /> */}
                                            <SelectSearchField
                                                showSearch
                                                label='Group'
                                                placeholder='Select Group'
                                                onChangeSelect={value => onChangeParam(value, 'group')}
                                                // onSearchSelect={type => onSearchParam(type, 'plant')}
                                                options={optionsGroup}
                                                handleClearSearch={e => clearSearch(e, 'group')}
                                                // error={isEmptyPlant ? 'Please select plant' : null}
                                                selectedValue={selectParam['group'] ? selectParam['group'] : null}
                                            />
                                        </div>
                                        <div style={{ width: 235 }}>
                                            {/* <p>Sub-Group</p>
                                            <Select placeholder="Sub-Group" style={{ width: 235 }} /> */}
                                            <SelectSearchField
                                                showSearch
                                                label='Sub-Group'
                                                placeholder='Select Sub-Group'
                                                onChangeSelect={value => onChangeParam(value, 'subGroup')}
                                                // onSearchSelect={type => onSearchParam(type, 'plant')}
                                                options={optionsSubGroup}
                                                handleClearSearch={e => clearSearch(e, 'subGroup')}
                                                // error={isEmptyPlant ? 'Please select plant' : null}
                                                selectedValue={selectParam['subGroup'] ? selectParam['subGroup'] : null}
                                            />
                                        </div>
                                    </div>
                                    <h3 style={{ marginTop: 30 }}>Upload Files</h3>
                                    <div className='Pbrfileupload' style={{ display: "flex" }}>
                                        <Upload
                                            name="avatar"
                                            multiple={true}
                                            fileList = {uploadFileDetail}
                                            listType="picture-card"
                                            className="avatar-uploader"
                                            showUploadList={false}
                                            disabled={selectParam?.project ? false : true}
                                            beforeUpload={() => false}
                                            onChange={handleChange}
                                        >
                                            {imageUrl ? (
                                                <img
                                                    src={imageUrl}
                                                    alt="avatar"
                                                // style={{
                                                //     width: '100%',
                                                // }}
                                                />
                                            ) : (
                                                uploadButton
                                            )}
                                        </Upload>
                                        {uploadFileDetail.length > 0 ?
                                            <div style={{ marginLeft: 53, width: "100%" }}>
                                                <h3> Uploading Files...</h3>
                                                {uploadFileDetail.map((item,index )=> (
                                                    <Row key={index}>
                                                        <Col span={16}>

                                                            <div className='pdfListBlock' style={{ display: "flex", marginTop: 10 }} key={index}>
                                                                <img src={pdfIcon} alt='pdfIcon' style={{ width: 40 }} />
                                                                <div style={{ width: 290 }}>
                                                                    <div>
                                                                        <span>{item?.fileName}</span>
                                                                        <span><Progress className='Progress' percent={100} /></span>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </Col>
                                                        <Col span={8}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                                                                <Button style={{ marginLeft: 40 }} onClick={() => handleCancel(item)}>Cancel</Button>
                                                                <Button onClick={() => fileUpload(item)}>Upload</Button>
                                                            </div>

                                                        </Col>
                                                    </Row>
                                                ))}

                                            </div> : ""}
                                    </div>

                                </div>
                            </Col>

                            <Col span={4} />
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default FileUpload