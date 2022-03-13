Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  
  describe("workflow", () => {
    it("successfully loads", () => {
      cy.visit("/");
    });

    it("Should show login", () => {
      cy.url().should("include", "/user/login");
    });

    it("should login successfully and show dashboard", () => {
      cy.get("#username").clear().type("demo").should("have.value", "demo");
      cy.get("#password").clear().type("demo").should("have.value", "demo");
      cy.get("#login-btn").click();
      cy.get("#workflow > .ant-menu-title-content > a",{ timeout: 20000 }).click({force: true});
      cy.get(':nth-child(2) > .approval-cards > .card_desc > .approve-desc',{ timeout: 20000 }).click();
      cy.get(':nth-child(3) > .approval-cards > .card_desc > .approve-desc',{ timeout: 20000 }).click();
      cy.get(':nth-child(1) > .approval-cards > .card_desc > .approve-desc',{ timeout: 20000 }).click();
      cy.get('#rc-tabs-0-tab-1',{ timeout: 20000 }).click();
      cy.get('#rc-tabs-0-panel-1 > .workflow-table > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-body > table > .ant-table-tbody > :nth-child(2) > :nth-child(1) > .review-submission').click();
       
    });
  });
  