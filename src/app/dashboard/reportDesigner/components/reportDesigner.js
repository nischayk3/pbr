// import React, { Component } from "react";
// import {
//   Button,
//   Snackbar,
//   CircularProgress,
//   withStyles
// } from "@material-ui/core";
// import ReportTemplate from "./reportTemplate";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import Grid from "@material-ui/core/Grid";
// import { returnData } from "../../../../../actions/tableViewAction";
// import {
//   getTemplate,
//   deleteTemplate
// } from "../../../../../actions/reportAction";
// import NotificationMessage from "../../../../../utilities/snackbarComponent/components/MySnackbarComponent";
// import MenuItem from "@material-ui/core/MenuItem";
// import Select from "@material-ui/core/Select";
// import { FormControl, InputLabel, Paper } from "@material-ui/core";
// import { loadFilter } from "actions/filterAction";
// import { withRouter } from "react-router";
// import "./styles.scss";
// import { connect } from "react-redux";

// const mapStateToProps = state => ({
//   roles: state.rolesReducer.roles
// });

// const MyCircularProgress = withStyles({})(CircularProgress);
// class DataChartsComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       removeTemplate: false,
//       removeTemplateMsg: null,
//       wholeTemplates: [],
//       htmlData: "",
//       templates: [],
//       gridItem: null,
//       templateRes: [],
//       productsList: [],
//       showLoader: false,
//       fromSavedHtml: false,
//       selectedProduct: "",
//       permissions: {}
//     };
//   }

//   componentDidMount() {
//     this.loadFilters();
//     this.getPermissionObj();
//   }

//   getPermissionObj() {
//     let roles = this.props.roles;
//     let permissions = { ...this.state.permissions };
//     roles &&
//       roles.length > 0 &&
//       roles.forEach(item => {
//         permissions[item.serviceName] = item.enabled;
//         item.childrens &&
//           item.childrens.length > 0 &&
//           item.childrens.forEach(permItem => {
//             permissions[permItem.serviceName] = permItem.enabled || false;
//           });
//       });
//     this.setState({
//       permissions
//     });
//   }
//   componentDidUpdate(props) {
//     if (JSON.stringify(props.roles) !== JSON.stringify(this.props.roles)) {
//       this.getPermissionObj();
//     }
//   }
//   returnTemplateDate = () => {
//     let request = {
//       appId: "CPV",
//       filters: [],
//       metadata: true,
//       resultsetId: "cpv_saved_file_details_data"
//     };
//     let productsList = [...this.state.productsList];
//     let wholeTemplates = [];
//     let templates = [];
//     returnData(request).then(res => {
//       if (res.data.content.length) {
//         productsList.forEach(ob => {
//           let grids = [];
//           res.data.content.map(obj => {
//             if (ob.value === obj.product_name) {
//               let grid = {
//                 id: obj.sid,
//                 templateName: obj.templatename,
//                 templateNumber: obj.templateno
//               };
//               grids.push(grid);
//             }
//           });
//           wholeTemplates.push({
//             product_name: ob.value,
//             grids
//           });
//           templates = wholeTemplates.filter(
//             product => product.product_name === this.state.selectedProduct
//           );
//         });
//         this.setState(
//           { wholeTemplates, templates, templateRes: res.data.content },
//           () => {
//             this.getHtmlOfTemplate();
//           }
//         );
//       }
//     });
//   };

//   getHtmlOfTemplate = () => {
//     let wholeTemplates = [...this.state.wholeTemplates];
//     let templateRes = [...this.state.templateRes];
//     if (templateRes.length) {
//       this.setState({ showLoader: true });
//       templateRes.forEach(obj => {
//         getTemplate({
//           id: obj.templateno,
//           tid: new Date().toISOString().replace(/T|Z|-|:/g, ""),
//           template_name: obj.templatename
//         }).then(res => {
//           let SelectedTemplateArr = wholeTemplates.filter(
//             template => template.product_name === this.state.selectedProduct
//           );
//           let remainingTemplateArr = wholeTemplates.filter(
//             template => template.product_name !== this.state.selectedProduct
//           );
//           let text = atob(res.savedtemplate);
//           let newId = "reportiframe" + res.templateid;
//           let iframe = document.getElementById(newId);

//           if (iframe) {
//             let doc;

//             if (iframe.contentDocument) {
//               doc = iframe.contentDocument;
//             } else {
//               doc = iframe.contentWindow.document;
//             }

//             doc.body.innerHTML = text;
//             if (doc.querySelector("#printWindow article")) {
//               doc.querySelector("#printWindow article").style.width = "auto";
//             }
//           }
//           SelectedTemplateArr[0].grids = SelectedTemplateArr[0].grids.map(
//             (item, index) => {
//               item = {
//                 ...item,
//                 savedHtml: atob(res.savedtemplate)
//               };
//               return item;
//             }
//           );
//           wholeTemplates = [...SelectedTemplateArr, ...remainingTemplateArr];
//           let templates = wholeTemplates.filter(
//             product => product.product_name === this.state.selectedProduct
//           );
//           this.setState({ wholeTemplates, templates, showLoader: false });
//         });
//       });
//     }
//   };
//   handleNewTemplate = (TValue, event) => {
//     this.setState({ [TValue]: event.target.value });
//   };

//   handleClose = () => {
//     this.setState({
//       open: false
//     });
//   };

//   loadFilters = () => {
//     let _req = { appId: "BMS", filterId: "product_filter", q: "", filters: [] };
//     loadFilter(_req)
//       .then(res => {
//         let productsList = [];
//         productsList = res;
//         this.setState(
//           {
//             productsList
//           },
//           () => {
//             this.returnTemplateDate();
//           }
//         );
//       })
//       .catch(error => {
//         if (error && error.message) console.log(error.message);
//       });
//   };

//   changeProduct = event => {
//     event.stopPropagation();
//     this.setState({ selectedProduct: event.target.value }, () => {
//       this.returnTemplateDate();
//     });
//   };

//   handleCanceltab = () => {
//     this.setState({ generateReport: false, fromSavedHtml: false, open: false });
//     this.returnTemplateDate();
//   };

//   handleTemplateSaved = () => {
//     this.setState({ generateReport: false });
//     this.returnTemplateDate();
//   };
//   addGrid = () => {
//     this.setState({
//       generateReport: true,
//       fromSavedHtml: false
//     });
//   };

//   removeTemplate = () => {
//     let request = {
//       templatenumber: this.state.templateNumber,
//       templatename: this.state.templateName,
//       transactionid: new Date().toISOString().replace(/T|Z|-|:/g, ""),
//       param3: null,
//       param1: "",
//       param2: "",
//       sourcesystem: "cpv",
//       identification: "101.10.20.30"
//     };

//     this.setState({ showLoader: true });
//     deleteTemplate(request).then(res => {
//       if (res.message.includes("successfully")) {
//         this.setState({
//           toastMessage: res.message,
//           toastOpen: true,
//           toastVariant: "success",
//           removeTemplate: false,
//           open: false,
//           showLoader: false
//         });
//         this.returnTemplateDate();
//       } else {
//         this.setState({
//           toastMessage: res.message,
//           toastOpen: true,
//           toastVariant: "error",
//           removeTemplate: false,
//           open: false,
//           showLoader: false
//         });
//       }
//     });
//   };

//   removeTemplateDialog = (templateNumber, tName, event) => {
//     this.setState({
//       removeTemplateMsg:
//         "Are you sure, You want to delete '" + tName + "' template",
//       removeTemplate: true,
//       templateNumber: templateNumber,
//       templateName: tName,
//       open: true
//     });
//   };

//   addTemplate = (addType, productName, event) => {
//     this.addGrid();
//   };

//   gridClick = (gridItem, event) => {
//     getTemplate({
//       id: gridItem.templateNumber,
//       tid: new Date().toISOString().replace(/T|Z|-|:/g, ""),
//       template_name: gridItem.templateName
//     }).then(res => {
//       if (res.savedtemplate) {
//         this.setState({
//           generateReport: true,
//           htmlData: atob(res.savedtemplate),
//           gridItem,
//           fromSavedHtml: true
//         });
//       } else {
//         this.setState({
//           toastMessage: res.message,
//           toastOpen: true,
//           toastVariant: "error"
//         });
//       }
//     });
//   };

//   render() {
//     const {
//       templates,
//       productsList,
//       selectedProduct,
//       openProduct,
//       open,
//       toastMessage,
//       toastOpen,
//       toastVariant,
//       showLoader,
//       generateReport,
//       removeTemplate,
//       removeTemplateMsg,
//       fromSavedHtml,
//       gridItem,
//       permissions,
//       templateRes
//     } = this.state;

//     return (
//       <div>
//         <Dialog
//           open={open}
//           className="add-dialog"
//           onClose={this.handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           {removeTemplate && removeTemplateMsg}

//           <DialogActions>
//             {removeTemplate && (
//               <Button
//                 color="primary"
//                 id="designer-template-dlt-yes"
//                 variant="contained"
//                 size="small"
//                 onClick={this.removeTemplate}
//               >
//                 {"    "}
//                 Yes
//               </Button>
//             )}
//             <Button
//               color=""
//               size="small"
//               variant="contained"
//               onClick={this.handleClose}
//             >
//               {" "}
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>
//         {!generateReport ? (
//           <div className="charts-container">
//             <Snackbar
//               anchorOrigin={{ vertical: "top", horizontal: "right" }}
//               open={toastOpen}
//               autoHideDuration={3000}
//               onClose={() => {
//                 this.setState({ toastOpen: false });
//               }}
//             >
//               <NotificationMessage
//                 variant={toastVariant}
//                 message={toastMessage}
//                 onClose={() => {
//                   this.setState({ toastOpen: false });
//                 }}
//               />
//             </Snackbar>
//             {showLoader && (
//               <MyCircularProgress
//                 style={{
//                   width: "67px",
//                   height: "67px",
//                   position: "absolute",
//                   left: "700px",
//                   zIndex: "9999",
//                   top: "300px"
//                 }}
//               />
//             )}
//             <Paper className="chart-paper">
//               <FormControl className="product-select">
//                 <InputLabel id="demo-simple-select-label">Product</InputLabel>
//                 <Select
//                   id="product-select-designer"
//                   value={selectedProduct}
//                   onChange={this.changeProduct.bind(this)}
//                   onClick={() => this.setState({ openProduct: true })}
//                   open={openProduct}
//                   onClose={event => {
//                     event.stopPropagation();
//                     this.setState({ openProduct: false });
//                   }}
//                 >
//                   {productsList.map(productItem => (
//                     <MenuItem
//                       value={productItem.value}
//                       disabled={productItem.disableProduct}
//                     >
//                       {productItem.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>

//               {permissions.generate_report && (
//                 <Button
//                   id="create-template-btn"
//                   variant="contained"
//                   className="report-button"
//                   onClick={this.addTemplate.bind(
//                     this,
//                     "template",
//                     this.state.selectedProduct
//                   )}
//                 >
//                   Create Template
//                 </Button>
//               )}
//               {templates &&
//                 templates.length > 0 &&
//                 templates.map((item, index) => (
//                   <div key={"item" + index}>
//                     <div className="product-name">
//                       <span>{item.product_name}</span>{" "}
//                       <span className="product-minus">
//                         <i class="material-icons">remove_circle_outline</i>
//                       </span>{" "}
//                     </div>

//                     <div className="grids-container">
//                       <Grid container>
//                         {item.grids &&
//                           item.grids.length > 0 &&
//                           item.grids.map((gridItem, gridIndex) => (
//                             <Grid item xs={6}>
//                               <iframe
//                                 id={"reportiframe" + gridItem.templateNumber}
//                                 height="300px"
//                                 width="570px"
//                               >

//                               </iframe>
//                               <Button
//                                 id={"template-btn" + gridItem.templateNumber}
//                                 variant="contained"
//                                 style={{ marginLeft: "27%" }}
//                               >
//                                 <span
//                                   onClick={
//                                     permissions.edit_existing_templates &&
//                                     this.gridClick.bind(this, gridItem)
//                                   }
//                                   id={
//                                     "display-template-btn" +
//                                     gridItem.templateNumber
//                                   }
//                                 >
//                                   Template Name: {gridItem.templateName} <br />
//                                   Template No: {gridItem.templateNumber}
//                                 </span>
//                                 <span
//                                   id={
//                                     "deletetemplate" + gridItem.templateNumber
//                                   }
//                                   className=" material-icons grid-minus"
//                                   onClick={this.removeTemplateDialog.bind(
//                                     this,
//                                     gridItem.templateNumber,
//                                     gridItem.templateName
//                                   )}
//                                 >
//                                   highlight_off
//                                 </span>
//                               </Button>
//                             </Grid>
//                           ))}
//                         <div
//                           className="grid-plus"
//                           onClick={
//                             permissions.generate_report &&
//                             this.addTemplate.bind(
//                               this,
//                               "template",
//                               item.product_name
//                             )
//                           }
//                         >
//                           +
//                         </div>
//                       </Grid>
//                     </div>
//                   </div>
//                 ))}
//             </Paper>
//           </div>
//         ) : (
//           <div className="report-container">
//             <ReportTemplate
//               html={fromSavedHtml ? this.state.htmlData : ""}
//               gridItem={fromSavedHtml ? gridItem : null}
//               templateNo={
//                 templateRes.length &&
//                 templateRes.reduce(function (prev, current) {
//                   return prev.templateno > current.templateno ? prev : current;
//                 }).templateno + 1
//               }
//               templateName={this.state.templateName}
//               fromSavedHtml={fromSavedHtml}
//               selectedProduct={selectedProduct}
//               cancelTab={this.handleCanceltab}
//               templateSaved={this.handleTemplateSaved}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }
// const DataCharts = withRouter(DataChartsComponent);
// export default withRouter(connect(mapStateToProps)(DataCharts));
