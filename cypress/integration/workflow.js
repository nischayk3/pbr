Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});
describe("Workflow", () => {
	beforeEach(() => {
		sessionStorage.setItem("test_enabled", true);
		sessionStorage.setItem("user", "fahad.siddiqui@mareana.com");
		sessionStorage.setItem("username", "Fahad");
		sessionStorage.setItem(
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

	it("visiting workflow screen", () => {

		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })

	});
	it('Load Screen Header', () => {
		const date = new Date();
		const month = date.toLocaleString('default', { month: 'long' });
		const latestDate = date.getDate();
		const year = date.getFullYear();
		const currentDate = month + ' ' + latestDate + ',' + ' ' + year;

		cy.log('Verify Screen Header Component')
		cy.get('.screen_header_head')

		// cy.log('Verify User Name')
		// cy.get('.screen_header_username').should("have.text", "Hello Fahad!")

		// cy.log('Verify Header Text')
		// cy.get('.screen_header_text').should("have.text", "Today is a great day to approve some records! Lets take look")

		cy.log('Verify Current Date')
		cy.get('.screen_header_resultdate').should("have.text", currentDate)
	})

	it("Chart Approval click", () => {
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.wait(6000)
		//cy.get('.approval-cards').click();
		cy.get(':nth-child(1) > .approval-cards > .card_desc').click();
	})

	it("Redirect to chart screen", () => {
		cy.wait(2000);
		cy.get(':nth-child(2) > .ant-table-cell-fix-left > .review-submission').click();
		cy.wait(2000);
	});

	it("Recently approved tab", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(1) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get('#rc-tabs-0-tab-2').click();

	});

	it("Search a value on column", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(1) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get(':nth-child(5) > .ant-table-filter-column > .ant-dropdown-trigger > .anticon > svg').click();
		cy.get('.ant-input').clear();
		cy.get('.ant-input').type('chart');
		cy.get('.ant-btn > :nth-child(2)').click();

	});
	it("Filter a value on column", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(1) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get(':nth-child(5) > .ant-table-filter-column > .ant-dropdown-trigger > .anticon > svg').click();
		cy.get('.ant-input').clear();
		cy.get('.ant-input').type('chart');
		cy.get(':nth-child(3) > .ant-btn > span').click();

	});

	it("Reset filter", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(1) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get(':nth-child(5) > .ant-table-filter-column > .ant-dropdown-trigger > .anticon > svg').click();
		cy.get('.ant-input').clear();
		cy.get('.ant-input').type('chart');
		cy.get('.ant-btn > :nth-child(2)').click();
		cy.get(':nth-child(5) > .ant-table-filter-column > .ant-dropdown-trigger > .anticon > svg').click();
		cy.get(':nth-child(2) > .ant-btn > span').click();
		cy.get('.ant-btn > :nth-child(2)').click();
	});

	it("Sorting a particular column", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(1) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get(':nth-child(5) > .ant-table-filter-column > :nth-child(1) > .ant-table-column-sorters').click();

	});

	it("Clicking Param Data Approval", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/unapproved-param?limit=10', { fixture: 'unapproved-param.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(2) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get('[data-row-key="9077"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
		cy.get('.custom-secondary-btn > span').click();
		//approve a record,electronic signature
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		// cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Iqbal@110192');
		cy.get('.ant-modal-footer > :nth-child(1) > span').click();
		cy.get('.ant-select-selector').click();
		cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
		cy.get('.ant-modal-footer > .custom-secondary-btn > span').click();

	});

	it("Rejecting Param Data Approval Record", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/unapproved-param?limit=10', { fixture: 'unapproved-param.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(2) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get('[data-row-key="9077"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
		cy.get('.custom-secondary-btn > span').click();
		//reject a record,electronic signature
		cy.get('.ant-modal-close-x > .anticon > svg > path').click();
		cy.get('.custom-primary-btn > span').click();
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		// cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Iqbal@110192');
		cy.get('.ant-modal-footer > :nth-child(1) > span').click();
		cy.wait(6000);
		cy.get('.electronic-sig > :nth-child(2) > .ant-input').click();
		cy.wait(6000);
		cy.get('.ant-modal-footer > .custom-secondary-btn > span').click();



	});

	it("Clicking View Approval", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/VIEW/awaiting_approval', { fixture: 'view-awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(3) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get(':nth-child(2) > .ant-table-cell-fix-left > .review-submission').click();

	});

	it("Clicking Report Approval", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/REPORT/awaiting_approval', { fixture: 'report-awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(4) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get(':nth-child(2) > .ant-table-cell-fix-left > .review-submission').click();

	});
	it("Clicking PBR Approval", () => {
		cy.wait(6000);
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.intercept('GET', 'services/v1/approvals/PBR/awaiting_approval', { fixture: 'pbr-awaiting-approval.json' })
		cy.wait(6000);
		//cy.get('.card_desc').click();
		cy.get(':nth-child(5) > .approval-cards > .card_desc').click();
		cy.wait(6000);
		cy.get(':nth-child(2) > .ant-table-cell-fix-left > .review-submission').click();

	});


});
