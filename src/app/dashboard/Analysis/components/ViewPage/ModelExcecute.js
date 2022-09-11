import React, { useEffect, useState } from "react";
import "./viewPage.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import ModelExcecuteImg1 from "../../../../../assets/images/analysis_execute_images/ExecuteImg1.svg";
import ModelExcecuteImg2 from "../../../../../assets/images/analysis_execute_images/ExecuteImg2.svg";
import ModelExcecuteImg3 from "../../../../../assets/images/analysis_execute_images/ExecuteImg3.svg";
import ModelExcecuteImg4 from "../../../../../assets/images/analysis_execute_images/ExecuteImg4.svg";

const ModelExcecute = () => {
  const [execPercent, setExecPercent] = useState(30);
  const [content, setContent] = useState("Getting ready to build your model");
  const [imgSrc, setImgSrc] = useState(ModelExcecuteImg1);

  const getImg = () => {
    if (execPercent === 30) {
      setImgSrc(ModelExcecuteImg1);
    } else if (execPercent === 60) {
      setImgSrc(ModelExcecuteImg4);
      setContent("Queued");
    } else if (execPercent === 90) {
      setImgSrc(ModelExcecuteImg3);
      setContent("Running...");
    } else if (execPercent === 100) {
      setImgSrc(ModelExcecuteImg2);
      setContent("Execution complete");
    }
  };

  const setExecTimeImterval = () => {
    if (execPercent === 30 || execPercent === 60) {
      setExecPercent(execPercent + 30);
    } else if (execPercent === 90) {
      setExecPercent(100);
    }
  };
  useEffect(() => {
    setInterval(() => {
      setExecTimeImterval();
    }, 10000);
    getImg();
    return () => {
      clearInterval();
    };
  }, [execPercent]);

  return (
    <div className="exec-model-container">
      <img src={imgSrc} />
      <Progress percent={execPercent} />
      <p>{content}</p>
      {execPercent === 100 ? (
        <a>View results</a>
      ) : (
        <a>
          View Progress <ArrowRightOutlined />
        </a>
      )}
    </div>
  );
};

export default ModelExcecute;
