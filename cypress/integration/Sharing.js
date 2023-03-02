Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe("Sharing", () => {
	afterEach(() => {
		cy.viewport(1280, 720)
		cy.loginWithAD()
		cy.intercept('GET', '**/last-views-and-charts?limit=8', { fixture: 'approvedChart.json' })
		cy.intercept('GET', '**/chart-object?chartId=C791&version=1', { fixture: 'chartObjSharing.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 720)
		cy.loginWithAD()
		cy.intercept('GET', '**/last-views-and-charts?limit=8', { fixture: 'approvedChart.json' })
		cy.intercept('GET', '**/chart-object?chartId=C791&version=1', { fixture: 'chartObjSharing.json' })
	});

	it('Load Chart Landing page Correctly', () => {
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/chart_personalization')

		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/chart_personalization')

		cy.wait(2000)
		cy.log('Open Approved Chart')
		cy.get('[href="#/dashboard/chart_personalization/C791&1"] > .ant-col > .chart-tiles').click()
	})

	it('Share Email', () => {
		cy.wait(5000)
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.wait(2000)
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.wait(2000)
		cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({ multiple: true });
		//cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
		cy.get('.ant-modal-close-x').click({ force: true })
	})

	it('Clear all added emails', () => {
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({ multiple: true });
		//cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
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
		cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({ multiple: true });
		cy.get('.ant-modal-body').click({ force: true });
		cy.wait(2000)
		cy.get('.ant-modal-body > :nth-child(1) > .ant-btn > span').click({ force: true });
		cy.get('.ant-modal-close-x').click({ force: true })
	})
});
