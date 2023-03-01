Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

describe("Analysis", () => {
	beforeEach(() => {
		cy.viewport(1366, 768);

		cy.loginWithAD()

		cy.intercept("GET", "**/pipeline-list", {
			fixture: "analysisLanding.json",
		});
		cy.intercept("GET", "**/views-list?vew_status=APRD", {
			fixture: "analysisViewList.json",
		});
		cy.intercept("GET", "**/chart-object", {
			fixture: "analysisChartObjLanding.json",
		});
		cy.intercept("GET", "**/site_ids?view_id=V238", {
			fixture: "analysisSite.json",
		});
		cy.intercept("POST", "**/analysis-preprocessing", {
			fixture: "analysisPre.json",
		});
		cy.intercept("POST", "**/chart-object", {
			fixture: "analysisPostChart.json",
		});
		cy.intercept("GET", "**/analysis-result?pipelineid=P360", {
			fixture: "analysisResults.json",
		});
		cy.intercept("PUT", "**/pipelines", { fixture: "putPipeline.json" });
		cy.intercept("POST", "**/model-data", {
			fixture: "analysisPostModal.json",
		});
		cy.intercept("POST", "**/jobs", {
			fixture: "analysisExecute.json",
		});
	});

	afterEach(() => {
		cy.viewport(1366, 768);

		cy.loginWithAD()

		cy.intercept("GET", "**/pipeline-list", {
			fixture: "analysisLanding.json",
		});
		cy.intercept("GET", "**/views-list?vew_status=APRD", {
			fixture: "analysisViewList.json",
		});
		cy.intercept("GET", "**/chart-object", {
			fixture: "analysisChartObjLanding.json",
		});
		cy.intercept("GET", "**/site_ids?view_id=V238", {
			fixture: "analysisSite.json",
		});
		cy.intercept("POST", "**/analysis-preprocessing", {
			fixture: "analysisPre.json",
		});
		cy.intercept("POST", "**/chart-object", {
			fixture: "analysisPostChart.json",
		});
		cy.intercept("GET", "**/analysis-result?pipelineid=P360", {
			fixture: "analysisResults.json",
		});
		cy.intercept("PUT", "**/pipelines", { fixture: "putPipeline.json" });
		cy.intercept("POST", "**/model-data", {
			fixture: "analysisPostModal.json",
		});
	});

	it("Visit Analysis Landing Page", () => {
		cy.log("Visit Landing page");
		const url = Cypress.config().baseUrl;
		cy.visit(url + "/#/dashboard/analysis");
		cy.log("Load Landing Page");
		cy.url().should("eq", url + "/#/dashboard/analysis");
	});

	it("Create New Pipeline", () => {
		cy.log("Creating New Pipeline");
		cy.get(".create-new").click({ force: true });

		cy.log("Enter name of pipeline");
		cy.get(".input_field > .ant-input").click();

		cy.log("Type in Landing page");
		cy.get(".input_field > .ant-input").type("new_pipeline", { force: true });

		cy.log("Select View");
		cy.get(".ant-input-wrapper > .ant-input").click({ force: true });
		cy.get("p > .anticon > svg").click({ force: true });

		cy.log("Search View");
		cy.get(
			".header-title > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input"
		).click({ force: true });
		cy.get(
			".header-title > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input"
		).type("v475{enter}", { force: true });
		cy.get(".ant-table-row > :nth-child(1)").click({ force: true });

		cy.log("Click Ok");
		cy.get(".custom-secondary-btn").click({ force: true });

		cy.log("Select Version");
		cy.get(".ant-select-selector").click({ force: true });

		cy.log("Click Next");
		cy.get(".button-mt > .ant-btn").click({ force: true });

		cy.log("Site Select");
		cy.get("#rc_select_2").click({ force: true });
		cy.get(".ant-select-item-option-content").click({ force: true });

		cy.log("Switch and date range");
		cy.get(".ant-switch").click({ force: true });
		// cy.get(".ant-picker").click({ force: true });
		// cy.get(
		// 	":nth-child(5) > .ant-picker-cell-today > .ant-picker-cell-inner"
		// ).click();
		cy.wait(2000);
		cy.log("Landing");
		cy.get(".button-gap > .custom-secondary-btn").click({ force: true });
	});

	it("Preprocessing Tab", () => {
		cy.log("Preprocessing Tab");
		cy.wait(10000);
		cy.get(".ant-select-selection-overflow").click({ force: true });
		cy.wait(1000);
		cy.log("Select Option from  Tab");
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).click({ force: true });
		cy.get(":nth-child(2) > .ant-col > .ant-btn > span").click({ force: true });
		cy.wait(1000);
		cy.get('.ant-select-clear > .anticon > svg > path').click({ force: true });
		cy.get(":nth-child(2) > .ant-col > .ant-btn > span").click({ force: true });
		cy.wait(1000);
		cy.log("Select checkbox in preprocess Tab");
		cy.get('.ant-table-selection-extra > .ant-dropdown-trigger').click({ force: true })
		cy.get(
			".ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input"
		).check({ force: true });
		cy.wait(1000);
		cy.log("Save and move to modal Tab");
		cy.get(".save-button > .ant-col > .ant-btn").click({ force: true });
	});

	it("Modal Tab", () => {
		cy.log(
			"modal tab is the response from the api itself no function of the tab"
		);
		cy.wait(5000);
		cy.get(".ant-tabs-nav-list > :nth-child(3)").click();
	});

	it("Modal Estimator Node  ", () => {
		cy.wait(10000);
		cy.get('.react-flow__node-EstimatorNode > [style="text-align: center;"] > [style="display: flex; flex-direction: column; align-items: center;"] > button').click()
		cy.get('.select_field > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).click({ force: true, multiple: true });
		cy.get(':nth-child(3) > .ant-select-selector > .ant-select-selection-item').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).rightclick({ force: true, multiple: true });
		cy.get('center').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).click({ force: true, multiple: true });
		cy.get('.metrics > .ant-col > .ant-select > .ant-select-selector > .ant-select-selection-overflow').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).click({ force: true, multiple: true });
		cy.get('.ant-col > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').click();
		cy.wait(5000)
		cy.get('[data-row-key="1"] > :nth-child(4) > .ant-input').type('mean')
		cy.get('[data-row-key="2"] > :nth-child(4) > .ant-input').type(10)
		cy.get('[data-row-key="3"] > :nth-child(4) > .ant-input').type(2.0)
		cy.get('.ant-modal-footer > .ant-btn').click();
		cy.get('#save_changes').click();
	});

	it("Modal Simple Imputer Node", () => {
		// cy.wait(10000);
		cy.get('[data-id="imp-5"] > [style="text-align: center;"] > [style="display: flex; flex-direction: column; align-items: center;"] > button').click();
		cy.get(':nth-child(3) > .ant-select > .ant-select-selector').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).rightclick({ force: true, multiple: true });
		cy.get('center').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).click({ force: true, multiple: true });
		cy.get('.drawer-details > .ant-btn').click();
	})

	it("Modal Encoder Node", () => {
		cy.get('[data-testid="rf__node-enco-1"] > [style="text-align: center;"] > [style="display: flex; flex-direction: column; align-items: center;"] > button').click();
		cy.get(':nth-child(2) > .ant-select > .ant-select-selector').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).rightclick({ force: true, multiple: true });
		cy.get('center').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).click({ force: true, multiple: true });
		cy.get('.drawer-details > .ant-btn > span').click();
	});

	it("Modal Feature Union Node", () => {
		cy.get('.react-flow__node-FeatureUninonNode > [style="text-align: center;"] > [style="display: flex; flex-direction: column; align-items: center;"] > button').click();
		cy.get('.ant-select-selector > .ant-select-selection-item').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).rightclick({ force: true, multiple: true });
		cy.get('center').click();
		cy.get(
			".ant-select-item-option-active > .ant-select-item-option-content"
		).click({ force: true, multiple: true });
		cy.get('.drawer-details > .ant-btn > span').click();
	});


	it("Modal CARB_NORMAL Node  ", () => {
		cy.wait(2000);
		cy.get('[data-id="horizontal-2"] > .node-inside').click();
		cy.get('.ant-modal-close-x').click();
	});

	it("Modal NORMAL_MUV_HEAVY Node  ", () => {
		cy.wait(2000);
		cy.get('[data-id="horizontal-3"] > .node-inside').click();
		cy.get('.ant-modal-close-x').click();

	});

	it("Results Screen", () => {
		cy.get('#rc-tabs-0-tab-5').click();
		cy.get(':nth-child(1) > .ant-collapse-header').click();
		cy.get(':nth-child(2) > .ant-collapse-header').click();
	})

	it("Save Pipeline", () => {
		cy.get('.btns > div > :nth-child(3)').click();
		cy.wait(5000);
	})

	// it("Transformations", () => {
	// 	cy.wait(5000);
	// 	cy.get(".ant-tabs-nav-list > :nth-child(4)").click();
	// 	cy.get("#rc-tabs-1-panel-1 > :nth-child(1) > ul > :nth-child(1)").trigger(
	// 		"mousedown",
	// 		"topRight"
	// 	);
	// 	cy.get(
	// 		".trans-container > .ant-tabs > .ant-tabs-nav > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)"
	// 	).click();
	// });

	it("Execute Pipeline", () => {
		cy.get('.btns > div > .ant-dropdown-trigger').click();
		cy.get('li > :nth-child(1)').click({ force: true, multiple: true });
		cy.wait(60000);
	})

	it("Search in Analysis Landing Page", () => {
		const url = Cypress.config().baseUrl;
		cy.visit(url + "/#/dashboard/analysis");

		cy.log("Search in Landing page");
		cy.get('.ant-input').click({ force: true });

		cy.log("Type in Landing page");
		cy.get('.ant-input').clear({ force: true });
		cy.get('.ant-input').type("P352{enter}", { force: true });
		cy.log("Click on the created pipeline");
		cy.get(".ant-table-row > :nth-child(1)").click({ force: true });
		cy.wait(10000);
		cy.get('#rc-tabs-0-tab-2').click();
		cy.get('.btns > div > :nth-child(1)').trigger('mouseover')
		cy.get('.btns > div > :nth-child(1)').trigger('mouseleave')
	});
});
