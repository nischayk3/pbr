Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe("Sharing", () => {
	afterEach(() => {
		cy.viewport(1280, 720)
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
		localStorage.setItem("username", "Fahad");
		localStorage.setItem("loginwith", "WITH_AD");
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

	});

	beforeEach(() => {
		cy.viewport(1280, 720)
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
		localStorage.setItem("username", "Fahad");
		localStorage.setItem("loginwith", "WITH_AD");
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

	});
	it('Load Chart Landing page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/chart_personalization')

		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/chart_personalization')
	})

	it('All Chart Render', () => {
		cy.intercept('GET', '**/last-views-and-charts?limit=8', { fixture: 'approvedChart.json' })
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.url().should('eq', url + '/#/dashboard/chart_personalization')
		cy.wait(2000)
		cy.log('Open Approved Chart')
		cy.get('[href="#/dashboard/chart_personalization/C615&1"] > .ant-col > .chart-tiles').click()
	})

	it('Share Email', () => {
		cy.wait(5000)
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.wait(5000)
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
		cy.get('.ant-modal-close-x').click({ force: true })
	})

	it('Clear all added emails', () => {
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
		cy.get('.ant-modal-close-x').click({ force: true })
	})


	it('Copy Link', () => {
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.get('.copy > .ant-btn > span').click({ force: true });
		cy.get('.ant-modal-close-x').click({ force: true })
	})

	it('Share Created Chart', () => {
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
		cy.get('.ant-modal-body').click({ force: true });
		cy.wait(2000)
		cy.get('.ant-modal-body > :nth-child(1) > .ant-btn > span').click({ force: true });
		cy.get('.ant-modal-close-x').click({ force: true })
	})
});
