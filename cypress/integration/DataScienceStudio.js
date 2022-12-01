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

	it('Load Data Science Studio', () => {
		const url = Cypress.config().baseUrl
		cy.wait(4000).then(() => {
			cy.visit(url + '/#/dashboard/data_science_studio')
			cy.log('Load Data Science Studio Page')
			cy.url().should('eq', url + '/#/dashboard/data_science_studio')
		})
	})

	it('Upload Load Data Set', () => {
		const url = Cypress.config().baseUrl
		cy.wait(2000)
		cy.visit(url + '/#/dashboard/data_science_studio')
		cy.wait(2000)
		cy.get('#load-dataset > .anticon > svg').click()
	})

	it('Click back btn', () => {
		cy.wait(2000)
		cy.get('#back-btn > span').click()
	})

	it('Upload Load Data Set', () => {
		const url = Cypress.config().baseUrl
		cy.wait(2000)
		cy.visit(url + '/#/dashboard/data_science_studio')

		cy.wait(2000)
		cy.get('#load-dataset > .anticon > svg').click()
	})

	it('Upload File', () => {
		cy.wait(2000)
		cy.log('Upload CSV/JSON/Excel File ')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/V348.csv' }, { force: true })
	})

	it('Select nect button', () => {
		cy.wait(2000)
		cy.get('#next-btn > span').click()
	})

	it('Load Target variables', () => {
		cy.wait(2000)
		cy.log('Load Target Variables')
		const url = Cypress.config().baseUrl
		cy.url().should('eq', url + '/#/dashboard/data_science_studio/target_variable')
	})

	it('Select traget variable', () => {
		cy.get('[data-row-key="0"] > :nth-child(1) > .ant-radio-wrapper > .ant-radio > .ant-radio-input').click()
		cy.get('.target-head > .ant-btn > span').click({ force: true })
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
		cy.wait(20000)

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
		cy.get('.card-title > .anticon > svg').click()
	})


	it('Jupyter Hub Studio', () => {
		cy.wait(4000)
		cy.get('.jupyter-card').click({ force: true })
		cy.wait(2000)
	})
})
