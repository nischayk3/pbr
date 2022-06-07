Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  describe('Faq', () => {
    beforeEach(() => {
    cy.visit("/");
    cy.url().should("include", "/user/login");
      localStorage.setItem("test_enabled", true);
      localStorage.setItem("user", "fahad.siddiqui@mareana.com");
      localStorage.setItem(
        "login_details",
        JSON.stringify({
          ad_role: false,
          email_id: "fahad.siddiqui@mareana.com",
          firstname: "Fahad",
          lastname: "siddiqui",
          email_id: "fahad.siddiqui@mareana.com",
          mdh_role: "USER",
          screen_set: "1000_USER",
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
        })
      );
    })

        
    it("should login successfully using Ad", () => {
        cy.get("#login-btn",{timeout:2000}).click();
        cy.get('#genealogy > .ant-menu-title-content > a',{timeout:20000}).click({ force: true,multiple:true});
        cy.location('href', {timeout: 10000}).should('include', '/genealogy');
        cy.wait(1000)

        cy.log("opening faq drawer")
        cy.get('.hepIcon ').click()
        cy.get('.help_item').eq(0).click()
        cy.get('#helptext').click()

        cy.log("closing the drawer")
        cy.get(".ant-drawer-close").click()

        cy.log("searching test")
        cy.log("opening faq drawer")
        cy.get('.hepIcon ').click()
        cy.get('.help_item').eq(0).click()
        cy.get('#helptext').click()
        cy.get('input[placeholder="Search"]').click()
        cy.get('input[placeholder="Search"]').type("a")
        cy.get('.ant-input-search-button').click()

        cy.log("View all Faqs page")
        cy.get("#view_all_faq").click()

    });
  });