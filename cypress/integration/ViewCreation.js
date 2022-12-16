Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
	/* returning false here prevents Cypress from failing the test */
	if (resizeObserverLoopErrRe.test(err.message)) {
		return false
	}
})

describe("Render View Creation Load Error Log", () => {
	afterEach(() => {
		localStorage.setItem("loginwith", "WITH_AD");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
			})
		);
		cy.intercept('GET', '**/views-list', { fixture: 'viewList.json' }).as('viewList')
	});

	beforeEach(() => {
		localStorage.setItem("loginwith", "WITH_AD");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
			})
		);
		cy.intercept('GET', '**/views-list', { fixture: 'viewList.json' }).as('viewList')
	});

	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.wait(10000).then(() => {
			cy.visit(url + '/#/dashboard/view_creation')
			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/view_creation')
		})

		cy.log('Create a New View Creation')
		cy.get('.create-new > .anticon > svg').click({ force: true });
		cy.intercept('POST', '**/molecules3', { fixture: 'moleculeError401.json' })
	})

	it('Create a New View', () => {
		const url = Cypress.config().baseUrl
		cy.wait(10000).then(() => {
			cy.log('Verify New View Creation URL ')
			cy.visit(url + '/#/dashboard/view_creation/0')
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
	afterEach(() => {
		localStorage.setItem("loginwith", "WITH_AD");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
			})
		);
	});

	beforeEach(() => {
		localStorage.setItem("loginwith", "WITH_AD");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
			})
		);

	});


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
		cy.log('Select View ID - V484')
		cy.get('[href="#/dashboard/view_creation/V484&1"] > .chart-tiles').click()
	})


	it('View Summary Load', () => {
		cy.wait(2000)
		cy.log('Verift View Id')
		cy.get('.view-summary_lable > :nth-child(1) > :nth-child(1)').should("have.text", "View ID : ")
		cy.get('.view-summary_lable > :nth-child(1) > :nth-child(2)').should("have.text", "V484")

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

	afterEach(() => {
		localStorage.setItem("loginwith", "WITH_AD");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
			})
		);


		cy.intercept('POST', '**/molecules3', { fixture: 'secondNodeMol.json' }).as('secondNodeMol')
	});

	beforeEach(() => {
		localStorage.setItem("loginwith", "WITH_AD");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
			})
		);
		cy.intercept('POST', '**/molecules3', { fixture: 'secondNodeMol.json' }).as('secondNodeMol')
	});

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
		cy.log('Verify Header Text')
		cy.get('.screen_header_text').should("have.text", "Let’s get configuring some Views!")

		cy.log('Verify Current Date')
		cy.get('.screen_header_resultdate').should("have.text", currentDate)
	})

	it('Load Landing Page Table Component', () => {
		cy.log('Load Search Bar')
		cy.log('Search View Id In Search Component')
		cy.get("input[placeholder='Search by view ID or name']").clear()
		cy.get("input[placeholder='Search by view ID or name']").type("V484")
		cy.get(".ant-input-search-button").click({ multiple: true })

		cy.log('Verify Search Result In Table')
		cy.get('.ant-table-row > :nth-child(1) > div').should("have.text", "V484-1")
		cy.get('.ant-table-row > :nth-child(3) > div').should("have.text", "APRD")
		cy.get('.ant-table-row > :nth-child(4) > div').should("have.text", "1")
		cy.get('.ant-table-row > :nth-child(5) > div').should("have.text", "D dinesh.jinjala@mareana.com")
	})

	it('Recently Created View', () => {
		cy.log('Recent View Verify')
		cy.get('.tile').should('have.length', 1)
	})

	it('Load View Landing Page Correctly', () => {
		cy.log('Create a New View Creation')
		cy.wait(2000)
		cy.get('.create-new > .anticon > svg').click({ force: true });
		cy.intercept('POST', '**/molecules3', { fixture: 'listMolecule.json' }).as('listMolecule')
	})

	it('Create a New View', () => {
		const url = Cypress.config().baseUrl
		cy.wait(2000)
		cy.log('Verify New View Creation URL ')
		cy.url().should('eq', url + '/#/dashboard/view_creation/0')
	})

	it('Render Parameter Lookup', () => {
		cy.log('Select a Molecule')
		cy.wait(2000)
		cy.get('#rc_select_0').click({ force: true })
		// cy.get('div[title="BELATACEPT"]').click({ force: true })
		//cy.get('.ant-select-selection-item').first().click()
		cy.get('.ant-select-item-option').first().click()

		cy.log('Verify Selected Molecule')
		cy.get('.ant-select-selection-item').should("have.text", "BELATACEPT")


	})

	it('Render Process Hierarchy', () => {
		cy.log('Verify first treenode title')
		cy.wait(500)
		cy.get(':nth-child(13) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode > .ant-tree-node-content-wrapper > .ant-tree-title').should('have.text', 'Sodium Chloride Solution')

		cy.log('Click first treenode')
		cy.get(':nth-child(13) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode > .ant-tree-node-content-wrapper > .ant-tree-title').click({ multiple: true })
		cy.wait(500)
		cy.get('.ant-tree-switcher > .anticon > svg > path').click({ multiple: true })
		cy.log('Verify second treenode title')
		cy.wait(2000)
		cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title').should('have.text', 'SODIUM CHLORIDE USP/EP BIO')
		cy.log('Click second treenode')
		cy.wait(500)
		cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title').click({ multiple: true })
		cy.wait(500)
		cy.get('.ant-tree-treenode-switcher-close > .ant-tree-switcher > .anticon > svg').click({ force: true })
		cy.wait(500)
		cy.log('Verify first tree index name');
		cy.wait(500)
		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .ant-tag').should('have.text', 'ARSENIC')
		cy.wait(500)
		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .treenode-coverage').should('have.text', '33%(15/45)')
		cy.wait(100)
		cy.log('Click on Parameter')
		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2) > .anticon > svg').click({ multiple: true })

	})

	it('Filter Paramter lookup ', () => {
		cy.intercept('GET', '**/molecules_filter?molecule_name=BELATACEPT&search_text=ARSENIC', { fixture: 'filterMolList.json' }).as('filterMolList')
		cy.log('Filter Molecule')
		cy.get('#filter-molecule').click({ force: true });
		cy.get('#filter-molecule').clear();
		cy.log('Type Molecule Name')
		cy.get('#filter-molecule').type("ARSENIC");
		cy.wait(600)

		cy.wait('@filterMolList').then(() => {
			cy.get('[title="2_1176024_ARSENIC"] > .ant-select-item-option-content').click({ force: true });
		})
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

	// it('Render Script Editor & View Summary', () => {
	// 	cy.log('verify right container')
	// 	cy.get('.viewCreation-rightBlocks').should('be.visible')
	// })


	it('Should verify variable card', () => {
		cy.wait(500)
		cy.log('Verify Variable Wrapper')
		cy.get('.variable-wrapper').should('be.visible')

		cy.wait(500)
		cy.log('Verify Create Variable Card')
		cy.get('.add-var_block').should('be.visible')
	})

	it('Click on create variable card', () => {
		cy.wait(1000)
		cy.log('Verify Create Variable Card text name')
		cy.get('#create-variable').should("have.text", "Create Variable")

		cy.wait(1000)
		cy.log("Click on card to create a variable")
		cy.get('#create-variable').click({ force: true })
	})

	it('Verify Select Parameter ', () => {
		cy.wait(500)
		cy.log('Verify Select Parameter Card text name')
		cy.get('#select-parameters').should("have.text", "Select parameters")
	})

	it('Select parameter checkbox ', () => {
		cy.log('Click On checkbox to select a parameter')
		cy.get('input[type="checkbox"]').eq(1).check({ force: true })
		cy.get('input[type="checkbox"]').eq(2).check({ force: true })
		//cy.get('[data-row-key="2_ARSENIC"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
		//cy.get('[data-row-key="1322454-AMMONIUM -A"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
	})


	it('Select parameter primary ', () => {
		cy.log('Select a primary')
		//cy.get('[data-row-key="2_ARSENIC"] > [style="position: sticky; left: 221.992px;"] > .ant-radio-wrapper > .ant-radio > #param-radio').check();
		cy.get('[type="radio"].ant-radio-input').first().check()
	})

	it('Select parameter Aggregation ', () => {
		cy.log('Select a Aggregation')
		cy.get('.ant-table-row-selected > .ant-table-cell-fix-left-last > .ant-select > .ant-select-selector').click({ force: true })
		cy.get('div[title="Mean"]').click({ multiple: true })
	})

	it('Show popup with volumne data', () => {
		cy.wait(500)
		cy.log('Render popup with volume data')
		cy.get('.param-column > :nth-child(1) > .anticon > svg').click()
	})

	it('Search Batch from table', () => {
		cy.wait(500)
		cy.log("Search Batch ABL2215")
		cy.get('#rc_unique_1 > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-affix-wrapper').clear();
		cy.get('#rc_unique_1 > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-affix-wrapper').type("ABL2215")
		cy.get('#rc_unique_1 > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-group-addon > .ant-btn > .anticon').click()
	})

	it('Change batch value', () => {
		cy.wait(500)
		cy.log("Change batch value")
		cy.get('.batch-table-block > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(2)').click()
	})

	it('Verify Done Card & Click On', () => {
		cy.get('.batch-table-footer > .ant-btn > span').click()
		cy.wait(1000)
		cy.log('Verify Done Card & Click On')
		cy.get('#done > span').should("have.text", "Done")
		cy.get('#done > span').click()
	})


	it('Modal should open', () => {
		cy.wait(1000)
		cy.log("Modal should open")
		cy.get('.ant-modal-content').should('be.visible')
		cy.wait(1000)
	})

	it('Add Variable Name', () => {
		cy.log("Add Variable Name");
		cy.get('.input_field > .ant-input').clear();
		cy.get('.input_field > .ant-input').type('var1');
	})

	it('Variable Cancel Button', () => {
		cy.get('.variable-cancel-button > .ant-btn').click();
		cy.get('.add-var_block > .ant-btn > span').click()
	})

	it('Add Variable Name again', () => {
		cy.get('.input_field > .ant-input').clear();
		cy.get('.input_field > .ant-input').type('var1');
	})

	it('Create Variable again', () => {
		cy.log("Create A Variable");
		cy.get('.variable-name-popup > .ant-btn').click();
	})

	it('Enter variable name to script', () => {
		cy.log('Enter variable name to script');
		cy.get('.w-tc-editor-text').type('var1');
	})

	it('Render Function Evaluation', () => {
		cy.intercept('GET', '**/view-evaluate', { fixture: 'funEvalutionData.json' });
		cy.log('Validate Function');
		cy.get('.custom-secondary-btn-link > span').click();

		cy.wait(2000);
		cy.log('Function Modal Closed');
		cy.get('#cancel-evalution-modal > span').click({ force: true });
	})

	it('Render Function Creation', () => {
		cy.wait(1000);
		cy.log('Function Modal Open');
		cy.get('.custom-secondary-btn> span').click({ force: true })

		cy.wait(2000);
		cy.log('Enter function name');
		cy.get('#function-name').type('function_1');

		cy.log("Save Function")
		cy.wait(1000);
		cy.get('.function-btn > .ant-btn-text > span').click({ force: true })
		cy.wait(1000);
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
