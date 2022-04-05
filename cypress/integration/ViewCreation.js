// Cypress.on('uncaught:exception', (err, runnable) => {
//   return false;
// });

// describe('The App', () => {
//   it('viewCreationsscreen', function () {
//     cy.visit('/');
//     cy.url().should('include', '/user/login');
//     cy.get('#username').clear();
//     cy.get('#username').type('demo');
//     cy.get('.ant-input-affix-wrapper').click();
//     cy.get('.ant-input-affix-wrapper').click();
//     cy.get('#password').clear();
//     cy.get('#password').type('demo');
//     cy.get('#login-btn > span').click();
//     cy.get(
//       ':nth-child(1) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector',
//       { timeout: 20000000 }
//     ).click();
//     cy.get('.ant-select-item-option-content', { timeout: 20000000 }).click();
//     cy.get(
//       '.materials-wrapper > .ant-collapse > :nth-child(1) > .ant-collapse-header',
//       { timeout: 20000000 }
//     ).click();
//     cy.get('.materialsList-table')
//       .find('table')
//       .find('tr')
//       .each(($el, index, $list) => {
//         if (index == 1 || index == 2) {
//           $el.find('td').eq('2').find('.material-addIcon').click();
//         }
//       });

//     cy.get(
//       '[data-row-key="1"] > [style="position: sticky; left: 100px;"] > .ant-tag',
//       { timeout: 20000 }
//     ).click({ force: true });
//     cy.get(
//       '[data-row-key="2"] > [style="position: sticky; left: 100px;"] > .ant-tag',
//       { timeout: 20000 }
//     ).click();
//     cy.get('#viewSummary-form_function_name').clear();
//     cy.get('#viewSummary-form_function_name').type('new function');
//     cy.get('#viewSummary-form_function', { timeout: 20000 }).click();
//     cy.get(
//       ':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content',
//       { timeout: 20000 }
//     ).click();
//     cy.get(
//       ':nth-child(5) > .ant-form-item-control > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector > .ant-select-selection-item',
//       { timeout: 20000 }
//     ).click();
//     cy.get(
//       ':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content',
//       { timeout: 20000 }
//     ).click();
//     cy.get(
//       '.viewCreation-blockHeader > .viewCreation-btns > :nth-child(1) > span',
//       { timeout: 20000 }
//     ).click();
//     cy.get('#viewSummary-form_function_name').clear();
//     cy.get('#viewSummary-form_function_name').type('new function1');
//     cy.get('[style="margin-left: 16px;"] > span', { timeout: 20000 }).click();
//     cy.get('#viewSummary-form_viewName').clear();
//     cy.get('#viewSummary-form_viewName').type('my view');
//     cy.get('.viewCreation-saveAsBtn > span', { timeout: 20000 }).click({
//       force: true,
//     });
//     cy.get('#viewSummary-form_filters').clear({ force: true });
//     cy.get('#viewSummary-form_filters').type('fe');
//     cy.get(
//       '[style=""] > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content',
//       { timeout: 20000 }
//     ).click();
//     cy.get('.viewCreation-saveBtn > span', { timeout: 20000 }).click({
//       force: true,
//     });
//   });
// });
