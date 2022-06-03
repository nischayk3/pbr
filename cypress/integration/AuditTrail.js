Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
describe('Audit Trail', () => {
  beforeEach(() => {
    localStorage.setItem("test_enabled", true);
    localStorage.setItem("user", "fahad.siddiqui@mareana.com");
    localStorage.setItem(
      "login_details",
      JSON.stringify({
        ad_role: false,
        email_id: "fahad.siddiqui@mareana.com",
        firstname: "Fahad",
        lastname: "siddiqui",
        email_id: "fahad.siddiqui@mareana.com",
        mdh_role: "USER",
        screen_set: "1000_USER",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
      })
    );
  })
  it("should login successfully using Ad", () => {
    cy.visit("http://localhost/#/dashboard/audit_trail_report");
    cy.log("selecting filters")
    cy.get('.ant-picker-input').first().click()
    cy.get('.ant-picker-header-prev-btn').first().click()
    cy.get('.ant-picker-cell').eq(0).click()
    cy.get('.ant-picker-cell').eq(6).click()
    cy.get('.ant-select-selection-item').first().click()
    cy.get('.ant-select-item-option').first().click()
    cy.wait(1000)
    cy.get('.ant-select-selection-item').eq(1).click()
    cy.wait(5000)
    cy.get('.ant-select-item-option').contains('U').click()
    cy.get('.divFilter-second > :nth-child(1) > span').click({ force: true });
    cy.wait(1000)
    cy.get('.simulate-btn > span').click({ force: true });
    cy.log("searching in table")
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('ab');
    cy.wait(5000)
    cy.get('.ant-input-group-addon > .ant-btn').click({ force: true });
    cy.wait(5000)
    cy.log("sorting of table")
    cy.get(':nth-child(1) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(3) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(4) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(5) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(6) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(7) > .ant-table-column-sorters').click({ force: true });
  });
});