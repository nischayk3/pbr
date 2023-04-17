import { PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, Col, Row, Select, Collapse } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ModalComponent from "../../../../../../components/Modal/Modal";
import SelectField from "../../../../../../components/SelectField/SelectField";
import { hideLoader, showLoader, showNotification } from "../../../../../../duck/actions/commonActions";
import { getHyperParameters } from "../../../../../../services/analyticsService";
import HyperParameterTable from "./HyperParameterTable";
import urlJson from './urls.json';

const { Option } = Select;
const { Panel } = Collapse


const Estimator = (props) => {
	const {
		estimatorPopupData,
		setEstimatorPopupDataValues,
		estimatorPopupDataValues,
		onCreateClick,
		savedEstimatorPopupDataValues,
		setSavedEstimatorPopupDataValues,
		finalModelJson,
		setFinalModelJson,
		target_category
	} = props;

	const dispatch = useDispatch();
	const [hyperParameters, setHyperParameters] = useState([]);
	const [showParameter, setShowParameter] = useState(false);
	const [contextMenuVisible, setContextMenuVisible] = useState(false)
	const [x, setX] = useState(0)
	const [y, setY] = useState(0)
	const [url, setUrl] = useState('')
	const [algorithm, setAlgorithm] = useState('')
	const [algosListData, setAlgosListData] = useState([]);
	const [metricListData, setMetricListData] = useState([]);

	let columns = [];
	const objkeys = (hyperParameters !== undefined && hyperParameters?.length > 0)
		? Object.keys(hyperParameters[0])
		: [];
	const uniqueArr = (value, index, self) => {
		return self.indexOf(value) === index;
	};
	const filterColumn = objkeys.filter(uniqueArr);
	filterColumn.forEach((item, i) => {
		if (item !== 'customValue') {
			if (item !== 'key') {
				columns.push({
					title: item.toUpperCase().replace("_", " "),
					dataIndex: item,
					key: `${item}-${i}`,
					render: (text) => String(text),
				});
			}
		}
	});

	const filterCustomValue = (custom_array) => {
		let newObj = {}
		custom_array?.forEach((ele) => {
			ele.parameter = ele?.parameter?.replace(" ", '')
			if (ele.customValue) {
				if (ele.valid_value === 'Integer') {
					ele.customValue = ele?.customValue?.split(',')
					ele.customValue = ele?.customValue.map(Number)
				} else if (ele.valid_value.includes('True')) {
					ele.customValue = [true]
				} else if (ele.valid_value.includes('False')) {
					ele.customValue = [false]
				} else if (ele.valid_value.includes('Float')) {
					ele.customValue = ele?.customValue?.split(',')
					ele.customValue = ele.customValue.map(Number)
				} else {
					// ele.customValue = ele?.customValue?.split(',')
					ele.customValue = ele?.customValue
				}
				newObj[ele.parameter] = ele?.customValue
			}
		})

		return newObj
	}

	const onClickSave = () => {

		let estimator_obj = {}

		estimatorPopupDataValues.algoValue.map((i, idx) => {
			estimator_obj[`e__${idx}`] = {
				estimator_type: estimatorPopupDataValues.typeListValue,
				hyperparamters: estimatorPopupDataValues.enableGrid && estimatorPopupDataValues?.hyperparameters[i] ? filterCustomValue(estimatorPopupDataValues.hyperparameters[i]) : {},
				model_name: `e_${i.toLowerCase()}`
			}
		})

		const tempObj = JSON.parse(JSON.stringify(finalModelJson));
		const metricsTemp = {
			metric_name: estimatorPopupDataValues.regressionListvalue
		}
		setFinalModelJson({ ...finalModelJson, estimator: estimator_obj, metrics: metricsTemp, hyperParams: estimatorPopupDataValues.enableGrid ? estimatorPopupDataValues.hyperparameters : undefined });
		setSavedEstimatorPopupDataValues({
			...savedEstimatorPopupDataValues,
			typeListValue: estimatorPopupDataValues.typeListValue,
			regressionListvalue: estimatorPopupDataValues.regressionListvalue,
			algoValue: estimatorPopupDataValues.algoValue,
		});
		onCreateClick();
	};

	const onTypeChange = (e) => {
		setEstimatorPopupDataValues({
			...estimatorPopupDataValues,
			typeListValue: e,
			algoValue: '',
			enableGrid: false,
			regressionListvalue: []
		})
		setHyperParameters([]);
		setFinalModelJson({ ...finalModelJson, hyperParams: undefined });
	}

	const onAlgoChange = (e) => {
		setEstimatorPopupDataValues({
			...estimatorPopupDataValues,
			algoValue: e,
			enableGrid: false,
			regressionListvalue: []
		})
		setHyperParameters([]);
		setFinalModelJson({ ...finalModelJson, hyperParams: undefined });
	}

	const getAlgoList = (e) => {
		let tempList = JSON.parse(JSON.stringify(estimatorPopupData?.algoList));
		tempList = tempList.filter((ele) => ele?.estimator_type === e)
		setAlgosListData(tempList)
	}

	const getMetricList = (e) => {
		let resArr = [];
		estimatorPopupData?.regressionList.filter(function (item) {
			let i = resArr.findIndex((x) => x.display_name === item.display_name);
			if (i === -1) {
				resArr.push(item);
			}
			return null;
		});
		let target = '';
		if (target_category === "numerical") {
			target = 'regression';
		} else {
			target = 'classification';
		}
		if (e === 'cross_decomposition') {
			resArr = resArr.filter((ele) => ele.type === 'regression')
		} else if (e === 'decomposition') {
			resArr = resArr.filter((ele) => ele.type === target)
		} else {
			resArr = resArr.filter((ele) => ele.type === e)
		}
		setMetricListData(resArr)
	}

	useEffect(() => {
		getAlgoList(estimatorPopupDataValues.typeListValue)
		getMetricList(estimatorPopupDataValues.typeListValue)
	}, [estimatorPopupDataValues.typeListValue])

	const handleClose = useCallback(() => (contextMenuVisible ? setContextMenuVisible(false) : null), [contextMenuVisible]);

	useEffect(() => {
		document.addEventListener("click", handleClose);
		return () => {
			document.removeEventListener("click", handleClose);
		};
	});

	const handleOk = () => {
		setShowParameter(false)
	}

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

	const getHyperParameter = async (algo) => {
		let moduleName = '';
		algosListData.map((ele) => {
			if (ele.submodule === algo) {
				moduleName = ele.module
			}
		})
		const reqBody = {
			module: moduleName,
			submodule: algo
		}
		dispatch(showLoader());
		const apiResponse = await getHyperParameters(reqBody)
		if (apiResponse?.Status === 200) {
			setShowParameter(true)
			let hyperparameter_data = { ...estimatorPopupDataValues }

			apiResponse.data.forEach((ele, index) => {
				ele.key = index + 1;
				ele.customValue = '';
			})
			hyperparameter_data.hyperparameters[algo] = apiResponse.data
			setHyperParameters(apiResponse.data)
			dispatch(hideLoader());
		} else {
			dispatch(hideLoader());
			dispatch(showNotification('error', 'Unable to get hyperparameter data'));
		}
	}

	const handleCheckboxChange = (e) => {
		if (e.target.checked === true) {
			if (!finalModelJson?.hyperParams) {
				// getHyperParameter();
			}
		}
		setEstimatorPopupDataValues({
			...estimatorPopupDataValues,
			enableGrid: e.target.checked,
		})
	}

	useEffect(() => {
		if (finalModelJson?.hyperParams) {
			setHyperParameters(finalModelJson?.hyperParams)
			setEstimatorPopupDataValues({
				...estimatorPopupDataValues,
				enableGrid: true,
			})
		}
	}, [finalModelJson])

	const onChange = (key) => {
		let algo_value = estimatorPopupDataValues.algoValue[key[key.length - 1]]
		if (key.length > 0) {
			if (estimatorPopupDataValues.hyperparameters && estimatorPopupDataValues.hyperparameters.hasOwnProperty(algo_value)) {
				algo_value = algo_value
			}
			else {
				getHyperParameter(algo_value);
			}
		}
	}
	return (
		<>
			{
				contextMenuVisible ? <div className="context-menu" style={style} >
					<span onClick={() => window.open(url)}><center>About {algorithm}</center></span>
				</div> : <></>
			}
			<div className="drawer-head">
				<h3>Estimator</h3>
			</div>
			<div className="estimator-details">
				<SelectField
					label="Model type"
					selectList={estimatorPopupData.typeList}
					selectedValue={estimatorPopupDataValues.typeListValue}
					onChangeSelect={(e) =>
						onTypeChange(e)
					}
				/>
				<p style={{ marginBottom: '0px' }}>Algorithms</p>
				<Select mode="multiple" value={estimatorPopupDataValues.algoValue} disabled={!estimatorPopupDataValues.typeListValue}
					onChange={(e) => onAlgoChange(e)} style={{ width: "100%" }}>
					{algosListData?.length && algosListData?.map((ele) => {
						return <Option value={ele.submodule} onContextMenu={handleClick}>{ele.display_name}</Option>
					})}
				</Select>
				<Row gutter={24} className="metrics">
					<Col span={24}>
						<p style={{ marginBottom: '0px' }}>Metrics</p>
						<Select mode="multiple" value={estimatorPopupDataValues.regressionListvalue} disabled={!estimatorPopupDataValues.algoValue} onChange={(e) => {
							setEstimatorPopupDataValues({
								...estimatorPopupDataValues,
								regressionListvalue: e,
							})
						}} style={{ width: "100%" }}>
							{metricListData.length && metricListData.map((ele) => {
								return <Option value={ele.metric_name} onContextMenu={handleClick} disabled={ele.disabled}>{ele.display_name}</Option>
							})}
						</Select>
					</Col>
				</Row>
				<Row style={{ marginTop: '10px', marginBottom: '10px' }}>
					<Col span={12}>
						<Checkbox
							checked={estimatorPopupDataValues.enableGrid}
							onChange={(e) => handleCheckboxChange(e)}
							disabled={!estimatorPopupDataValues.algoValue}
						>
							Enable grid search
						</Checkbox>
					</Col>
					{/* {estimatorPopupDataValues.enableGrid && hyperParameters.length && <Col span={12}>
						<Button onClick={() => setShowParameter(true)}>Edit Hyperparameters</Button>
					</Col>} */}
					{estimatorPopupDataValues.enableGrid && <Col span={12}>
						<Button onClick={() => setShowParameter(true)}>Edit Hyperparameters</Button>
					</Col>}
				</Row>

				<div className="button-save">
					<Button id='save_changes' onClick={onClickSave}>Save Changes</Button>
					{/* <Button disabled>
						<PlusOutlined /> Add another estimator
					</Button> */}
				</div>
			</div>
			<ModalComponent
				title="Edit Hyperparameters"
				isModalVisible={showParameter}
				closable={true}
				handleCancel={() => setShowParameter(false)}
				width={900}
				footer={[
					<Button
						style={{
							backgroundColor: "#093185",
							color: "white",
							borderRadius: "4px",
						}}
						onClick={() => handleOk()}
					>
						Submit
					</Button>,
				]}
			>

				<Collapse onChange={onChange} ghost={true}>
					{estimatorPopupDataValues && estimatorPopupDataValues?.algoValue?.length > 0 && estimatorPopupDataValues.algoValue.map((i, idx) => (
						<Panel header={i} key={idx} >
							<HyperParameterTable columns={columns} dataSource={estimatorPopupDataValues.hyperparameters[i]} setDataSource={setHyperParameters} estimatorPopupDataValues={estimatorPopupDataValues} setEstimatorPopupDataValues={setEstimatorPopupDataValues} algo={i} />
						</Panel>
					))}
				</Collapse>

			</ModalComponent >
		</>
	);
};

export default Estimator;
