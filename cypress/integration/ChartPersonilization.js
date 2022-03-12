Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe("The App", () => {
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
    cy.get("#chart_personalization > .ant-menu-title-content > a").click({force: true})
    cy.get('.sub-header-btns > :nth-child(1)',{ timeout: 20000 }).click()
    cy.get('.input_view > .ant-select > .ant-select-selector',{ timeout: 20000 }).click()
    cy.get('.rc-virtual-list-holder-inner').children().each(($el, index, $list) => {
      if(index == 0){
         $el.click();
      }
   })
    
    
  });

});
