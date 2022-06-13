Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
  });
  
  describe("workspace", () => {
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
	})
  
	it("visiting workspace screen",()=>{
  
	  const url = Cypress.config().baseUrl
	  cy.visit(url + '/#/dashboard/workspace')
	  cy.log('Load Landing Page')
	  cy.url().should('eq', url + '/#/dashboard/workspace')
	  
	  
	});

	it("Redirecting Chart approval screen load",()=>{
		cy.wait(6000)
		cy.get(':nth-child(1) > .workspace-processChart-card').click();
	});

	it("Redirecting to View approval screen",()=>{
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workspace')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workspace')
		cy.wait(6000)
		cy.get(':nth-child(1) > .innercard > .paper-batch-card > .paper-batch-desc').click();
	})

	it("load",()=>{
		cy.get('.workspace-main-block > :nth-child(1)').click();
		cy.get('.recentcard').click();
		cy.get('.workspace-main-block > :nth-child(3)').click();
		cy.get('.workspace-card1 > .innercard > [style="float: right;"] > .workspace-review').click();
		cy.get('#workspace > .ant-menu-title-content > a').click();
	
	});
});
