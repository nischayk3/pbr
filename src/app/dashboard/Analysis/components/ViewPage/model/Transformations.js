import React, { useEffect, useState, useCallback } from "react";
import { Button } from "antd";
import SelectField from "../../../../../../components/SelectField/SelectField";
import urlJson from './urls.json'
import './context.scss'

const Transformation = ({
  onCreateClick,
  imputerList,
  imputerTypeList,
  imputerType,
  setImputerType,
  transformationFinal,
  setTransformationsFinal,
  selectedImputeValue,
  saveTransformationValues,
  setSaveTransformationValues,
  finalModelJson,
  setFinalModelJson,
}) => {

  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [url, setUrl] = useState('')
  const [algorithm, setAlgorithm] = useState('')


  const onClick = () => {
    setSaveTransformationValues({
      ...saveTransformationValues,
      imputerType: imputerType,
      transformationFinal: transformationFinal,
    });
    const tempObj = JSON.parse(JSON.stringify(finalModelJson));
    Object.entries(tempObj.feature_union_mapping).forEach(([key, value]) => {
      if (value.type === "Imputer") {
        value.transformation = `t_${transformationFinal.toLowerCase()}`;
      }
    });
    setFinalModelJson({
      ...finalModelJson,
      feature_union_mapping: tempObj.feature_union_mapping,
    });
    onCreateClick();
  };

  const handleClose = useCallback(() => (contextMenuVisible ? setContextMenuVisible(false) : null), [contextMenuVisible]);

  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  });



  const handleClick = (event) => {
    event.preventDefault();
    setX(event.pageX)
    setY(event.pageY)
    setAlgorithm(event.target.innerText)
    setUrl(urlJson[event.target.innerText])
    setContextMenuVisible(true)
  };

  const style = {
    top: y + 10,
    left: x + 10,
  }
  return (
    <div>
      {
        contextMenuVisible ? <div className="context-menu" style={style} >
          <span onClick={() => window.open(url)}><center>About {algorithm}</center></span>
        </div> : <></>
      }
      <div className="drawer-head">
        <h3>Transformation - New</h3>
      </div>
      <div className="drawer-details">
        <p>{`You are applying transformations for ${selectedImputeValue}`}</p>
        <SelectField
          label="Transformation"
          selectList={imputerTypeList}
          selectedValue={imputerType}
          onChangeSelect={(e) => setImputerType(e)}
        />
        <SelectField
          label="Algorithm"
          selectList={imputerList}
          selectedValue={transformationFinal}
          onChangeSelect={(e) => setTransformationsFinal(e)}
          menu={true}
          handleClick={(e) => handleClick(e)}
        />
        <Button className="custom-primary-btn" onClick={onClick}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default Transformation;
