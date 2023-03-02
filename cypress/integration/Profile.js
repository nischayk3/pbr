Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

describe("Render User Profile With AD", () => {
	afterEach(() => {
		cy.viewport(1360, 780)
		cy.loginWithAD()
	});

	beforeEach(() => {
		cy.viewport(1360, 780)
		cy.loginWithAD()
	})

	it('Load User Profile', () => {
		const url = Cypress.config().baseUrl
		cy.wait(1000).then(() => {
			cy.visit(url + '/#/dashboard/profile')
			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/profile')
		})

		cy.log('verify login username')
		cy.wait(2000)
		cy.get('.user-name > .anticon').click({ force: true })
		cy.get('.username').should("have.text", "Dinesh Kumar")
		cy.get('.email').should("have.text", "dinesh.kumar@mareana.com")

		cy.get('.submenu > :nth-child(1)').click()
		cy.wait(2000)
	})

	it('Upload profile picture', () => {
		cy.log('Upload Profile Image')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/avatar.png' }, { force: true })
		cy.wait(2000)
	})

	it('should verify Preference', () => {
		cy.wait(2000)
		cy.log('Select Date Format')
		cy.get('#date_format').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').first().click({ force: true })

		cy.log("clear data")
		cy.get(':nth-child(1) > .search-block > .ant-btn > .anticon > svg').click()

		cy.get(':nth-child(1) > .search-block > .ant-select > .ant-select-selector').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').first().click({ force: true })

		cy.log('Select Time Zone')
		cy.get('#time_zone').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(1).click({ force: true })

		cy.log("clear data")
		cy.get(':nth-child(2) > .search-block > .ant-btn > .anticon > svg').click()

		cy.get(':nth-child(2) > .search-block > .ant-select > .ant-select-selector').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(1).click({ force: true })

		cy.log('Select Language')
		cy.get('#language').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(2).click({ force: true })

		cy.log("clear data")
		cy.get(':nth-child(3) > .search-block > .ant-btn > .anticon > svg').click()

		cy.get(':nth-child(3) > .search-block > .ant-select > .ant-select-selector').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(2).click({ force: true })
	})

	it('Select Notifications Tab', () => {
		cy.wait(1000)
		cy.log('Open Notification Tab')
		cy.get('#rc-tabs-0-tab-2').click();

		cy.wait(500)
		cy.get(':nth-child(1) > .ant-switch > .ant-switch-handle').click()

		cy.wait(500)
		cy.get(':nth-child(2) > .ant-switch > .ant-switch-handle').click()
	})
})

describe("Render User Profile Without AD ", () => {
	afterEach(() => {
		cy.viewport(1360, 780)
		cy.loginWithoutAD()
	});

	beforeEach(() => {
		cy.viewport(1360, 780)
		cy.loginWithoutAD()
	})

	it('Load User Profile', () => {
		const url = Cypress.config().baseUrl
		cy.wait(1000).then(() => {
			cy.visit(url + '/#/dashboard/profile')
			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/profile')
		})
	})

	it('should verify Password', () => {
		cy.log('verify password section')
		cy.get('.layout-section-wrapper > :nth-child(2) > .heading').should("have.text", "Password")

		cy.log('verify current password')
		cy.get('.layout-section-wrapper > :nth-child(2) > .split-form > :nth-child(1) > :nth-child(1) > p').should("have.text", "Current password")
		cy.get('.split-form > :nth-child(1) > :nth-child(1) > .ant-input-affix-wrapper > .ant-input').type("password")

		cy.log("view current password")
		cy.get(':nth-child(1) > .ant-input-affix-wrapper > .ant-input-suffix > .anticon > svg').click()

		cy.log('verify new password')
		cy.get('.layout-section-wrapper > :nth-child(2) > .split-form > :nth-child(1) > :nth-child(2) > p').should("have.text", "New password")
		cy.get(':nth-child(2) > .ant-input-affix-wrapper > .ant-input').type("password1")

		cy.log("view new password")
		cy.get(':nth-child(2) > .ant-input-affix-wrapper > .ant-input-suffix > .anticon > svg').click()

		cy.log('verify confirm new passwprd')
		cy.get(':nth-child(2) > .split-form > :nth-child(1) > :nth-child(3) > p').should("have.text", "Confirm new password")
		cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input').type("password2")

		cy.log("view confirm new password")
		cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input-suffix > .anticon > svg').click()

		cy.log('click save button')
		cy.get(':nth-child(2) > .split-form > .ant-btn > span').click()
	})
})