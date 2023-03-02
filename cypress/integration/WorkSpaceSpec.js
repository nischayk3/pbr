Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

describe("workspace", () => {
	afterEach(() => {
		cy.viewport(1280, 720)
		cy.loginWithAD()
		cy.intercept('GET', '/services/v1/workflow-count', { fixture: 'workflowCountWorkspace.json' })
		cy.intercept('GET', '/services/v1/chart-exceptions?limit=5&username=dinesh.kumar%40mareana.com', { fixture: 'chartExceptionLitmt.json' })
		cy.intercept('GET', '/services/v1/last-views-and-charts?limit=5', { fixture: 'lastViewandChart.json' })
		cy.intercept('GET', '/services/v1/chart-object?chartId=C252', { fixture: 'chartObjectWorkspace.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 720)
		cy.loginWithAD()
		cy.intercept('GET', '/services/v1/workflow-count', { fixture: 'workflowCountWorkspace.json' })
		cy.intercept('GET', '/services/v1/chart-exceptions?limit=5&username=dinesh.kumar%40mareana.com', { fixture: 'chartExceptionLitmt.json' })
		cy.intercept('GET', '/services/v1/last-views-and-charts?limit=5', { fixture: 'lastViewandChart.json' })
		cy.intercept('GET', '/services/v1/chart-object?chartId=C252', { fixture: 'chartObjectWorkspace.json' })
	});

	it("visiting workspace screen", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workspace')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workspace')
	});


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
		cy.get('[href="#/dashboard/chart_personalization/C252?id=C252&version=1&fromScreen=Workspace"] > .chart-tiles').click();
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
