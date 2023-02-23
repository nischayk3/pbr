Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe("Renders the Limit config page", () => {
	afterEach(() => {
		cy.viewport(1360, 720)
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
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkRpbmVzaCAgSmluamFsYSIsInVuaXhfdGltZXN0YW1wIjoxNjc3MDU2NzE1LjY0MTg5MywidGltZXN0YW1wIjoiMjIvMDIvMjAyMyAwOTowNToxNSIsImV4cCI6MzMyMTMwNTY3MTUsImFkX3JvbGUiOmZhbHNlLCJtZGhfcm9sZSI6IlNZU1RFTV9BRE1JTiIsImVtYWlsX2lkIjoiZGluZXNoLmppbmphbGFAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.j5ZwCYeiIBFHregUuKeA_MLfGZ7U0_qBCBkwsUWnKOk"
			})
		);
	});

	beforeEach(() => {
		cy.viewport(1366, 720)
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
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IlZpbmF5IFJlZGR5IiwidW5peF90aW1lc3RhbXAiOjE2NzU0OTE4ODMuNDkzMzMsInRpbWVzdGFtcCI6IjA0LzAyLzIwMjMgMDY6MjQ6NDMiLCJleHAiOjE2NzU1MDI2ODMsImFkX3JvbGUiOmZhbHNlLCJtZGhfcm9sZSI6WyJTWVNURU1fQURNSU4iXSwiZW1haWxfaWQiOiJ2aW5heS5yZWRkeUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.7C6qucMUeGIKxl-wDNCrKFa2t9XDuWQ0f2oRBnogPSc"
			})
		);

		cy.intercept("GET", "**/chart-limit", {
			fixture: "chartLimits.json",
		});
		cy.intercept("POST", "**/chart-limit", {
			fixture: "saveChartLimits.json",
		});
	});

	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/limit-config')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/limit-config')
		cy.wait(1000)
	})

	it('Expanding limits', () => {
		cy.get('.ant-table-row > .ant-table-row-expand-icon-cell').click();
		cy.get('.ant-table-row > .ant-table-row-expand-icon-cell').click();
	})

	it('Operating More button', () => {
		cy.get('.action-table > :nth-child(1)').click();
		cy.get('.ant-space').click();
		cy.get('.ant-table-row > .ant-table-row-expand-icon-cell').click();
		cy.wait(1000)
	})

	it('Editing Limits', () => {
		cy.wait(1000)
		cy.get('.action-table > :nth-child(1)').click();
		cy.get('[data-row-key="1"] > :nth-child(2) > .ant-input').click().clear().type(1255)
		cy.get('[data-row-key="1"] > :nth-child(3) > .ant-input').click().clear().type('normalities')
		cy.get('[data-row-key="1"] > :nth-child(4) > .select_field > .ant-select > .ant-select-selector').click();
		cy.get(".ant-select-item-option").eq(0).click();
		cy.get('[data-row-key="1"] > :nth-child(5) > .ant-input').click().clear().type(9.3);
		cy.get('[data-row-key="1"] > :nth-child(6) > .ant-input').click().clear().type(15.6);
		cy.get('[data-row-key="1"] > :nth-child(7) > .ant-picker').click();
		cy.get(".ant-picker-cell").eq(7).click();
		cy.get('.add-button-limit > .ant-btn').click();
		cy.get('[data-row-key="6"] > :nth-child(1) > .anticon > svg').click();
		cy.get('.ant-btn-primary').click();
		cy.get('.action-table > :nth-child(1)').click();
		cy.wait(1000)
	})

	it('Deleting parameters in limit table', () => {
		cy.get('.action-table > :nth-child(1)').click();
		cy.get('[data-row-key="5"] > :nth-child(1) > .anticon > svg').click();
		cy.get('.ant-btn-primary').click();
		cy.wait(1000)
	})

	it('Deleting molecule', () => {
		cy.get('.action-table > :nth-child(2)').click();
		cy.wait(1000)
	})
});
