Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});


describe("Render View Creation Load Error Log", () => {
	beforeEach(() => {
		cy.viewport(1360, 780)
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
		localStorage.setItem("username", "Fahad");
		localStorage.setItem(
			"login_details",
			JSON.stringify({
				ad_role: false,
				email_id: "fahad.siddiqui@mareana.com",
				firstname: "Fahad",
				lastname: "siddiqui",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
			})
		);

		cy.intercept('GET', '**/views-list', { fixture: 'viewList.json' }).as('viewList')
	})

	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.wait(10000).then(() => {
			cy.visit(url + '/#/dashboard/view_creation')
			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/view_creation')
		})
	})

	it('Load View Landing Page Correctly', () => {
		cy.log('Create a New View Creation')
		cy.get('.create-new > .anticon > svg').click({ force: true });
		cy.intercept('POST', '**/molecules3', { fixture: 'moleculeError401.json' })
	})

	it('Create a New View', () => {
		const url = Cypress.config().baseUrl
		cy.wait(10000).then(() => {
			cy.log('Verify New View Creation URL ')
			cy.url().should('eq', url + '/#/dashboard/view_creation/0')
		})


	})

	it('Molecule Error Check', () => {
		cy.wait(10000).then(() => {
			cy.log("Verify 401 error")
		})
	})
})

describe("Render View Creation Load", () => {
	beforeEach(() => {
		cy.viewport(1360, 780)
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
		localStorage.setItem("username", "Fahad");
		localStorage.setItem(
			"login_details",
			JSON.stringify({
				ad_role: false,
				email_id: "fahad.siddiqui@mareana.com",
				firstname: "Fahad",
				lastname: "siddiqui",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
			})
		);
	})


	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.intercept('GET', '**/views-list', { fixture: 'viewList.json' }).as('viewList')

		cy.wait(20000).then(() => {
			cy.visit(url + '/#/dashboard/view_creation')

			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/view_creation')
		})

	})

	it('Select View ID', () => {
		cy.log('Select View ID - V348')
		cy.get('[href="#/dashboard/view_creation/V348&1"] > .chart-tiles').click()
	})


	it('View Summary Load', () => {
		cy.log('Verift View Id')
		cy.get('.view-summary_lable > :nth-child(1) > :nth-child(1)').should("have.text", "View ID : ")
		cy.get('.view-summary_lable > :nth-child(1) > :nth-child(2)').should("have.text", "V348")

		cy.log('Verift View Status')
		cy.get('.view-summary_lable > :nth-child(2) > :nth-child(1)').should("have.text", "Status : ")
		cy.get('.view-summary_lable > :nth-child(2) > :nth-child(2)').should("have.text", "APRD")

		cy.log('Verift View Version')
		cy.get('.view-summary_lable > :nth-child(3) > :nth-child(1)').should("have.text", "Version : ")
		cy.get('.view-summary_lable > :nth-child(3) > :nth-child(2)').should("have.text", "1")
	})

	it('View Summary Delete Function', () => {
		cy.log('Delete Function')
		cy.get(':nth-child(2) > .summary-column > :nth-child(2) > .anticon > svg').click()
	})


})

describe("Render View Creation Page", () => {
	beforeEach(() => {
		cy.viewport(1360, 780)
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
		localStorage.setItem("username", "Fahad");
		localStorage.setItem(
			"login_details",
			JSON.stringify({
				ad_role: false,
				email_id: "fahad.siddiqui@mareana.com",
				firstname: "Fahad",
				lastname: "siddiqui",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
			})
		);
	})

	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.intercept('GET', '**/views-list', { fixture: 'viewList.json' }).as('viewList')

		cy.wait(20000).then(() => {
			cy.visit(url + '/#/dashboard/view_creation')

			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/view_creation')
		})

	})


	it('Load Screen Header', () => {
		const date = new Date();
		const month = date.toLocaleString('default', { month: 'long' });
		const latestDate = date.getDate();
		const year = date.getFullYear();
		const currentDate = month + ' ' + latestDate + ',' + ' ' + year;

		cy.log('Verify Screen Header Component')
		cy.get('.screen_header_head')

		cy.log('Verify Header Text')
		cy.get('.screen_header_text').should("have.text", "Let’s get configuring some Views!")

		cy.log('Verify Current Date')
		cy.get('.screen_header_resultdate').should("have.text", currentDate)
	})

	it('Load Landing Page Table Component', () => {
		cy.log('Load Search Bar')
		cy.log('Search View Id In Search Component')
		cy.get("input[placeholder='Search by view ID or name']").clear()
		cy.get("input[placeholder='Search by view ID or name']").type("V288")
		cy.get(".ant-input-search-button").click()

		cy.log('Verify Search Result In Table')
		cy.get('.ant-table-row > :nth-child(1) > div').should("have.text", "V288-1")
		cy.get('.ant-table-row > :nth-child(3) > div').should("have.text", "APRD")
		cy.get('.ant-table-row > :nth-child(4) > div').should("have.text", "K krishnapriyam@mareana.com")
	})

	it('Recently Created View', () => {
		cy.log('Recent View Verify')
		cy.get('.tile').should('have.length', 1)
	})

	it('Load View Landing Page Correctly', () => {
		cy.log('Create a New View Creation')
		cy.get('.create-new > .anticon > svg').click({ force: true });
		cy.intercept('POST', '**/molecules3', { fixture: 'listMolecule.json' })
	})

	it('Create a New View', () => {
		const url = Cypress.config().baseUrl
		cy.intercept('POST', '**/molecules3', { fixture: 'listMolecule.json' })
		cy.wait(20000).then(() => {
			cy.log('Verify New View Creation URL ')
			cy.url().should('eq', url + '/#/dashboard/view_creation/0')
		})
	})

	it('Render Parameter Lookup', () => {
		cy.wait(500).then(() => {
			cy.log('Select a Molecule')
			cy.get('#rc_select_0').click({ force: true })
			cy.get('div[title="BELATACEPT"]').click({ force: true })

			cy.log('Verify Selected Molecule')
			cy.get('.ant-select-selection-item').should("have.text", "BELATACEPT")
		})
		cy.intercept('POST', '**/molecules3', { fixture: 'moleculeData.json' })
	})

	it('Render Process Hierarchy', () => {
		cy.log('Load Process Hierarchy')

		cy.wait(500)
		cy.log('Verify first treenode title')
		cy.get(':nth-child(2) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode > .ant-tree-node-content-wrapper > .ant-tree-title').should('have.text', '140L')

		cy.wait(500)
		cy.log('Click first treenode')
		cy.intercept('POST', '**/molecules3', { fixture: 'firstNodeMol.json' }).as('firstNodeMol')
		cy.wait(500)
		cy.get(':nth-child(2) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode > .ant-tree-node-content-wrapper > .ant-tree-title').click()
		cy.wait(500)
		cy.get('.ant-tree-switcher > .anticon > svg > path').click()

		cy.wait('@firstNodeMol').then(() => {
			cy.log('Verify second treenode title')
			cy.get(':nth-child(2) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode-switcher-close > .ant-tree-node-content-wrapper > .ant-tree-title').should('have.text', 'SODIUM CARBONATE ANHYDROUS NF/EP')
		})

		cy.intercept('POST', '**/molecules3', { fixture: 'secondNodeMol.json' }).as('secondNodeMol')

		cy.wait(500)
		cy.log('Click second treenode')
		cy.get(':nth-child(2) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode-switcher-close > .ant-tree-node-content-wrapper > .ant-tree-title').click({ force: true })

		cy.wait(500)
		cy.get('.ant-tree-treenode-switcher-close > .ant-tree-switcher > .anticon > svg').click()
		cy.wait('@secondNodeMol').then(() => {
			cy.log('Verify third treenode title')
			cy.log('Verify first tree index name');
			cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .ant-tag').should('have.text', 'ARSENIC')
			cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .treenode-coverage').should('have.text', '3%(1/33)')
			cy.wait(100)
		})

		cy.log('Click on Paramter')
		cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2) > .anticon > svg').click()
		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2) > .anticon > svg').click()

		cy.get('.viewCreation-materials > .ant-collapse-icon-position-left > .viewCreation-materialsPanel > .ant-collapse-header').click()
	})

	it('Filter Paramter lookup ', () => {
		cy.log('Filter Molecule')
		cy.get('.search-block > .ant-select > .ant-select-selector > .ant-select-selection-item').click({ force: true });
		cy.get("#rc_select_1").clear();

		cy.log('Type Molecule Name')
		cy.get("#rc_select_1").type("ARSENIC");
		cy.wait(700)
		cy.get('[title="2_1176024_ARSENIC"] > .ant-select-item-option-content').click({ force: true });

		cy.log('Clear Molecule')
		cy.get('.search-block > .ant-btn > .anticon > svg').click()
	})

	it('Download Template File ', () => {
		cy.log('verify download template')
		cy.get('#download-temp').click()
	})

	it('File Upload ', () => {
		cy.log('Click Upload Button')

		cy.get('.materials-uploadFiles > .ant-btn').click()

		cy.log('File Upload Popup Open')
		cy.get('.fileUploadModal').should('be.visible')

		cy.log('Select a file')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypress_mol_batch_file.xlsx' }, { force: true })

		cy.log('Verfiy Uploaded File')
		cy.get('.ant-upload-list-item-name').should('have.text', 'cypress_mol_batch_file.xlsx')

		cy.log('Upload file Id')
		cy.get('#upload-file > span').click()

		cy.get('.panelHeader_span').should('have.text', 'cypress_mol_batch_file')

		cy.log('Delete Uploaded File')
		cy.get('.fileUpload-delete > .anticon > svg').click()
		cy.get('.ant-popover-inner-content').should('be.visible')
		cy.get('.ant-popover-buttons > .ant-btn-primary > span').click()

		cy.log("upload file again")
		cy.get('.materials-uploadFiles > .ant-btn').click()

		cy.log('Select a file')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypress_mol_batch_file.xlsx' }, { force: true })

		cy.log('Upload file Id')
		cy.get('#upload-file > span').click()

		cy.get('.panelHeader_span').should('have.text', 'cypress_mol_batch_file')

		cy.get('.materials-wrapper > .ant-collapse > .ant-collapse-item > .ant-collapse-header > :nth-child(1) > .anticon > svg').click()

		cy.get('.ant-table-tbody > :nth-child(1) > :nth-child(1) > .ant-tag').should('have.text', 'AMMONIUM -A')
		cy.get('.ant-table-content > table > .ant-table-tbody > :nth-child(1) > :nth-child(2)').should('have.text', '44.44 %')
		cy.get('.ant-table-content > table > .ant-table-tbody > :nth-child(1) > :nth-child(3)').should('have.text', '4/9')

		cy.log('Select File Parameter')
		cy.get(':nth-child(1) > :nth-child(4) > .material-addIcon > .anticon > svg').click()

		cy.get('.viewCreation-accordian > [role="button"] > div > .anticon > svg').click()

	})

	it('Render Script Editor & View Summary', () => {
		cy.log('verify right container')
		cy.get('.viewCreation-rightBlocks').should('be.visible')
	})

	it('Create a variable', () => {
		cy.wait(500)
		cy.log('Verify Variable Wrapper')
		cy.get('.variable-wrapper').should('be.visible')

		cy.wait(500)
		cy.log('Verify Create Variable Card')
		cy.get('.add-var_block').should('be.visible')

		cy.wait(500)
		cy.log('Verify Create Variable Card text name')
		cy.get('#create-variable > p').should("have.text", "Create Variable")

		cy.wait(500)
		cy.log("Click on card to create a variable")
		cy.get('#create-variable > p').click()

		cy.wait(500)
		cy.log('Verify Select Parameter Card text name')
		cy.get('#select-parameters').should("have.text", "Select parameters")

		cy.log("Delete Parameter")
		cy.get('[data-row-key="2_ASSAY 1DECPT"] > [style="position: sticky; left: 31.9922px;"] > .anticon > svg').click()

		cy.log('Click On checkbox to select a parameter')
		cy.get('[data-row-key="2_ARSENIC"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
		cy.get('[data-row-key="1322454-AMMONIUM -A"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();

		cy.log('Select a primary')
		cy.get('[data-row-key="2_ARSENIC"] > [style="position: sticky; left: 221.992px;"] > .ant-radio-wrapper > .ant-radio > .ant-radio-input').check();

		cy.log('Select a Aggregation')
		cy.get('[data-row-key="2_ARSENIC"] > .ant-table-cell-fix-left-last > .ant-select > .ant-select-selector').click({ force: true })
		cy.get('div[title="Mean"]').click({ multiple: true })

		cy.wait(500)
		cy.log('Render popup with volume data')
		cy.get('.param-column > :nth-child(1) > .anticon > svg').click()

		cy.wait(500)
		cy.log("Search Batch ABL2258")
		cy.get('.ant-input-affix-wrapper > .ant-input').type("ABL2258")
		cy.get('.ant-input-group-addon > .ant-btn > .anticon').click()

		cy.wait(500)
		cy.log("Change batch value")
		cy.get('.batch-table-block > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(2)').click()

		cy.get('.batch-table-footer > .ant-btn > span').click()
		cy.wait(1000)
		cy.log('Verify Done Card & Click On')
		cy.get('#done > span').should("have.text", "Done")
		cy.get('#done > span').click()

		cy.wait(1000)
		cy.log("Modal should open")
		cy.get('.ant-modal-content').should('be.visible')
		cy.wait(1000)

		cy.log("Add Variable Name");
		cy.get('.input_field > .ant-input').clear();
		cy.get('.input_field > .ant-input').type('var1');

		cy.get('.variable-cancel-button > .ant-btn').click();
		cy.get('.add-var_block > .ant-btn > span').click();

		cy.get('.input_field > .ant-input').clear();
		cy.get('.input_field > .ant-input').type('var1');

		cy.log("Create A Variable");
		cy.get('.variable-name-popup > .ant-btn').click();

		cy.log("Click on card to create a variable")
		cy.get('.add-var_block > div > p').click()

		cy.log('Click On checkbox to select a parameter')
		cy.get('[data-row-key="1322454-AMMONIUM -A"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();

		cy.log('Verify Done Card & Click On')
		cy.get('.add-var_block > .ant-btn > span').should("have.text", "Done")
		cy.get('.add-var_block > .ant-btn > span').click()

		cy.wait(1000)
		cy.log("Modal should open")
		cy.get('.ant-modal-content').should('be.visible')
		cy.wait(1000)

		cy.log("Add Variable Name");
		cy.get('.input_field > .ant-input').clear();
		cy.get('.input_field > .ant-input').type('var2');

		cy.log("Create A Variable");
		cy.get('.variable-name-popup > .ant-btn').click();

		cy.log("Edit Variable")
		cy.get(':nth-child(3) > .var-btn > #edit-btn > .anticon > svg').click({ force: true })

		cy.log('delete variabale')
		cy.get(':nth-child(3) > .var-btn > #delete-btn > .anticon > svg').click({ force: true })

		cy.log('Enter variable name to script');
		cy.get('.w-tc-editor-text').type('var1');

	})

	it('Render Function Evaluation', () => {
		cy.intercept('GET', '**/view-evaluate', { fixture: 'funEvalutionData.json' });
		cy.log('Validate Function');
		cy.get('.custom-secondary-btn-link > span').click();

		cy.wait(1000)
		cy.log('Function data modal open');
		cy.get('.ant-modal-content').should('be.visible');

		cy.wait(2000);
		cy.log('Function Modal Closed');
		cy.get('.eval-func-modal > .ant-modal-content > .ant-modal-close > .ant-modal-close-x > .anticon > svg').click();
	})

	it('Render Function Creation', () => {
		cy.wait(1000);
		cy.log('Function Modal Open');
		cy.get('.custom-secondary-btn> span').click({ force: true })
		cy.wait(1000);

		cy.log('Enter function name');
		cy.get('.function-input > .input_field > .ant-input').type('function_1');

		cy.log("Save Function")
		cy.get('.function-btn > .ant-btn-text > span').click({ force: true })
		cy.wait(2000);
	})

	it('Save View Creation', () => {
		cy.wait(500)
		cy.log('Save Button Click');
		cy.get('#save-view > span').click()

		cy.log('Enter View Name');
		cy.get('#view-name').type("View Test")

		cy.get('#cancel-save > span').click()
	})
});
