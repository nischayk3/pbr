import React, { useEffect, useState } from "react";
import "./style.scss";
//antd imports
import { Col, Collapse, Row, Switch } from "antd";
import ColorPicker from "../../../../../../components/ColorPicker/ColorPicker";
import InputField from "../../../../../../components/InputField/InputField";
import SelectField from "../../../../../../components/SelectField/SelectField";
//services
import { postChartPlotData } from "../../../../../../services/chartPersonalizationService";
import { useDispatch } from "react-redux";
import {
  hideLoader,
  showLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";
//unpacking antd components
const { Panel } = Collapse;

const Display = ({ postChartData, setPostChartData }) => {
  const [layoutData, setLayoutData] = useState(postChartData?.data[0]?.layout);
  const dispatch = useDispatch();
  const [sigmaLines, setSigmaLines] = useState(false);
  const [chartDataMarkers, setChartDataMarkers] = useState({
    markerSize: 15,
    markerShape: "circle",
    markerColor: "#376dd4",
    violationMarkerColor: null,
    violationMarkerSize: null,
    violationMarkerShape: null,
  });
  const orientationList = ["Vertical", "Horizontal"];
  const symbolList = [
    "circle",
    "square",
    "diamond",
    "cross",
    "triangle-up",
    "triangle-down",
    "pentagon",
    "hexagon",
    "octagon",
  ];

  const handleMarkerChange = (e, type) => {
    const chartData = JSON.parse(JSON.stringify(postChartData));
    chartData.data.forEach((element) => {
      element.data.forEach((item) => {
        if (type === "markerShape") {
          if (item.mode === "markers" && item.name === "Normal") {
            item.marker.symbol = e;
          }
          setChartDataMarkers({ ...chartDataMarkers, markerShape: e });
        } else {
          if (item.mode === "markers" && item.name === "Violations") {
            item.marker.symbol = e;
          }
          setChartDataMarkers({ ...chartDataMarkers, violationMarkerShape: e });
        }
      });
    });
    setPostChartData(chartData);
  };
  const handleMarkerColorChange = (e, type) => {
    const chartData = JSON.parse(JSON.stringify(postChartData));
    chartData.data.forEach((element) => {
      element.data.forEach((item) => {
        if (type === "markerColor") {
          if (item.mode === "markers" && item.name === "Normal") {
            item.marker.color = e.target.value;
          }
          setChartDataMarkers({
            ...chartDataMarkers,
            markerColor: e.target.value,
          });
        } else {
          if (item.mode === "markers" && item.name === "Violations") {
            item.marker.color = e.target.value;
          }
          setChartDataMarkers({
            ...chartDataMarkers,
            violationMarkerColor: e.target.value,
          });
        }
      });
    });
    setPostChartData(chartData);
  };
  const handleMarkerSizeChange = (e, type) => {
    const chartData = JSON.parse(JSON.stringify(postChartData));
    chartData.data.forEach((element) => {
      element.data.forEach((item) => {
        if (type === "markerSize") {
          if (item.mode === "markers" && item.name === "Normal") {
            item.marker.size = e.target.value;
          }
          setChartDataMarkers({
            ...chartDataMarkers,
            markerSize: e.target.value,
          });
        } else {
          if (item.mode === "markers" && item.name === "Violations") {
            item.marker.size = e.target.value;
          }
          setChartDataMarkers({
            ...chartDataMarkers,
            violationMarkerSize: e.target.value,
          });
        }
      });
    });
    setPostChartData(chartData);
  };

  const onSigmaLineChange = async (e) => {
    const chartData = JSON.parse(JSON.stringify(postChartData));
    chartData.data[0].plot_std = e;
    try {
      dispatch(showLoader());
      const viewRes = await postChartPlotData(chartData);
      let newdataArr = [...postChartData.data];
      newdataArr[0].data = viewRes.data[0].data;
      setPostChartData({ ...postChartData, data: newdataArr });
      dispatch(hideLoader());
    } catch (error) {
      dispatch(hideLoader());
      dispatch(showNotification("error", "unable to plot sigma lines"));
    }
    setSigmaLines(e);
  };

  useEffect(() => {
    if (postChartData.data) {
      const newArr = JSON.parse(JSON.stringify(postChartData));
      setSigmaLines(newArr?.data[0]?.plot_std);
      const o =
        newArr.data[0].layout.legend.orientation === "v"
          ? "Vertical"
          : "Horizontal";
      setLayoutData({
        ...layoutData,
        legend: {
          ...layoutData.legend,
          orientation: o,
        },
      });
      newArr.data[0] &&
        newArr.data[0].data &&
        newArr.data[0].data.forEach((ele) => {
          if (ele.name === "Normal" && ele.mode === "markers") {
            setChartDataMarkers({
              ...chartDataMarkers,
              markerSize: ele.marker.size,
              markerShape: ele.marker.symbol ? ele.marker.symbol : "circle",
              markerColor: ele.marker.color,
            });
          }
        });
    }
  }, []);

  useEffect(() => {
    if (postChartData.data) {
      const newArr = JSON.parse(JSON.stringify(postChartData));
      newArr.data[0] &&
        newArr.data[0].data &&
        newArr.data[0].data.forEach((ele) => {
          if (ele.name === "Violations" && ele.mode === "markers") {
            setChartDataMarkers({
              ...chartDataMarkers,
              violationMarkerSize: ele.marker.size,
              violationMarkerShape: ele.marker.symbol
                ? ele.marker.symbol
                : "circle",
              violationMarkerColor: ele.marker.color,
            });
          }
        });
    }
  }, [postChartData]);

  useEffect(() => {
    if (postChartData.data) {
      const newArr = [...postChartData.data];
      newArr[0].layout = JSON.parse(JSON.stringify(layoutData));
      const orientation = newArr[0].layout.legend.orientation;
      newArr[0].layout.legend.orientation =
        orientation === "Vertical" ? "v" : "h";
      setPostChartData({ ...postChartData, data: newArr });
    }
  }, [layoutData]);

  return (
    <div className="display-section">
      <Collapse expandIconPosition="right" ghost accordion>
        {/* Figure */}
        <Panel
          header="Figure"
          key="1"
          style={{ background: "#fff !important" }}
        >
          <div className="figure-container">
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Height </label>
              </Col>
              <Col span={16}>
                <InputField
                  name="height"
                  value={layoutData?.height}
                  onChangeInput={(e) =>
                    setLayoutData({ ...layoutData, height: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Width </label>
              </Col>
              <Col span={16}>
                <InputField
                  name="width"
                  value={layoutData?.width}
                  onChangeInput={(e) =>
                    setLayoutData({ ...layoutData, width: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Plot color </label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.plot_bgcolor}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      plot_bgcolor: e.target.value,
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Sigma Lines </label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={sigmaLines}
                  onChange={(e) => onSigmaLineChange(e)}
                />
              </Col>
            </Row>
            <div className="figure-inputs header">Marker</div>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Shape</label>
              </Col>
              <Col span={16}>
                <SelectField
                  selectList={symbolList}
                  onChangeSelect={(e) => handleMarkerChange(e, "markerShape")}
                  selectedValue={chartDataMarkers.markerShape}
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={chartDataMarkers.markerColor}
                  onChange={(e) => handleMarkerColorChange(e, "markerColor")}
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Size</label>
              </Col>
              <Col span={16}>
                <InputField
                  value={chartDataMarkers.markerSize}
                  name="markerSize"
                  onChangeInput={(e) => handleMarkerSizeChange(e, "markerSize")}
                />
              </Col>
            </Row>
            {postChartData &&
              postChartData.data &&
              postChartData.data[0] &&
              postChartData.data[0].violations &&
              postChartData.data[0].violations.length > 1 && (
                <>
                  <div className="figure-inputs header">Violations</div>
                  <Row className="figure-inputs select-top" gutter={16}>
                    <Col span={8}>
                      <label>Shape</label>
                    </Col>
                    <Col span={16}>
                      <SelectField
                        selectList={symbolList}
                        onChangeSelect={(e) =>
                          handleMarkerChange(e, "violationShape")
                        }
                        selectedValue={chartDataMarkers.violationMarkerShape}
                      />
                    </Col>
                  </Row>
                  <Row className="figure-inputs select-top" gutter={16}>
                    <Col span={8}>
                      <label>Color</label>
                    </Col>
                    <Col span={16}>
                      <ColorPicker
                        value={chartDataMarkers.violationMarkerColor}
                        onChange={(e) =>
                          handleMarkerColorChange(e, "violationMarkerColor")
                        }
                      />
                    </Col>
                  </Row>
                  <Row className="figure-inputs select-top" gutter={16}>
                    <Col span={8}>
                      <label>Size</label>
                    </Col>
                    <Col span={16}>
                      <InputField
                        value={chartDataMarkers.violationMarkerSize}
                        name="markerSize"
                        onChangeInput={(e) =>
                          handleMarkerSizeChange(e, "violationMarkerSize")
                        }
                      />
                    </Col>
                  </Row>
                </>
              )}
            <div className="figure-inputs header">Panel Options</div>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title </label>
              </Col>
              <Col span={16}>
                <InputField
                  value={layoutData?.title?.text}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      title: { ...layoutData.title, text: e.target.value },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Font size </label>
              </Col>
              <Col span={16}>
                <InputField
                  value={layoutData?.title?.font?.size}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      title: {
                        ...layoutData.title,
                        font: {
                          ...layoutData.title.font,
                          size: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Font color </label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.title?.font?.color}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      title: {
                        ...layoutData.title,
                        font: {
                          ...layoutData.title.font,
                          color: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
          </div>
        </Panel>

        {/* Legend */}
        <Panel header="Legend" key="2">
          <div className="figure-container">
            <div className="header option-header">Options</div>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.showlegend}
                  onChange={(e) =>
                    setLayoutData({ ...layoutData, showlegend: e })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <InputField
                  value={layoutData?.legend?.title?.text}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      legend: {
                        ...layoutData.legend,
                        title: {
                          ...layoutData.legend.title,
                          text: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Legend size</label>
              </Col>
              <Col span={16}>
                <InputField
                  value={layoutData?.legend?.title?.font?.size}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      legend: {
                        ...layoutData.legend,
                        title: {
                          ...layoutData.legend.title,
                          font: {
                            ...layoutData.legend.title.font,
                            size: e.target.value,
                          },
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Legend color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.legend?.title?.font?.color}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      legend: {
                        ...layoutData.legend,
                        title: {
                          ...layoutData.legend.title,
                          font: {
                            ...layoutData.legend.title.font,
                            color: e.target.value,
                          },
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Border width</label>
              </Col>
              <Col span={16}>
                <InputField
                  value={layoutData?.legend?.borderwidth}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      legend: {
                        ...layoutData.legend,
                        borderwidth: e.target.value,
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Border color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.legend?.bordercolor}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      legend: {
                        ...layoutData.legend,
                        bordercolor: e.target.value,
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Background color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.legend?.bgcolor}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      legend: { ...layoutData.legend, bgcolor: e.target.value },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Orientation</label>
              </Col>
              <Col span={16}>
                <SelectField
                  selectedValue={layoutData?.legend?.orientation}
                  selectList={orientationList}
                  onChangeSelect={(e) =>
                    setLayoutData({
                      ...layoutData,
                      legend: { ...layoutData.legend, orientation: e },
                    })
                  }
                />
              </Col>
            </Row>
          </div>
        </Panel>
        {/* Axes */}
        <Panel header="Axes" key="3">
          <div className="figure-container">
            <div className="header option-header">X-Axis</div>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.xaxis?.visible}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: { ...layoutData.xaxis, visible: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show tick labels</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.xaxis?.showticklabels}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: { ...layoutData.xaxis, showticklabels: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show line</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.xaxis?.showline}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: { ...layoutData.xaxis, showline: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show grid</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.xaxis?.showgrid}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: { ...layoutData.xaxis, showgrid: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <InputField
                  value={layoutData?.xaxis?.title?.text}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: {
                        ...layoutData.xaxis,
                        title: {
                          ...layoutData.xaxis.title,
                          text: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title size</label>
              </Col>
              <Col span={16}>
                <InputField
                  value={layoutData?.xaxis?.title?.font?.size}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: {
                        ...layoutData.xaxis,
                        title: {
                          ...layoutData.xaxis.title,
                          font: {
                            ...layoutData.xaxis.title.font,
                            size: e.target.value,
                          },
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.xaxis?.title?.font?.color}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: {
                        ...layoutData.xaxis,
                        title: {
                          ...layoutData.xaxis.title,
                          font: {
                            ...layoutData.xaxis.title.font,
                            color: e.target.value,
                          },
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Grid color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.xaxis?.gridcolor}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      xaxis: { ...layoutData.xaxis, gridcolor: e.target.value },
                    })
                  }
                />
              </Col>
            </Row>
            <div className="header">Y-Axis</div>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.yaxis?.visible}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: { ...layoutData.yaxis, visible: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show tick labels</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.yaxis?.showticklabels}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: { ...layoutData.yaxis, showticklabels: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show line</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.yaxis?.showline}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: { ...layoutData.yaxis, showline: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Show grid</label>
              </Col>
              <Col span={16}>
                <Switch
                  size="small"
                  checked={layoutData?.yaxis?.showgrid}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: { ...layoutData.yaxis, showgrid: e },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs" gutter={16}>
              <Col span={8}>
                <label>Title</label>
              </Col>
              <Col className="gutter-row select-top" span={16}>
                <InputField
                  value={layoutData?.yaxis?.title?.text}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: {
                        ...layoutData.yaxis,
                        title: {
                          ...layoutData.yaxis.title,
                          text: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title size</label>
              </Col>
              <Col span={16}>
                <InputField
                  value={layoutData?.yaxis?.title?.font?.size}
                  onChangeInput={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: {
                        ...layoutData.yaxis,
                        title: {
                          ...layoutData.yaxis.title,
                          font: {
                            ...layoutData.yaxis.title.font,
                            size: e.target.value,
                          },
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Title color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.yaxis?.title?.font?.color}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: {
                        ...layoutData.yaxis,
                        title: {
                          ...layoutData.yaxis.title,
                          font: {
                            ...layoutData.yaxis.title.font,
                            color: e.target.value,
                          },
                        },
                      },
                    })
                  }
                />
              </Col>
            </Row>
            <Row className="figure-inputs select-top" gutter={16}>
              <Col span={8}>
                <label>Grid color</label>
              </Col>
              <Col span={16}>
                <ColorPicker
                  value={layoutData?.yaxis?.gridcolor}
                  onChange={(e) =>
                    setLayoutData({
                      ...layoutData,
                      yaxis: { ...layoutData.yaxis, gridcolor: e.target.value },
                    })
                  }
                />
              </Col>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default Display;
