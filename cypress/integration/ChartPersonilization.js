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
    //cy.get('.ant-select-item-option-content').focus().wait(1000).contains('V23-1').click()
    cy.get('.rc-virtual-list-holder-inner').each(($ele) => {
      if($ele.text() == 'V23-1') {
        cy.wrap($ele).click({force: true})
      }
    })
  //   cy.get('[title="V23-1"] > .ant-select-item-option-content').click();
  //   cy.get('.rc-virtual-list-holder-inner').children().each(($el, index, $list) => {
  //     if(index == 0){
  //        $el.click();
  //     }
  //  })
    
    
  });

  /* ==== Test Created with Cypress Studio ==== */
  // it('createnewChart', function() {
    
  //   cy.visit('http://localhost/');
  //   cy.get('#username').clear();
  //   cy.get('#username').type('demo');
  //   cy.get('#password').clear();
  //   cy.get('#password').type('demo');
  //   cy.get('#login-btn > span').click();
  //   cy.get('#chart_personalization > .ant-menu-title-content > a').click();
  //   cy.get('.sub-header-btns > :nth-child(1) > span').click();
  //   cy.get('#rc_select_2').click();
  //   cy.get('[title="V23-1"] > .ant-select-item-option-content').click();
  //   cy.get(':nth-child(3) > :nth-child(1) > .ant-card > .ant-card-body > :nth-child(1) > .select_field > .ant-select > .ant-select-selector').click();
  //   cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
  //   cy.get('[style="margin-top: 10px;"] > :nth-child(1) > .ant-select > .ant-select-selector').click();
  //   cy.get(':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
  //   cy.get('[style="margin-top: 10px;"] > :nth-child(2) > .ant-select > .ant-select-selector').click();
  //   cy.get(':nth-child(8) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
  //   cy.get(':nth-child(3) > :nth-child(1) > .ant-card > .ant-card-body > .ant-btn > span').click();
  //   cy.get('.sub-header-btns > :nth-child(2) > span').click();
  //   cy.get('.input-error-label > .input_field > .ant-input').click();
  //   cy.get(':nth-child(5) > .ant-input').clear();
  //   cy.get(':nth-child(5) > .ant-input').type('new chart');
  //   cy.get('.sub-header-btns > [ant-click-animating-without-extra-node="false"] > span').click();
  //   cy.get('.save-wrapper > .ant-btn > span').click();
   
  // });
});
