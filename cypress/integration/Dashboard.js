Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Dashboard', () => {
	// it("should login successfully using Ad", () => {
	beforeEach(() => {
		cy.viewport(1280, 720);
		cy.visit("/");
		cy.url().should("include", "/user/login");
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
				email_id: "fahad.siddiqui@mareana.com",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
			})
		);
	})
	it('Load View Landing Page Correctly', () => {
		cy.intercept('GET', '**/dashboards', { fixture: 'dashboard.json' })
		cy.visit('http://localhost:3030/#/dashboard/dashboard')

		cy.log('Load Landing Page')
		cy.url().should('eq', 'http://localhost:3030/#/dashboard/dashboard')
	})

	it('Load Screen Header', () => {
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get('#dashboard > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		const date = new Date();
		const month = date.toLocaleString('default', { month: 'long' });
		const latestDate = date.getDate();
		const year = date.getFullYear();
		const currentDate = month + ' ' + latestDate + ',' + ' ' + year;

		cy.log('Verify Screen Header Component')
		cy.get('.screen_header_head')

		cy.log('Verify User Name')
		cy.get('.screen_header_username').should("have.text", "Howdy Fahad,")

		cy.log('Verify Header Text')
		cy.get('.screen_header_text').should("have.text", "Lets get designing some report templates")

		cy.log('Verify Current Date')
		cy.get('.screen_header_resultdate').should("have.text", currentDate)
	})

	it('Recently Created Dashboard', () => {
		cy.log('Recent View Verify')
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get('#dashboard > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.wait(6000);
		cy.get(':nth-child(1) > .chart-tiles').should('have.length', 1)
	})
	it("should login successfully using Ad", () => {
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get('#dashboard > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.get('.create-new > .anticon > svg', { timeout: 10000 }).click({ force: true });
		cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ant-input').clear();
		cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ant-input').type('new dashboard');
		cy.get('.ant-input-wrapper > .ant-input').click();
		cy.get('[data-row-key="0"] > :nth-child(1)').click();
		cy.get('.ant-modal-footer > .ant-btn > span').click();
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg > path').click({ force: true });
		cy.get('.select_field > .ant-select > .ant-select-selector').click();
		cy.get('.ant-col > .ant-btn').click();
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click();
		cy.get('.global-filters > :nth-child(2) > .ant-btn > span').click();
		cy.get('[d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"]').click();
		cy.get('.btns > .ant-btn > span').click();
		cy.get('[style="background-color: rgb(9, 49, 133); color: white; border-radius: 4px;"] > span').click();
		/* ==== Generated with Cypress Studio ==== */
		cy.get(':nth-child(3) > .ant-breadcrumb-link > a').click();
		cy.wait(6000);
		cy.get(':nth-child(1) > .chart-tiles').click();
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click();
		cy.get('.select_field > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
		cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
		cy.get('.ant-col > .ant-btn > span').click();
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click();
		cy.get('.btns > :nth-child(2) > span').click();
		/* ==== End Cypress Studio ==== */



	});


});
