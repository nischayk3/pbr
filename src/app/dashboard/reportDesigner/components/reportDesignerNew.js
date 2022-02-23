import React, { useEffect, useState } from 'react';
import { ArrowLeftOutlined, BuildTwoTone } from '@ant-design/icons';
import { Form, Select, Button, Modal, Table, Input, message } from 'antd';
import ChartSelector from './reportDesignerFilter/chartSelector';
import ReportDesignerForm from './reportDesignerForm/reportDesignerForm';
import ReportDesignerDynamicSections from './reportDesignerDynamicSections/reportDesignerDynamicSections';
import './stylesNew.scss';
import example_json from './example.json';
import {
  getViews,
  getCharts,
  saveReportDesign,
} from '../../../../services/reportDesignerServices';
import SaveModal from '../../../../components/SaveModal/saveModal';

//Columns For The view Selection modal
const columns = [
  {
    title: 'Product Num',
    dataIndex: 'product_num',
    key: 'name',
  },
  {
    title: 'View',
    dataIndex: 'view',
    key: 'view_disp_id',
  },
  {
    title: 'View Name',
    dataIndex: 'view_name',
    key: 'view_name',
  },
  {
    title: 'Created By',
    dataIndex: 'created_by',
    key: 'created_by',
  },
];

function ReportDesignerNew() {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [isLoad, setIsLoad] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [reportName, setReportName] = useState('');
  const [isNew, setIsNew] = useState(false);
  const [visible, setVisible] = useState(false);
  const [popvisible, setPopVisible] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const [viewId, setViewId] = useState('');
  const [reportId, setReportId] = useState('');
  const [viewVersion, setViewVersion] = useState('');
  const [viewIdVersion, setViewIdVersion] = useState('');
  const [selectedChartList, setSelectedChartList] = useState([]);
  const [status, setStatus] = useState('');
  const [viewList, setViewList] = useState('');
  // const [chartId, setChartId] = useState([]);
  const [chartList, setChartList] = useState([]);
  const [formData, setFormData] = useState({});
  // const [mainJson, setMainJson] = useState({});
  const [form] = Form.useForm();

  const mapViewList = viewList.length > 0 ? viewList : [];

  useEffect(() => {
    getViewsList();
  }, []);

  const OnNewClick = () => {
    setIsNew(true);
    setIsLoad(false);
    setFormData({});
    setSelectedChartList([]);
    setReportName('');
    setViewVersion('');
    setReportId('');
    setViewId('');
    setViewIdVersion('');
    setStatus('NEW');
    setChartList([]);
  };

  // Get form values
  const handleValuesChange = (changedValues, values) => {
    setFormData(convertToJson(values));
  };

  //Get view table data
  const getViewsList = () => {
    let req = {};
    getViews(req).then((res) => {
      setViewList(res['Data']);
    });
  };

  //   Get charts based on viewId-version
  const getChartsList = (version) => {
    message.success(`${version} selected`);
    let req = version;
    getCharts(req).then((res) => {
      if (res['status-code'] === 200) setChartList(res['data']);
      else setChartList([]);

      if (typeof res['data'] === 'string') {
        message.error(`Chart ${res['data']}`);
      }
    });
  };

  // Converting form json into layout info required by the report generator json
  const convertToJson = (jay) => {
    let arr = {};
    let section_arr = [];

    jay = jay['response'];
    jay.map((item, index) => {
      let obj = {};
      obj['heading'] = item.sectionName;
      if (index == 0) obj['numbered'] = true;
      else obj['numbered'] = false;
      let content_arr = [];
      content_arr = item.dymamic_rows.map((i) => {
        let objj = {};
        let key_obj = {};
        key_obj['value'] = i.value;
        key_obj['editable'] = i.editable;
        objj[i.keyName] = key_obj;

        return objj;
      });
      obj['content'] = [Object.assign({}, ...content_arr)];

      if (index == 0) arr['titlepage'] = obj;
      else section_arr.push(obj);
    });
    arr['sections'] = section_arr;

    return arr;
  };

  // searching values in table
  const search = (value) => {
    const tableData = viewList;
    const filterTable = tableData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase())
      )
    );
    setFilterTable(filterTable);
  };

  // Saving the json
  const PrepareJson = (formData) => {
    let obj = {};
    obj['view_disp_id'] = viewId;
    obj['chart_int_ids'] = selectedChartList;
    obj['view_version'] = viewVersion;
    obj['rep_name'] = reportName;
    obj['rep_status'] = status;
    obj['rep_disp_id'] = reportId;
    obj['layout_info'] = formData;

    saveReportDesign(obj).then((res) => {
      if (res && res['msg'] && res['msg'] == 'success') {
        setReportId(res['rep_disp_id']);
        setStatus(res['rep_stauts']);
        setIsSave(true);
      } else message.error('Not Saved');
    });
  };

  // unloading the json into component readable form
  // getting json from GET service distrupting json for each component (as required)
  const convertContent = (obj) => {
    let obje = obj[0];
    let keys = Object.keys(obje);
    let values = Object.values(obje);
    let rows = [];
    for (let i = 0; i < keys.length; i++) {
      let o = {};
      o['keyName'] = keys[i];
      o['value'] = values[i].value;
      o['editable'] = values[i].editable;

      rows.push(o);
    }

    return rows;
  };

  const unLoadJson = (jay) => {
    let view = jay['view_disp_id'] ? jay['view_disp_id'] : '';
    let ReportName = jay['rep_name'] ? jay['rep_name'] : '';
    let chartList = jay['chart_int_ids'].length > 0 ? jay['chart_int_ids'] : [];
    let status = jay['rep_status'] ? jay['rep_status'] : '';
    let view_version = jay['view_version'] ? jay['view_version'] : '';

    setViewId(view);
    setViewIdVersion(view + '-' + view_version);
    setReportName(ReportName);
    setSelectedChartList(chartList);
    setStatus(status);

    let res = [];
    let layout_info = jay['layout_info'] ? jay['layout_info'] : {};
    let title_page = layout_info['titlepage'] ? layout_info['titlepage'] : {};

    let title_section = title_page['heading'] ? title_page['heading'] : {};
    let title_rows = title_page['content']
      ? convertContent(title_page['content'])
      : {};
    let title_obj = {};
    title_obj['sectionName'] = title_section ? title_section : '';
    title_obj['dymamic_rows'] = title_rows ? title_rows : '';

    res.push(title_obj);

    let section_area = layout_info['sections'] ? layout_info['sections'] : '';

    if (section_area) {
      section_area.map((item) => {
        let section_obj = {};
        section_obj['sectionName'] = item['heading'] ? item['heading'] : '';
        section_obj['dymamic_rows'] = item['content']
          ? convertContent(item['content'])
          : '';
        res.push(section_obj);
      });
      let form_res = {};
      form_res['response'] = res;
      setFormData(form_res);
    } else {
      setFormData({});
    }
  };

  return (
    <div className='reportDesigner-container'>
      <div className='reportDesigner-block'>
        <h1 className='reportDesigner-headline'>
          <ArrowLeftOutlined /> Report Designer
        </h1>
        <div className='reportDesigner-btns'>
          {isLoad ? (
            <></>
          ) : (
            <Button
              className='reportDesigner-saveBtn'
              onClick={() => OnNewClick()}
            >
              New
            </Button>
          )}
          <Button
            className='reportDesigner-loadBtn'
            onClick={() => {
              setVisible(true);
              setIsNew(false);
            }}
          >
            Load
          </Button>
          {isLoad || isNew ? (
            <>
              <Button
                className='reportDesigner-loadBtn'
                onClick={() => PrepareJson(formData)}
              >
                Save
              </Button>
              <Button
                className='reportDesigner-loadBtn'
                // onClick={() => setVisible(true)}
              >
                Save As
              </Button>
              <Button
                className='reportDesigner-loadBtn'
                // onClick={() => setVisible(true)}
              >
                Test
              </Button>{' '}
            </>
          ) : (
            <> </>
          )}
          <Button
            className='reportDesigner-shareBtn'
            type='primary'
            style={{ backgroundColor: '#093185', color: 'white' }}
          >
            Publish
          </Button>
        </div>
      </div>

      <ReportDesignerForm
        viewId={viewId}
        setViewId={setViewId}
        viewList={viewList}
        setViewList={setViewList}
        setStatus={setStatus}
        status={status}
        isLoad={isLoad}
        setIsLoad={setIsLoad}
        reportName={reportName}
        setReportName={setReportName}
        isNew={isNew}
        setIsNew={setIsNew}
        viewVersion={viewVersion}
        setViewVersion={setViewVersion}
        reportId={reportId}
        viewIdVersion={viewIdVersion}
        setViewIdVersion={setViewIdVersion}
        getChartsList={getChartsList}
        mapViewList={mapViewList}
      />

      {isLoad || isNew ? (
        <div className='reportDesigner-grid-tables'>
          <ChartSelector
            // chartId={chartId}
            // setChartId={setChartId}
            selectedChartList={selectedChartList}
            setSelectedChartList={setSelectedChartList}
            viewVersion={viewVersion}
            viewID={viewId}
            chartList={chartList}
          />
          <Form
            className='report-form'
            name='report-generator-form'
            form={form}
            onValuesChange={handleValuesChange}
            initialValues={formData ? formData : {}}
          >
            <ReportDesignerDynamicSections formData={formData} />
          </Form>
        </div>
      ) : (
        <></>
      )}

      <Modal
        title='Load'
        visible={visible}
        onOk={() => {
          setVisible(false);
          setIsLoad(true);
          unLoadJson(example_json);
        }}
        onCancel={() => setVisible(false)}
        width={500}
        style={{ marginRight: '800px' }}
      >
        <Select
          className='filter-button'
          defaultValue={viewId}
          onChange={(e, value) => {
            let view_value = value.value ? value.value : '';
            let split_view_id = view_value ? view_value.split('-') : [];
            setViewId(split_view_id[0]);
            setViewVersion(split_view_id[1]);
            setViewIdVersion(view_value);
            getChartsList(view_value);
          }}
          value={viewId}
        >
          {mapViewList.map((item) => (
            <Option value={item.view}>{item.view}</Option>
          ))}
        </Select>
        <Button onClick={() => setPopVisible(true)}>
          <BuildTwoTone twoToneColor='#093185' />
        </Button>
      </Modal>
      <Modal
        title='Select View'
        visible={popvisible}
        onOk={() => setPopVisible(false)}
        onCancel={() => setPopVisible(false)}
        width={600}
        title={
          <span>
            Select View{' '}
            <Input.Search
              className='table-search'
              placeholder='Search by...'
              enterButton
              onSearch={search}
              style={{ marginBottom: '40px' }}
            />
          </span>
        }
        centered
        // bodyStyle={{height: 400}}
        width={500}
      >
        <Table
          dataSource={filterTable === null ? viewList : filterTable}
          columns={columns}
          onRow={(record) => ({
            onClick: (e) => {
              setViewId(record.view_disp_id);
              setStatus(record.view_status);
              setViewVersion(record.view_version);
              getChartsList(record.view);
            },
          })}
          loading={loading}
          scroll={{ y: 200 }}
          size='small'
          pagination={false}
        />
      </Modal>
      <SaveModal isSave={isSave} setIsSave={setIsSave} />
    </div>
  );
}

export default ReportDesignerNew;
