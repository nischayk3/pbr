Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
});
describe("Report", () => {
    it("should login successfully using Ad", () => {
        cy.visit("/");
        cy.url().should("include", "/user/login");
        cy.get("#login-btn").click();
        localStorage.setItem("test_enabled", true);
        localStorage.setItem("username", "Fahad");

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
        });
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get('.ant-tabs-nav-list > :nth-child(2)').click();
        cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .create-new > p').click();
        cy.get(':nth-child(1) > .landing-tile').click();
        cy.get(':nth-child(1) > .ant-collapse-item > .ant-collapse-header').click();
        cy.get(':nth-child(1) > .td > .ant-input').click();
        cy.get('[style="margin-left: 16px; margin-right: 16px;"] > span').click();
        cy.get('.ant-modal-close-x > .anticon > svg').click();
        cy.get('.sub-header-btns > :nth-child(1) > span').click();
        cy.get('.ant-select-selection-overflow').click();
        cy.get('.ant-select-item').click();
        cy.get('#rc-tabs-1-tab-email_schedule').click();
        cy.get('[style="width: 300px;"] > .ant-picker > .ant-picker-input > input').click();
        cy.get('.ant-picker-footer').click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker > .ant-picker-input > input').click();
        cy.get('.ant-picker-now-btn').click();
        cy.get('.schedule-evalutaion-button').click();
        cy.get('.ant-tabs-left > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click();
        cy.get(':nth-child(6) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-close > .ant-modal-close-x > .anticon > svg').click();
        cy.get('#report_designer > .ant-menu-title-content > a').click();
        cy.get('#rc-tabs-3-tab-Generate\\ Report\\ Variant').click();
        cy.get('#rc-tabs-3-panel-Generate\\ Report\\ Variant > .tile > :nth-child(1) > .chart-tiles').click();
        cy.get(':nth-child(2) > .ant-collapse-item > .ant-collapse-header > .chart-names').click();
        /* ==== End Cypress Studio ==== */
    });
    // it("Workflow page", () => {
    // });
});