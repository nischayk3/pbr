Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

Cypress.on('uncaught:exception', (err) => {
	/* returning false here prevents Cypress from failing the test */
	return false
})

describe("Render Data Science Studio", () => {

	beforeEach(() => {
		cy.viewport(1280, 720);
		cy.loginWithAD()
	});

	afterEach(() => {
		cy.viewport(1280, 720);
		cy.loginWithAD()
	});

	it('Load Data Science Studio', () => {
		const url = Cypress.config().baseUrl

		cy.visit(url + '/#/dashboard/data_science_studio')
		cy.log('Load Data Science Studio Page')
		cy.url().should('eq', url + '/#/dashboard/data_science_studio')

	})

	it('Upload Load Data Set', () => {
		cy.wait(2000)
		cy.get('#load-dataset > .anticon > svg').click()
	})

	it('Upload File', () => {
		cy.wait(2000)
		cy.log('Upload CSV/JSON/Excel File ')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/V348.csv' }, { force: true })
	})

	it('Select next button', () => {
		cy.wait(2000)
		cy.get('#next-btn > span').click()
	})

	it('Load Target variables', () => {
		cy.wait(2000)
		cy.log('Load Target Variables')
	})

	it('Select traget variable', () => {
		cy.get('[data-row-key="0"] > :nth-child(1) > .ant-radio-wrapper > .ant-radio > .ant-radio-input').click()
		// cy.get('.target-head > .ant-btn > span').click({ force: true })
	})

	it('back home page', () => {
		cy.wait(2000)
		cy.get('.card-title > .anticon > svg').click()
	})

	it('View Data Set', () => {
		cy.wait(4000)
		cy.get('.card-center > :nth-child(2) > .anticon > svg').click({ force: true })
	})

	it('Click back btn', () => {
		cy.wait(2000)
		cy.get('#back-btn > span').click()
	})

	it('View Data Set', () => {
		cy.wait(4000)
		cy.get('.card-center > :nth-child(2) > .anticon > svg').click({ force: true })
	})

	it('Select View', () => {
		cy.wait(2000)
		cy.log("Select View");
		cy.get(".ant-input-wrapper > .ant-input").click({ force: true });

		cy.get('[data-row-key="0"] > :nth-child(1)').click()
		cy.wait(10000)

		cy.get('#next-btn > span').click()
	})

	it('Load Target Variables', () => {
		cy.log('Load Target Variables')
		const url = Cypress.config().baseUrl
		cy.url().should('eq', url + '/#/dashboard/data_science_studio/target_variable')
	})

	it('Expand Row', () => {
		cy.log('Expand Statics')
		cy.get('[data-row-key="0"] > .ant-table-row-expand-icon-cell > .ant-table-row-expand-icon').click()
	})
	it('Select target Variables', () => {
		cy.get('[data-row-key="0"] > :nth-child(1) > .ant-radio-wrapper > .ant-radio > .ant-radio-input').click()
		cy.get('.target-head > .ant-btn > span').click({ force: true })
		cy.wait(2000)
	})


	it('Jupyter Hub Studio', () => {
		cy.wait(4000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/data_science_studio')
		cy.log('Load Data Science Studio Page')
		cy.url().should('eq', url + '/#/dashboard/data_science_studio')
		cy.wait(2000)
		cy.get('#explore-jupyter > p').should("have.text", 'Explore on your own')
		cy.get('#explore-jupyter > span').should("have.text", 'RECOMMENDED FOR POWER USERS')
		cy.wait(2000)
	})
})
