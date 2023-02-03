
const TableauDashboard = () => {
	// var placeholderDiv = document.getElementById("tableauViz");
	// var url = "https://prod-useast-a.online.tableau.com/t/mareanatableau/views/dashboard/Dashboard1";
	// var options = {
	// 	hideTabs: true,
	// 	width: "1000px",
	// 	height: "840px"
	// };
	// var viz = new tableauSoftware.Viz(placeholderDiv, url, options);

	// setInterval(function () { viz.refreshDataAsync() }, 10000);

	return (
		<div id="tableauViz">

			<iframe style={{ padding: '20px', overflow: 'scroll', height: '100vh' }}
				//src={DASHBOARD_URL + endPoint}
				src='https://prod-useast-a.online.tableau.com/t/mareanatableaudashboard/views/dashboard/Dashboard3?:showVizHome=no&:embed=tru'
				width="100%"
				height="1200"
				frameBorder="0"
			></iframe>
		</div>
	)
};

export default TableauDashboard

// import React, { Component } from 'react';
// import * as tableau from 'tableau-api';

// class TableauDashboard extends Component {

// 	componentDidMount() {
// 		this.initViz();
// 	}

// 	initViz() {
// 		const vizUrl = 'http://public.tableau.com/views/RegionalSampleWorkbook/Storms';
// 		const vizContainer = this.vizContainer;
// 		const options = {
// 			width: this.vizContainer.offsetWidth,
// 			height: this.vizContainer.offsetHeight,
// 		};
// 		let viz = new window.tableau.Viz(vizContainer, vizUrl, options);
// 	}

// 	render() {
// 		return (
// 			<div className='vizDiv' ref={(div) => { this.vizContainer = div }}>
// 			</div>
// 		)
// 	}
// }


// export default TableauDashboard;
