describe("Renders the view Hierarachy page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.url().should("include", "/user/login");
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

  it("Renders View Hierarchy", () => {
    cy.get("#login-btn", { timeout: 2000 }).click();
    cy.wait(10000);
    cy.get("#hierarchy > .ant-menu-title-content > a", {
      timeout: 20000,
    }).click({ force: true });
    cy.location("href", { timeout: 10000 }).should(
      "include",
      "/molecule_hierarchy_configuration"
    );
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
    cy.get("#rc-tabs-1-tab-Process\\ steps").click();
    cy.get(
      "#rc-tabs-1-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input"
    ).clear();
    cy.get(
      "#rc-tabs-1-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(2) > .ant-input"
    ).type("23");
    cy.get(
      "#rc-tabs-1-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input"
    ).clear();
    cy.get(
      "#rc-tabs-1-panel-Process\\ steps > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-container > .ant-table-content > table > .ant-table-tbody > .ant-table-row > :nth-child(3) > .ant-input"
    ).type("view124");
    cy.wait(1000);
    cy.get(".ant-tabs-extra-content > .ant-btn > span").click();
    cy.get("#rc-tabs-1-tab-Process\\ step\\ mapping").click();
    cy.get("#hierarchy > .ant-menu-title-content > a").click();
    cy.get(".ant-input").clear();
    cy.get(".ant-input").type("view");
    cy.get(".ant-btn > span").click();
  });
});
