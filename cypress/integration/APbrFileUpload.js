Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});
describe("PbrFileUpload", () => {
	beforeEach(() => {
		cy.intercept('POST', '/pbr/udh/project_filter_search', { fixture: 'pbrFileUpload.json' })
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "fahad.siddiqui@mareana.com");
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

	it("Render Upload screen", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/pbr_file_upload')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/pbr_file_upload')
	});

	it("reload", () => {
		cy.reload()
		cy.wait(3000)
	})

    it("Select Project", () => {
        const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/pbr_file_upload')
        cy.wait(8000)
        cy.get(':nth-child(1) > .select_field_search > .search-block > .ant-select > .ant-select-selector').click({ force: true })
		cy.get("#rc_select_0").clear();
		cy.get("#rc_select_0").type("Project");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })
		cy.wait(4000)
	});

    it("Select Group", () => {
        cy.get(':nth-child(2) > .select_field_search > .search-block > .ant-select > .ant-select-selector').click({ force: true })
		cy.get("#rc_select_1").clear();
		cy.get("#rc_select_1").type("Group");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(9).click({ force: true })
		cy.wait(4000)
	});

    it("Select Sub-Group", () => {
        cy.get(':nth-child(3) > .select_field_search > .search-block > .ant-select > .ant-select-selector').click({ force: true })
        cy.get(':nth-child(2) > .select_field_search > .search-block > .ant-select > .ant-select-selector')
		cy.get("#rc_select_2").clear();
		cy.get("#rc_select_2").type("Group");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(11).click({ force: true })
		cy.wait(4000)
	});

    it("Click Upload", () => {
        cy.get('.create-new').click({ force: true })
        cy.wait(4000)
        cy.get('.ant-modal-close-x > .anticon > svg > path').click({ force: true })
	});


})