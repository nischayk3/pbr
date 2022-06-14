// Cypress.Commands.add("multiselect", (options) => {
// 	options.forEach((option) => {
// 		cy.log(option)
// 		cy.get('.ant-select-item-option').contains(option).click()
// 	});
// });


// describe("Render View Creation Page", () => {
// 	beforeEach(() => {
// 		cy.viewport(1280, 720)
// 		localStorage.setItem("test_enabled", true);
// 		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
// 		localStorage.setItem("username", "Fahad");
// 		localStorage.setItem(
// 			"login_details",
// 			JSON.stringify({
// 				ad_role: false,
// 				email_id: "fahad.siddiqui@mareana.com",
// 				firstname: "Fahad",
// 				lastname: "siddiqui",
// 				mdh_role: "USER",
// 				screen_set: "1000_USER",
// 				token:
// 					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
// 			})
// 		);
// 	})

// 	it('Load View Landing Page Correctly', () => {
// 		const url = Cypress.config().baseUrl
// 		cy.intercept('GET', '**/views-list', { fixture: 'viewList.json' })
// 		cy.visit(url + '/#/dashboard/view_creation')

// 		cy.log('Load Landing Page')
// 		cy.url().should('eq', url + '/#/dashboard/view_creation')
// 	})


// 	it('Load Screen Header', () => {
// 		const date = new Date();
// 		const month = date.toLocaleString('default', { month: 'long' });
// 		const latestDate = date.getDate();
// 		const year = date.getFullYear();
// 		const currentDate = month + ' ' + latestDate + ',' + ' ' + year;

// 		cy.log('Verify Screen Header Component')
// 		cy.get('.screen_header_head')

// 		cy.log('Verify User Name')
// 		cy.get('.screen_header_username').should("have.text", "Howdy Fahad!")

// 		cy.log('Verify Header Text')
// 		cy.get('.screen_header_text').should("have.text", "Let’s get configuring some Views!")

// 		cy.log('Verify Current Date')
// 		cy.get('.screen_header_resultdate').should("have.text", currentDate)
// 	})

// 	it('Load Landing Page Table Component', () => {
// 		cy.log('Load Search Bar')
// 		cy.log('Search View Id In Search Component')
// 		cy.get("input[placeholder='Search by view ID or name']").type("V288")
// 		cy.get(".ant-input-search-button").click()

// 		cy.log('Verify Search Result In Table')
// 		cy.get('.ant-table-row > :nth-child(1) > div').should("have.text", "V288-1")
// 		cy.get('.ant-table-row > :nth-child(2) > div').should("have.text", "demo")
// 		cy.get('.ant-table-row > :nth-child(3) > div').should("have.text", "APRD")
// 		cy.get('.ant-table-row > :nth-child(4) > div').should("have.text", "K krishnapriyam@mareana.com")
// 	})

// 	it('Recently Created View', () => {
// 		cy.log('Recent View Verify')
// 		cy.get('.tile').should('have.length', 1)
// 	})

// 	it('Load View Landing Page Correctly', () => {
// 		cy.log('Create a New View Creation')
// 		cy.get('.create-new > .anticon > svg').click({ force: true });
// 		cy.wait(3000)
// 	})

// 	it('Create a New View', () => {
// 		const url = Cypress.config().baseUrl
// 		cy.wait(100)
// 		cy.intercept('GET', '**/molecules2?user_id=fahad.siddiqui%40mareana.com', { fixture: 'listMolecule.json' })
// 		cy.wait(100)
// 		cy.visit(url + '/#/dashboard/view_creation/0')

// 		cy.log('Verify New View Creation URL ')
// 		cy.url().should('eq', url + '/#/dashboard/view_creation/0')
// 	})

// 	it('Render Parameter Lookup', () => {
// 		cy.wait(100)
// 		cy.intercept('GET', '**/molecules2?molecule_name=BELATACEPT', { fixture: 'moleculeData.json' })
// 		cy.wait(100)
// 		cy.log('Select a Molecule')
// 		cy.get('#rc_select_0').click({ force: true })
// 		cy.get('div[title="BELATACEPT"]').click({ force: true })

// 		cy.log('Verify Selected Molecule')
// 		cy.get('.ant-select-selection-item').should("have.text", "BELATACEPT")
// 	})

// 	it('Render Process Hierarchy', () => {
// 		cy.log('Load Process Hierarchy')

// 		cy.log('Verify Tree Render')
// 		cy.get('.ant-tree').should('have.length', 1)

// 		cy.log('Verify first treenode title')
// 		cy.get('.ant-tree-title').should('have.text', '140L')

// 		cy.log('Click first treenode')
// 		cy.get('.ant-tree-switcher > .anticon > svg > path').click()

// 		cy.log('Verify second treenode title')
// 		cy.get('.ant-tree-treenode-switcher-close > .ant-tree-node-content-wrapper > .ant-tree-title').should('have.text', 'SODIUM CARBONATE ANHYDROUS NF/EP')

// 		cy.wait(2000)
// 		cy.log('Click second treenode')
// 		cy.get('.ant-tree-treenode-switcher-close > .ant-tree-switcher > .anticon > svg').trigger("click");

// 		cy.log('Verify tree node length');
// 		cy.get('.tree-index').should('have.length', 4)

// 		cy.log('Verify first tree index name');
// 		cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .ant-tag').should('have.text', 'ARSENIC')
// 		cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .treenode-coverage').should('have.text', '93%(31/33)')
// 		cy.wait(100)

// 		cy.log('Verify second tree index name');
// 		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .ant-tag').should('have.text', 'ASSAY 1DECPT')
// 		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .treenode-coverage').should('have.text', '96%(32/33)')
// 		cy.wait(100)

// 		cy.log('Verify third tree index name');
// 		cy.get(':nth-child(5) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .ant-tag').should('have.text', 'ASSAY TITRIMETRIC')
// 		cy.get(':nth-child(5) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .treenode-coverage').should('have.text', '96%(32/33)')
// 		cy.wait(100)

// 		cy.log('Verify fourth tree index name');
// 		cy.get(':nth-child(6) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .ant-tag').should('have.text', 'CHLORIDES')
// 		cy.get(':nth-child(6) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > .tree-block-param > .treenode-coverage').should('have.text', '96%(32/33)')
// 		cy.wait(100)

// 		cy.log("Select first tree node")
// 		cy.get(':nth-child(3) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2) > .anticon > svg').click()
// 		cy.wait(1000)

// 		cy.log("Select second tree node")
// 		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2) > .anticon > svg').click()
// 		cy.wait(1000)
// 	})


// 	it('Render Script Editor & View Summary', () => {
// 		cy.log('verify right container')
// 		cy.get('.viewCreation-rightBlocks').should('be.visible')
// 	})

// 	it('Create a variable', () => {
// 		cy.log('Verify Variable Wrapper')
// 		cy.get('.variable-wrapper').should('be.visible')

// 		cy.log('Verify Create Variable Card')
// 		cy.get('.add-var_block').should('be.visible')

// 		cy.log('Verify Create Variable Card text name')
// 		cy.get('.add-var_block > div > .anticon > svg').should('be.visible')
// 		cy.get('.add-var_block > div > p').should("have.text", "Create Variable")

// 		cy.log("Click on card to create a variable")
// 		cy.get('.add-var_block > div > p').click()

// 		cy.log('Verify Select Parameter Card text name')
// 		cy.get('.add-var_block > p').should("have.text", "Select parameters")

// 		cy.log('Select a parameter from table')
// 		cy.get('[data-row-key="140L-1176024-ARSENIC"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
// 		cy.get('[data-row-key="140L-1176024-ASSAY 1DECPT"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();

// 		cy.get('[data-row-key="140L-1176024-ARSENIC"] > [style="position: sticky; left: 182px;"] > .ant-radio-wrapper > .ant-radio > .ant-radio-input').check();

// 		cy.get('#rc_select_3').click({ force: true })
// 		cy.get('div[title="Mean"]').click({ force: true })
// 		// cy.get('#rc_select_4').click({ force: true })
// 		// cy.get('div[title="Mean"]').click({ force: true })
// 		cy.get('[data-row-key="140L-1176024-ARSENIC"] > :nth-child(5) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check()

// 		cy.log('Verify Done Card & Click On')
// 		cy.get('.add-var_block > .ant-btn > span').should("have.text", "Done")
// 		cy.get('.add-var_block > .ant-btn > span').click()

// 		cy.log("Modal should open")
// 		cy.get('.ant-modal-content').should('be.visible')

// 		cy.log("Add Variable Name");
// 		cy.get('.input_field > .ant-input').clear();
// 		cy.get('.input_field > .ant-input').type('var1');

// 		cy.get('.variable-cancel-button > .ant-btn').click();
// 		cy.get('.add-var_block > .ant-btn > span').click();

// 		cy.get('.input_field > .ant-input').clear();
// 		cy.get('.input_field > .ant-input').type('var1');

// 		cy.log("Create A Variable");
// 		cy.get('.variable-name-popup > .ant-btn').click();

// 		cy.log('Enter variable name to script');
// 		cy.get('.w-tc-editor-text').type('var1');

// 	})

// 	it('Render Function Evaluation', () => {
// 		cy.intercept('GET', '**/view-evaluate', { fixture: 'funEvalutionData.json' });
// 		cy.log('Validate Function');
// 		cy.get(':nth-child(2) > .custom-eval-btn').click();

// 		cy.log('Function data modal open');
// 		cy.get('.ant-modal-content').should('be.visible');

// 		cy.wait(2000);
// 		cy.log('Function Modal Closed');
// 		cy.get('.ant-modal-close-x > .anticon > svg ').click();
// 	})

// 	it('Render Function Creation', () => {
// 		cy.log('Function Modal Open');
// 		cy.get('.custom-secondary-eval-btn > span').click();

// 		cy.log('Enter function name');
// 		cy.get('.function-input > .input_field > .ant-input').type('function_1');

// 		cy.log("Save Function")
// 		cy.get('.custom-secondary-btn > span').click({ force: true })
// 	})

// 	// 	it('Load View Creation Page Correctly', () => {




// 	// 		cy.log('Select a Parameter From View Hierarchy')
// 	// 		cy.get(':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode > .ant-tree-switcher > .anticon > svg').click({ force: true });
// 	// 		cy.wait(4000)
// 	// 		cy.get(':nth-child(2) > .ant-tree-switcher > .anticon > svg').click({ force: true });
// 	// 		cy.wait(4000)
// 	// 		cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2) > .anticon > svg').click();
// 	// 		cy.wait(4000)
// 	// 		cy.get(':nth-child(5) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2)').click();
// 	// 		cy.wait(4000)

// 	// 		cy.get('.add-var_block > div').click();
// 	// 		cy.wait(4000)

// 	// 		cy.get('[data-row-key="140L-1176024-ASSAY 1DECPT"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
// 	// 		cy.get('[data-row-key="140L-1176024-ASSAY 1DECPT"] > [style="position: sticky; left: 182px;"] > .ant-radio-wrapper > .ant-radio > .ant-radio-inner').check();
// 	// 		cy.wait(2000)

// 	// 		cy.get('#rc_select_3').click();
// 	// 		cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
// 	// 		cy.wait(4000)

// 	// 		cy.get('.add-var_block > .ant-btn > span').click();
// 	// 		cy.get('.input_field > .ant-input').clear();
// 	// 		cy.get('.input_field > .ant-input').type('var1');
// 	// 		cy.get('.variable-name-popup > .ant-btn > span').click();
// 	// 		cy.get('[data-row-key="140L-1176024-ASSAY 1DECPT"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
// 	// 		cy.get('.add-var_block > .ant-btn > span').click();
// 	// 		cy.get('.input_field > .ant-input').clear();
// 	// 		cy.get('.input_field > .ant-input').type('var2');
// 	// 		cy.get('.variable-name-popup > .ant-btn > span').click();
// 	// 		cy.get('.w-tc-editor-text').click();
// 	// 		cy.get(':nth-child(2) > .custom-eval-btn > span').click();
// 	// 		cy.get('.ant-modal-close-x > .anticon > svg').click();
// 	// 		cy.get('.custom-secondary-eval-btn > span').click();
// 	// 		cy.get('.function-input > .input_field > .ant-input').clear();
// 	// 		cy.get('.function-input > .input_field > .ant-input').type('func1');
// 	// 		cy.get('.custom-secondary-btn > span').click();
// 	// 		cy.get('.summary-column > p').click();
// 	// 		cy.get('.summary-column > :nth-child(2) > .anticon > svg').click();
// 	// 	})
// });
