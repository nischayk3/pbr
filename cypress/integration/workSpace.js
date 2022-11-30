Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

describe("workspace", () => {
	beforeEach(() => {
		cy.viewport(1280, 720)
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
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

	it("visiting workspace screen", () => {


		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workspace')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workspace')

		cy.intercept('GET', '/services/v1/workflow-count', { fixture: 'workflowCountWorkspace.json' })
		cy.intercept('GET', '/services/v1/chart-exceptions?limit=5&username=fahad.siddiqui%40mareana.com', { fixture: 'chartExceptionLitmt.json' })
		cy.intercept('GET', '/services/v1/last-views-and-charts?limit=5', { fixture: 'lastViewandChart.json' })
		cy.intercept('GET', '/services/v1/chart-object?chartId=C252', { fixture: 'chartObjectWorkspace.json' })


	});

	// it("sorting Table dataQuality",()=>{
	// 	cy.wait(4000)
	// 	cy.get('.data-quality-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1) > .ant-table-column-sorters').click()
	// 	cy.get('.data-quality-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(2) > .ant-table-column-sorters').click()
	// 	cy.get('.data-quality-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3) > .ant-table-column-sorters').click()
	// 	cy.get('.data-quality-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4) > .ant-table-column-sorters').click()
	// })

	// it("sorting Table recent deviation",()=>{
	// 	cy.reload()
	// 	cy.wait(4000)
	// 	cy.get('.deviation-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(1) > .ant-table-column-sorters').click()
	// 	cy.get('deviation-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(2) > .ant-table-column-sorters').click()
	// 	cy.get('deviation-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(3) > .ant-table-column-sorters').click()
	// 	cy.get('deviation-main > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-thead > tr > :nth-child(4) > .ant-table-column-sorters').click()


	// })

	it("deviation 404", () => {

		cy.intercept(
			{
				method: 'GET',
				url: '/services/v1/recent-deviations?limit=5',

			},

			{
				"Data": [],
				"Message": "Error",
				"status-code": 404
			}
		).as('deviation404')

		cy.reload()
		cy.wait(3000)
	})


	it("deviation 404", () => {

		cy.intercept(
			{
				method: 'GET',
				url: '/services/v1/data-quality-report?limit=5',

			},

			{
				"Data": [],
				"Message": "Error",
				"status-code": 404
			}
		).as('deviation404')

		cy.reload()
		cy.wait(3000)
	})

	it("Redirecting Chart approval screen load", () => {
		cy.wait(6000)
		cy.get(':nth-child(1) > .workspace-processChart-card').click();
	});

	it("Redirecting to View approval screen", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workspace')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workspace')
		cy.wait(6000)
		cy.get(':nth-child(1) > .innercard > .paper-batch-card > .paper-batch-desc').click();
	})

	it("load", () => {
		cy.get('.workspace-main-block > :nth-child(1)').click();
		cy.get('.recentcard').click();
		cy.get('.workspace-main-block > :nth-child(3)').click();
		cy.get('.workspace-card1 > .innercard > [style="float: right;"] > .workspace-review').click();
		cy.get('#workspace > .ant-menu-title-content > a').click();

	});


});
