/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @version 1
 * @Last Modified - 14 March, 2022
 */

import * as d3 from "d3";
import * as _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";

import {
	CloseOutlined,
	EyeOutlined,
	MinusOutlined,
	PlusOutlined,
	SearchOutlined, StarFilled, WarningOutlined
} from "@ant-design/icons";
import { Button, Select } from "antd";
import batchIcon from "../../../../../assets/images/material.png";
import processOrderIcon from "../../../../../assets/images/processorder.png";
import { MDH_APP_PYTHON_SERVICE } from "../../../../../constants/apiBaseUrl";
import "./style.scss";

function TreePlot(props) {
	const treeDiv = useRef();
	const backwardTreeDiv = useRef();
	const forwardTreeDiv = useRef();
	const [isMaterialLink, setisMaterialLink] = useState("");
	const [searchOptions, setsearchOptions] = useState([]);
	const [searchValue, setsearchValue] = useState("");
	const [selectedNodeId, setselectedNodeId] = useState("");
	const [popVisible, setPopVisible] = useState(false);
	const [nodeData, setNodeData] = useState({});
	const [isGoldenBatch, setIsGoldenBatch] = useState();


	useEffect(() => {
		setisMaterialLink("#08C6FF");
		drawChart(_.cloneDeep(props.data));
		handleSearchClick(_.cloneDeep(props.data));
	}, []);

	const handleSearchClick = (searchData) => {
		let chartDataRes = [searchData];
		let arrMat = [];
		let arrBatch = [];
		let arrMatDes = [];
		let material = [];
		let batch = [];
		let materialDisc = [];
		let pushMaterial = (item) => {
			if (item.matNo.length > 0) {
				material.push({
					value: item.matNo,
					nodeId: item.id,
				});
				batch.push({
					value: item.batchNo,
					nodeId: item.id,
				});
				materialDisc.push({
					value: item.matDesc,
					nodeId: item.id,
				});
			}
		};
		let loopChildrenMat = (item) => {
			item.forEach((i) => {
				if (i.matNo) {
					arrMat.push({
						value: i.matNo,
						nodeId: i.id,
					});
				}
				if (i.children) {
					loopChildrenMat(i.children);
				}
			});
		};
		let loopChildrenBatch = (item) => {
			item.forEach((i) => {
				if (i.batchNo) {
					arrBatch.push({
						value: i.batchNo,
						nodeId: i.id,
					});
				}
				if (i.children) {
					loopChildrenBatch(i.children);
				}
			});
		};
		let loopChildrenMatDes = (item) => {
			item.forEach((i) => {
				if (i.matDesc) {
					arrMatDes.push({
						value: i.matDesc,
						nodeId: i.id,
					});
				}
				if (i.children) {
					loopChildrenMatDes(i.children);
				}
			});
		};

		chartDataRes &&
			chartDataRes.forEach((item) => {
				if (
					item.matNo.length &&
					item.batchNo.length &&
					item.matDesc.length &&
					item.mat_type.length
				) {
					pushMaterial(item);
				}
				if (item.children) {
					loopChildrenMat(item.children);
					loopChildrenBatch(item.children);
					loopChildrenMatDes(item.children);
				}
			});
		const mergeArray = [
			...material,
			...arrMat,
			...materialDisc,
			...arrMatDes,
			...batch,
			...arrBatch,
			// ...purOrder,
			// ...arrPurAdd,
		];
		setsearchOptions(mergeArray);
	};

	const onSearchParam = (text) => {
		console.log(text);
	};

	/* istanbul ignore next */
	const onChangeParam = (value) => {
		if (value !== null && value !== undefined) {
			let splitvalue = value.split("---");
			let splitedvalue = splitvalue[1];
			setselectedNodeId(splitedvalue);
			setsearchValue(splitvalue[0]);
		} else if (value === null && value === undefined) {
			let diagramLayoutBack = d3.select("#backwardDiv");
			let linkSvgBack = diagramLayoutBack.selectAll(".link");
			linkSvgBack.style("stroke", isMaterialLink).style("stroke-width", "4");
		}
	};

	/* istanbul ignore next */
	const handleTreeSearch = () => {
		let svgNodeClass = document.querySelectorAll(".node");
		for (let i = 0; i < svgNodeClass.length; i++) {
			const element = svgNodeClass[i].children;
			element[0].setAttribute("r", "10");
		}
		if (props.chartType === "backward") {
			let diagramLayout = d3.select("#treeviewidbackward");
			let linkSvg = diagramLayout.selectAll(".link");
			let linkNotMatchValue = diagramLayout.selectAll(".value-match");
			let linkSvg1 = diagramLayout.select("g");

			linkNotMatchValue.attr("class", "link").style("stroke", isMaterialLink);
			linkSvg1
				.attr("transform", "translate(" + -300 + "," + 20 + ")scale(1,1)")
				.attr("align", "center");
			linkSvg.style("stroke", isMaterialLink).style("stroke-width", "4");
			let linkSearchMatch = linkSvg.filter(function (d) {
				return d.source.id === selectedNodeId || d.target.id === selectedNodeId;
			});

			linkSearchMatch.attr("class", "value-match");
			let linkMatch = diagramLayout.selectAll(".link");
			let linkMatchValue = diagramLayout.selectAll(".value-match");
			let parentLink = diagramLayout.selectAll(".additionalParentLink");
			linkMatch.style("stroke", "#ddd");
			parentLink.style("stroke", "#ddd");

			let highlightPathBackward = function (d, displayColor) {
				linkMatch
					.filter(function (e) {
						if (d && d !== null) {
							while (e.target === d) {
								highlightPathBackward(e.source, displayColor);
								return d !== null ? true : false;
							}
						}
					})
					.transition(0)
					.duration(300)
					.attr("class", "value-match")
					.style("stroke", isMaterialLink);
			};

			linkMatchValue.style("stroke", function (d) {
				highlightPathBackward(d.source, isMaterialLink);
			});
		} else if (props.chartType === "forward") {
			let diagramForward = d3.select("#treeviewidforward");
			let linkSvgFor = diagramForward.selectAll(".link");
			let linkNotMatchValueFor = diagramForward.selectAll(".value-match");
			let linkSvg1For = diagramForward.select("g");

			linkNotMatchValueFor
				.attr("class", "link")
				.style("stroke", isMaterialLink);
			linkSvg1For
				.attr("transform", "translate(" + 90 + "," + 20 + ")scale(1,1)")
				.attr("align", "center");
			linkSvgFor.style("stroke", isMaterialLink).style("stroke-width", "4");
			let linkSearchMatchFor = linkSvgFor.filter(function (d) {
				return d.source.id === selectedNodeId || d.target.id === selectedNodeId;
			});
			linkSearchMatchFor.attr("class", "value-match");
			let linkMatchFor = diagramForward.selectAll(".link");
			let linkMatchValueFor = diagramForward.selectAll(".value-match");
			let parentLinkFor = diagramForward.selectAll(".additionalParentLink");
			linkMatchFor.style("stroke", "#ddd");
			parentLinkFor.style("stroke", "#ddd");
			let highlightPathForward = function (d, displayColor) {
				linkSvgFor
					.filter(function (e) {
						if (d && d !== null) {
							while (e.source === d) {
								highlightPathForward(e.target, displayColor);
								return d !== null ? true : false;
							}
						}
					})
					.transition(0)
					.duration(300)
					.attr("class", "value-match")
					.style("stroke", isMaterialLink);
			};
			linkMatchValueFor.style("stroke", function (d) {
				highlightPathForward(d.source, isMaterialLink);
			});
		}
	};

	/* istanbul ignore next */
	const handleClearSearch = () => {
		setsearchValue("");
		if (props.chartType === "backward") {
			let diagramLayoutBack = d3.select("#backwardDiv");
			let linkSvgBackword = diagramLayoutBack.selectAll(".link");
			let linkValMatchBack = diagramLayoutBack.selectAll(".value-match");
			let parentLinkBack = diagramLayoutBack.selectAll(".additionalParentLink");
			parentLinkBack.style("stroke", isMaterialLink);
			linkValMatchBack.style("stroke", isMaterialLink);
			linkSvgBackword.style("stroke", isMaterialLink);
		} else if (props.chartType === "forward") {
			let diagramLayoutFor = d3.select("#forwardDiv");
			let linkSvgFor = diagramLayoutFor.selectAll(".link");
			let linkValMatchFor = diagramLayoutFor.selectAll(".value-match");
			let parentLinkFor = diagramLayoutFor.selectAll(".additionalParentLink");
			linkSvgFor.style("stroke", isMaterialLink);
			linkValMatchFor.style("stroke", isMaterialLink);
			parentLinkFor.style("stroke", isMaterialLink);
		}
	};

	/**	 * Checks if the element is an empty object or array
	 */
	function checkForEmpty(el) {
		return (
			(_.isPlainObject(el) && _.isEmpty(el)) ||
			(_.isArray(el) && el.length === 0)
		);
	}

	/**
	 * Walk through an object or array and remove duplicate elements where the 'id' key is duplicated
	 * Depends on a seenIds object (using it as a set)
	 */
	function processData(el, seenIds) {
		// If the element is an array...
		if (el) {
			if (_.isArray(el)) {
				for (var i = 0; i < el.length; i++) {
					var value = el[i];
					value && processData(value, seenIds);
					// If the child is now empty, remove it from the array
					if (!value.id) {
						el.splice(i, 1);
						i--; // Fix index after splicing (http://stackoverflow.com/a/9882349/1370556)
					}
				}
			}
			// If the element is an object...
			else if (_.isPlainObject(el)) {
				for (var key in el) {
					if (key !== "relationshipMap") {
						// Make sure the key is not part of the prototype chain

						if (Object.hasOwn(el, key)) {
							var value1 = el[key];
							if (key === "id") {
								// If the key has been seen, remove it
								if (seenIds[value1]) {
									delete el[key];
									continue; // Skip further processing
								} else seenIds[value1] = true;
							}
							value1 && processData(value1, seenIds);
							// If the child is now empty, remove it from the object
							if (checkForEmpty(value1)) delete el[key];
						}
					}
				}
			}
			return el;
		}
	}

	function findDuplicates(arr) {
		let sorted_arr = arr.slice().sort();

		let results = {};
		for (let i = 0; i <= sorted_arr.length - 1; i++) {
			if (!results[sorted_arr[i]]) results[sorted_arr[i]] = [];
		}
		return results;
	}

	const getDynamicHeight = function (levelWidth) {
		for (var levelKey in levelWidth) {
			var newArr = [];
			for (var i = 0; i < levelWidth[levelKey].length; i++) {
				newArr = newArr.concat(levelWidth[levelKey][i]);
			}
			newArr = newArr.filter(function (item, pos) {
				return newArr.indexOf(item) === pos;
			});
			levelWidth[levelKey] = newArr.length;
		}
		return d3.max(Object.values(levelWidth));
	};

	const removeDuplicateId = function (obj, duplicates) {
		var levelWidth = {};
		var getIds = function (d, parent) {
			if (duplicates[d.id] && duplicates[d.id].indexOf(parent) === -1)
				duplicates[d.id].push(parent);
			if (d.children && d.children.length > 0) {
				if (levelWidth[d.level] === undefined) levelWidth[d.level] = [];
				levelWidth[d.level].push(
					d.children.map(function (ob) {
						return ob.id;
					})
				);
				for (var i = 0; i < d.children.length; i++) {
					getIds(d.children[i], d.id); //matDesc
				}
			}
		};
		getIds(obj, 0);

		return {
			duplicates: duplicates,
			levelWidth: levelWidth,
		};
	};

	const getDuplicateIds = function (obj) {
		var ids = [];
		var getIds = function (d) {
			ids.push(d.id);
			if (d.children && d.children.length > 0) {
				for (var i = 0; i < d.children.length; i++) {
					getIds(d.children[i]); //matDesc
				}
			}
		};
		getIds(obj);
		return ids;
	};

	//draw tree
	const drawChart = (chartData) => {
		let hasDuplicateId = getDuplicateIds(chartData);
		let getUniqueId = findDuplicates(hasDuplicateId);
		let hasDuplicateObj = removeDuplicateId(chartData, getUniqueId);

		let multiParent = hasDuplicateObj.duplicates;

		let dynamicHeight = getDynamicHeight(hasDuplicateObj.levelWidth);

		let linkArray = [];
		let isBackward = props.Backward;
		let isForward = props.Forward;
		let firstNode = props.firstNode && props.firstNode.trim();

		chartData = processData(chartData, {});

		d3.select("#backwardDiv").html("");

		let forwardNode = forwardTreeDiv.current;
		let backwardNode = backwardTreeDiv.current;

		var TreeViewObject = function (type) {
			var THIS = this;
			THIS.type = type;

			var graphHeight = dynamicHeight * 25;

			var nodeDepth = 240;

			window.scroll({
				top: 0,
				left: 0,
				behavior: "smooth",
			});
			var margin = [20, 20, 20, 20];
			var width = window.innerWidth - margin[1] - margin[3];
			var height =
				graphHeight <= 500
					? 600
					: graphHeight > 3000
						? graphHeight - 1000
						: graphHeight - margin[0] - margin[2];
			var i = 0;
			// graphHeight - margin[0] - margin[2]
			THIS.tree = d3.layout.tree().size([height, width]);

			var diagonal = d3.svg.diagonal().projection(function (d) {
				return [d.y, d.x];
			});

			var toolTip = d3.select("#gbttooltip");
			var popupDiv = d3.select("#popup");

			var onclickWidget = d3.select(document.getElementById("gbtonclick"));

			onclickWidget
				.on("mouseover", function (d) {
					onclickWidget.transition().duration(200).style("opacity", "1");
				})
				.on("mouseout", function (d) {
					onclickWidget
						.transition() // declare the transition properties to
						.duration(0) // it shall take 500ms
						.style("opacity", "0")
						.style("left", "0")
						.style("top", "1750px"); // and go all the way to an opacity of nil
				});

			this.drawTree = function (json) {
				if (json && json.isException) {
					return;
				}

				let node = this.type === "forward" ? forwardNode : backwardNode;
				THIS.vis = d3
					.select(node)
					.attr("align", "center")
					.append("svg:svg")
					.attr({
						id: "treeviewid" + THIS.type,
					})
					.attr("width", width + margin[1] + margin[3])
					.attr("height", height)

					.append("svg:g")
					.attr("transform", function () {
						if (graphHeight > 2000) return "translate(530,100)scale(0.5,0.5)";
						if (graphHeight < 500) return "translate(100,20)scale(0.6,0.6)";
						if (graphHeight > 500 && graphHeight < 1000)
							return "translate(400,100)scale(0.6,0.6)";
						if (graphHeight > 1000 && graphHeight < 1500)
							return "translate(450,100)scale(0.5,0.5)";
					})

					.attr("transform", "translate(180,20)scale(0.6,0.6)")
					.attr("class", "viewport");

				d3.select("#results,#loading").html("");
				THIS.root = json;
				THIS.root.x0 = height / 2;
				THIS.root.y0 = width;

				d3.select("#wid-id-3, #wid-id-5, #wid-id-6").attr("hide", null);
				/**
				 * Tree Zoom layout
				 */
				var treeZoom = function (id) {
					d3.select("#" + id).call(
						d3.behavior.zoom().scaleExtent([0, 2000]).on("zoom", zoom)
					);
					d3.select("#" + id)
						.on("mousedown", function () {
							d3.select("#" + id).attr("class", "grabbableactive");
						})
						.on("mouseup", function () {
							d3.select("#" + id).attr("class", "grabbable");
						})
						.attr("class", "grabbable");
				};
				//zoom
				/* istanbul ignore next */
				function zoom() {
					var scale = d3.event.scale;
					var translation = d3.event.translate;
					var tbound = -height * scale;
					var bbound = height * scale;
					var lbound = (-width + margin[1]) * scale;
					var rbound = (width - margin[3]) * scale;

					// limit translation to thresholds
					translation = [
						Math.max(Math.min(translation[0], rbound), lbound),
						Math.max(Math.min(translation[1], bbound), tbound),
					];

					THIS.vis.attr(
						"transform",
						"translate(" + translation + ")" + " scale(" + scale + ")"
					);
					const zommscale = (scale * 100) / 2;
					if (zommscale !== "") {
						d3.select("#zoomscale")
							.style("box-shadow", "1px 1px 12px rgba(0, 0, 0, 0.24)")
							.html(`${Math.round(zommscale)}%`);
					}
				}

				THIS.update(THIS.root);
				/********  PAN ZOOM ***********/

				if (THIS.type === "backward") {
					treeZoom("treeviewidbackward");
				} else if (THIS.type === "forward") {
					treeZoom("treeviewidforward");
				}

				/******** END PAN ZOOM ***********/
			};

			this.update = function (source) {
				var duration = d3.event && d3.event.altKey ? 1300 : graphHeight;
				// Compute the new tree layout.
				var nodes = THIS.tree.nodes(THIS.root).reverse();

				nodes.forEach(function (d) {
					if (THIS.type === "forward") d.y = d.depth * nodeDepth;
					else d.y = width - d.depth * nodeDepth;
					d.numChildren = d.children ? d.children.length : 0;
					d.traceability = THIS.type;

					if (d.numChildren === 0 && d._children)
						d.numChildren = d._children.length;

					var mastername = "";
					var headername = d.keyName;
					if (
						d.subKeyName !== undefined &&
						d.subKeyName !== null &&
						d.subKeyName !== ""
					)
						headername += " : " + d.subKeyName;

					if (d.value !== undefined && d.value !== null && d.value !== "")
						headername += " : " + d.value;

					d.headername = headername;

					if (d.numChildren > 0) {
						var child = d.children || d._children;
						for (var j = 0; j < child.length; j++) {
							mastername = child[j].key;
						}
						if (d.mastername !== undefined)
							mastername = mastername + d.mastername;

						d.toolTipDetails = mastername;
					}
				});

				nodes.forEach(function (d) {
					var obj = d;

					while ((obj.source && obj.source.depth > 1) || obj.depth > 1) {
						obj = obj.source ? obj.source.parent : obj.parent;
					}
				});

				// Update the nodes…
				var node = THIS.vis.selectAll("g.node").data(nodes, function (d) {
					return d.id || (d.id = ++i);
				});

				// Enter any new nodes at the parent's previous position.
				var nodeEnter = node
					.enter()
					.append("svg:g")
					.attr("class", "node")
					.attr("id", function (d) {
						var nodeName = "";
						var batchName = "";
						var poName = "";
						var purchaseOrder = "";
						if (d.type === "Material") {
							batchName = d["nodeId"].split("|");
							nodeName = batchName[1];
							return "node-" + nodeName;
						} else if (d.type === "Process Order") {
							poName = d.poNo;
							return "node-" + poName;
						} else if (d.type === "Purchase Order") {
							purchaseOrder = d.pur_ord_no;
							return "node-" + purchaseOrder;
						}
					})
					.attr("transform", function (d) {
						return "translate(" + source.y0 + "," + source.x0 + ")";
					});

				nodeEnter
					.append("rect")
					.attr("dy", "-0.4em")
					.attr("x", "-27")
					.attr("y", "-20")
					.attr("rx", "20")
					.attr("width", "120")
					.attr("height", "40")
					.style("fill", function (d) {
						if (d.matNo === firstNode) {
							return "#fff";
						} else {
							return "transparent";
						}
					})
					.style("stroke", function (d) {
						if (d.matNo === firstNode) {
							return "#6C534E";
						} else {
							return "transparent";
						}
					});
				//add golden batch
				nodeEnter
					.append("rect")
					.attr("x", "-26")
					.attr("y", "-27")
					.attr("rx", "20")
					.attr("width", "120")
					.attr("height", "40")
					.attr("class", function (d) {
						if (d.golden_batch === true) {
							return "golden-star";
						} else {
							return "normal-star";
						}
					});

				// add Image In Circle
				nodeEnter
					.append("svg:image")
					.attr("dy", "-0.4em")
					.attr("x", "-11")
					.attr("y", "-11")
					.attr("height", "20")
					.attr("width", "20")

					.on("mouseover", function (d) {
						node_onMouseOver(d);
					})
					.on("mouseout", function (d) {
						toolTip
							.transition()
							.duration(500) // it shall take 500ms
							.style("opacity", "0"); // and go all the way to an opacity of nil
					})
					.on("click", function (d) {
						d3.event.preventDefault();

						handleChartClick(d);
						popupDiv.style("display", "block");
						popupDiv.style("left", d3.event.layerX + 100 + "px");

						if (d3.event.layerY > 200) {
							popupDiv.style("top", d3.event.layerY - 40 + "px");
						} else {
							popupDiv.style("top", d3.event.layerY + 20 + "px");
						}
					})
					.attr("xlink:href", function (d) {
						if (d.OpenNC === true) {
							return `${MDH_APP_PYTHON_SERVICE}/img/genealogy/non-material.png`;
						} else if (d.type === "Material") {
							return `${MDH_APP_PYTHON_SERVICE}/img/genealogy/material.png`;
						} else if (d.type === "Process Order") {
							return `${MDH_APP_PYTHON_SERVICE}/img/genealogy/processorder.png`;
						} else if (d.type === "Purchase Order") {
							return `${MDH_APP_PYTHON_SERVICE}/img/genealogy/purchaseorder.png`;
						}
					})
					.attr("id", function (d) {
						if (d.type === "Material") {
							return "material-img";
						} else {
							return "process-img";
						}
					});

				//
				nodeEnter
					.append("svg:text")
					.attr("x", function (d) {
						if (d.matNo === firstNode) {
							return d.traceability === "backward" ? 80 : 20; // 80 20
						} else {
							return d.traceability === "backward" ? 25 : -25; // 80
						}
					})

					.attr("dy", function (d) {
						if (d.matNo === firstNode) {
							return "0.35em"; //0.35em
						} else {
							return "-1.5em"; //0.35em
						}
					})
					.attr("text-anchor", function (d) {
						return d.traceability === "backward" ? "end" : "start";
					})
					.text(function (d) {
						var nodeName = "";
						var batchName = "";
						var poName = "";
						var purchaseOrder = "";
						if (d.type === "Material") {
							batchName = d["nodeId"].split("|");
							nodeName = batchName[1];
							return nodeName;
						} else if (d.type === "Process Order") {
							poName = d.poNo;
							return poName;
						} else if (d.type === "Purchase Order") {
							purchaseOrder = d.pur_ord_no;
							return purchaseOrder;
						}
					})

					.on("mouseover", function (d) {
						node_onMouseOver(d);
					})
					.on("mouseout", function (d) {
						toolTip
							.transition() // declare the transition properties to
							.duration(500) // it shall take 500ms
							.style("opacity", "0"); // and go all the way to an opacity of nil
					})

					.style("fill-opacity", "0")
					.style("fill", function (d) {
						return "#000000";
					});

				nodeEnter
					.append("svg:text")
					.attr("x", function (d) {
						return d.traceability === "backward" ? 15 : -15;
					})
					.attr("class", "expand")
					.attr("dy", "1.2em")
					.attr("text-anchor", function (d) {
						return d.traceability === "backward" ? "end" : "start";
					})
					.text(function (d) {
						var icon = "";
						if (d.children !== undefined) {
							icon = "−";
						}
						if (d.matNo === firstNode) {
							icon = "";
						}
						return icon;
					})
					.style("fill", "#000")
					.style("font-size", "16px")
					.style("font-weight", "700")
					.on("click", function (d) {
						node_onClick(d, d.id);
					});

				// Transition nodes to their new position.
				var nodeUpdate = node
					.transition()
					.duration(duration)
					.attr("transform", function (d) {
						return "translate(" + d.y + "," + d.x + ")";
					});

				nodeUpdate
					.select("circle")
					.attr("r", function (d) {
						return 10;
					})
					.style("fill", function (d) {
						return d.type === "Material" ? "#3b9ff3" : "#89AD45"; //"darkorange" : "#ffff00";
					})
					.style("stroke", function (d) {
						if (d.isFolder === false) return "#0B3B0B";
					});

				nodeUpdate.select("text").style("fill-opacity", 1);

				// Transition exiting nodes to the parent's new position.
				var nodeExit = node
					.exit()
					.transition()
					.duration(duration)
					.attr("transform", function (d) {
						return "translate(" + source.y + "," + source.x + ")";
					})
					.remove();

				nodeExit.select("circle").attr("r", 1e-10);

				nodeExit.select("text").style("fill-opacity", 1e-6);

				// Update the links…

				var link = THIS.vis
					.selectAll("path.link")
					.data(THIS.tree.links(nodes), function (d) {
						return d.target.id;
					});
				THIS.vis
					.selectAll("path.link")
					.data(THIS.tree.links(nodes), function (d) {
						linkArray.push(d);
					});
				var rootCounter = 0;
				let markerType = THIS.type == "forward" ? "marker-end" : "marker-start";
				// Enter any new links at the parent's previous position. "material","processOrder"
				link
					.enter()
					.insert("svg:path", "g")
					.attr("class", "link")
					.attr(markerType, function (d) {
						if (d.source.type == "Material") {
							return "url(#material_" + THIS.type + ")";
						} else if (d.source.type == "Process Order") {
							return "url(#processOrder_" + THIS.type + ")";
						} else if (d.source.type == "Purchase Order") {
							return "url(#purchaseOrder" + THIS.type + ")";
						}
					})
					.attr("d", function (d) {
						var o = {
							x: source.x0,
							y: source.y0,
						};
						return diagonal({
							source: o,
							target: o,
						});
					})
					.style("stroke", function (d) {
						if (isBackward) {
							if (d.source.depth === 0) {
								rootCounter++;
								if (d.source) {
									return isMaterialLink;
								} else {
									return d.source.children[rootCounter - 1].linkColor;
								}
							} else {
								if (d.target.isFolder === false) return "#0B3B0B";
								else if (d.source) {
									return isMaterialLink;
								} else {
									return d.source.children[rootCounter - 1].linkColor;
								}
							}
						}
						if (isForward) {
							if (d.source.depth === 0) {
								rootCounter++;
								if (d.source) {
									return isMaterialLink;
								} else {
									return d.source.children[rootCounter - 1].linkColor;
								}
							} else {
								if (d.target.isFolder === false) return "#0B3B0B";
								else if (d.source) {
									return isMaterialLink;
								} else {
									return d.source.children[rootCounter - 1].linkColor;
								}
							}
						}
					})
					.style("stroke-width", function (d) {
						if (d.target.isFolder === false) return 1;
						else return 2;
					})
					.on("mouseover", function (d) {
						toolTip.transition().duration(200).style("opacity", ".9");
						let material = "Not Available";
						let processOrder = "Not Available";
						let quantity =
							d.source.relationshipMap[d.source.id + "-" + d.target.id].qty
						let uom = d.source.relationshipMap[d.source.id + "-" + d.target.id].unit;
						let purchaseOrder = "";
						let pOrder = purchaseOrder == undefined ? "Not Available" : purchaseOrder;

						purchaseOrder = d.target.purchaseOrderNo || d.source.purchaseOrderNo;
						material = d.source.matNo || d.target.matNo;
						processOrder = d.target.poNo || d.source.poNo;

						let tooltipHtml =
							"<div ><span class='col-xs-1' style='padding:5px'>Product No. :  </span><span class='col-xs-1' style='padding:5px'><b>" +
							material +
							// "</b></span><br/><span class='col-xs-1' style='padding:5px'>Batch  :  </span><span class='col-xs-1' style='padding:5px'><b>" + (key[2] || "N/A") +
							"</b></span><br/><span class='col-xs-1' style='padding:5px'>Process Order :  </span><span class='col-xs-1' style='padding:5px'><b>" +
							processOrder +
							"</b></span><br/><span class='col-xs-1' style='padding:5px'>Purchase Order :  </span><span class='col-xs-1' style='padding:5px'><b>" +
							pOrder +
							"</b></span><br/><span class='col-xs-1' style='padding:5px'>Quantity  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
							quantity +
							"</b></span><br/><span class='col-xs-1' style='padding:5px'>UOM  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
							uom +
							"</b></span><br/></span></div>"
						d3.select("#keyTooltip").html(tooltipHtml);

						toolTip.style("left", d3.event.layerX + 100 + "px");

						if (d3.event.layerY > 200) {
							toolTip.style("top", d3.event.layerY - 40 + "px");
						} else {
							toolTip.style("top", d3.event.layerY + 20 + "px");
						}
					})
					.on("mouseout", function (d) {
						toolTip
							.transition()
							.duration(500) // it shall take 500ms
							.style("opacity", "0");
					})

					.style("stroke-linecap", "round")
					.transition()
					.duration(duration);

				// Transition links to their new position.
				link.transition().duration(duration).attr("d", diagonal);

				// Transition exiting nodes to the parent's new position.
				link
					.exit()
					.transition()
					.duration(duration)
					.attr("d", function (d) {
						var o = {
							x: source.x,
							y: source.y,
						};
						return diagonal({
							source: o,
							target: o,
						});
					})
					.remove();

				// Stash the old positions for transition.
				/* istanbul ignore next */
				nodes.forEach(function (d) {
					d.x0 = d.x;
					d.y0 = d.y;
				});

				// On Node Click Event
				//toggle children click
				/* istanbul ignore next */
				function node_onClick(d) {
					let lastClickD = null;
					var ids = ""
					if (d.type == "Material") {
						ids = d.matNo
					}
					if (d.type === "Process Order") {
						ids = d.poNo
					}
					if (d.type === "Purchase Order") {
						ids = d.pur_ord_no;

					}

					let nExpand = d3.select("#node-" + ids);
					if (d.children) {
						d._children = d.children;
						d.children = null;

						let nodeExpand = nExpand.selectAll(".expand");
						nodeExpand
							.text(function (a) {
								let textId = "";
								var nodeIcon = "";
								if (a.type == "Material") {
									textId = a.matNo
								}
								if (a.type === "Process Order") {
									textId = a.poNo
								}
								if (a.type === "Purchase Order") {
									textId = a.pur_ord_no;

								}
								if (textId === ids) {
									nodeIcon = "+";
								}
								return nodeIcon;
							})
							.attr("class", "collapsed")
							.style("fill", "#000")
							.style("font-size", "16px")
							.style("font-weight", "700");
						d3.selectAll(".value-match").attr("display", "none");
					} else {
						d.children = d._children;
						d._children = null;
						d3.selectAll(".value-match").attr("display", "block");
						let nodeCollappsed = nExpand.selectAll(".collapsed");
						nodeCollappsed
							.text(function (b) {
								let textId = "";
								var nodeIconC = "";
								if (b.type == "Material") {
									textId = b.matNo
								}
								if (b.type === "Process Order") {
									textId = b.poNo
								}
								if (b.type === "Purchase Order") {
									textId = b.pur_ord_no;

								}
								if (textId === ids) {
									nodeIconC = "−";
								}
								return nodeIconC;
							})
							.attr("class", "expand")
							.style("fill", "#000")
							.style("font-size", "16px")
							.style("font-weight", "700");
					}
					if (lastClickD) {
						lastClickD._isSelected = false;
					}
					d._isSelected = true;
					lastClickD = d;
					THIS.update(d);
					setTimeout(function () {
						THIS.update(d);
					}, 300)
				}

				/* istanbul ignore next */
				function node_onMouseOver(d) {
					toolTip.transition().duration(200).style("opacity", ".9");
					if (
						d.masterKey &&
						d.masterKey !== null &&
						d.masterKey !== "null" &&
						!d.mastername
					) {
						var path =
							"/EntityTracer/DRServlet?key=" +
							d.key +
							"&subKey=" +
							d.subKey +
							"&value=" +
							d.value +
							"&isFolder=" +
							d.isFolder;
						if (d.masterKey !== undefined && d.masterKey !== null) {
							path = path + "&masterKey=" + d.masterKey;
						}
						if (d.masterSubKey !== undefined && d.masterSubKey !== null) {
							path = path + "&masterSubKey=" + d.masterSubKey;
						}

						d3.json(path, function (json) {
							var validchildren = [];
							if (json !== null) {
								for (let j = 0; j < json.length; j++) {
									if (
										json[j] !== null &&
										json[j].isFolder === true &&
										json[j].isMaster !== true
									) {
										validchildren.push(json[j]);
									} else {
										var mastername = "";
										if (json[j].children && json[j].children.length > 0) {
											for (var k = 0; k < json[j].children.length; k++) {
												var childtitle = json[j].children[k].key.split(":");
												if (childtitle.length > 1) {
													mastername =
														'<div class="col-sm-4">' +
														childtitle[0] +
														" :</div>" +
														'<div class="col-sm-8 text-left">' +
														childtitle[1] +
														"</div>" +
														mastername;
												} else {
													mastername =
														'<div class="col-sm-12 text-center">' +
														json[j].children[k].key +
														"</div>" +
														mastername;
												}
											}
										}
										d.toolTipDetails = d.mastername = mastername;
									}
								}

								d._children = validchildren;
								d3.select("#keyTooltip").html(d.toolTipDetails);
							}
						});
					} else {
						var key;
						if (d.type === "Material") {
							key = d["nodeId"].split("|");
						} else if (d.type === "Purchase Order") {
							key = [d.pur_ord_no];
						} else {
							key = [d.poNo];
						}

						var materialDescription = d.matDesc || "Not available";
						var batchNo = d.batchNo || "Not available";
						var uom = "Not Available";
						var quantity = "Not Available";
						var productType = d.mat_type || "Not available";
						if (
							d.parent &&
							d.parent.relationshipMap &&
							d.parent.relationshipMap[d.parent.id + "-" + d.id]
						) {
							uom =
								d.parent.relationshipMap[d.parent.id + "-" + d.id].unit ||
								"Not available";
							quantity = d.parent.relationshipMap[d.parent.id + "-" + d.id].qty;
						}
						if (
							d.children &&
							d.relationshipMap &&
							d.relationshipMap[d.id + "-" + d.children[0].id]
						) {
							uom =
								d.relationshipMap[d.id + "-" + d.children[0].id].unit ||
								"Not available";
							quantity = d.relationshipMap[d.id + "-" + d.children[0].id].qty;
						}

						let tooltipHtml = "";
						if (d.type === "Process Order") {
							tooltipHtml =
								"<div style='padding:2px'><span class='col-xs-2'>" +
								"Process Order : </span><span class='col-xs-1 text-left'><b>" +
								key[0] +
								"</b></span></div>";
						} else if (d.type === "Material") {
							tooltipHtml =
								"<div></span><br/><span class='col-xs-1' style='padding:5px'>Product No.  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								(key[1] || "N/A") +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>Batch No.  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								batchNo +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>Product Desc  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								materialDescription +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>Product Type  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								productType +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>Quantity  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								quantity +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>UOM  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								uom +
								"</b></span><br/></span></div>";
						} else if (d.type === "Purchase Order") {
							let purchaseKeys = key[0].split(",");
							if (purchaseKeys.length > 1) {
								tooltipHtml =
									"<div><span class='col-xs-1' style='padding:5px'> Purchase Order  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
									"Multiple POs" +
									"</b></span><br/></span></div>";
							} else {
								tooltipHtml =
									"<div ><span class='col-xs-1' style='padding:5px'>" +
									"<span class='col-xs-1' style='padding:5px'>Purchase Order  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
									purchaseKeys[0] +
									"</b></span><br/></span></div>";
							}
						}
						d3.select("#keyTooltip").html(tooltipHtml);
					}

					if (d3.event.layerX <= 1000) {
						toolTip.style("left", d3.event.layerX + "px");
					} else if (d3.event.layerX > 1000 && d.type === "Material") {
						toolTip.style("left", d3.event.layerX - 400 + "px");
					} else {
						toolTip.style("left", d3.event.layerX + "px");
					}
					if (d3.event.layerY > 200 && d.type === "Material") {
						toolTip.style("top", d3.event.layerY - 150 + "px");
					} else {
						toolTip.style("top", d3.event.layerY + 20 + "px");
					}
				}
			};

			this.multiParentCoupling = (multiParents) => {
				var multiParentsArray = [];
				for (var key in multiParents) {
					multiParents[key].forEach((a) => {
						var parent = {};
						var child = {};
						parent = THIS.tree.nodes(THIS.root).filter(function (d) {
							return d["id"] === a;
						})[0];
						child = THIS.tree.nodes(THIS.root).filter(function (d) {
							return d["id"] === key;
						})[0];
						multiParentsArray.push({
							parent: parent,
							child: child,
						});
					});
				}
				var x0 = [];
				var y0 = [];

				multiParentsArray.forEach(function (val) {
					if (val.child && val.parent) {
						if (val.child.x0 && val.parent.x0)
							x0.push((val.child.x0 + val.parent.x0) / 2);
						if (val.child.y0 && val.parent.y0)
							y0.push((val.child.y0 + val.parent.y0) / 2);
					}
				});

				multiParentsArray.forEach(function (multiPair) {
					let markerType =
						THIS.type === "forward" ? "marker-start" : "marker-end";
					THIS.vis

						.append("path", "g")
						.attr(markerType, function () {
							if (multiPair.parent && multiPair.parent.type === "Material") {
								return "url(#material_" + THIS.type + "_additional" + ")";
							} else if (
								multiPair.parent &&
								multiPair.parent.type === "Process Order"
							) {
								return "url(#processOrder_" + THIS.type + "_additional" + ")";
							} else if (
								multiPair.parent &&
								multiPair.parent.type === "Purchase Order"
							) {
								return "url(#purchaseOrder" + THIS.type + "_additional" + ")";
							}
						})

						.attr("class", function () {
							if (isForward) {
								if (multiPair.parent?.poNo) {
									return "additionalParentLink";
								}
								if (multiPair.parent?.matNo) {
									return "additionalParentLink";
								}
								if (multiPair.parent?.pur_ord_no) {
									return "additionalParentLink";
								}
							}
							if (isBackward) {
								if (multiPair.parent?.poNo) {
									if (
										multiPair.child.type == "Material" &&
										multiPair.parent.type == "Process Order"
									) {
										return "additionalParentLink";
									}
								}
								if (multiPair.child?.poNo) {
									if (
										multiPair.child.type == "Process Order" &&
										multiPair.parent.type == "Material"
									) {
										return "additionalParentLink";
									}
								}
								if (multiPair.parent?.pur_ord_no) {
									if (
										multiPair.child.type == "Material" &&
										multiPair.parent.type == "Purchase Order"
									) {
										return "additionalParentLink";
									}
								}
								if (multiPair.child?.pur_ord_no) {
									if (
										multiPair.child.type == "Purchase Order" &&
										multiPair.parent.type == "Material"
									) {
										return "additionalParentLink";
									}
								}
							}
						})

						.attr("d", function () {
							if (
								multiPair.parent &&
								multiPair.parent.relationshipMap[
								multiPair.parent.id + "-" + multiPair.child.id
								]
							) {
								var oTarget;
								var oSource;
								if (isForward) {
									oTarget = {
										x: multiPair.parent && multiPair.parent.x0, //y
										y: multiPair.parent && multiPair.parent.y0 + 15, //x
									};
									oSource = {
										x: multiPair.child && multiPair.child.x0,
										y: multiPair.child && multiPair.child.y0 - 18,
									};
								}
								if (isBackward) {
									oTarget = {
										x: multiPair.parent && multiPair.parent.x0, //y
										y: multiPair.parent && multiPair.parent.y0 - 15, //x
									};
									oSource = {
										x: multiPair.child && multiPair.child.x0,
										y: multiPair.child && multiPair.child.y0 + 15,
									};
								}

								if (
									linkArray.filter(function (o) {
										return (
											o.source.id === multiPair.parent.id &&
											o.target.id === multiPair.child.id
										);
									}).length === 0
								) {
									var data = {
										mat:
											(multiPair.child && multiPair.child.matNo) ||
											(multiPair.parent && multiPair.parent.matNo),
										poNo:
											(multiPair.parent && multiPair.parent.poNo) ||
											(multiPair.child && multiPair.child.poNo),
										qty:
											multiPair.parent &&
											multiPair.parent.relationshipMap[
												multiPair.parent.id + "-" + multiPair.child.id
											].qty,
										uom:
											multiPair.parent &&
											multiPair.parent.relationshipMap[
												multiPair.parent.id + "-" + multiPair.child.id
											].unit,
									};
									this.setAttribute("data", JSON.stringify(data));
									return diagonal({
										source: oSource,
										target: oTarget,
									});
								}
							}
						})
						.data(multiPair, function () {
							return multiPair;
						});

					THIS.vis
						.selectAll(
							"path.additionalParentLink,path.additionalParentForwardLink"
						)
						.on("mouseover", function (d) {
							let data = this.getAttribute("data");
							data = JSON.parse(data);
							toolTip.transition().duration(200).style("opacity", ".9");
							let material = data.mat || "Not available";
							let processOrder = data.poNo || "Not available";
							let quantity = data.qty || "Not available";
							let uom = data.uom || "Not available";

							let tooltipHtml =
								"<div><span class='col-xs-1' style='padding:5px'>Process Order   :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								processOrder +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>Product   :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								material +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>Quantity  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								quantity +
								"</b></span><br/><span class='col-xs-1' style='padding:5px'>UOM  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
								uom +
								"</b></span></div>";
							d3.select("#keyTooltip").html(tooltipHtml);

							toolTip.style("left", d3.event.layerX + "px");
							if (d3.event.layerY > 200) {
								toolTip.style("top", d3.event.layerY - 150 + "px");
							} else {
								toolTip.style("top", d3.event.layerY + 20 + "px");
							}
						});
					////**************Add Color config**************/
				});
			};
		};

		let TreeViewBackward = {};
		const plotType = props.chartType;
		TreeViewBackward = new TreeViewObject(plotType);
		TreeViewBackward.drawTree(chartData);
		setTimeout(() => TreeViewBackward.multiParentCoupling(multiParent), 100);
	};
	const handleChartClick = (data) => {
		if (data.golden_batch) {
			setIsGoldenBatch(true)
		} else {
			setIsGoldenBatch(false)
		}

		if (data.type === "Process Order" || data.type === "Purchase Order") {
			setPopVisible(false);
		} else {
			setPopVisible(true);
		}

		setNodeData((prevState) => {
			return { ...prevState, data };
		});
	};

	const onClickView = (field) => {
		let nodeDetails = {
			nodeId: nodeData.data.nodeId,
			clickType: field,
			product: nodeData.data.matNo,
			nodeData: nodeData.data,
			nodeType: nodeData.data.type,
		};
		props.nodeClick(nodeDetails);
	};

	window.onclick = function (event) {
		if (event.target.className.baseVal !== "") {
			d3.select("#popup").style("display", "none");
		}
	};

	return (
		<>
			<Draggable>
				<div className="drag-search">
					<div className="drag-search_head">
						<span>Quick Search</span>
					</div>
					<div className="select-allowclear">
						<Select
							showSearch
							placeholder="Search by batch number, product code, etc"
							optionFilterProp="children"
							filterOption={(input, option) =>
								option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
							}
							value={searchValue || undefined}
							onChange={(value) => onChangeParam(value)}
							onSearch={(type) => onSearchParam(type)}
							style={{ width: "83%", margin: "0px", textAlign: "left" }}
						>
							{searchOptions &&
								searchOptions.map((item, index) => (
									<Select.Option
										key={index}
										value={`${item.value}---${item.nodeId}`}
									>
										{item.value}
									</Select.Option>
								))}
						</Select>
						<Button onClick={handleTreeSearch} className="search-tree">
							<SearchOutlined />
						</Button>
						{searchValue !== "" ? (
							<Button onClick={handleClearSearch} className="close-searchicon">
								<CloseOutlined />
							</Button>
						) : (
							<></>
						)}
					</div>
				</div>
			</Draggable>
			<div id="treeWrapper">
				<div id="main" className="tree-plot">
					<div id="wid-id-3">
						<div id="body" ref={treeDiv} className="row">
							<div ref={backwardTreeDiv} id="backwardDiv"></div>
							<div ref={forwardTreeDiv} id="forwardDiv"></div>
							<div id="gbttooltip" className="gbttooltip">
								<div id="federalDiv">
									<div id="keyTooltip" className="headerattribute row"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="popup-div" id="popup">
					{popVisible && (
						<>
							<Button
								type="primary"
								id="backword-genealogy-popup"
								onClick={() => {
									onClickView("backward");
								}}
							>
								Backward Genealogy
							</Button>
							<Button
								type="primary"
								id="forward-genealogy-popup"
								onClick={() => {
									onClickView("forward");
								}}
							>
								Forward Genealogy
							</Button>
						</>
					)}
					{popVisible && (
						<>
							{isGoldenBatch ? (<Button
								type="primary"
								id="mark-as-golden-batch"
								onClick={() => {
									onClickView("markAsNormalBatch");
								}}
							>
								Mark as normal batch
							</Button>) : (<Button
								type="primary"
								id="mark-as-normal-batch"
								onClick={() => {
									onClickView("markAsGoldenBatch");
								}}
							>
								Mark as golden batch  <StarFilled className="star-outlined" />
							</Button>)}
						</>
					)}
					<Button
						type="primary"
						id="view-details-popup"
						onClick={() => {
							onClickView("view");
						}}
					>
						View Details
					</Button>
					{popVisible && (
						<Button
							type="primary"
							id="upload-file-popup"
							onClick={() => {
								onClickView("upload_files");
							}}
						>
							Upload Files
						</Button>
					)}
				</div>
				<div className="genealogy-legends">
					<span className="genealogy-legends_icon">
						<EyeOutlined />
					</span>
					<div className="genealogy-legends_frames">
						<ul>
							<li>
								<img src={batchIcon} alt="batch" />
								<p>Material/Batch</p>
							</li>
							<li>
								<img src={processOrderIcon} alt="process order" />
								<p>Process order</p>
							</li>
							<li>
								<span className="batch_icon_non"></span>
								<p>Non-compliant material/batch</p>
							</li>
							<li>
								<PlusOutlined />
								<p>Material/batch expand flow</p>
							</li>
							<li>
								<MinusOutlined />
								<p>Material/batch collapse flow</p>
							</li>
							<li>
								<WarningOutlined />
								<p>No record found</p>
							</li>
						</ul>
					</div>
				</div>
				<div id="zoomscale" className="zoomscale"></div>
			</div>
		</>
	);
}

export default TreePlot;
