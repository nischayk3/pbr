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
           if(index == 4){
              $el.click();
           }
        })

        cy.get(':nth-child(2) > :nth-child(1) > .ant-card > .ant-card-body > .grid-2-columns > .select_field > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
    cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get(':nth-child(2) > :nth-child(1) > .ant-card > .ant-card-body > .ant-btn > span').click();
    cy.get(':nth-child(3) > :nth-child(1) > .ant-card > .ant-card-body > :nth-child(1) > .select_field > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
    cy.get(':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('[style="margin-top: 10px;"] > :nth-child(1) > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
    cy.get(':nth-child(8) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('[style="margin-top: 10px;"] > :nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
    cy.get(':nth-child(9) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get(':nth-child(3) > :nth-child(1) > .ant-card > .ant-card-body > .ant-btn > span').click();
    cy.get('.chart-details-input > :nth-child(4) > .ant-input').clear();
    cy.get('.chart-details-input > :nth-child(4) > .ant-input').type('mychart');
    cy.get(':nth-child(5) > .ant-input').clear();
    cy.get(':nth-child(5) > .ant-input').type('my charts');
    cy.get('.sub-header-btns > :nth-child(2) > span').click();
    cy.get('.save-wrapper > .ant-btn > span').click();
  });



});
