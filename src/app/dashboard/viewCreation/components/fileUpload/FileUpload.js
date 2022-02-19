import React, { useEffect, useState } from 'react'
import './styles.scss'
import {
  Collapse,
  Table,
  Tag,
  Upload,
  Button,
  Modal,
  message,
  Popconfirm,
} from 'antd'
import {
  DeleteOutlined,
  DownloadOutlined,
  InboxOutlined,
  PlusSquareOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  adHocFilesParameterTree,
  adHocFileUpload,
  deleteAdHocFile,
} from '../../../../../duck/actions/fileUploadAction'
const { Panel } = Collapse
const { Dragger } = Upload

const columns = [
  {
    title: 'Parameter',
    key: 'parameter_name',
    dataIndex: 'parameter_name',
    render: parameter_name => (
      <Tag color="magenta" className="parameter-tag">
        {parameter_name}
      </Tag>
    ),
  },
  {
    title: 'Batch',
    key: 'coverage',
    dataIndex: 'coverage',
  },
  {
    title: 'Coverage',
    key: 'batch',
    dataIndex: 'batch',
  },
  {
    title: 'Add',
    key: 'add',
    dataIndex: 'add',
    render: () => (
      <>
        <span className="material-addIcon">
          <PlusSquareOutlined />
        </span>
      </>
    ),
  },
]

function FileUpload() {
  const [uploadModalVisible, setUploadModalVisible] = useState(false)
  const [uploadBtnDisabled, setUploadBtnDisabled] = useState(true)
  const [selectedAdHocFileList, setSelectedAdHocFileList] = useState([])
  const [selectedFileId, setSelectedFileId] = useState()
  const [filesListTree, setFilesListTree] = useState([])

  const genExtra = File_id => (
    <div
      className="fileUpload-panelHeader"
      onClick={event => {
        event.stopPropagation()
      }}
    >
      <span className="fileUpload-download">
        <DownloadOutlined />
      </span>
      <span className="fileUpload-delete">
        <Popconfirm
          placement="right"
          title="Are you sure to delete this file?"
          onConfirm={() => confirm(File_id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined />
        </Popconfirm>
      </span>
    </div>
  )

  function confirm(File_id) {
    let req = {
      fileid: parseInt(File_id),
      userid: localStorage.getItem('username'),
    }
    deleteAdHocFile(req).then(res => {
      console.log('res', res)
      if (res.data.statuscode === 202) {
        message.success('adhoc-file deleted successfully')
        const updatedFileList = filesListTree.filter(
          item => item.File_id !== File_id,
        )
        setFilesListTree(updatedFileList)
      }
      if (res.data.statuscode === 400) {
        message.error(res.data.message)
      }
      if (res.data.statuscode === 401) {
        message.error('UnAuthorized User')
      }
      if (res.data.statuscode === 403) {
        message.error(res.data.message)
      }
      if (res.data.statuscode === 404) {
        message.error(res.data.message)
      }
    })
  }

  const handleCancelUpload = () => {
    setUploadModalVisible(false)
  }

  const onClickUpload = () => {
    setUploadModalVisible(true)
  }

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok')
    }, 0)
  }

  const adHocFileUploadprops = {
    multiple: true,
    progress: {
      strokeColor: {
        '0%': '#52C41A',
        '100%': '#52C41A',
      },
      strokeWidth: 8,
      showInfo: true,
      format: percent => `${parseFloat(percent.toFixed(2))}%`,
    },
  }

  const onChange = info => {
    var today = new Date()
    today.setDate(today.getDate())
    const nextState = {}
    if (
      info.file.type !==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' &&
      info.file.type !== 'application/vnd.ms-excel'
    ) {
      message.error(`${info.file.name} is not excel or csv file`)
    } else {
      if (info.file.status === 'uploading') {
        setSelectedAdHocFileList([info.file])
        nextState.selectedAdHocFileList = [info.file]
      } else if (info.file.status === 'done') {
        setSelectedAdHocFileList([info.file])
        nextState.selectedAdHocFileList = [info.file]
        var formData = new FormData()
        formData.append('created_on', today.toISOString().slice(0, 10))
        formData.append('file_name', info.file.originFileObj)
        formData.append('upload_reason', 'test_reason')
        formData.append('username', localStorage.getItem('username'))
        adHocFileUpload(formData).then(res => {
          if (res.Status === 202) {
            message.success(res.Message)
            setUploadBtnDisabled(false)
            setSelectedFileId(res.File_id)
          }
          if (res.Status === 400) {
            message.error(res.Message)
            setUploadBtnDisabled(true)
          }
          if (res.Status === 401) {
            message.error('UnAuthorized User')
            setUploadBtnDisabled(true)
          }
        })
      } else if (info.file.status === 'removed') {
        setSelectedAdHocFileList([])
        setUploadBtnDisabled(true)
      }
    }
  }

  const handleSubmitUpload = () => {
    setSelectedAdHocFileList([])
    setUploadModalVisible(false)
    setUploadBtnDisabled(true)
    let req = { file_id: selectedFileId, detailedCoverage: true }
    adHocFilesParameterTree(req).then(res => {
      setFilesListTree([...filesListTree, res])
      if (res.Status === 404) {
        message.error(res.Message)
      }
      if (res.Status === 401) {
        message.error('UnAuthorized User')
      }
    })
  }
  console.log('filesListTree', filesListTree)
  return (
    <div className="materials-wrapper fileUpload-wrapper">
      <div className="materials-uploadDownloadFiles">
        <div className="materials-uploadFiles">
          <Button icon={<UploadOutlined />} onClick={onClickUpload}>
            Upload
          </Button>
        </div>
        <div className="materials-downloadFiles">
          <Button type="text" className="viewCreation-downloadBtn">
            <a
              href={require('../../../../../assets/xlsx/template_view_file_upload.xlsx')}
              download="template_view_file_upload.xlsx"
            >
              <DownloadOutlined /> Download Template
            </a>
          </Button>
        </div>
      </div>

      <Collapse
        accordion
        className="materials-accordion fileUpload-accordion"
        expandIconPosition="right"
      >
        {filesListTree.map((item, index) => {
          return (
            <Panel
              className="materials-panel fileUpload-panel"
              header={
                <span className="panelHeader_span">
                  {item.File_name.substr(0, item.File_name.lastIndexOf('.'))}
                </span>
              }
              extra={genExtra(item.File_id)}
              key={index}
            >
              <Table
                className="viewSummary-table fileList-table borderless-table"
                pagination={false}
                columns={columns}
                dataSource={item.Data}
                rowKey={record => record.parameter_name}
              />
            </Panel>
          )
        })}
      </Collapse>

      <Modal
        className="fileUploadModal"
        title="File Upload"
        maskClosable={false}
        visible={uploadModalVisible}
        onCancel={handleCancelUpload}
        footer={[
          <Button key="cancel" onClick={handleCancelUpload}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmitUpload}
            disabled={uploadBtnDisabled}
          >
            Upload
          </Button>,
        ]}
      >
        <div className="fileUploadModal-draggerContainer">
          <Dragger
            {...adHocFileUploadprops}
            fileList={selectedAdHocFileList}
            customRequest={dummyRequest}
            onChange={onChange}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single upload. Strictly prohibit from uploading
              company data or other band files
            </p>
          </Dragger>
        </div>
      </Modal>
    </div>
  )
}

export default FileUpload
