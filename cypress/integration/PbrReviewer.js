Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('PBR', () => {
    // it("should login successfully using Ad", () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.visit("/");
        cy.url().should("include", "/user/login");
        localStorage.setItem("test_enabled", true);
        localStorage.setItem("user", "fahad.siddiqui@mareana.com");
        localStorage.setItem("username", "Fahad");
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


    it("PBR", () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/pbr_reviewer')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/pbr_reviewer')
        cy.wait(6000);
    

    /* ==== Generated with Cypress Studio ==== */
    cy.visit('https://bms-cpvdev.mareana.com/#/dashboard/pbr_reviewer');
    cy.get('.ant-input').clear();
    cy.get('.ant-input').type('demo');
    cy.get('.ant-input-group-addon > .ant-btn > span').click();
    cy.get('.ant-input-clear-icon > .anticon > svg > path').click();
    cy.get(':nth-child(4) > :nth-child(3)').click();
    cy.get(':nth-child(3) > :nth-child(7) > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
    cy.get('.ant-btn-default > span').click();
    cy.get('.ant-modal-footer > :nth-child(1) > span').click();
    cy.get('[style="margin-top: 20px;"] > .ant-btn-default > span').click();
    cy.get('.sign-cols > :nth-child(1) > .ant-input').click();
    cy.get('.ant-modal-close-x > .anticon > svg > path').click();
    /* ==== End Cypress Studio ==== */


});
});