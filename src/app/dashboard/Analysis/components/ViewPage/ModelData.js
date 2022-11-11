import React, {useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoader, showLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { savePreprocessing } from "../../../../../services/analyticsService";
import "./viewPage.scss";

const ModelData = ({ modelData, setModelData, editFinalJson }) => {
  const dispatch = useDispatch();
  const selectedViewData = useSelector((state) => state.analyticsReducer.viewData);

  const getModalData = async () => {
    dispatch(showLoader());
    const req = {
      analysis_preprocessing: {
        batch_filter: selectedViewData?.batch_filter,
        data_filter:  selectedViewData?.data_filter,
        view_disp_id: selectedViewData?.view_id,
        view_version: selectedViewData?.view_version,
      },
    };
    const apiResponse = await savePreprocessing(req);
    const data = await apiResponse;
    if (apiResponse.Status === 200) {
      dispatch(hideLoader());
      setModelData(data.html_string);
    } else {
      dispatch(hideLoader());
      dispatch(showNotification("error", "Unable to get model data"));
    }
  };


  
  useEffect(() => {
    if (editFinalJson?.pipeline_data[0]?.variable_mapping?.length && !modelData?.length) {
      getModalData();
    }
  }, [editFinalJson])
  
  return <iframe srcdoc={modelData}></iframe>;
};

export default ModelData;
