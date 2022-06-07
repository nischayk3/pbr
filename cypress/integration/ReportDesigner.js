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

  it("Create and load new report", () => {
    cy.log('Opening a report template')
    cy.visit('http://localhost:3030/#/dashboard/workspace')
    cy.wait(2000)
    cy.get('#report_designer > .ant-menu-title-content > a').click();
    cy.wait(500)
    cy.get('.create-new').click();
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('Report');
    cy.wait(1100)
    cy.get('#rc_select_0').click();
    cy.wait(2500)
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.wait(1000)
    cy.get('.ant-select-selection-overflow').click();
    cy.wait(2000)
    // cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content').click();
    cy.get('.create-new-report > .anticon > svg').click();
    cy.get('#report-generator-form_response_0_sectionName').clear();
    cy.get('#report-generator-form_response_0_sectionName').type('Title');
    cy.get(':nth-child(5) > .anticon > svg > [d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"]').click();
    cy.get('#report-generator-form_response_1_sectionName').clear();
    cy.get('#report-generator-form_response_1_sectionName').type('Summary');
    cy.get('.add-chart').click();
    // cy.get('.charttile-content').click();
    // cy.get(':nth-child(2) > center > .sectionTable > .create-new-report > .anticon > svg').click();
    cy.get('.sub-header-btns > :nth-child(1) > span').click();
    // cy.get('.ant-modal-close-x > .anticon > svg').click();
    cy.wait(1000)
    cy.get('#report_designer > .ant-menu-title-content').click();
    cy.wait(1000)
    cy.get(':nth-child(3) > .ant-breadcrumb-link > a').click();
    cy.wait(1000)
    cy.get(':nth-child(1) > .chart-tiles').click();
    /* ==== Generated with Cypress Studio ==== */
    // cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content').click();
    /* ==== End Cypress Studio ==== */
  });
});
