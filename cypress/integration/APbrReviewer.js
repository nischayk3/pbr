Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('PBR', () => {
    // it("should login successfully using Ad", () => {
    beforeEach(() => {
        //  cy.intercept({ method: 'POST', url: '/pbr/udh/get_cpv_pbr_count', times: 1 }, (req) => {
        //     req.reply({
        //         delay: 1000,
        //         fixture: 'pbrStatusCount.json'
        //     });
        // }).as("statusCount")
        // cy.intercept({ method: 'POST', url: '/pbr/udh/get_cpv_pbr_count', times: 1 }, (req) => {
        //     req.reply({
        //         delay: 1000,
        //         fixture: 'pbrConfidenceCount.json'
        //     });
        // }).as("cofidenceCount")
        cy.intercept('POST', '/pbr/udh/get_cpv_pbr_count', { fixture: 'pbrStatusCount.json' }).as("statusCount")
        //cy.intercept('POST', '/pbr/udh/get_cpv_pbr_count', { fixture: 'pbrConfidenceCount.json' }).as("cofidenceCount")
        cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' }).as("get_cpv_pbr")
        // cy.intercept('GET', '/pbr/udh/get_cpv_pbr?id=27', { fixture: 'pbrUpdate' })
        // cy.intercept('GET', '/pbr/udh/get_cpv_pbr_count?key=status', { fixture: 'pbrStatusCount' })
        // cy.intercept('GET', '/pbr/udh/get_cpv_pbr_count?key=confidence', { fixture: 'pbrConfidenceCount' })
        cy.intercept('GET', '/pbr/udh/get_tran_pbr_template_id', { fixture: 'pbrTemplateList' })
        cy.viewport(1366, 768);
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

    it("PBR", () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/pbr_reviewer')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/pbr_reviewer')
        cy.wait(6000);
       
       
    });
    it("Search Table", () => {
        cy.get('.ant-input').clear({ force: true });
        cy.get('.ant-input').type('1');
        cy.get('.ant-input-group-addon > .ant-btn > span').click({ force: true });
    })
    it("Select checkbox", () => {
        cy.get('.ant-checkbox-input').eq(1).click({ force: true })
    })
    it("Status chart", () => {
        cy.get(".slicetext").eq(1).click({ force: true })
        cy.wait(6000);
        cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' })
        cy.intercept('POST', '**/get_cpv_pbr', { fixture: 'pbr_review.json' })
        cy.get(".status-approved").click({ force: true })
       
        cy.wait(6000);
        cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' })
        cy.intercept('POST', '**/get_cpv_pbr', { fixture: 'pbr_review.json' })
    })
    // it("Confidence chart", () => {
    //     cy.get(".slice").eq(2).click({ force: true })
    //     cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' })
    //     cy.wait(6000);
    //     cy.get(".status-confi").click({ force: true })
       
    //     cy.wait(6000);
    // })

    it("Click Approve", () => {
        cy.get('#pbr-approve').click({ force: true })
        cy.wait(1000);
        cy.get('.ant-modal-close-x > .anticon > svg').click({ force: true })
    })

    it("Navigate to reviewer", () => {
        // cy.get(".ant-table-cell-fix-right > a").eq(0).click({ force: true })
        const url = Cypress.config().baseUrl
        cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbrUpdate' })
        cy.visit(url + '/#/dashboard/pbr_update?id=185')
        cy.wait(10000);
        
    })

    it("Edit fields", () => {
        cy.wait(6000);
        cy.get(".ant-table-cell-fix-right > .ant-btn > span").click({ force: true })
        cy.get("#snippetValue").clear({ force: true })
        cy.get("#snippetValue").type("claimss")
        cy.get("#recordedDate").clear({ force: true })
        cy.get("#recordedDate").type("08/07/2020")
        cy.get("#recordedTime").clear({ force: true })
        cy.get("#recordedTime").type("10:30")
        cy.get("#uomnum").clear({ force: true })
        cy.get("#uomnum").type("5.6")

    })
    it("Save and Audit logs", () => {
        cy.wait(1000);
        cy.get("#save_button").click({ force: true })
        cy.wait(6000);
        cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbrUpdate' })
        cy.get("#editLogs > a").click({ force: true })
    })
    it("PBR", () => {
        cy.intercept('POST', '**/get_cpv_pbr', { fixture: 'pbr_review.json' })
        cy.log('Load Landing Page')
       
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/pbr_reviewer')
        cy.url().should('eq', url + '/#/dashboard/pbr_reviewer')
        cy.wait(6000);
        cy.get('.ant-col-4 > .ant-select > .ant-select-selector').click({ force: true })
        cy.get('.ant-select-item-option').eq(1).click({ force: true })
        cy.wait(6000);
        cy.get('.ant-select-clear').click({ force: true })
    });

});