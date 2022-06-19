/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Tree } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import {
  batchCoverage,
  sendSelectedParamData,
} from "../../../../../duck/actions/viewAction";
import "./style.scss";
import { showNotification } from "../../../../../duck/actions/commonActions";
import { getParameterBatches } from "../../../../../services/viewCreationPublishing";

const { TreeNode } = Tree;
let setKey = [];
let selectedData = [];
let finalData = [];
const MaterialTree = (props) => {
  const dispatch = useDispatch();
  const { moleculeList } = props;
  const [selectedKeys, setSelectedKeys] = useState([]);
  //const [checkedKeys, setCheckedKeys] = useState([]);
  const [count, setCount] = useState("");
  const selectedTableData = useSelector(
    (state) => state.viewCreationReducer.selectedParamData
  );

  const onSelect = (selectedKe, info) => {
    props.callbackProcessClick(info.node.dataRef);
    setSelectedKeys(selectedKe);
  };

  const handleClickParam = async (keys, param, record) => {
    // console.log("param, record", keys, param, record);
    // console.log("  record", record);
    // console.log("selectedData", selectedData);
    // console.log("selectedTableData", selectedTableData);
    const existing = selectedData.find((item) => item.key === keys);
    try {
      const paramObj = {
        "resource-name": "VIEW",
        molecule_name: record.ds_name,
        process_id: record.process_step_int_id,
        product_num: record.product_num,
        parameter_name: record.parameter_name,
      };
      const getMolbatchData = await getParameterBatches(paramObj);
      if (existing === undefined) {
        let rowData = {};
        let batchData = {};
        let newBatchData = {};

        setKey.push(keys);
        //let tree = [...moleculeList.hierarchy];
        let molBatch = getMolbatchData.Data.batches;
        //   molBatch = molBatch.slice(0, 1000);
        var start = new Date().getTime();
        console.log(molBatch, "molBatch");
        molBatch.forEach((el) => {
          batchData[el] = true;
        });
        var end = new Date().getTime();
        var time = end - start;
        console.log("Execution time: " + time);
        console.log("batchData", batchData);
        selectedData.push(record);
        // tree.forEach((a) => {
        // 	a.children.forEach((b) => {
        // 		b.children.forEach((c) => {
        // 			if (c.key === keys) {
        // 				selectedData.push(c);
        // 			}
        // 		});
        // 	});
        // });
        // molBatch.map((el) => {
        // 	if (record.batches.includes(el.batch)) {
        // 		return (
        // 			batchData[el.batch] = true,
        // 			newBatchData[el.batch] = true
        // 		)
        // 	} else {
        // 		return (
        // 			batchData[el.batch] = false,
        // 			newBatchData[el.batch] = false
        // 		)
        // 	}
        // });

        //   molBatch.forEach((el) => {
        //     if (record.batches.includes(el.batch)) {
        //       batchData[el.batch] = true;
        //     } else {
        //       batchData[el.batch] = false;
        //     }
        //     // return batchData;
        //   });
        // batchData["id"] = count;
        //   console.log("batchData", batchData);
        setCount(count + 1);
        const indexDuplicate = selectedData.findIndex(
          (x) => x.parameter_name == param
        );

        if (indexDuplicate != -1) {
          rowData = Object.assign(batchData);
          rowData.sourceType = "material";
          rowData.parameter_name = record.parameter_name;
          rowData.coverage = record.coverage;
          rowData.key =
            record.process_step_int_id + "_" + record.parameter_name;
          rowData.primary = 0;
          rowData.aggregation = "";

          let data = { ...rowData };
          if (selectedTableData && selectedTableData.length !== 0) {
            selectedTableData.forEach((ele) => {
              const tempObj = finalData.find((item) => item.key === ele.key);
              if (tempObj === undefined) {
                finalData.push(ele);
              }
            });
          }
          finalData.push(data);
          console.log("data", data);
          console.log("finalData", finalData);
          dispatch(sendSelectedParamData(finalData));
          dispatch(batchCoverage(batchData));
        } else {
          dispatch(showNotification("error", "Function already exists"));
        }
      } else {
        dispatch(showNotification("error", "Parameter already exists"));
      }
    } catch (err) {
      dispatch(showNotification("error", "Adding parameter failed"));
    }
  };

  const treeMap = moleculeList.hierarchy;

  useEffect(() => {
    finalData = [];
    selectedData = [];
  });

  return (
    <div className="custom-treenode">
      {treeMap &&
        treeMap.map((item, ele1) => {
          return (
            <Tree onSelect={onSelect}>
              <TreeNode
                title={item.process_step}
                key={"frstEle-" + ele1}
                dataRef={item}
              >
                {item &&
                  item.children &&
                  item.children.map((a, ele2) => {
                    return (
                      <TreeNode
                        title={a.product_desc}
                        dataRef={a}
                        key={"secondEle-" + ele2}
                      >
                        {a &&
                          a.children &&
                          a.children.map((b, ele3) => {
                            return (
                              <TreeNode
                                key={"thirdEle-" + ele3}
                                title={
                                  <div className="treenode-block">
                                    <div className="tree-block-param">
                                      <Tag color="geekblue">
                                        {b.parameter_name}
                                      </Tag>
                                      <p className="treenode-coverage">
                                        {b.coverage}
                                      </p>
                                    </div>
                                    <span
                                      onClick={(e) =>
                                        handleClickParam(
                                          "thirdEle-" + ele3,
                                          b.parameter_name,
                                          b
                                        )
                                      }
                                    >
                                      {!selectedKeys ? (
                                        <CheckOutlined />
                                      ) : (
                                        <PlusOutlined />
                                      )}
                                    </span>
                                  </div>
                                }
                                className="tree-index"
                              />
                            );
                          })}
                      </TreeNode>
                    );
                  })}
              </TreeNode>
            </Tree>
          );
        })}
    </div>
  );
};

export default MaterialTree;
