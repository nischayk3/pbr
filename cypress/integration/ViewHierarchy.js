Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe("Renders the view Hierarachy page", () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    localStorage.setItem("test_enabled", true);
    localStorage.setItem("user", "fahad.siddiqui@mareana.com");
    localStorage.setItem(
      "login_details",
      JSON.stringify({
        ad_role: false,
        email_id: "fahad.siddiqui@mareana.com",
        firstname: "Fahad",
        lastname: "siddiqui",
        mdh_role: "USER",
        screen_set: "1000_USER",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc",
      })
    );
  });
  it('Load View Landing Page Correctly', () => {
    const url = Cypress.config().baseUrl
    cy.visit(url + '/#/dashboard/molecule_hierarchy_configuration')
    cy.log('Load Landing Page')
    cy.url().should('eq', url + '/#/dashboard/molecule_hierarchy_configuration')
  })

  it("Renders View Hierarchy", () => {
    const url = Cypress.config().baseUrl
    cy.visit(url + '/#/dashboard/molecule_hierarchy_configuration')
    cy.wait(5000)
    cy.get('.create-new > .anticon > svg').click({ force: true });
    cy.get('.input-ant > .ant-input').clear();
    cy.get('.input-ant > .ant-input').type('new_drug');
    cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
    cy.get(':nth-child(2) > .ant-input').clear();
    cy.get(':nth-child(2) > .ant-input').type('1322454');
    cy.get(':nth-child(3) > .ant-input').clear();
    cy.get(':nth-child(3) > .ant-input').type('1255');
    cy.get('.add-button > .ant-btn > :nth-child(2)').click();
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').type('1322454');
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').type('1256');
    cy.get('.ant-tabs-extra-content > .ant-btn').click({ force: true });
    cy.get('[data-row-key="2"] > :nth-child(1) > .anticon > svg').click({ force: true });
    cy.get('.ant-btn-primary > span').click({ force: true });
    cy.get('.ant-tabs-extra-content > .ant-btn').click({ force: true });
    cy.get('.tab-button-text').click({ force: true });
    cy.wait(2000)
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input').clear();
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input').type('1');
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input').clear();
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input').type('A');
    cy.get('.ant-tabs-extra-content > .ant-btn').click({ force: true });
    cy.get('#rc-tabs-0-panel-Process\\ steps > .add-button > .ant-btn > :nth-child(2)').click({ force: true });
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').type('2');
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').type('B');
    cy.get('.ant-tabs-extra-content > .ant-btn > span').click({ force: true });
    cy.get('[data-row-key="2"] > :nth-child(1)').click({ force: true });
    cy.wait(2000)
    cy.get('#rc-tabs-0-panel-Process\\ steps > .tab-title > .ant-btn > .tab-button-text').click({ force: true });
    cy.wait(2000)
    // cy.get(':nth-child(1) > [style="text-align: left;"] > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
    // cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    // cy.wait(2000)
    // cy.get('.ant-tabs-extra-content > .ant-btn > span').click();
  });

  it('load_data', function () {
    const url = Cypress.config().baseUrl
    cy.intercept('GET', 'drug-substance', { fixture: 'view-hierarchy.json' })
    cy.visit(url + '/#/dashboard/molecule_hierarchy_configuration')
    cy.wait(3000)
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('BELA{enter}');
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('BELA{enter}');
    cy.get('.ant-table-tbody > :nth-child(1) > :nth-child(1)').click();
    cy.wait(3000)
    cy.get('#rc-tabs-0-tab-Process\\ steps').click();
    cy.wait(3000)
    // cy.get('#rc-tabs-0-panel-Process\\ steps > .tab-title > .ant-btn > .tab-button-text').click();
    // cy.wait(3000)
    // cy.get(':nth-child(1) > [style="text-align: left;"] > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
    // cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#rc-tabs-0-tab-Process\\ step\\ mapping').click();
    cy.get(':nth-child(1) > [style="text-align: left;"] > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('.ant-tabs-extra-content > .ant-btn > span').click();
    /* ==== End Cypress Studio ==== */
  });
  it('Saving', () => {
    cy.get('.ant-tabs-extra-content > .ant-btn > span').click();
  })
  it('load_data via tile', function () {
    const url = Cypress.config().baseUrl
    cy.visit(url + '/#/dashboard/molecule_hierarchy_configuration')
    cy.intercept('GET', 'drug-substance', { fixture: 'view-hierarchy.json' })
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.ant-input').click();
    cy.wait(5000)
    cy.get(':nth-child(1) > .chart-tiles').click();
    cy.wait(4000)
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.add-button > .ant-btn > :nth-child(2)').click();
    cy.get('.add-button > .ant-btn > :nth-child(2)').click();
    cy.get('[data-row-key="1"] > :nth-child(1) > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click();
    cy.get('.ant-btn-primary > span').click();
    cy.get('.ant-tabs-extra-content > .ant-btn').click();
    /* ==== End Cypress Studio ==== */
  });


});
