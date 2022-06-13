Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});
describe("Workflow", () => {
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

	  it("visiting workflow screen",()=>{
  
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		
	  });

	  it("Chart Approval click",()=>{
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', '**/recebtly-approved', { fixture: 'recently-approved.json' })
		cy.intercept('GET', '**/awaiting-approval', { fixture: 'awaiting-approval.json' })
		cy.wait(6000)
		cy.get('.approval-cards').click();
	  })
  
	  it("Redirect to chart screen",()=>{
		cy.wait(2000);
		cy.get(':nth-child(2) > .ant-table-cell-fix-left > .review-submission').click();
		cy.wait(2000);
	});

	it("Recently approved tab",()=>{
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
		cy.wait(6000);
		cy.get('.card_desc').click();
		cy.wait(6000);
		cy.get('#rc-tabs-0-tab-2').click();

	});
	// it('Load Screen Header', () => {
	// 	const date = new Date();
	// 	const month = date.toLocaleString('default', { month: 'long' });
	// 	const latestDate = date.getDate();
	// 	const year = date.getFullYear();
	// 	const currentDate = month + ' ' + latestDate + ',' + ' ' + year;

	// 	cy.log('Verify Screen Header Component')
	// 	cy.get('.screen_header_head')

	// 	cy.log('Verify User Name')
	// 	cy.get('.screen_header_username').should("have.text", "Hello Fahad!")

	// 	cy.log('Verify Header Text')
	// 	cy.get('.screen_header_text').should("have.text", "Today is a great day to approve some records! Lets take look")

	// 	cy.log('Verify Current Date')
	// 	cy.get('.screen_header_resultdate').should("have.text", currentDate)
	// })
});


