import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./viewPage.scss";
import { ArrowRightOutlined } from "@ant-design/icons";
import { Progress } from "antd";
import { MDH_AIRFLOW_DAGS } from "../../../../../constants/apiBaseUrl";
import ModelExcecuteImg1 from "../../../../../assets/images/analysis_execute_images/ExecuteImg1.svg";
import ModelExcecuteImg2 from "../../../../../assets/images/analysis_execute_images/ExecuteImg2.svg";
import ModelExcecuteImg3 from "../../../../../assets/images/analysis_execute_images/ExecuteImg3.svg";
import ModelExcecuteImg4 from "../../../../../assets/images/analysis_execute_images/ExecuteImg4.svg";

const ModelExcecute = ({ getResultFunc, resultsData, jobId }) => {
  const [execPercent, setExecPercent] = useState(20);
  const [content, setContent] = useState("Getting ready to build your model");
  const [imgSrc, setImgSrc] = useState(ModelExcecuteImg1);
  const { id } = useParams();
  const getImg = () => {
    if (execPercent >= 20 && execPercent <= 40) {
      setImgSrc(ModelExcecuteImg1);
    } else if (execPercent >= 40 && execPercent <= 60) {
      setImgSrc(ModelExcecuteImg4);
      setContent("Queued");
    } else if (execPercent >= 60 && execPercent <= 99) {
      setImgSrc(ModelExcecuteImg3);
      setContent("Running...");
    } else if (execPercent === 100) {
      setImgSrc(ModelExcecuteImg2);
      setContent("Execution complete");
    }
  };

 
  const counterValid = execPercent < 90;
  useEffect(() => {
    const intervalId = counterValid && setInterval(() => {
      setExecPercent((t) => t + 5)
      if (execPercent === 60) {
        getResultFunc();
      }
    }
      , 2000);
      getImg();
      return () => clearInterval(intervalId)
  }, [execPercent]);



  const results = resultsData;

  useEffect(() => {
    if (execPercent === 90) {
      const intervalId = (results.run_status === "Pending" || results.run_status === "Not Executed") && setInterval(() => {
        getResultFunc();
      }
        , 5000);
        return () => clearInterval(intervalId)
    }
  }, [results, execPercent]);

 

  return (
    <div className="exec-model-container">
      <img src={imgSrc} />
      <Progress percent={execPercent} />
      <p>{content}</p>
      {execPercent === 100 ? (
        <a>View results</a>
      ) : (
        <a href={`${MDH_AIRFLOW_DAGS}/${id}_ANALYTICS_${jobId?.current}/grid?`} target="_blank">
          View Progress <ArrowRightOutlined />
        </a>
      )}
    </div>
  );
};

export default ModelExcecute;
