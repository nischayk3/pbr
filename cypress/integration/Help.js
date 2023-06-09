Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});
describe('Faq', () => {
	beforeEach(() => {
		cy.intercept('POST', '/services/v1//genealogy-filter', { fixture: 'genealogyFilter.json' })
		cy.intercept('GET', '/services/v1/product-type-genealogy', { fixture: 'genealogyFilterProductType.json' })
		cy.intercept('GET', 'v1/genealogy?levels=*', { fixture: 'backward.json' })
		cy.loginWithAD()
	})

	it("visit genealogy page", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/genealogy')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/genealogy')
	})

	it("reload", () => {
		cy.reload()
		cy.wait(3000)
	})

	it("opening faq drawer", () => {
		cy.log("opening faq drawer")
		cy.wait(1000)
		cy.get('.hepIcon ').click({ force: true })
		cy.get('.help_item').eq(0).click({ force: true })
		cy.get('#helptext').click({ force: true })
	});

	it("closing the drawer", () => {
		cy.log("closing the drawer")
		cy.get(".ant-drawer-close").click({ force: true })
	});

	it("searching test", () => {
		cy.log("searching test")
		cy.log("opening faq drawer")
		cy.get('.hepIcon ').click({ force: true })
		cy.get('.help_item').eq(0).click({ force: true })
		cy.get('#helptext').click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(1) > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').click({ force: true })
		cy.get(':nth-child(1) > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').type("a")
		cy.get(':nth-child(1) > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-group-addon > .ant-btn > span').click({ force: true })
	});

	it("View all Faqs page", () => {
		cy.log("View all Faqs page")
		cy.get("#view_all_faq").click({ force: true })
	});
});