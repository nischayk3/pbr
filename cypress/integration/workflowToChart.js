Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

describe('Renders workflow to chart personalization', () => {
	beforeEach(() => {
		cy.viewport(1280, 720)
		cy.loginWithAD()
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