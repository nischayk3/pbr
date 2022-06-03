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


      /* ==== Generated with Cypress Studio ==== */
      cy.get('.approval-cards > .card_desc > .approve-desc').click();
      cy.get(':nth-child(4) > .ant-table-cell-fix-left > .review-submission').click();
      cy.get('.btns > :nth-child(2) > span').click();
      cy.get(':nth-child(1) > .ant-input').clear();
      cy.get(':nth-child(1) > .ant-input').type('binkita.tiwari@mareana.com');
      cy.get(':nth-child(2) > .ant-input').clear();
      cy.get(':nth-child(2) > .ant-input').type('Email@2997');
      cy.get('.ant-modal-footer > .ant-btn > span').click();
      cy.get('.ant-select-selector').click();
      cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
      cy.get('.custom-secondary-btn > span').click();
      cy.get('#workflow > .ant-menu-title-content > a').click();
      cy.get(':nth-child(2) > .approval-cards > .card_desc > .approve-desc').click();
      cy.get('#rc-tabs-4-tab-2').click();
      /* ==== End Cypress Studio ==== */
    });
  });


  