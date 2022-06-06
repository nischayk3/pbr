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
    cy.wait(4000)
    cy.get(':nth-child(1) > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click();
    cy.get('.ant-btn-primary > span').click();
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.charttile-content').click();
    // cy.get('#rc-tabs-3-tab-Violation').click();
    // cy.get(':nth-child(1) > .anticon > svg > [d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-504-72h304v72H360v-72zm371.3 656H292.7l-24.2-512h487l-24.2 512z"]').click();
    // cy.get('.ant-btn-primary > span').click();
    // cy.get('#report-generator-form_response_1_select').click();
    /* ==== End Cypress Studio ==== */
  });
});
