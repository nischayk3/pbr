Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  describe("Workflow", () => {
    it("should login successfully using Ad", () => {
      cy.visit("/");
      cy.url().should("include", "/user/login");
      cy.get("#login-btn").click();
      localStorage.setItem("test_enabled", true);
      localStorage.setItem("user", "fahad.siddiqui@mareana.com");
      localStorage.setItem(
        "login_details",
        JSON.stringify({
          firstname: "Fahad",
          lastname: "siddiqui",
          email_id: "fahad.siddiqui@mareana.com",
          token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
        })
      );
      cy.wait(5000)
      cy.get('#workflow > .ant-menu-title-content > a').click({

        force: true,

      });
      cy.get(':nth-child(1) > .approval-cards > .card_desc > .approve-desc').click();
      cy.get('#rc-tabs-0-tab-2').click();
      cy.get('.approval-cards > .card_desc > .approve-desc').click();
      
    });
  });


  