import React, { useEffect, useState } from 'react';
import CreateVariable from './createVariable';
import { Collapse } from 'antd';
import './style.scss';
import MathFunction from './mathFunction';
import ParameterTable from './parameterTable';
import VariableCard from './variableCard';

const variableData = [];
const MathEditor = (props) => {
  console.log('selectedParamData', props);
  const [varData, setVarData] = useState([]);
  const [count, setCount] = useState(1);
  const [cardTitle, setCardTitle] = useState('Create Variable');

  const { Panel } = Collapse;

  useEffect(() => {
    console.log(' props.primarySelected ', props.primarySelected);
    props.primarySelected === true ? setCardTitle('Done') : null;
  }, [props.primarySelected]);
  function callback(key) {
    console.log(key);
  }

  const addVariable = () => {
    console.log('addd variableeee');
    setCardTitle('Select parameters');
  };

  const createVariable = () => {
    variableData.push({
      variableName: `${'V' + count}`,
      key: count,
    });
    setCardTitle('Select parameters');
    setCount(count + 1);
    setVarData(variableData);
  };

  return (
    <Collapse
      className='viewCreation-accordian '
      defaultActiveKey={['1']}
      onChange={callback}
    >
      <Panel
        className='viewCreation-materialsPanel'
        header='Math Editor'
        key='1'
      >
        <MathFunction />
        <div className='variable-wrapper'>
          <CreateVariable
            addVariable={addVariable}
            title={cardTitle}
            createVariable={createVariable}
          />
          {varData.map((item, index) => (
            <VariableCard key={index} variableName={item.variableName} />
          ))}
        </div>
        <ParameterTable
          selectedParamData={props.selectedParamData}
          selectedParamColumn={props.selectedParamColumn}
        />
      </Panel>
    </Collapse>
  );
};

export default MathEditor;
