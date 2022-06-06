Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Genealogy", () => {
  it("should login successfully using Ad", () => {
    cy.visit("/");
    cy.url().should("include", "/user/login");
    localStorage.setItem("test_enabled", true);
    localStorage.setItem(
      "login_details",
      JSON.stringify({
        firstname: "Fahad",
        lastname: "siddiqui",
        email_id: "fahad.siddiqui@mareana.com",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc",
      })
    );
    /* geneaology tab */
    cy.get("#login-btn", { timeout: 2000 }).click();
    cy.get("#genealogy > .ant-menu-title-content > a", {
      timeout: 20000,
    }).click({ force: true });
    cy.location("href", { timeout: 10000 }).should("include", "/genealogy");
    cy.get(
      ":nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.get("#rc_select_0").clear();
    cy.get("#rc_select_0").type("1338");
    cy.wait(2000);
    cy.get(".ant-select-item-option-content").click({ force: true });
    cy.get(
      ":nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.get("#rc_select_1").clear();
    cy.get("#rc_select_1").type("1089084");
    cy.get(
      ":nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content"
    ).click({ force: true });
    cy.get(
      ":nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.get("#rc_select_2").clear();
    cy.get(
      '[style="height: 2496px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
    ).click();
    cy.get(".ant-btn-primary > span").click();
    cy.wait(2000);
    cy.get("#1091460 > #material-img").click();
    cy.get("#popup > :nth-child(3) > span").click();
    cy.get(":nth-child(1) > .ant-collapse-header > .panel-header").click();
    cy.get(":nth-child(2) > .ant-collapse-header > .panel-header").click();
    cy.get(":nth-child(3) > .ant-collapse-header > .panel-header > p").click();
    cy.get(
      ":nth-child(1) > .ant-collapse-header > .panel-header > .ant-btn > span"
    ).click();
    cy.get(":nth-child(2) > .ant-collapse-header > .panel-header").click();
    cy.get(".ant-collapse-item-active > .ant-collapse-header").click();
    cy.get(".ant-drawer-mask").click();
    cy.get("#rc_select_4").clear();
    cy.get("#rc_select_4").type("1091460");
    cy.get(".select-allowclear > .ant-btn > .anticon > svg").click();
    cy.get("#\\31 091460 > #material-img").click();
    cy.get("#popup > :nth-child(2) > span").click();
    cy.get('[x="20"]').click();
    cy.get('[x="20"]').click();
    cy.get("#\\31 091460 > #material-img").click();
    cy.get("#popup > :nth-child(1) > span").click();
  });
});
