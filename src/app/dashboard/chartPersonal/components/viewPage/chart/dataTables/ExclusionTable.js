import { Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  showLoader,
  hideLoader,
  showNotification,
} from "../../../../../../../duck/actions/commonActions";
import queryString from "query-string";
import { postChartPlotData } from "../../../../../../../services/chartPersonalizationService";

const ExclusionTable = ({
  exclusionTable,
  setExclusionTable,
  postChartData,
  setPostChartData,
  exclusionIdCounter,
}) => {
  const dispatch = useDispatch();
  const params = queryString.parse(location.search);

  let columns = [];
  const objkeys =
    exclusionTable !== undefined && exclusionTable.length > 0
      ? Object.keys(exclusionTable[0])
      : [];
  const uniqueArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const filterColumn = objkeys.filter(uniqueArr);
  filterColumn.forEach((item, i) => {
    columns.push({
      title: item.toUpperCase().replace("_", " "),
      dataIndex: item,
      key: `${item}-${i}`,
      render: (text) => String(text),
    });
  });

  const handleChange = async (id) => {
    const newArr = [...postChartData.data];
    newArr[0].exclusions = newArr[0].exclusions.filter(
      (ele) => Number(ele.exclusion_id) !== Number(id)
    );
    const exclusionData = exclusionTable.filter(
      (ele) => Number(ele.exclusion_id) !== Number(id)
    );
    setExclusionTable(exclusionData);
    exclusionIdCounter.current = exclusionIdCounter.current - 1;
    setPostChartData({ ...postChartData, data: newArr });
    let errorMsg = "";
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(postChartData);
      errorMsg = viewRes?.message;
      setPostChartData({ ...postChartData, data: viewRes.data });
      dispatch(hideLoader());
    } catch (err) {
      /* istanbul ignore next */
      dispatch(hideLoader());
      if (errorMsg) {
        dispatch(showNotification("error", errorMsg));
      }
    }
  };

  const deleteColumn = {
    title: "",
    dataIndex: "delete",
    render: (text, record) => (
      <DeleteOutlined onClick={() => handleChange(record.exclusion_id)} />
    ),
    width: 50,
  };
  if (Object.keys(params).length === 0 && params.fromScreen !== "Workspace") {
    columns.push(deleteColumn);
  }

  return (
    <div>
      <Table
        columns={columns}
        pagination={false}
        scroll={{ y: 350 }}
        dataSource={exclusionTable}
      />
    </div>
  );
};

export default ExclusionTable;
