Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

describe('Renders workflow to chart personalization', () => {
	beforeEach(() => {
		cy.viewport(1280, 720)
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
	})

	it('Loads Authorized Chart Approver from workflow page correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.intercept('GET', '/services/v1/workflow-count', { fixture: 'workflowCount.json' }).as('workflowCount')
		cy.wait('@workflowCount').then(() => {
			cy.intercept('GET', '/services/v1/approvals/CHART/awaiting_approval', { fixture: 'workflowAwaitingApproval.json' }).as('workflowAwaitingApproval')
			cy.get('.card_desc').contains('Chart Approval').click()
			cy.wait('@workflowAwaitingApproval').then(() => {
				cy.log('Got approval data')
				cy.intercept('GET', '/services/v1/chart-object?*', { fixture: 'workflowChartData.json' }).as('chartData')
				cy.get(':nth-child(2) > .ant-table-cell-fix-left').click()
				cy.wait('@chartData').then(() => {
					cy.get('#tabs-tab-1').click()
					cy.wait(500)
					cy.log('Opening limits tab')
					cy.get('.ant-tabs-tab').eq(1).click({ force: true })

					cy.wait(500)
					cy.log('Opening display tab')
					cy.get('.ant-tabs-tab').eq(2).click({ force: true })

					cy.wait(500)
					cy.log('Opening threshold tab')
					cy.get('.ant-tabs-tab').eq(3).click({ force: true })

					cy.wait(500)
					cy.log('Opening rules tab')
					cy.intercept('GET', '/services/v1/rules', { fixture: 'chartPersonalizationRules.json' }).as('rules')
					cy.get('.ant-tabs-tab').eq(4).click({ force: true })
					cy.wait('@rules').then(() => {
						cy.log('rules loaded')
					})
				})
			})
		})
	})

	it('Loads Unauthorized Chart Approver from workflow page correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.intercept('GET', '/services/v1/workflow-count', { fixture: 'workflowCount.json' }).as('workflowCount')
		cy.wait('@workflowCount').then(() => {
			cy.intercept('GET', '/services/v1/approvals/CHART/awaiting_approval', { fixture: 'workflowAwaitingApproval.json' }).as('workflowAwaitingApproval')
			cy.get('.card_desc').contains('Chart Approval').click()
			cy.wait('@workflowAwaitingApproval').then(() => {
				cy.log('Got approval data')
				cy.intercept('GET', '/services/v1/chart-object?*', { fixture: 'workflowChartData.json' }).as('chartData')
				cy.get(':nth-child(3) > .ant-table-cell-fix-left').click()
				cy.wait('@chartData').then(() => {
					cy.get('#tabs-tab-1').click()
				})
			})
		})
	})
})