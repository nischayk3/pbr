Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

Cypress.Commands.add("multiselect", (options) => {
	options.forEach((option) => {
		cy.log(option)
		cy.get('.ant-select-item-option').contains(option).click()
	});
});

describe("Genealogy", () => {
	beforeEach(() => {
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
		cy.intercept('POST', '**/genealogy-filter', { fixture: 'genealogy-filter.json' })
	})

	it("Render genealogy screen", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/genealogy')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/genealogy')
		cy.intercept('GET', '/services/v1/product-type-genealogy', { fixture: 'genealogyFilterProductType.json' })

	});

	it("Select plant", () => {
		cy.get(
			":nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_0").clear();
		cy.get("#rc_select_0").type("1338");
		cy.get(".ant-select-item-option-content").click({ force: true });
	});

	it("Selecting product", () => {
		cy.get(
			":nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_1").clear();
		cy.get("#rc_select_1").type("1089084");
		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })
	})

	it("Selecting Batch", () => {
		cy.get(
			":nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_2").clear();
		cy.get("#rc_select_2").type("394154");
		cy.get(".ant-select-item-option-content").eq(2).click({ force: true })
	})

	it("Selecting Product type", () => {
		cy.get('.ant-select-selection-overflow').click();
		cy.get("#rc_select_3").clear();
		cy.get("#rc_select_3").type("RAW");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(3).click({ force: true })
	});

	it("Search backword filters", () => {
		cy.get("#genealogy-search").click()
		cy.intercept('GET', '**/genealogy?levels=5&batch_id=1338%7C1089084%7C394154&backward=true&mat_type=%27RAW%27', { fixture: 'backward.json' })
	});

	it("Verfiy backword tree", () => {
		cy.get('.tab-label').should("have.text", "1089084 - backward")

		cy.log('Verify first node');

	});

	it("Opening Drawer", () => {
		cy.get('#1091460 > #material-img').click();
		cy.get("#view-details-popup").click();
	});

	it("expand drawer",()=>{
		cy.get('.expand-drawer > img').click()
	})

	// it("click forward genealogy", () => {
	// 	cy.get(".ant-drawer-mask").eq(0).click();
	// 	cy.get('#1091460 > #material-img').click();
	// 	cy.get("#forward-genealogy-popup").click();
	// 	cy.wait(3000)
	// })

	// Gives bad request
	// it("search forward from filter",()=>{
	//   cy.get("#rc-tabs-0-tab-1").click()
	//   cy.get(".toggleLabel").eq(1).click()
	//   cy.wait(3000)
	//   cy.get("#genealogy-search").click()
	//   cy.wait(3000)

	// })

	// it("Clear filters",()=>{
	//   cy.get("#clear-search").click()
	// })

	// it("search genealogy backwork",()=>{

	//   cy.log("selectiong plant")
	//   cy.get(
	//     ":nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
	//   ).click();
	//   cy.get("#rc_select_0").clear();
	//   cy.get("#rc_select_0").type("1338");
	//   cy.wait(3000);
	//   cy.get(".ant-select-item-option-content").click({ force: true });


	//   cy.log("selectiong product")
	//   cy.get(
	//     ":nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
	//   ).click();
	//   cy.get("#rc_select_1").clear();
	//   cy.get("#rc_select_1").type("1089084");
	//   cy.wait(4000)
	//   cy.get(".ant-select-item-option-content").eq(1).click({force:true})


	//   cy.log("selecting Batch")
	//   cy.get(
	//     ":nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
	//   ).click();
	//   cy.get("#rc_select_2").clear();
	//   cy.get("#rc_select_2").type("394154");
	//   cy.wait(4000)
	//   cy.get(".ant-select-item-option-content").eq(2).click({force:true})


	//   cy.log("selection product type")
	//   cy.get('.ant-select-selection-overflow').click();
	//   cy.get("#rc_select_3").clear();
	//   cy.get("#rc_select_3").type("RAW");
	//   cy.wait(4000)
	//   cy.get(".ant-select-item-option-content").eq(3).click({force:true})


	// })

	// it("genealogy filter",()=>{
	//   /* geneaology tab */
	//   cy.get(
	//     ":nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
	//   ).click();
	//   cy.get("#rc_select_2").clear();
	//   cy.get(
	//     '[style="height: 2496px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
	//   ).click();
	//   cy.get(".ant-btn-primary > span").click();
	//   cy.wait(2000);
	//   cy.get("#1091460 > #material-img").click();
	//   cy.get("#popup > :nth-child(3) > span").click();
	//   cy.get(":nth-child(1) > .ant-collapse-header > .panel-header").click();
	//   cy.get(":nth-child(2) > .ant-collapse-header > .panel-header").click();
	//   cy.get(":nth-child(3) > .ant-collapse-header > .panel-header > p").click();
	//   cy.get(
	//     ":nth-child(1) > .ant-collapse-header > .panel-header > .ant-btn > span"
	//   ).click();
	//   cy.get(":nth-child(2) > .ant-collapse-header > .panel-header").click();
	//   cy.get(".ant-collapse-item-active > .ant-collapse-header").click();
	//   cy.get(".ant-drawer-mask").click();
	//   cy.get("#rc_select_4").clear();
	//   cy.get("#rc_select_4").type("1091460");
	//   cy.get(".select-allowclear > .ant-btn > .anticon > svg").click();
	//   cy.get("#\\31 091460 > #material-img").click();
	//   cy.get("#popup > :nth-child(2) > span").click();
	//   cy.get('[x="20"]').click();
	//   cy.get('[x="20"]').click();
	//   cy.get("#\\31 091460 > #material-img").click();
	//   cy.get("#popup > :nth-child(1) > span").click();
	// });
});
