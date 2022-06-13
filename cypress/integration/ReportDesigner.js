Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe("Report Designer", () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    localStorage.setItem("test_enabled", true);
    localStorage.setItem("user", "mihir.bagga@mareana.com");
    localStorage.setItem("username", "Mihir");
    localStorage.setItem(
      "login_details",
      JSON.stringify({
        ad_role: false,
        firstname: "Mihir",
        lastname: "Bagga",
        email_id: "mihir.bagga@mareana.com",
        mdh_role: "USER",
        screen_set: "1000_USER",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
      })
    );
  })

  it("Report landing page", () => {
    const url = Cypress.config().baseUrl
    cy.log('Opening a report template')
    cy.visit(url + '/#/dashboard/report_designer')
  });

  it("Create New Report", () => {
    const url = Cypress.config().baseUrl
    cy.log('Opening a report template')
    cy.visit(url + '/#/dashboard/report_designer')
    cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
    cy.wait(2000)
    cy.intercept('GET', '**/views-list', { fixture: 'reportView.json' })
    cy.intercept('GET', '**/chart-list/V302-1', { fixture: 'reportChartList.json' })
    cy.get('.create-new').click();
  })
  it("Enter Report Details", () => {
    cy.intercept('GET', '**/views-list', { fixture: 'reportView.json' })
    cy.intercept('GET', '**/chart-list/V302-1', { fixture: 'reportChartList.json' })
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('Report');
    cy.wait(1000)
    cy.get('#rc_select_0').clear();
    cy.get('#rc_select_0').type('v3');
    cy.intercept('GET', '**/chart-list/V302-1', { fixture: 'reportChartList.json' })
    cy.wait(1000)
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('.ant-select-selection-overflow').click();
    cy.get(':nth-child(4) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content').click();
    cy.wait(1000)
  })
  it("Add Sections", () => {
    cy.get('.create-new-report > .anticon > svg').click({ force: true });
    cy.get('#report-generator-form_response_0_sectionName').clear();
    cy.get('#report-generator-form_response_0_sectionName').type('Titlepage');
    cy.get('[style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;"]').click({ force: true });
    cy.get('.create-new-report > .anticon > svg').click({ force: true });
    cy.get('.add-row-btn').click({ force: true });
    cy.wait(500)
    cy.get('#report-generator-form_response_0_dymamic_rows_0_keyName').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_0_keyName').type('key');
    cy.get('#report-generator-form_response_0_dymamic_rows_0_value').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_0_value').type('value');
    cy.get('.add-row-btn').click();
    cy.wait(500)
    cy.get('#report-generator-form_response_0_dymamic_rows_1_keyName').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_1_keyName').type('key');
    cy.get('#report-generator-form_response_0_dymamic_rows_1_value').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_1_value').type('value');
    cy.wait(500)
    cy.get(':nth-child(2) > :nth-child(1) > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click({ force: true });
    cy.get('.ant-btn-primary > span').click({ force: true });
    cy.get('.ant-switch-handle').click();
    cy.get('[style="border: 1px solid rgb(72, 107, 201); margin-bottom: 30px; min-height: 160px; border-radius: 4px; margin-top: 20px;"] > :nth-child(5) > .anticon > svg').click();
    cy.get('#report-generator-form_response_1_sectionName').clear();
    cy.get('#report-generator-form_response_1_sectionName').type('Summary');
    cy.get('[style="border: 1px solid rgb(72, 107, 201); margin-bottom: 30px; min-height: 160px; border-radius: 4px; margin-top: 20px;"]').click();
    cy.get('.add-chart').click();
    cy.get('.charttile-content').click();
    cy.get('.chart-name > :nth-child(1) > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click({ force: true })
    cy.get('.ant-btn-primary > span').click()
    cy.get('.charttile-content').click();
    cy.wait(1000)
    cy.get('#rc-tabs-2-tab-Exclusion').click();
    cy.wait(500)
    cy.get('#rc-tabs-2-tab-Violation').click();
    cy.get('[style="border: 1px solid rgb(72, 107, 201); margin-bottom: 30px; min-height: 160px; border-radius: 4px; margin-top: 20px;"] > :nth-child(6) > .anticon > svg').click()
    cy.get('.ant-tooltip-open > .anticon > svg').click();
    cy.get(':nth-child(3) > [style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;"] > [style="margin-left: 15%;"] > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click();
    cy.get('.ant-btn-primary > span').click();
    cy.get('[style="border: 1px solid rgb(72, 107, 201); margin-bottom: 30px; min-height: 160px; border-radius: 4px; margin-top: 20px;"] > [style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;"] > [style="margin-left: 15%;"] > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click();
    cy.get('.ant-btn-primary > span').click();
    cy.wait(2000)
  });
  it("Saving report", () => {
    cy.get('.sub-header-btns > :nth-child(1) > span').click()
    cy.wait(1000)
    cy.get('.ant-modal-close-x > .anticon > svg').click()
    cy.wait(500)
  })
  it("Preview report", () => {
    cy.get('.sub-header-btns > :nth-child(2) > span').click()
  });

  it("Load Report via search", () => {
    const url = Cypress.config().baseUrl
    cy.log('Opening a report template')
    cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
    cy.visit(url + '/#/dashboard/report_designer')
    cy.wait(1000)
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('R391{enter}');
    cy.get('.ant-table-row > :nth-child(1) > div').click();
  });

  it("Load Report via tile", () => {
    const url = Cypress.config().baseUrl
    cy.log('Opening a report template')
    cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
    cy.visit(url + '/#/dashboard/report_designer')
    cy.wait(1000)
    cy.get(':nth-child(1) > .chart-tiles').click();
    cy.wait(5000)
    cy.get('.ant-switch-handle').click();
    cy.wait(1000)
    cy.get('.sub-header-btns > :nth-child(1) > span').click();
    cy.wait(1000)
    cy.get('.ant-modal-close-x').click();
    cy.get('[style="display: grid; grid-template-columns: 1fr 1fr;"] > :nth-child(2) > .anticon > svg').click();
  });
});
