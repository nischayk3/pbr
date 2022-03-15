Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('ReportDesigner', () => {
  it('reportDesigner', function () {
    cy.visit('http://localhost/');
    cy.get('#username').clear();
    cy.get('#username').type('demo');
    cy.get('#password').clear();
    cy.get('#password').type('demo');
    cy.get('#login-btn > span').click();
    cy.get('#report_designer > .ant-menu-title-content > a').click();
    cy.get('.sub-header-btns > :nth-child(1) > span').click();
    cy.get(':nth-child(2) > .ant-input').clear();
    cy.get(':nth-child(2) > .ant-input').type('REPORT_TEST');
    cy.get('.ant-select-selection-item').click();
    cy.get('[title="V1-1"]', {
      timeout: 20000,
    }).click();
    cy.get('.ant-select-selection-overflow', {
      timeout: 10000,
    }).click();
    cy.get(
      ':nth-child(8) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
    ).click();
    cy.get(
      ':nth-child(8) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
    ).click();
    cy.get('.reportDesigner-dynamicSections').click();
    cy.get(
      '[d="M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z"]'
    ).click();
    cy.get('#report-generator-form_response_0_sectionName').clear();
    cy.get('#report-generator-form_response_0_sectionName').type('TITLEPAGE');
    cy.get('.ant-form-item-control-input-content > .anticon > svg').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_0_keyName').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_0_value').click();
    cy.get('.sub-header-btns > :nth-child(3) > span').click();
    cy.get('.ant-modal-close-x', { timeout: 20000 }).click();
    cy.get('.sub-header-btns > :nth-child(2) > span').click();
    cy.get('.ant-modal-body > .ant-btn').click();
    cy.get(':nth-child(34) > :nth-child(1) > div').click();
    cy.get(
      ':nth-child(11) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-footer > .ant-btn'
    ).click();
  });
});
