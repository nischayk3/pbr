
describe("Render View Creation Load Error Log", () => {
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
		cy.get('.user-name > p').should("have.text", "Fahad siddiqui")

		cy.get('.user-name > .anticon').click()
		cy.get('.user-name > p').should("have.text", "Fahad siddiqui")
		cy.get('.email').should("have.text", "fahad.siddiqui@mareana.com")

		cy.get('.submenu > :nth-child(1)').click()
		cy.wait(4000)

		cy.log('verify basic information')

		cy.log('verify firstname')
		cy.get('#firstname').should("have.text", "Fahad")

		cy.log('verify lastname')
		cy.get('#lastname').should("have.text", "siddiqui")

		cy.log('verify email')
		cy.get('#email').should("have.text", "fahad.siddiqui@mareana.com")

	})

	it('should verify Password', () => {
		cy.log('verify password section')
		cy.get('.layout-section-wrapper > :nth-child(2) > .heading').should("have.text", "Password")

		cy.log('verify current password')
		cy.get('.layout-section-wrapper > :nth-child(2) > .split-form > :nth-child(1) > :nth-child(1) > p').should("have.text", "Current password")
		cy.get('.split-form > :nth-child(1) > :nth-child(1) > .ant-input-affix-wrapper > .ant-input').type("password")

		cy.log('verify new password')
		cy.get('.layout-section-wrapper > :nth-child(2) > .split-form > :nth-child(1) > :nth-child(2) > p').should("have.text", "New password")
		cy.get('.layout-section-wrapper > :nth-child(2) > .split-form > :nth-child(1) > :nth-child(2) > p').type("password1")

		cy.log('verify confirm new passwprd')
		cy.get(':nth-child(2) > .split-form > :nth-child(1) > :nth-child(3) > p').should("have.text", "Confirm new password")
		cy.get(':nth-child(3) > .ant-input-affix-wrapper > .ant-input').type("password2")

		cy.log('click save button')
		cy.get(':nth-child(2) > .split-form > .ant-btn > span').click()
	})
})