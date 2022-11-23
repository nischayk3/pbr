Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

describe("Render User Profile", () => {
	beforeEach(() => {
		cy.viewport(1360, 780)
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
		localStorage.setItem("username", "Fahad");
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

	it('Load User Profile', () => {
		const url = Cypress.config().baseUrl
		cy.wait(4000).then(() => {
			cy.visit(url + '/#/dashboard/profile')
			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/profile')
		})
	})

	it('should verify username', () => {
		cy.log('verify login username')
		cy.wait(2000)
		cy.get('.user-name > .anticon').click()
		cy.get('.username').should("have.text", "Fahad siddiqui")
		cy.get('.email').should("have.text", "fahad.siddiqui@mareana.com")

		cy.get('.submenu > :nth-child(1)').click()
		cy.wait(2000)

		cy.log('verify basic information')
	})

	it('should verify Password', () => {
		cy.log('verify password section')
		cy.get('.layout-section-wrapper > :nth-child(2) > .heading').should("have.text", "Password")

		cy.log('verify current password')
		cy.get('.layout-section-wrapper > :nth-child(2) > .split-form > :nth-child(1) > :nth-child(1) > p').should("have.text", "Current password")
		cy.get('.split-form > :nth-child(1) > :nth-child(1) > .ant-input-affix-wrapper > .ant-input').type("password")

		cy.log('verify new password')
		cy.get('.layout-section-wrapper > :nth-child(2) > .split-form > :nth-child(1) > :nth-child(2) > p').should("have.text", "New password")
		cy.get(':nth-child(2) > .ant-input-affix-wrapper > .ant-input').type("password1")

		cy.log('verify confirm new passwprd')
		cy.get(':nth-child(2) > .split-form > :nth-child(1) > :nth-child(3) > p').should("have.text", "Confirm new password")
		cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input').type("password2")

		cy.log('click save button')
		cy.get(':nth-child(2) > .split-form > .ant-btn > span').click()
	})

	it('should verify Preference', () => {
		cy.log('Upload Profile Image')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/avatar.png' }, { force: true })

		cy.log('Select Date Format')
		cy.get('#rc_select_0').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').first().click({ force: true })


		cy.log('Select Time Zone')
		cy.get('#rc_select_1').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(1).click({ force: true })

		cy.log('Select Language')
		cy.get('#rc_select_2').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(2).click({ force: true })
	})
})
