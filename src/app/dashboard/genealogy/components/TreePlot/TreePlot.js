import React, { useEffect, useState, useRef } from 'react';
import * as _ from 'lodash';
import * as d3 from 'd3';
import Draggable from 'react-draggable';
import svgPanZoom from 'svg-pan-zoom';
import { Input, Select, Button } from 'antd';
import {
  EyeOutlined,
  PlusOutlined,
  MinusOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import processOrderIcon from '../../../../../assets/images/processorder.png';
import './style.scss';
import SelectSearchField from '../../../../../components/SelectSearchField/SelectSearchField';

function TreePlot(props) {
  console.log('propssss', props);
  const treeDiv = useRef();
  const backwardTreeDiv = useRef();
  const forwardTreeDiv = useRef();

  const [isMaterialLink, setisMaterialLink] = useState('#08C6FF');
  const [isProcesslink, setisProcesslink] = useState('#08C6FF');
  const [searchOptions, setsearchOptions] = useState([]);
  const [searchValue, setsearchValue] = useState('');
  const [selectedNodeId, setselectedNodeId] = useState('');
  const [popVisible, setPopVisible] = useState(false);
  const [nodeData, setNodeData] = useState({});

  const { Search } = Input;

  useEffect(() => {
    drawChart(_.cloneDeep(props.data));
    handleSearchClick(_.cloneDeep(props.data));
  }, []);

  const handleSearchClick = (searchData) => {
    console.log('search dataaaa', searchData);
    let chartDataRes = [searchData];
    let arrMat = [];
    let arrBatch = [];
    let arrMatDes = [];
    let arrProType = [];
    let material = [];
    let batch = [];
    let materialDisc = [];
    let proType = [];
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
        proType.push({
          value: item.matType,
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
    let loopChildrenPType = (item) => {
      item.forEach((i) => {
        if (i.matType !== undefined) {
          arrProType.push(i.matType);
        }
        if (i.children) {
          loopChildrenPType(i.children);
        }
      });
    };

    chartDataRes &&
      chartDataRes.forEach((item) => {
        if (item.matNo.length) {
          pushMaterial(item);
        } else if (item.batchNo.length) {
          pushMaterial(item);
        } else if (item.matDesc.length) {
          pushMaterial(item);
        } else if (item.matType.length) {
          pushMaterial(item);
        }
        if (item.children) {
          loopChildrenMat(item.children);
          loopChildrenBatch(item.children);
          loopChildrenMatDes(item.children);
          loopChildrenPType(item.children);
        }
      });

    const mergeArray = [
      ...material,
      ...arrMat,
      ...materialDisc,
      ...arrMatDes,
      ...batch,
      ...arrBatch,
    ];

    setsearchOptions(mergeArray);
    // this.setState({
    //   searchOptions: mergeArray,
    //   productTypeList: [...new Set(arrProType)],
    // });
  };
  console.log('searchOptions', searchOptions);
  const onSearchParam = (text) => {
    console.log('search', text);
  };
  const onChangeParam = (value) => {
    console.log('onChangeParam', value);
    if (value !== null && value !== undefined) {
      let splitvalue = value.split('---');
      console.log('splitvalue', splitvalue);
      let splitedvalue = splitvalue[1];
      setselectedNodeId(splitedvalue);
      setsearchValue(splitvalue[0]);
    }
  };
  /**
   * Checks if the element is an empty object or array
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
          // Make sure the key is not part of the prototype chain
          // el.hasOwnProperty(key)
          if (Object.hasOwn(el, key)) {
            var value1 = el[key];

            if (key === 'id') {
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
      var parentsCheck = [];
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
    console.log('chartData----', chartData);
    let hasDuplicateId = getDuplicateIds(chartData);
    let getUniqueId = findDuplicates(hasDuplicateId);
    let hasDuplicateObj = removeDuplicateId(chartData, getUniqueId);

    let multiParent = hasDuplicateObj.duplicates;
    console.log(
      'hasDuplicateObj---',
      hasDuplicateObj,
      hasDuplicateObj.duplicates
    );
    let dynamicHeight = getDynamicHeight(hasDuplicateObj.levelWidth);
    console.log('dynamicHeight--------', dynamicHeight);
    let linkArray = [];
    let isBackward = props.Backward;
    let isForward = props.Forward;

    chartData = processData(chartData, {});

    d3.select('#backwardDiv').html('');

    let nodeDiv = treeDiv.current;
    let forwardNode = forwardTreeDiv.current;
    let backwardNode = backwardTreeDiv.current;

    let that = this;
    var TreeViewObject = function (type) {
      var THIS = this;
      THIS.type = type;

      var graphHeight = dynamicHeight * 30;
      console.log('graphHeight -------', graphHeight);
      var nodeDepth = 240;
      // eslint-disable-next-line no-undef
      //document.getElementById('main').style.height = graphHeight - 250 + 'px';

      d3.select(nodeDiv)
        .append('div')
        .attr('class', 'row')
        .attr('id', 'mainDiv')
        .attr('align', 'center');

      // eslint-disable-next-line no-undef
      window.scroll({
        // top: 200,
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      var margin = [20, 20, 20, 20],
        width = 1350 - margin[1] - margin[3],
        height = graphHeight <= 500 ? 500 : graphHeight - margin[0] - margin[2],
        i = 0;

      THIS.tree = d3.layout.tree().size([height, width]);

      var diagonal = d3.svg.diagonal().projection(function (d) {
        return [d.y, d.x];
      });
      // eslint-disable-next-line no-undef
      var toolTip = d3.select(document.getElementById('gbttooltip'));
      var popupDiv = d3.select(document.getElementById('popup'));
      // eslint-disable-next-line no-undef
      var onclickWidget = d3.select(document.getElementById('gbtonclick'));

      onclickWidget
        .on('mouseover', function (d) {
          onclickWidget.transition().duration(200).style('opacity', '1');
        })
        .on('mouseout', function (d) {
          onclickWidget
            .transition() // declare the transition properties to
            .duration(0) // it shall take 500ms
            .style('opacity', '0')
            .style('left', '0')
            .style('top', '1750px'); // and go all the way to an opacity of nil
        });

      this.drawTree = function (json) {
        if (json && json.isException) {
          return;
        }

        let node = this.type === 'forward' ? forwardNode : backwardNode;
        THIS.vis = d3
          .select(node)
          .attr('align', 'center')
          .append('svg:svg')
          .attr({
            id: 'treeviewid' + THIS.type,
          })
          .attr('width', width + margin[1] + margin[3])
          .attr('height', height)

          .append('g')
          .append('svg:g')
          .attr('transform', function () {
            console.log('graphHeight', graphHeight, graphHeight < 500);
            if (graphHeight > 2000) return 'translate(530,100)scale(0.5,0.5)';
            if (graphHeight < 500) return 'translate(100,20)scale(0.1,0.1)';
            if (graphHeight > 500 && graphHeight < 1000)
              return 'translate(400,100)scale(0.6,0.6)';
            if (graphHeight > 1000 && graphHeight < 1500)
              return 'translate(450,100)scale(0.5,0.5)';
          })
          .append('svg:g')
          .attr('transform', 'translate(180,20)scale(0.5,0.5)')
          .attr('class', 'viewport');

        // d3.select('#treeviewid' + THIS.type)
        //   .append('svg:defs')
        //   .selectAll('marker')
        //   .data([
        //     'material_' + THIS.type + '_additional',
        //     'processOrder_' + THIS.type + '_additional',
        //   ]) // Different link/path types can be defined here
        //   .enter()
        //   .append('svg:marker') // This section adds in the arrows
        //   .attr('id', String)
        //   .attr('viewBox', '0 -5 10 10')
        //   .attr('refX', function () {
        //     if (isBackward) return 10;
        //     else if (isForward) return 7;
        //   }) // use -10 to draw arrow in front of node
        //   .attr('refY', 0)
        //   .attr('markerWidth', 8)
        //   .attr('markerHeight', 8)
        //   .attr('fill', function (d) {
        //     if (isForward) {
        //       if (d.indexOf('material') > -1) {
        //         return isMaterialLink;
        //       } else {
        //         return isProcesslink;
        //       }
        //     }
        //     if (isBackward) {
        //       if (d.indexOf('material') > -1) {
        //         return isProcesslink;
        //       } else {
        //         return isMaterialLink;
        //       }
        //     }
        //   })
        //   .attr('orient', '0') // use 180 for right to left
        //   .append('svg:path')
        //   .attr('d', 'M0,-5L10,0L0,5');

        // add the links and the arrows
        if (json === null || json === 'null') {
          d3.select('#results', '#loading').html(
            '<span>This is new inner html.</span>'
          );
          //   $('#results').show();
          d3.selection('#results').show = function () {
            this.style('display', 'initial');
            return this;
          };
          // return;
        }
        // $('#results, #loading').empty();
        d3.select('#results,#loading').html('');
        THIS.root = json;
        THIS.root.x0 = height / 2;
        THIS.root.y0 = width;
        // $('#wid-id-3, #wid-id-5, #wid-id-6').removeClass('hide');
        d3.select('#wid-id-3, #wid-id-5, #wid-id-6').attr('hide', null);

        var panZoomsvgObject;
        var PanZoomsvg = function (id) {
          panZoomsvgObject = svgPanZoom('#' + id, {
            panEnabled: true,
            dragEnabled: true,
            controlIconsEnabled: false,
            zoomEnabled: true, //lets see
            zoomScaleSensitivity: 5,
            minZoom: 0.1,
            maxZoom: 10,
            fit: false,
            center: true,
            destroy: function (options) {
              for (var eventName in this.listeners) {
                options.svgElement.removeEventListener(
                  eventName,
                  this.listeners[eventName]
                );
              }
            },
          });

          d3.select('#' + id)
            .on('mousedown', function () {
              d3.select('#' + id).attr('class', 'grabbableactive');
            })
            .on('mouseup', function () {
              d3.select('#' + id).attr('class', 'grabbable');
            })
            .attr('class', 'grabbable');

          return panZoomsvgObject;
        };

        THIS.update(THIS.root);
        /********  PAN ZOOM ***********/
        if (THIS.type === 'backward') {
          var panZoomBackward = null;
          // eslint-disable-next-line no-undef
          PanZoomsvg('treeviewidbackward');
          // eslint-disable-next-line no-undef
          var zoomIn = document.getElementById('zoom-in');
          if (zoomIn) {
            zoomIn.addEventListener('click', function (ev) {
              ev.preventDefault();
              panZoomBackward.zoomIn();
            });
          }

          // eslint-disable-next-line no-undef
          var zoomOut = document.getElementById('zoom-out');
          if (zoomOut) {
            zoomOut.addEventListener('click', function (ev) {
              ev.preventDefault();
              panZoomBackward.zoomOut();
            });
          }

          if (zoomOut) {
            zoomOut.addEventListener('click', function (ev) {
              ev.preventDefault();
              panZoomBackward.zoomOut();
            });
          }

          // eslint-disable-next-line no-undef
          var zoomReset = document.getElementById('zoom-reset');
          if (zoomReset) {
            zoomReset.addEventListener('click', function (ev) {
              ev.preventDefault();
              panZoomBackward.resetZoom();
              panZoomBackward.resetPan();
            });
          }

          // END custom zoom controls
          // panZoomBackward.enablePan();
          // }
        } else if (THIS.type === 'forward') {
          var panZoomForward = null;
          // eslint-disable-next-line no-undef
          PanZoomsvg('treeviewidforward');
          // if (panZoomForward && panZoomForward != null) {
          // custom zoom controls
          // eslint-disable-next-line no-undef
          document
            .getElementById('zoom-in')
            .addEventListener('click', function (ev) {
              ev.preventDefault();
              panZoomForward.zoomIn();
            });
          // eslint-disable-next-line no-undef
          document
            .getElementById('zoom-out')
            .addEventListener('click', function (ev) {
              ev.preventDefault();
              panZoomForward.zoomOut();
            });
          // eslint-disable-next-line no-undef
          document
            .getElementById('zoom-reset')
            .addEventListener('click', function (ev) {
              ev.preventDefault();
              panZoomForward.resetZoom();
              panZoomForward.resetPan();
            });
          // END custom zoom controls
          panZoomForward.enablePan();
          // }
        }

        /******** END PAN ZOOM ***********/
      };

      this.update = function (source) {
        var duration = d3.event && d3.event.altKey ? 1300 : graphHeight;
        // Compute the new tree layout.
        var nodes = THIS.tree.nodes(THIS.root).reverse();

        nodes.forEach(function (d) {
          if (THIS.type === 'forward') d.y = d.depth * nodeDepth;
          else d.y = width - d.depth * nodeDepth;
          d.numChildren = d.children ? d.children.length : 0;
          d.traceability = THIS.type;
          // if (d.type === "Material") {
          //   //d.linkColor = "isMaterialLink";
          // } else {
          //   //d.linkColor = "darkorange";
          // }

          if (d.numChildren === 0 && d._children)
            d.numChildren = d._children.length;

          var mastername = '';
          var headername = d.keyName;
          if (
            d.subKeyName !== undefined &&
            d.subKeyName !== null &&
            d.subKeyName !== ''
          )
            headername += ' : ' + d.subKeyName;

          if (d.value !== undefined && d.value !== null && d.value !== '')
            headername += ' : ' + d.value;

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
        var node = THIS.vis.selectAll('g.node').data(nodes, function (d) {
          return d.id || (d.id = ++i);
        });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node
          .enter()
          .append('svg:g')
          .attr('class', 'node')
          .attr('id', function (d) {
            return 'node-' + d.id;
          })
          .attr('transform', function (d) {
            return 'translate(' + source.y0 + ',' + source.x0 + ')';
          })
          .on('click', function (d) {
            //******** Remove border on all other nodes
            // d3.selectAll('svg')
            //   .selectAll('circle')
            //   .transition()
            //   .duration(750)
            //   .attr('r', 10);

            // // Set circle border on selected node
            // d3.select(this)
            //   .select('circle')
            //   .transition()
            //   .duration(750)
            //   .attr('r', 20)
            //   .style('fill', '#ccc');

            var top = d3.event.pageY - 400;
            var left = d3.event.pageX - 300;
            console.log('top left', top, left);
            console.log('d3.event.pageY', d3, d3.event.pageX);
            toolTip
              .transition() // declare the transition properties to
              .duration(500) // fade out div for 500ms
              .style('opacity', '0'); // a

            popupDiv.style('top', top + 'px').style('left', left + 'px');
            node_onClick(d);
          });

        var highlightForwardLink = function (
          d,
          displayColor,
          opacity,
          strokeWidth
        ) {
          link
            .filter(function (e) {
              if (d && d !== null) {
                while (e.source === d) {
                  highlightForwardLink(
                    e.target,
                    displayColor,
                    opacity,
                    strokeWidth
                  );
                  return d && d !== null ? true : false;
                }
              }
            })
            .transition(0)
            .duration(300)
            .style('stroke', function (obj) {
              if (isBackward) {
                if (obj.source && obj.source.type === 'Material') {
                  return isProcesslink;
                } else {
                  return isMaterialLink;
                }
              }
              if (isForward) {
                if (obj.source && obj.source.type === 'Process Order') {
                  return isProcesslink;
                } else {
                  return isMaterialLink;
                }
              }
            })
            .style('opacity', opacity)
            .style('stroke-width', strokeWidth);
        };

        var highlightBackwardLink = function (
          d,
          displayColor,
          opacity,
          strokeWidth
        ) {
          link
            .filter(function (e) {
              if (d && d !== null) {
                while (e.target === d) {
                  highlightBackwardLink(
                    e.source,
                    displayColor,
                    opacity,
                    strokeWidth
                  );
                  return d && d !== null ? true : false;
                }
              }
            })
            .transition(0)
            .duration(300)
            .style('stroke', function (obj) {
              if (isBackward) {
                if (obj.source && obj.source.type === 'Material') {
                  return isProcesslink;
                } else {
                  return isMaterialLink;
                }
              }
              if (isForward) {
                if (obj.source && obj.source.type === 'Process Order') {
                  return isProcesslink;
                } else {
                  return isMaterialLink;
                }
              }
            })
            .style('opacity', opacity)
            .style('stroke-width', strokeWidth);
        };

        var highlightLink = function (d, displayColor, opacity, strokeWidth) {
          highlightForwardLink(d, displayColor, opacity, strokeWidth);
          highlightBackwardLink(d, displayColor, opacity, strokeWidth);
        };
        // nodeEnter
        //   .append('svg:circle')
        //   .attr('r', 1e-6)
        //   // .on('mouseover', function (d) {
        //   //   node_onMouseOver(d);
        //   //   highlightLink(d, '#0080FF', 1, 10);
        //   // })
        //   // .on('mouseout', function (d) {
        //   //   toolTip
        //   //     .transition()
        //   //     .duration(500) // it shall take 500ms
        //   //     .style('opacity', '0'); // and go all the way to an opacity of nil
        //   //   highlightLink(d, '#6E6E6E', '0.7', 2); //grey
        //   // })
        //   .style('fill', function (d) {
        //     return '#FFF';
        //   })
        //   .style('fill-opacity', '.7')
        //   .style('stroke', function (d) {
        //     return d.source ? d.source.linkColor : d.linkColor;
        //   });
        // add Image In Circle
        nodeEnter
          .append('svg:image')
          .attr('dy', '-0.4em')
          .attr('x', '-11')
          .attr('y', '-11')
          .attr('height', '20')
          .attr('width', '20')

          .on('mouseover', function (d) {
            node_onMouseOver(d);
          })
          .on('mouseout', function (d) {
            toolTip
              .transition()
              .duration(500) // it shall take 500ms
              .style('opacity', '0'); // and go all the way to an opacity of nil

            highlightLink(d, '#6E6E6E', '0.7', 2);
          })
          .attr('xlink:href', function (d) {
            //return d.traceability =="backward" ? -15 : 15;
            if (d.type === 'Material') {
              return 'img/genealogy/material.png'; //"http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_daredevil.png";
            } else {
              return 'img/genealogy/processorder.png'; //"http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png";
            }
          });

        //
        nodeEnter
          .append('svg:text')
          .attr('x', function (d) {
            return d.traceability === 'backward' ? 70 : -13;
          })
          .attr('dy', '0.35em')
          .attr('text-anchor', function (d) {
            return d.traceability === 'backward' ? 'end' : 'start';
          })
          .text(function (d) {
            var nodeName = '';
            var batchName = '';
            if (d.type === 'Material') {
              batchName = d['nodeId'].split('|');
              nodeName = batchName[1];

              console.log('nodeId', d['nodeId']);
            }
            console.log('nodeName', nodeName);
            console.log('batchName', batchName);
            return nodeName;
          })
          .on('mouseover', function (d) {
            node_onMouseOver(d);
          })
          .on('mouseout', function (d) {
            toolTip
              .transition() // declare the transition properties to
              .duration(500) // it shall take 500ms
              .style('opacity', '0'); // and go all the way to an opacity of nil
            highlightLink(d, '#6E6E6E', '0.7', 2);
          })
          .on('click', function (d) {
            d3.event.preventDefault();

            // var x;
            // var y;
            // if (d3.event.pageX || d3.event.pageY) {
            //   x = d3.event.pageX;
            //   y = d3.event.pageY;
            // } else if (d3.event.clientX || d3.event.clientY) {
            //   x =
            //     d3.event.clientX +
            //     // eslint-disable-next-line no-undef
            //     document.body.scrollLeft +
            //     // eslint-disable-next-line no-undef
            //     document.documentElement.scrollLeft;
            //   y =
            //     d3.event.clientY +
            //     // eslint-disable-next-line no-undef
            //     document.body.scrollTop +
            //     // eslint-disable-next-line no-undef
            //     document.documentElement.scrollTop;
            // }

            // eslint-disable-next-line no-undef

            // $('.popup')
            //   .toggle(100)
            //   .css({
            //     top: top + 'px',
            //     left: left + 'px',
            //   });
          })
          .style('fill-opacity', '0')
          .style('fill', function (d) {
            return '#000000';
          });

        // Transition nodes to their new position.
        var nodeUpdate = node
          .transition()
          .duration(duration)
          .attr('transform', function (d) {
            return 'translate(' + d.y + ',' + d.x + ')';
          });

        nodeUpdate
          .select('circle')
          .attr('r', function (d) {
            return 10;
          })
          .style('fill', function (d) {
            return d.type === 'Material' ? '#3b9ff3' : '#89AD45'; //"darkorange" : "#ffff00";
          })
          .style('stroke', function (d) {
            if (d.isFolder === false) return '#0B3B0B';
          });

        nodeUpdate.select('text').style('fill-opacity', 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node
          .exit()
          .transition()
          .duration(duration)
          .attr('transform', function (d) {
            return 'translate(' + source.y + ',' + source.x + ')';
          })
          .remove();

        nodeExit.select('circle').attr('r', 1e-10);

        nodeExit.select('text').style('fill-opacity', 1e-6);

        // Update the links…
        var link = THIS.vis
          .selectAll('path.link')
          .data(THIS.tree.links(nodes), function (d) {
            return d.target.id;
          });
        THIS.vis
          .selectAll('path.link')
          .data(THIS.tree.links(nodes), function (d) {
            linkArray.push(d);
          });

        var rootCounter = 0;
        let markerType = THIS.type == 'forward' ? 'marker-end' : 'marker-start';
        // Enter any new links at the parent's previous position. "material","processOrder"
        link
          .enter()
          .insert('svg:path', 'g')
          .attr('class', 'link')
          .attr(markerType, function (d) {
            if (d.source.type == 'Material') {
              return 'url(#material_' + THIS.type + ')';
            } else {
              return 'url(#processOrder_' + THIS.type + ')';
            }
          })
          .attr('d', function (d) {
            var o = {
              x: source.x0,
              y: source.y0,
            };
            return diagonal({
              source: o,
              target: o,
            });
          })
          .style('stroke', function (d) {
            if (isBackward) {
              if (d.source.depth === 0) {
                rootCounter++;
                if (d.source) {
                  if (d.source.type === 'Material') {
                    return isProcesslink;
                  } else {
                    return isMaterialLink;
                  }
                } else {
                  return d.source.children[rootCounter - 1].linkColor;
                }
              } else {
                if (d.target.isFolder === false) return '#0B3B0B';
                else if (d.source) {
                  if (d.source.type === 'Material') {
                    return isProcesslink;
                  } else {
                    return isMaterialLink;
                  }
                } else {
                  return d.source.children[rootCounter - 1].linkColor;
                }
              }
            }
            if (isForward) {
              if (d.source.depth === 0) {
                rootCounter++;
                if (d.source) {
                  if (d.source.type === 'Material') {
                    return isMaterialLink;
                  } else {
                    return isProcesslink;
                  }
                } else {
                  return d.source.children[rootCounter - 1].linkColor;
                }
              } else {
                if (d.target.isFolder === false) return '#0B3B0B';
                else if (d.source) {
                  if (d.source.type === 'Material') {
                    return isMaterialLink;
                  } else {
                    return isProcesslink;
                  }
                } else {
                  return d.source.children[rootCounter - 1].linkColor;
                }
              }
            }
          })
          .style('stroke-width', function (d) {
            if (d.target.isFolder === false) return 1;
            else return 2;
          })
          .on('mouseover', function (d) {
            highlightLink(d.target, '#FF8C00', 1, 10);

            toolTip.transition().duration(200).style('opacity', '.9');
            var material = '';
            var processOrder = '';
            var quantity =
              d.source.relationshipMap[d.source.id + '-' + d.target.id].qty +
              ' ' +
              d.source.relationshipMap[d.source.id + '-' + d.target.id].uom;
            if (THIS.type === 'forward') {
              material = d.source.matNo || d.target.matNo;
              processOrder = d.target.poNo || d.source.poNo;
            } else {
              material = d.target.matNo || d.source.matNo;
              processOrder = d.source.poNo || d.target.poNo;
            }

            var tooltipHtml =
              "<div ><span class='col-xs-1' style='padding:5px'>Product No. :  </span><span class='col-xs-1' style='padding:5px'><b>" +
              material +
              // "</b></span><br/><span class='col-xs-1' style='padding:5px'>Batch  :  </span><span class='col-xs-1' style='padding:5px'><b>" + (key[2] || "N/A") +
              "</b></span><br/><span class='col-xs-1' style='padding:5px'>Process Order :  </span><span class='col-xs-1' style='padding:5px'><b>" +
              processOrder +
              "</b></span><br/><span class='col-xs-1' style='padding:5px'>Quantity :  </span><span class='col-xs-1' style='padding:5px'><b>" +
              quantity +
              '</b></span><br/></span></div>';
            // $('#keyTooltip').html(tooltipHtml);
            toolTip.style('left', d3.event.layerX + 'px');
            if (d3.event.layerY > 200) {
              toolTip.style('top', d3.event.layerY - 150 + 'px');
            } else {
              toolTip.style('top', d3.event.layerY + 20 + 'px');
            }
          })
          .on('mouseout', function (d) {
            highlightLink(d.target, '#6E6E6E', '0.7', 2);
            // setTimeout(function () {
            // $('#material_' + THIS.type)
            //   .parent()
            //   .show();
            // }, 100);
            toolTip
              .transition()
              .duration(500) // it shall take 500ms
              .style('opacity', '0');
          })

          .style('stroke-linecap', 'round')
          .transition()
          .duration(duration);

        // Transition links to their new position.
        link.transition().duration(duration).attr('d', diagonal);

        // Transition exiting nodes to the parent's new position.
        link
          .exit()
          .transition()
          .duration(duration)
          .attr('d', function (d) {
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
        nodes.forEach(function (d) {
          d.x0 = d.x;
          d.y0 = d.y;
        });

        // On Node Click Event
        //toggle children click
        function node_onClick(d) {
          handleChartClick(d);
          // that.setState({ nodeDetails: d });
          console.log('ddddddddddddd', d);
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          THIS.update(d);
        }

        function node_onMouseOver(d) {
          toolTip.transition().duration(200).style('opacity', '.9');
          if (
            d.masterKey &&
            d.masterKey !== null &&
            d.masterKey !== 'null' &&
            !d.mastername
          ) {
            var path =
              '/EntityTracer/DRServlet?key=' +
              d.key +
              '&subKey=' +
              d.subKey +
              '&value=' +
              d.value +
              '&isFolder=' +
              d.isFolder;
            if (d.masterKey !== undefined && d.masterKey !== null) {
              path = path + '&masterKey=' + d.masterKey;
            }
            if (d.masterSubKey !== undefined && d.masterSubKey !== null) {
              path = path + '&masterSubKey=' + d.masterSubKey;
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
                    var mastername = '';
                    if (json[j].children && json[j].children.length > 0) {
                      for (var k = 0; k < json[j].children.length; k++) {
                        var childtitle = json[j].children[k].key.split(':');
                        if (childtitle.length > 1) {
                          mastername =
                            '<div class="col-sm-4">' +
                            childtitle[0] +
                            ' :</div>' +
                            '<div class="col-sm-8 text-left">' +
                            childtitle[1] +
                            '</div>' +
                            mastername;
                        } else {
                          mastername =
                            '<div class="col-sm-12 text-center">' +
                            json[j].children[k].key +
                            '</div>' +
                            mastername;
                        }
                      }
                    }
                    d.toolTipDetails = d.mastername = mastername;
                  }
                }

                d._children = validchildren;
                // $('#keyTooltip').html(d.toolTipDetails);
              }
            });
          } else {
            var key;
            if (d.type === 'Material') {
              key = d['nodeId'].split('|');
            } else {
              key = [d.poNo];
            }
            // d.relationshipMap[d.id + "-" + d.children.id].uom ||
            var materialDescription = d.matDesc || 'Not available';
            var batchNo = d.batchNo || 'Not available';
            var uom = 'Not Available';
            var quantity = 'Not Available';
            var productType = d.matType || 'Not available';
            if (
              d.parent &&
              d.parent.relationshipMap &&
              d.parent.relationshipMap[d.parent.id + '-' + d.id]
            ) {
              uom = d.parent.relationshipMap[d.parent.id + '-' + d.id].uom;
              quantity = d.parent.relationshipMap[d.parent.id + '-' + d.id].qty;
            }
            if (
              d.children &&
              d.relationshipMap &&
              d.relationshipMap[d.id + '-' + d.children[0].id]
            ) {
              uom = d.relationshipMap[d.id + '-' + d.children[0].id].uom;
              quantity = d.relationshipMap[d.id + '-' + d.children[0].id].qty;
            }

            let tooltipHtml = '';
            if (d.type === 'Process Order') {
              if (d['parent']['nodeId'].includes('ITM')) {
                tooltipHtml =
                  "<div ><span class='col-xs-1' style='padding:5px'>" +
                  "Plant :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                  'ITM - Pomezia, IT' +
                  "</b></span><br/><span class='col-xs-1' style='padding:5px'>Process Order  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                  key[0] +
                  '</b></span><br/></span></div>';
              } else {
                tooltipHtml =
                  "<div style='padding:2px'><span class='col-xs-2'>" +
                  "Process Order : </span><span class='col-xs-1 text-left'><b>" +
                  key[0] +
                  '</b></span></div>';
              }
            } else if (d.type === 'Material') {
              tooltipHtml =
                "<div><span class='col-xs-1' style='padding:5px'>Plant :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                (key[0] || 'N/A') +
                "</b></span><br/><span class='col-xs-1' style='padding:5px'>Product No.  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                (key[1] || 'N/A') +
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
                '</b></span><br/></span></div>';
            }

            // $('#keyTooltip').html(tooltipHtml);
          }

          var toolTipMarginY = 0;
          // toolTipMarginY = $('#wid-id-3').position().top + 150;

          let positionToolTip = THIS.type === 'forward' ? -200 : 3415;
          if (d3.event.layerX <= 1000) {
            toolTip.style('left', d3.event.layerX + 'px');
          } else if (d3.event.layerX > 1000 && d.type === 'Material') {
            toolTip.style('left', d3.event.layerX - 400 + 'px');
          } else {
            toolTip.style('left', d3.event.layerX + 'px');
          }
          if (d3.event.layerY > 200 && d.type === 'Material') {
            toolTip.style('top', d3.event.layerY - 150 + 'px');
          } else {
            toolTip.style('top', d3.event.layerY + 20 + 'px');
          }
        }
      };

      this.multiParentCoupling = (multiParent) => {
        var multiParentsArray = [];
        for (var key in multiParent) {
          multiParent[key].forEach((a) => {
            var parent = {};
            var child = {};
            parent = THIS.tree.nodes(THIS.root).filter(function (d) {
              return d['id'] === a;
            })[0];
            child = THIS.tree.nodes(THIS.root).filter(function (d) {
              return d['id'] === key;
            })[0];
            multiParentsArray.push({
              parent: parent,
              child: child,
            });
          });
        }
        var x0 = [];
        var y0 = [];
        var count = 0;

        multiParentsArray.forEach(function (val) {
          if (val.child && val.parent) {
            if (val.child.x0 && val.parent.x0)
              x0.push((val.child.x0 + val.parent.x0) / 2);
            if (val.child.y0 && val.parent.y0)
              y0.push((val.child.y0 + val.parent.y0) / 2);
          }
        });
        var dupli = x0.filter((e, i, a) => a.indexOf(e) !== i);
        var duplic = y0.filter((e, i, a) => a.indexOf(e) !== i);

        multiParentsArray.forEach(function (multiPair) {
          let markerType =
            THIS.type === 'forward' ? 'marker-start' : 'marker-end';
          THIS.vis

            .append('path', 'g')
            .attr(markerType, function () {
              if (multiPair.parent && multiPair.parent.type === 'Material') {
                return 'url(#material_' + THIS.type + '_additional' + ')';
              } else {
                return 'url(#processOrder_' + THIS.type + '_additional' + ')';
              }
            })

            .attr('class', function () {
              if (multiPair.parent && multiPair.parent.poNo) {
                if (
                  multiPair.child.type === 'Material' &&
                  multiPair.parent.type === 'Process Order'
                ) {
                  return 'additionalParentLink';
                } else {
                  return 'additionalParentForwardLink';
                }
              }
              if (multiPair.child.poNo) {
                if (
                  multiPair.child.type === 'Process Order' &&
                  multiPair.parent.type === 'Material'
                ) {
                  return 'additionalParentForwardLink';
                } else {
                  return 'additionalParentLink';
                }
              }
              //}
            })

            .attr('d', function () {
              if (
                multiPair.parent &&
                multiPair.parent.relationshipMap[
                  multiPair.parent.id + '-' + multiPair.child.id
                ]
              ) {
                if (isForward) {
                  var oTarget1 = {
                    x: multiPair.parent && multiPair.parent.x0, //y
                    y: multiPair.parent && multiPair.parent.y0 + 15, //x
                  };
                  var oSource1 = {
                    x: multiPair.child && multiPair.child.x0,
                    y: multiPair.child && multiPair.child.y0 - 18,
                  };
                }
                if (isBackward) {
                  var oTarget = {
                    x: multiPair.parent && multiPair.parent.x0, //y
                    y: multiPair.parent && multiPair.parent.y0 - 15, //x
                  };
                  var oSource = {
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
                        multiPair.parent.id + '-' + multiPair.child.id
                      ].qty,
                    uom:
                      multiPair.parent &&
                      multiPair.parent.relationshipMap[
                        multiPair.parent.id + '-' + multiPair.child.id
                      ].uom,
                  };
                  this.setAttribute('data', JSON.stringify(data));
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

          var adlink = THIS.vis
            .selectAll(
              'path.additionalParentLink,path.additionalParentForwardLink'
            )
            .on('mouseover', function (d) {
              var data = this.getAttribute('data');
              data = JSON.parse(data);
              toolTip.transition().duration(200).style('opacity', '.9');
              var material = data.mat;
              var processOrder = data.poNo;
              var quantity = data.qty + ' ' + data.uom;

              var tooltipHtml =
                "<div ><span class='col-xs-1' style='padding:5px'>Material   :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                material +
                // "</b></span><br/><span class='col-xs-1' style='padding:5px'>Batch  :  </span><span class='col-xs-1' style='padding:5px'><b>" + (key[2] || "N/A") +
                "</b></span><br/><span class='col-xs-1' style='padding:5px'>Process Order  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                processOrder +
                "</b></span><br/><span class='col-xs-1' style='padding:5px'>Quantity  :  </span><span class='col-xs-1' style='padding:5px'><b>" +
                quantity +
                '</b></span><br/></span></div>';
              // $('#keyTooltip').html(tooltipHtml);
              toolTip.style('left', d3.event.layerX + 'px');
              if (d3.event.layerY > 200) {
                toolTip.style('top', d3.event.layerY - 150 + 'px');
              } else {
                toolTip.style('top', d3.event.layerY + 20 + 'px');
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
    console.log('dataaaaa', data);
    setPopVisible(true);
    setNodeData((prevState) => {
      return { ...prevState, data };
    });
  };

  const onClickView = (field) => {
    console.log('field', field);
    console.log('nodeee dataaaa', nodeData);
    let nodeDetails = {
      nodeId: nodeData.data.nodeId,
      clickType: field,
      product: nodeData.data.matNo,
    };
    props.nodeClick(nodeDetails);
  };

  console.log('popvisibleeee', popVisible);
  return (
    <>
      <Draggable>
        <div className='drag-search'>
          <span className='drag-search_head'>Parameters - Quick Search</span>
          <Select
            showSearch
            placeholder='Search Here...'
            optionFilterProp='children'
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            value={searchValue}
            onChange={(value) => onChangeParam(value)}
            onSearch={(type) => onSearchParam(type)}
            style={{ width: '100%', margin: '0px' }}
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
        </div>
      </Draggable>
      <div id='treeWrapper'>
        <div id='main' className='tree-plot'>
          <div id='wid-id-3'>
            <div id='body' ref={treeDiv} className='row'>
              <div ref={backwardTreeDiv} id='backwardDiv'></div>
              <div ref={forwardTreeDiv} id='forwardDiv'></div>
              <div id='gbttooltip' className='gbttooltip'>
                <div id='federalDiv'>
                  <div id='keyTooltip' className='headerattribute row'></div>
                </div>
              </div>
              {popVisible && (
                <div className='popup-div' id='popup'>
                  <Button
                    type='primary'
                    onClick={() => {
                      onClickView('backward');
                    }}
                  >
                    Backward Genealogy
                  </Button>
                  <Button
                    type='primary'
                    onClick={() => {
                      onClickView('forward');
                    }}
                  >
                    Forward Genealogy
                  </Button>
                  <Button
                    type='primary'
                    onClick={() => {
                      onClickView('view');
                    }}
                  >
                    View Details
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='genealogy-legends'>
          <span className='genealogy-legends_icon'>
            <EyeOutlined />
          </span>
          <div className='genealogy-legends_frames'>
            <ul>
              <li>
                <span className='batch_icon'></span>
                <p>Material/Batch</p>
              </li>
              <li>
                <img src={processOrderIcon} />
                <p>Process order</p>
              </li>
              <li>
                <span className='batch_icon_non'></span>
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
      </div>
    </>
  );
}

export default TreePlot;
