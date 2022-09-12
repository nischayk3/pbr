Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
describe('Audit Trail', () => {
  beforeEach(() => {
    cy.intercept('POST', 'services/v1/audit-data-change', { fixture: 'auditTrail-data.json' })
    cy.intercept('GET', '/services/v1/audit-filter', { fixture: 'auditTrail-filter.json' })
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
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
      })
    );
  })
  it("should login successfully using Ad", () => {
    const url = Cypress.config().baseUrl
    cy.visit(url + '/#/dashboard/audit_trail_report')
    cy.log('Load Landing Page')
    cy.url().should('eq', url + '/#/dashboard/audit_trail_report')
    cy.wait(3000)
  });
  it("selecting daterange", () => {
    cy.log("selecting daterange")
    cy.get('.ant-picker-input').first().click()
    cy.get('.ant-picker-header-prev-btn').first().click()
    cy.get('.ant-picker-cell').eq(7).click()
    cy.get('.ant-picker-cell').eq(12).click()
  });
  it("selecting user", () => {
    cy.log("selecting user")
    cy.get('.ant-select-selection-item').first().click()
    cy.get('.ant-select-item-option').first().click()
    cy.wait(1000)
  });
  it("selecting type", () => {
    cy.log("selecting type")
    cy.get('.ant-select-selection-item').eq(1).click({ force: true })
    cy.wait(5000)
    cy.get('.ant-select-item-option').contains('U').click({ force: true })
    cy.get('.divFilter-second > :nth-child(1) > span').click({ force: true });
    cy.wait(1000)
  });
  it("clear filter", () => {
    cy.log("clearing filter")
    cy.get('.simulate-btn > span').click({ force: true });
  });
  it("searching table", () => {
    cy.wait(1000)
    cy.log("selecting user")
    cy.get('.ant-select-selection-item').first().click({ force: true })
    cy.get('.ant-select-item-option').first().click({ force: true })
    cy.wait(1000)
    cy.log("searching in table")
    cy.get('.ant-input').clear();
    cy.get('.ant-input').eq(1).type('ab');
    cy.wait(5000)
    cy.get('.ant-input-group-addon > .ant-btn').eq(1).click({ force: true });
    cy.wait(5000)
  });
  it("sorting of table and click of cell", () => {
    cy.log("sorting of table")
    cy.get(':nth-child(1) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(2) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(3) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(4) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(5) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(6) > .ant-table-column-sorters').click({ force: true });
    cy.get(':nth-child(7) > .ant-table-column-sorters').click({ force: true });
    cy.get('.ant-btn-primary').eq(3).click()
    cy.wait(1000)
    cy.get('.ant-dropdown-menu-title-content').contains('Excel').click()
    cy.wait(1000)
    cy.get('.ant-btn-primary').eq(3).click()
    cy.wait(1000)
    cy.get('.ant-dropdown-menu-title-content').contains('CSV').click()
    cy.log("sorting of table")
    cy.get('.ant-input').clear();
    cy.get('.ant-input-group-addon > .ant-btn').eq(1).click({ force: true });
    cy.wait(5000)
    cy.get('.ant-table-column-sorter').eq(0).click({ force: true });
    cy.get('.ant-table-column-sorter').eq(1).click({ force: true });
    cy.get('.ant-table-column-sorter').eq(2).click({ force: true });
    cy.get('.ant-table-column-sorter').eq(3).click({ force: true });
    cy.get('.ant-table-column-sorter').eq(4).click({ force: true });
    cy.get('.ant-table-column-sorter').eq(5).click({ force: true });
    cy.get('.ant-table-column-sorter').eq(6).click({ force: true });
  });
});