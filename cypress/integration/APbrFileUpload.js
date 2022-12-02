Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});
describe("PbrFileUpload", () => {
	afterEach(() => {
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem("loginwith", "WITH_AD");
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
		cy.intercept('POST', '/pbr/udh/project_filter_search', { fixture: 'pbrFileUpload.json' })
	});

	beforeEach(() => {
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("loginwith", "WITH_AD");
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
		cy.intercept('POST', '/pbr/udh/project_filter_search', { fixture: 'pbrFileUpload.json' })
	})

	it("Render Upload screen", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/pbr_file_upload')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/pbr_file_upload')
	});

	it("Select Project", () => {
		cy.wait(4000)
		cy.get('#projectDropdown').click({ force: true })
		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })
	});

	it("Select Group", () => {
		cy.wait(4000)
		cy.get('#groupDropdown').click({ force: true })
		cy.get(".ant-select-item-option-content").eq(9).click({ force: true })
		cy.wait(4000)
	});

	it("Select Sub-Group", () => {
		cy.wait(4000)
		cy.get('#subGroupDropdown').click({ force: true })
		cy.get(".ant-select-item-option-content").eq(11).click({ force: true })
		cy.wait(4000)
	});

	it("Click Upload", () => {
		cy.get('#uploadPDf').click({ force: true })
		cy.wait(4000)
		cy.get('.ant-modal-close-x > .anticon > svg > path').click({ force: true })
	});
})