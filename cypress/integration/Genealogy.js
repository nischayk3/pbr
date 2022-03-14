Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('The App', () => {
  /* ==== Test Created with Cypress Studio ==== */
  it('selectParameter', function () {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit('/');
    cy.url().should('include', '/user/login');
    cy.get('#username').clear();
    cy.get('#username').type('demo');
    cy.get('#password').clear();
    cy.get('#password').type('demo');
    cy.get('#login-btn > span').click();
    cy.get('#genealogy > .ant-menu-title-content > a', {
      timeout: 20000,
    }).click({ force: true });
    cy.get(
      ':nth-child(1) > :nth-child(1) > .ant-select > .ant-select-selector > .ant-select-selection-item'
    ).click();
    cy.get(
      '.ant-select-item-option-active > .ant-select-item-option-content'
    ).click();
    cy.get(
      ':nth-child(2) > .select_field_search > .ant-select > .ant-select-selector > .ant-select-selection-item'
    ).click();
    cy.get(
      ':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
    ).click();
    cy.get(
      ':nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item'
    ).click();
    cy.get(
      ':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
    ).click();

    /* ==== End Cypress Studio ==== */
  });
});
