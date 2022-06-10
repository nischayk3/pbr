describe("Renders the view Hierarachy page", () => {
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
/**   it("Renders View Hierarchy", () => {
    cy.wait(1000);
    cy.get(".create-new").click();
    cy.get(".input-ant > .ant-input").clear();
    cy.get(".input-ant > .ant-input").type("View Hier");
    cy.get(".ant-modal-footer > .ant-btn > span").click();
    cy.get(":nth-child(2) > .ant-input").clear();
    cy.get(":nth-child(2) > .ant-input").type("567812");
    cy.get(":nth-child(3) > .ant-input").clear();
    cy.get(":nth-child(3) > .ant-input").type("321467");
    cy.get(".ant-tabs-extra-content > .ant-btn").click();
    cy.wait(1000);
    cy.get("#rc-tabs-0-tab-Process\\ steps").click();
    cy.get(
      "#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input"
    ).clear();
    cy.get(
      "#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input"
    ).type("23");
    cy.get(
      "#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input"
    ).clear();
    cy.get(
      "#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input"
    ).type("view124");
    cy.wait(1000);
    cy.get(".ant-tabs-extra-content > .ant-btn > span").click();
    cy.get("#rc-tabs-0-tab-Process\\ step\\ mapping").click();
    cy.get("#hierarchy > .ant-menu-title-content > a").click();
    cy.get(".ant-input").clear();
    cy.get(".ant-input").type("view");
    cy.get(".ant-btn > span").click();
  });
  */
  it("Renders View Hierarchy", () => {
    cy.visit('localhost/ __/#/dashboard/molecule_hierarchy_configuration');
    cy.get('.create-new > .anticon > svg').click();
    cy.get('.input-ant > .ant-input').clear();
    cy.get('.input-ant > .ant-input').type('drug1');
    cy.get('.ant-modal-footer > .ant-btn > span').click();
    cy.get(':nth-child(2) > .ant-input').clear();
    cy.get(':nth-child(2) > .ant-input').type('A');
    cy.get(':nth-child(3) > .ant-input').clear();
    cy.get(':nth-child(3) > .ant-input').type('54223');
    cy.get('.add-button > .ant-btn > :nth-child(2)').click();
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').type('B');
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').type('2443');
    cy.get('.ant-tabs-extra-content > .ant-btn').click();
    cy.get('[data-row-key="2"] > :nth-child(1) > .anticon > svg').click();
    cy.get('.ant-btn-primary > span').click();
    cy.get('.ant-tabs-extra-content > .ant-btn').click();
    cy.get('.tab-button-text').click();
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input').clear();
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input').type('a');
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input').clear();
    cy.get('#rc-tabs-0-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input').type('2333');
    cy.get('.ant-tabs-extra-content > .ant-btn').click();
    cy.get('#rc-tabs-0-panel-Process\\ steps > .add-button > .ant-btn > :nth-child(2)').click();
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(2) > .ant-input').type('b');
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').clear();
    cy.get('[data-row-key="2"] > :nth-child(3) > .ant-input').type('2333');
    cy.get('.ant-tabs-extra-content > .ant-btn > span').click();
    cy.get('[data-row-key="2"] > :nth-child(1)').click();
    cy.get('#rc-tabs-0-panel-Process\\ steps > .tab-title > .ant-btn > .tab-button-text').click();
  });
});