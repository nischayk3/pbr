import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Checkbox, Collapse, Input, message, Skeleton } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import InputField from "../../../../../../components/InputField/InputField";
import { getRuleList } from "../../../../../../services/chartPersonalizationService";

const { Panel } = Collapse;

const rules = () => {
  const [ruleList, setRuleList] = useState({});

  const getRules = async () => {
    try {
      const rulesResponse = await getRuleList();
      setRuleList(rulesResponse.rules_list);
    } catch (error) {
      message.error("Unable to fetch rules");
    }
  };

  useEffect(() => {
    getRules();
  }, []);

  return (
    <div className="rule-container">
      {Object.keys(ruleList).length === 0 && <Skeleton />}
      {Object.keys(ruleList).length !== 0 && (
        <Collapse expandIconPosition="right" ghost className="collapse-rule">
          {Object.entries(ruleList).map(([key, value]) => {
            return (
              <Panel header={`${key} RULE`} key={key}>
                <Collapse
                  expandIconPosition="left"
                  expandIcon={() => <PlusCircleOutlined />}
                  ghost
                  className="rule-content"
                >
                  {value.map((item, index) => {
                    const html = item.rule_desc;
                    return (
                      <Panel header={`Rule ${item.rule_id}`} key={item.rule_id}>
                        <div className="rules">
                          <span>
                            <Checkbox /> &nbsp;
                            <span
                              dangerouslySetInnerHTML={{ __html: html }}
                            ></span>
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
      )}
    </div>
  );
};

export default rules;
