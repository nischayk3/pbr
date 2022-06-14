
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
    it('Load View Landing Page Correctly', () => {
        const url = Cypress.config().baseUrl
        cy.intercept('GET', '**/pbr_template', { fixture: 'paperBatchLanding.json' })
        cy.visit(url + '/#/dashboard/paper_batch_records')

        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    })

    it('Load Screen Header', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
       
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const currentDate = month + ' ' + latestDate + ',' + ' ' + year;
        cy.wait(5000)
        cy.log('Verify Screen Header Component')
        cy.get('.screen_header_head')

        cy.log('Verify User Name')
        cy.get('.screen_header_username').should("have.text", "Howdy Fahad,")

        cy.log('Verify Header Text')
        cy.get('.screen_header_text').should("have.text", "In the mood to draw up some template today?")

        cy.log('Verify Current Date')
        cy.get('.screen_header_resultdate').should("have.text", currentDate)
    })

    it('Load Landing Page Table Component', () => {
    	cy.log('Load Search Bar')
    	cy.log('Search View Id In Search Component')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    	cy.wait(6000);
    	cy.get(".ant-input-affix-wrapper").type("P137").click({ force: true })
    	cy.get(".ant-input-search-button").click()

    })

    it('Recently Created Dashboard', () => {
    	cy.log('Recent View Verify')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    	cy.wait(6000);
    	cy.get(':nth-child(1) > .chart-tiles').should('have.length', 1)
    })

    it('Create New Template', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
        cy.get('#basic_templateName').clear();
        cy.get('#basic_templateName').type('test');
        cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
        cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
        /* ==== End Cypress Studio ==== */
    })
    it('Create and save new template', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
        cy.get('#basic_templateName').clear();
        cy.get('#basic_templateName').type('test');
        cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
        cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });


        /* ==== Generated with Cypress Studio ==== */
        
        
        /* ==== End Cypress Studio ==== */
    })

    // it("should login successfully using Ad", () => {

    // });


});
