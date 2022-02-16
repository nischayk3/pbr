const dataTableConfig = {
  apiUrl: "",
  enableSort: true,
  enableClientSideSort: false,
  enableColumnSearch: true,
  defaultColumnWidth: "33%",
  defaultSortOrder: "descend",
  enableBorder: true,
  enableSearchBar: true,
  searchBarPlaceholder: "",
  size: "large",
  enableTitleBar: true,
  title: "",
  customTitleBarComponent: "",
  enableFooterBar: false,
  footer: "",
  // searchBarStyle: {
  //   float: "right",
  //   marginBottom: "5px",
  // },
  // columnStyle: {
  //   app_id: {
  //     width: "33%",
  //   },
  // },
  // searchableColumns: [],
//   pagination: {
//     pageSize: 10,
//     current: 1,
//   },
  fixedHeader: {
    y: 400,
    scrollToFirstRowOnChange: true,
  },
};

export default dataTableConfig;
