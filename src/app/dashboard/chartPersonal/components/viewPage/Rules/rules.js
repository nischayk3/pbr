import React, { useEffect, useState, useRef } from "react";
import "./styles.scss";
import { Button, Checkbox, Collapse, Input, message, Skeleton } from "antd";
import {
  PlusCircleOutlined,
  ArrowRightOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import reactStringReplace from "react-string-replace";
import { getRuleList } from "../../../../../../services/chartPersonalizationService";
import {
  showLoader,
  hideLoader,
} from "../../../../../../duck/actions/commonActions";
import { useDispatch } from "react-redux";
import { postChartPlotData } from "../../../../../../services/chartPersonalizationService";

const { Panel } = Collapse;

const rules = ({ postChartData, setPostChartData }) => {
  const [ruleList, setRuleList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [selectedRules, setSelectedRules] = useState([]);
  const dispatch = useDispatch();

  const getRules = async () => {
    try {
      const rulesResponse = await getRuleList();
      setRuleList(rulesResponse.rules_list);
    } catch (error) {
      message.error("Unable to fetch rules");
    }
  };
  const getChecked = (e, id) => {
    if (e.target.checked) {
      if (!checked.includes(id)) {
        let newChecked = [...checked];
        newChecked.push(id);
        setChecked(newChecked);
      }
    } else {
      if (checked.includes(id)) {
        let newChecked = [...checked];
        newChecked.splice(checked.indexOf(id), 1);
        setChecked(newChecked);
      }
    }
  };

  const handleChange = (event, id, key) => {
    let tempArr = [...selectedRules];
    let objIndex = tempArr.findIndex((obj) => obj.rule_id === id);
    tempArr[objIndex].default_params[key] = event.target.value;
    setSelectedRules(tempArr);
  };

  const onApply = async () => {
    const selected = JSON.parse(JSON.stringify(selectedRules));
    selected.forEach((ele) => {
      delete ele.rule_desc;
      delete ele.rule_disp_id;
    });
    const select = selected.filter((person) =>
      checked.includes(person.rule_id)
    );
    const newArr = JSON.parse(JSON.stringify(postChartData));
    newArr.data[0].rules = select;
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(newArr);
      let newdataArr = [...postChartData.data];
      newdataArr[0].violations = viewRes.data[0].violations;
      newdataArr[0].data = viewRes.data[0].data;
      setPostChartData({ ...postChartData, data: newdataArr });
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      message.error("Unable to fetch coverages");
    }
  };

  useEffect(() => {
    getRules();
  }, []);

  useEffect(() => {
    if (ruleList) {
      let tempArr = [...Object.values(ruleList)];
      tempArr = tempArr.flat();
      setSelectedRules(tempArr);
    }
  }, [ruleList]);

  return (
    <div className="rule-container">
      {Object.keys(ruleList).length === 0 && <Skeleton />}
      {Object.keys(ruleList).length !== 0 && (
        <>
          <Collapse expandIconPosition="left" ghost className="collapse-rule">
            {Object.entries(ruleList).map(([key, value]) => {
              return (
                <Panel header={`${key} RULE`} key={key} className="panel-rule">
                  <Collapse
                    expandIconPosition="left"
                    expandIcon={({ isActive }) =>
                      isActive ? (
                        <MinusCircleOutlined />
                      ) : (
                        <PlusCircleOutlined />
                      )
                    }
                    ghost
                    className="rule-content"
                  >
                    {value.map((item, index) => {
                      let html = item.rule_desc;
                      item &&
                        item.default_params &&
                        Object.keys(item.default_params).map((key, index) => {
                          html = reactStringReplace(html, `<${key}>`, () => (
                            <span key={key} style={{ color: "red" }}>
                              <Input
                                type="number"
                                defaultValue={item.default_params[key]}
                                onChange={(e) =>
                                  handleChange(e, item.rule_id, key)
                                }
                              />
                            </span>
                          ));
                        });

                      return (
                        <Panel header={item.rule_disp_id} key={item.rule_id}>
                          <div className="rules">
                            <span>
                              <Checkbox
                                onChange={(e) => getChecked(e, item.rule_id)}
                              />{" "}
                              &nbsp;
                              <span id="my-inputs">{html}</span>
                            </span>
                          </div>
                        </Panel>
                      );
                    })}
                  </Collapse>
                </Panel>
              );
            })}
          </Collapse>
          <div className="apply-cont">
            <Button onClick={onApply}>
              Apply <ArrowRightOutlined />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default rules;
