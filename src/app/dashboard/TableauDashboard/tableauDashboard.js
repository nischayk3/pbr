
const TableauDashboard = () => {
	var placeholderDiv = document.getElementById("tableauViz");
	var url = "https://prod-useast-a.online.tableau.com/t/mareanatableau/views/dashboard/Dashboard1";
	var options = {
		hideTabs: true,
		width: "1000px",
		height: "840px"
	};
	var viz = new tableauSoftware.Viz(placeholderDiv, url, options);

	setInterval(function () { viz.refreshDataAsync() }, 10000);

	return (
		<div id="tableauViz"></div>
	)
};

export default TableauDashboard
