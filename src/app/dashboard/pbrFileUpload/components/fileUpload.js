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
    Button,
    Modal,
    Result,
    Typography
} from 'antd';
import {
    DownloadOutlined,
    InboxOutlined
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import debounce from "lodash/debounce";
import { showNotification, showLoader, hideLoader } from '../../../../duck/actions/commonActions.js';
import pdfIcon from '../../../../assets/images/pdfIcon.svg';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { projectFilterSearch, projectFileUpload, uploadProjectData } from '../../../../services/pbrService.js'
import SelectSearchField from '../../../../components/SelectSearchField/SelectSearchField';
import ScreenHeader from '../../../../components/ScreenHeader/screenHeader'
import illustrations from '../../../../assets/images/banner-pbr.svg';
import "./styles.scss"

const { Paragraph } = Typography;
const { Dragger } = Upload;
/* istanbul ignore next */
function FileUpload() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [uploadFile, setUploadFile] = useState([]);
    const [uploadFileName, setUploadFileName] = useState([]);
    const [uploadFileDetail, setUploadFileDetail] = useState([]);
    const [isFileUploaded, setIsFileUploaded] = useState(false);
    const [fileUploadResponse, setFileUploadResponse] = useState('');
    const [fileMessage, setFileMessage] = useState('');
    const [uploadedFileInfo, setUploadedFileInfo] = useState([]);
    const [isUploadVisible, setIsUploadVisible] = useState(false);
    const [uploading, setUploading] = useState(false);
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

    const onSearchParam = debounce((type, field) => {
        if (type != null) {
            if (field === 'project') {
                getProjectFilterData(
                    selectParam['project'],
                    selectParam['group'],
                    selectParam['subGroup'],
                    type,
                    '',
                    ''
                );
            } else if (field === 'group') {
                getProjectFilterData(
                    selectParam['project'],
                    selectParam['group'],
                    selectParam['subGroup'],
                    '',
                    type,
                    ''
                );
            } else if (field === 'subGroup') {
                getProjectFilterData(
                    selectParam['project'],
                    selectParam['group'],
                    selectParam['subGroup'],
                    '',
                    '',
                    type
                );
            }
        }
    }, 500);

    const clearSearch = (e, field) => {
        if (field === 'project') {
            setselectParam(prevState => {
                return { ...prevState, project: '', group: '', subGroup: '' };
            });
            getProjectFilterData(
                "",
                '',
                '',
                '',
                '',
                ''
            );
        }
        else if (field === 'group') {
            setselectParam(prevState => {
                return { ...prevState, group: '', subGroup: '' };
            });
            getProjectFilterData(
                selectParam['project'],
                "",
                '',
                '',
                '',
                ''
            );
        }
        else if (field === 'subGroup') {
            setselectParam(prevState => {
                return { ...prevState, subGroup: '' };
            });
            getProjectFilterData(
                selectParam['project'],
                selectParam['group'],
                '',
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

    const handleCancel = (val) => {
        // setUploadFile(uploadFileDetail);
        let arr = [...uploadFileDetail]
        arr = arr.filter(item => item.fileName != val?.fileName)
        setUploadFileDetail(arr);
        setIsUploadVisible(false)
        setUploadFileName([])
    }
    const handleCancelSuccess = () => {
        setIsFileUploaded(false);
        setUploadFileName([])

    };

    const files = {
        name: 'file',
        multiple: true,

        progress: {
            strokeColor: {
                '0%': '#108ee9',
                '100%': '#87d068'
            },
            strokeWidth: 2,
            showInfo: true,
            format: percent => percent && `${parseFloat(percent.toFixed(2))}%`
        },
        onChange(info) {
            const fileName = [];
            const fileSize = [];
            const fileDetail = [];
            // const nodeFileData = fileData && fileData.split('|');
            var formData = new FormData();
            info && info.fileList.map((item) => {
                formData.append('file', item.originFileObj);
                fileDetail.push({
                    fileName: item.name,
                    fileSize: item.size
                })
                fileName.push(item.name)
                fileSize.push(item.size)
            })
            formData.append('fileSize', fileSize)
            formData.append('project', selectParam['project'])
            setUploadFileDetail(fileDetail);
            setUploadFileName(fileName);
            setUploadFile(formData);

        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        }
    };

    const handleClickUpload = () => {
        const file = uploadFile;
        fileUpload(file);
    };

    const dummyRequest = ({ onSuccess }) => {
        setTimeout(() => {
            onSuccess('ok');
        }, 0);
    };


    const fileUpload = async (val) => {
        try {
            setUploading(true);
            const fileResponse = await projectFileUpload(val);
            if (fileResponse.Status === 202) {
                const fileName = [];
                const fileSize = [];
                setUploading(false);
                setFileUploadResponse(fileResponse.Status)
                setFileMessage(fileResponse.Message)
                const duplicateFile = fileResponse.data
                setUploadedFileInfo(duplicateFile);
                const filterDuplicateFile = uploadFileDetail.filter(item => !duplicateFile.includes(item.fileName))
                filterDuplicateFile.map((item) => {
                    fileName.push(item.fileName)
                    fileSize.push(item.fileSize)
                })
                let login_response = JSON.parse(localStorage.getItem('login_details'));
                // const data = fileData && fileData.split('|');
                setIsUploadVisible(false)
                setIsFileUploaded(true);
                if (fileName !== null) {
                    let req = {
                        changedBy: null,
                        createdBy: login_response.firstname + login_response.lastname,
                        custKey: "",
                        fileSize: fileSize,
                        filename: fileName,
                        group: selectParam['group'],
                        project: selectParam['project'],
                        status: 'N',
                        subgroup: selectParam['subGroup'],
                        uploadReason: 'PBR Document'
                    }
                    let res = await uploadProjectData(req);
                    if (res.Status === 202) {
                        dispatch(showNotification('success', res.Message));
                    } else {
                        setIsFileUploaded(false);
                        dispatch(showNotification('error', res.Message));
                    }
                }

            } else if (fileResponse.Status === 200) {
                setFileUploadResponse(fileResponse.Status)
                setUploading(false);
                setUploadedFileInfo(fileResponse.Data);
                setIsUploadVisible(false);
                setIsFileUploaded(true);
                setFileMessage(fileResponse.Message);
            } else if (fileResponse === 'Internal Server Error') {
                setUploading(false);
                setFileMessage('')
                dispatch(showNotification('error', 'Internal Server Error'));
            } else {
                setFileMessage('')
                setUploading(false);
                dispatch(showNotification('error', fileResponse.Message));
            }
        } catch (error) {
            dispatch(hideLoader());
            dispatch(showNotification('error', error));
        }
    }

    const checkUpload = () => {
        if (selectParam['project']) {
            setIsUploadVisible(true)
        } else {
            dispatch(showNotification('error', 'Please Select Project'));
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
                                <div className='fileUpload' style={{ padding: 24 }}>
                                    <h3>Files</h3>
                                    <Divider style={{ marginTop: 5 }} />
                                    <h3>Where do you want to place your new files?</h3>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40 }}>
                                        <div style={{ width: 235 }}>
                                            <SelectSearchField
                                                showSearch
                                                label='Project *'
                                                placeholder='Select Project'
                                                onChangeSelect={value => onChangeParam(value, 'project')}
                                                onSearchSelect={type => onSearchParam(type, 'project')}
                                                options={optionProject}
                                                handleClearSearch={e => clearSearch(e, 'project')}
                                                // error={isEmptyPlant ? 'Please select project' : null}
                                                selectedValue={selectParam['project'] ? selectParam['project'] : null}
                                            />
                                        </div>
                                        <div style={{ width: 235 }}>
                                            <SelectSearchField
                                                disabled={selectParam['project'] ? false : true}
                                                showSearch
                                                label='Group'
                                                placeholder='Select Group'
                                                onChangeSelect={value => onChangeParam(value, 'group')}
                                                onSearchSelect={type => onSearchParam(type, 'group')}
                                                options={optionsGroup}
                                                handleClearSearch={e => clearSearch(e, 'group')}
                                                // error={isEmptyPlant ? 'Please select plant' : null}
                                                selectedValue={selectParam['group'] ? selectParam['group'] : null}
                                            />
                                        </div>
                                        <div style={{ width: 235 }}>
                                            <SelectSearchField
                                                showSearch
                                                disabled={selectParam['group'] ? false : true}
                                                label='Sub-Group'
                                                placeholder='Select Sub-Group'
                                                onChangeSelect={value => onChangeParam(value, 'subGroup')}
                                                onSearchSelect={type => onSearchParam(type, 'subGroup')}
                                                options={optionsSubGroup}
                                                handleClearSearch={e => clearSearch(e, 'subGroup')}
                                                // error={isEmptyPlant ? 'Please select plant' : null}
                                                selectedValue={selectParam['subGroup'] ? selectParam['subGroup'] : null}
                                            />
                                        </div>
                                    </div>
                                    <h3 style={{ marginTop: 30 }}>Upload Files</h3>
                                    <div
                                        className='create-new'
                                        onClick={() => checkUpload()}
                                        disabled={true}
                                    >
                                        <PlusOutlined />
                                        <p>Upload new file</p>
                                    </div>

                                </div>
                                <Modal
                                    destroyOnClose
                                    width={520}
                                    visible={isUploadVisible}
                                    title={'Upload file'}
                                    className='file-upload-modal'
                                    onCancel={() => {
                                        setIsUploadVisible(false)
                                        setUploadFileName([])
                                    }
                                    }
                                    footer={null}>
                                    <Dragger
                                        {...files}
                                        listType='text'
                                        customRequest={dummyRequest}
                                    >
                                        <p className='ant-upload-drag-icon'>
                                            <InboxOutlined />
                                        </p>
                                        <p className='ant-upload-text'>
                                            Click or drag file to this area to upload
                                        </p>
                                        <p className='ant-upload-hint'>
                                            Upload files of PDF format. You may carry out single
                                            or bulk upload. Strictly refrain from uploading company data
                                            or other band files
                                        </p>
                                    </Dragger>
                                    {uploadFileName.length > 0 && (
                                        <div className='file-upload-section'>
                                            <div className='upload-btn'>
                                                <Button
                                                    disabled={uploadFileName.length <= 0}
                                                    loading={uploading}
                                                    onClick={() => handleClickUpload()}>
                                                    {uploading ? 'Uploading' : 'Upload'}
                                                </Button>
                                                <Button onClick={handleCancel}>Cancel</Button>
                                            </div>
                                        </div>
                                    )}

                                </Modal>
                                <Modal
                                    width={500}
                                    visible={isFileUploaded}
                                    onCancel={handleCancelSuccess}
                                    footer={null}>
                                    {fileUploadResponse === 200 && (
                                        <Result
                                            status="error"
                                            title={fileMessage}
                                        >
                                            {fileMessage && (
                                                <div className="desc">
                                                    {uploadedFileInfo && uploadedFileInfo.map((item) => (
                                                        <Paragraph>
                                                            <p>{item}</p>
                                                        </Paragraph>
                                                    ))}
                                                </div>
                                            )}
                                        </Result>
                                    )}
                                    {fileUploadResponse === 202 && (<Result
                                        status="success"
                                        title="Successfully File Uploaded!"
                                        subTitle={uploadedFileInfo.length > 0 ? fileMessage : ''}
                                    >
                                        {uploadedFileInfo && (<div className="desc">
                                            {uploadedFileInfo.map((item) => (
                                                <Paragraph>
                                                    <p>{item}</p>
                                                </Paragraph>
                                            ))}
                                        </div>)}
                                    </Result>)}
                                </Modal>
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