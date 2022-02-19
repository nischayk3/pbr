// import React from "react";
// //import CKEditor from "ckeditor4-react";
// import { Button, TextField } from "@material-ui/core";
// import { FaFilePdf, FaWindowClose } from "react-icons/fa";
// import Dialog from "@material-ui/core/Dialog";
// import * as moment from "moment";
// import $ from 'jquery';
// import DialogActions from "@material-ui/core/DialogActions";
// import Snackbar from "@material-ui/core/Snackbar";
// import NotificationMessage from "../../../../../utilities/snackbarComponent/components/MySnackbarComponent";
// import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
// import { CircularProgress, withStyles } from "@material-ui/core";

// import { publishTemplate } from "actions/reportAction";

// const MyCircularProgress = withStyles({})(CircularProgress);
// class ReportTemplate extends React.Component {
//   state = {
//     html: this.props.html,
//     open: false,
//     templateName: "",
//     toastOpen: false,
//     toastMessage: null,
//     toastVariant: null
//   };

//   componentDidMount() { }

//   onEditorChange = evt => {
//     const data = evt.editor.getData();
//     this.setState({ html: data });
//   };

//   handleOpenDialog = () => {
//     this.setState({ open: true });
//   };

//   handleCloseDialog = () => {
//     this.setState({ open: false });
//   };

//   handleTemplateName = event => {
//     this.setState({ templateName: event.target.value });
//   };
//   handlePublishTemplate = (status, type) => {
//     let data = new FormData();
//     let file = new File(
//       [this.state.html],
//       this.props.fromSavedHtml && type === "update"
//         ? this.props.gridItem.templateName + ".html"
//         : this.state.templateName + ".html",
//       {
//         type: "text/html",
//         lastModified: new Date()
//       }
//     );
//     data.append("file", file);
//     let request = {
//       file_name:
//         this.props.fromSavedHtml && type === "update"
//           ? this.props.gridItem.templateName + ".html"
//           : this.state.templateName + ".html",
//       product: this.props.selectedProduct,
//       date_created: moment(new Date()).format("DD-MMM-YYYY"),
//       created_by: "demo",
//       transactionid: new Date().toISOString().replace(/T|Z|-|:/g, ""),
//       source_system: "CPV",
//       identification: "405987654567898",
//       param1: "",
//       param2: "",
//       status: status,
//       template_no: this.props.fromSavedHtml && type === "update"
//         ? this.props.gridItem.templateNumber
//         : this.props.templateNo,
//       template_name:
//         this.props.fromSavedHtml && type === "update"
//           ? this.props.gridItem.templateName
//           : this.state.templateName,
//       param3: null
//     };

//     data.append("request", JSON.stringify(request));
//     this.setState({ showLoader: true })
//     publishTemplate(data).then(res => {

//       if (res.data.message.includes("Successfully")) {
//         this.setState({
//           toastOpen: true,
//           toastMessage: res.data.message,
//           toastVariant: "success",
//           showLoader: false,
//           open: false
//         });
//         setTimeout(() => {
//           this.props.templateSaved();
//         }, 2000)

//       } else {
//         this.setState({
//           toastOpen: true,
//           toastMessage: res.data.message,
//           toastVariant: "error",
//           showLoader: false,
//           open: false
//         })
//       }
//     });
//   };

//   handleCancel = () => {
//     this.props.cancelTab();
//   };
//   prepareHtml = () => {
//     let html = '<article id="printWindow" style="margin: 0.5cm auto;background: #eeeeee;padding-top: 10px"><article style="margin: 20px auto;width:21.5cm;max-height:28cm;  min-height:28cm;padding: 1cm 1.2cm 2cm;background-color: #fff;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"></article>';
//     this.setState({ html });
//     return html;
//   };

//   handleaddPage = () => {
//     let html = this.state.html;
//     $('.cke_wysiwyg_frame').each(function (index) {
//       $(this).contents().find('#printWindow').append('<div style="page-break-before: always; margin-top: 20px"><span style="display: none;">&nbsp;</span></div><article style="margin: 20px auto;width:21.5cm;max-height:28cm; min-height:28cm;padding: 1cm 1.2cm 2cm;background-color: #fff;box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);"></article>');
//     });
//     this.setState({ html })
//   }
//   render() {
//     const html = this.state.html ? this.state.html : this.prepareHtml();
//     const { toastMessage, toastOpen, toastVariant, showLoader } = this.state;
//     const { fromSavedHtml } = this.props;
//     return (
//       <div>
//         <Snackbar
//           anchorOrigin={{ vertical: "top", horizontal: "right" }}
//           open={toastOpen}
//           autoHideDuration={3000}
//           onClose={() => {
//             this.setState({ toastOpen: false });
//           }}
//         >
//           <NotificationMessage
//             variant={toastVariant}
//             message={toastMessage}
//             onClose={() => {
//               this.setState({ toastOpen: false });
//             }}
//           />
//         </Snackbar>
//         {showLoader && (
//           <MyCircularProgress
//             style={{
//               width: "67px",
//               height: "67px",
//               position: "absolute",
//               left: "700px",
//               zIndex: "9999",
//               top: "300px"
//             }}
//           />
//         )}
//         <Dialog
//           open={this.state.open}
//           onClose={this.handleCloseDialog}
//           aria-labelledby="alert-dialog-title"
//           aria-describedby="alert-dialog-description"
//         >
//           <DialogTitle id="alert-dialog-title">{"Save Template"}</DialogTitle>
//           <DialogContent>
//             <TextField
//               id="template-dialog-filename"
//               size="small"
//               label="File Name"
//               variant="outlined"
//               autoComplete={"off"}
//               onChange={this.handleTemplateName}
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button
//               id="save-btn-template-dialog"
//               disabled={!this.state.templateName}
//               onClick={this.handlePublishTemplate.bind(this, "Save", "saveNew")}
//               color="primary"
//               size="small"
//               variant="contained"
//             >
//               {"Save"}
//             </Button>
//             <Button

//               onClick={this.handleCloseDialog}
//               size="small"
//               variant="contained"
//             >
//               Cancel
//             </Button>
//           </DialogActions>
//         </Dialog>
//         <Button
//           color="primary"
//           id="add-template-page"
//           variant="contained"
//           style={{
//             marginRight: "12px",
//             marginLeft: fromSavedHtml ? "55%" : "68%"
//           }}
//           onClick={this.handleaddPage}
//         >Add Page</Button>
//         <Button
//           color="primary"
//           variant="contained"
//           style={{
//             marginRight: "12px",
//           }}
//           id="save-template-new"
//           onClick={this.handleOpenDialog}
//         >
//           <i className="fa fa-file-pdf-o"></i>
//           <FaFilePdf
//             className="custom-icon"
//             style={{ marginRight: "5px" }}
//           ></FaFilePdf>
//           Save as New
//         </Button>
//         {fromSavedHtml && (
//           <Button
//             color="primary"
//             variant="contained"
//             style={{
//               marginRight: "12px"
//             }}
//             onClick={this.handlePublishTemplate.bind(
//               this,
//               "In Progress",
//               "update"
//             )}
//             id="save-template"
//           >
//             <i className="fa fa-file-pdf-o"></i>
//             <FaFilePdf
//               className="custom-icon"
//               style={{ marginRight: "5px" }}
//             ></FaFilePdf>
//             Save Template
//           </Button>
//         )}
//         <Button
//           variant="contained"
//           id="template-cancel-btn"
//           style={{
//             margin: "10px"
//           }}
//           onClick={this.handleCancel}
//         >
//           <i className="fa fa-file-pdf-o"></i>
//           <FaWindowClose
//             className="custom-icon"
//             style={{ marginRight: "5px" }}
//           ></FaWindowClose>
//           Cancel
//         </Button>
//         {/* <CKEditor
//           id="ckeditor-template"
//           onChange={this.onEditorChange}
//           data={html}
//           config={{
//             allowedContent: true,
//             height: "800px",
//             extraPlugins: "pagebreak"
//           }}
//           id="ckeditor-template"
//           className={"ckeditor-template"}
//         /> */}
//       </div>
//     );
//   }
// }

// export default ReportTemplate;
