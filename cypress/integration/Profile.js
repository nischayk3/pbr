Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

describe("Render User Profile", () => {
	afterEach(() => {
		localStorage.setItem("loginwith", "WITHOUT_AD");
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
	});

	beforeEach(() => {
		cy.viewport(1360, 780)
		localStorage.setItem("loginwith", "WITHOUT_AD");
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

	it('Load User Profile', () => {
		const url = Cypress.config().baseUrl
		cy.wait(5000).then(() => {
			cy.visit(url + '/#/dashboard/profile')
			cy.log('Load Landing Page')
			cy.url().should('eq', url + '/#/dashboard/profile')
		})

		cy.log('verify login username')
		cy.wait(2000)
		cy.get('.user-name > .anticon').click({ force: true })
		cy.get('.username').should("have.text", "Dinesh Jinjala")
		cy.get('.email').should("have.text", "dinesh.jinjala@mareana.com")

		cy.get('.submenu > :nth-child(1)').click()
		cy.wait(2000)
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



	it('should verify Preference', () => {
		cy.log('Upload Profile Image')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/avatar.png' }, { force: true })

		cy.log('Select Date Format')
		cy.get('#rc_select_0').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').first().click({ force: true })

		cy.log("clear data")
		cy.get(':nth-child(1) > .search-block > .ant-btn > .anticon > svg').click()

		cy.get(':nth-child(1) > .search-block > .ant-select > .ant-select-selector').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').first().click({ force: true })

		cy.log('Select Time Zone')
		cy.get('#rc_select_1').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(1).click({ force: true })

		cy.log("clear data")
		cy.get(':nth-child(2) > .search-block > .ant-btn > .anticon > svg').click()

		cy.get(':nth-child(2) > .search-block > .ant-select > .ant-select-selector').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(1).click({ force: true })

		cy.log('Select Language')
		cy.get('#rc_select_2').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(2).click({ force: true })

		cy.log("clear data")
		cy.get(':nth-child(3) > .search-block > .ant-btn > .anticon > svg').click()

		cy.get(':nth-child(3) > .search-block > .ant-select > .ant-select-selector').click()
		cy.wait(500)
		cy.get('.ant-select-item-option').eq(2).click({ force: true })
	})
})
