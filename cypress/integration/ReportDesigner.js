describe("Report", () => {
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
    cy.log('Opening a report template')
    cy.visit('http://localhost/#/dashboard/workspace')
    cy.wait(2000)
    cy.get('#report_designer > .ant-menu-title-content > a').click();
    cy.wait(500)
    // });
    // it("Create  new report", () => {
    cy.intercept('GET', '**/views-list', { fixture: 'reportView.json' })
    cy.intercept('GET', '**/chart-list/V302-1', { fixture: 'reportChartList.json' })
    cy.get('.create-new > .anticon').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('Report');
    cy.wait(500)
    cy.get('#rc_select_0').click();
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.wait(500)
    cy.get('.ant-select-selection-overflow').click();
    cy.wait(500)
    cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content').click();
    cy.wait(500)
    cy.get('.ant-form-item-control-input-content').click();
    cy.get('.create-new-report > .anticon > svg').click();
    cy.get('#report-generator-form_response_0_sectionName').clear();
    cy.get('#report-generator-form_response_0_sectionName').type('TitlePage');
    cy.get('.add-row-btn').click();
    cy.wait(500)
    cy.get('#report-generator-form_response_0_dymamic_rows_0_keyName').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_0_keyName').type('key');
    cy.get('#report-generator-form_response_0_dymamic_rows_0_value').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_0_value').type('value');
    cy.get('.add-row-btn').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_1_keyName').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_1_keyName').type('key');
    cy.get('#report-generator-form_response_0_dymamic_rows_1_value').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_1_value').type('value');
    cy.wait(500)
    cy.get('#report-generator-form_response_0_dymamic_rows_0_editable').click();
    cy.wait(500)
    cy.get(':nth-child(2) > :nth-child(1) > .anticon > svg').click();
    cy.wait(500)
    cy.get('.ant-btn-primary > span').click();
    cy.wait(500)
    cy.get('[style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;"]').click();
    cy.wait(1000)
    cy.get(':nth-child(5) > .anticon > svg > [d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"]').click(); cy.get('.designer-block > :nth-child(2)').click();
    cy.wait(1000)
    cy.get('#report-generator-form_response_1_sectionName').clear();
    cy.get('#report-generator-form_response_1_sectionName').type('Summary');
    cy.wait(1000)
    cy.get(':nth-child(2) > [style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;"]').click();
    cy.get('.add-chart').click();
    cy.wait(1000)
    cy.get('.charttile-content').click();
    cy.wait(1000)
    cy.get('.sub-header-btns > :nth-child(1) > span').click();
    cy.wait(1000)
    cy.get('.ant-modal-close-x').click();
    cy.wait(2000)
    cy.get('.chart-name > :nth-child(1) > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click();
    // cy.get(':nth-child(1) > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click();
    cy.get('.ant-btn-primary > span').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.charttile-content').click();
    cy.get('.ant-tabs-nav-list > :nth-child(1)')
    cy.get('.ant-tabs-nav-list > :nth-child(2)')

    cy.get('.custom-wrapper').click();
    cy.get('#report_designer > .ant-menu-title-content').click();
    cy.get('#report_designer > .ant-menu-title-content > a').click();
    cy.wait(500)
    cy.get(':nth-child(3) > .ant-breadcrumb-link > a').click();
    cy.wait(500)
    // cy.get('.ant-input-affix-wrapper').click();
    // cy.get('.ant-input').clear();
    // cy.get('.ant-input').type('R219{enter}', { force: true });
    // cy.wait(500)
    // cy.wait(500)
    // cy.get('#rc-tabs-0-tab-Generate\\ Report\\ Variant').click();
    // cy.get('#rc-tabs-0-tab-Design\\ Report\\ Template').click();
    cy.get(':nth-child(4) > .tile > :nth-child(1) > .chart-tiles').click();
    cy.get('.sub-header-btns > :nth-child(1) > span').click();
    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get(':nth-child(1) > [style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;"] > [style="display: grid; grid-template-columns: 1fr 1fr;"] > :nth-child(2) > .anticon > svg')
    /* ==== End Cypress Studio ==== */
  });

  /* ==== Test Created with Cypress Studio ==== */

});
