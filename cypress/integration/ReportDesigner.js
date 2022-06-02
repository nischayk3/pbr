Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});
describe("Report", () => {
  it("should login successfully using Ad", () => {
    cy.visit("/");
    cy.url().should("include", "/user/login");
    cy.get("#login-btn").click();
    localStorage.setItem("test_enabled", true);
    localStorage.setItem(
      "login_details",
      JSON.stringify({
        firstname: "Fahad",
        lastname: "siddiqui",
        email_id: "fahad.siddiqui@mareana.com",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
      })
    );
    cy.get('#report_designer > .ant-menu-title-content > a').click({
      force: true,
    });/* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.create-new').click();
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('Report');
    /* ==== Generated with Cypress Studio ==== */
    cy.get('#rc_select_0').click();
    cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    cy.get('.ant-select-selection-overflow').click();
    cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content', { timeout: 20000 }).click({ force: true }).click();
    cy.get('.create-new-report > .anticon > svg').click();
    cy.get('#report-generator-form_response_0_sectionName').clear();
    cy.get('#report-generator-form_response_0_sectionName').type('Title');
    cy.get('.create-new-report > .anticon > svg > [d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"]').click();
    cy.get('.add-row-btn').click();
    cy.get('#report-generator-form_response_0_dymamic_rows_0_keyName').click();
    cy.get('[style="border: 1px solid rgb(72, 107, 201); margin-bottom: 30px; min-height: 160px; border-radius: 4px; margin-top: 20px;"] > :nth-child(5) > .anticon > svg').click();
    cy.get('#report-generator-form_response_1_sectionName').clear();
    cy.get('#report-generator-form_response_1_sectionName').type('Summary');
    cy.get('.create-new-report > .anticon > svg').click();
    cy.get(':nth-child(2) > .ant-space > .ant-space-item > .dynamicSections-table > .dynamicSections-tbody > tr > :nth-child(3) > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .add-row-btn').click();
    cy.get('#report-generator-form_response_1_dymamic_rows_0_keyName').click();

    /* ==== End Cypress Studio ==== */
    /* ==== Generated with Cypress Studio ==== */
    cy.get('.add-chart').click();
    cy.get('.ant-select-selection-overflow').click();
    cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content').click();
    cy.get('.reportDesigner-dynamicSections > .ant-card > .ant-card-head').click();
    cy.get('.add-chart').click();
    cy.get('.add-chart').click();
    cy.get('.charttile-content').click();
    /* ==== End Cypress Studio ==== */
  });
  // it("Workflow page", () => {
  // });
});