Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe("The App", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
});


describe("<App/>", () => {
  // before(() => {
  //   cy.visit("/user/login");
  //   cy.login();
  //   cy.saveLocalStorage();
  // });

  describe("Login", () => {
    it("Should show login", () => {
      cy.url().should("include", "/user/login");
    });

    describe("Should validate user", () => {
      // it("should login fail", () => {
      //   cy.get("#username").type("demo").should("have.value", "demo");
      //   cy.get("#password").type("demo123").should("have.value", "demo");
      //   cy.get("#login-btn").click();
      //   cy.url().should("include", "/user/login");
      //   cy.get(".ant-notification").contains("Bad credentials");
      // });
      it("should login successfully and show dashboard", () => {
        cy.get("#username").clear().type("demo").should("have.value", "demo");
        cy.get("#password").clear().type("demo").should("have.value", "demo");
        cy.get("#login-btn").click();
        cy.get("#chart_personalization > .ant-menu-title-content > a").click({force: true})
        cy.get('.sub-header-btns > :nth-child(1)',{ timeout: 20000 }).click()
        cy.get('.input_view > .ant-select > .ant-select-selector').click()
        cy.get('.rc-virtual-list > .ant-select-item-option-content').should('have.value', 'V23-1').click({force: true})
        // ant-select-selection-search
        // ant-select ant-select-single ant-select-show-arrow
        // cy.get('.ant-select-selector').should('have.value', 'V23-1')
        // cy.get(`.ant-select-selector`).type('V5-2');
        // cy.get('V5-2',{ timeout: 20000 }).next().find('.ant-select-item-option-content').click()
        // cy.contains('V23-1',{ timeout: 20000 }).trigger('mousemove').click()
        // cy.visit("https://bms-cpvdev.mareana.com/#/dashboard/chart_personalization")
        // cy.url().should("include", "/dashboard/view_creation");
      });
    });
  });

  
});
