Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Audit Trail', () => {
	it("should login successfully using Ad", () => {
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
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
          })
        );


        cy.get("#login-btn",{timeout:2000}).click();
        cy.wait(5000)
        cy.get('#audit_trail_report > .ant-menu-title-content > a').click({ force: true,multiple:true});
        cy.location('href', {timeout: 10000}).should('include', '/audit_trail_report');
        cy.wait(5000)
        cy.get(':nth-child(2) > .ant-space-item > .ant-select > .ant-select-selector > .ant-select-selection-item').click({ force: true});
        cy.wait(5000)
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({ force: true});
        cy.wait(5000)
        cy.get(':nth-child(3) > .ant-space-item > .ant-select > .ant-select-selector > .ant-select-selection-item').click({ force: true});
        cy.wait(5000)
        cy.get('.divFilter-second > :nth-child(1) > span').click({ force: true});
        cy.wait(5000)
        cy.get('.simulate-btn > span').click({ force: true});
        cy.wait(5000)
        cy.get('.ant-input').clear();
        cy.get('.ant-input').type('ab');
        cy.wait(5000)
        cy.get('.ant-input-group-addon > .ant-btn').click({ force: true});
        cy.wait(5000)
        cy.get(':nth-child(1) > .ant-table-column-sorters').click({ force: true});
        cy.get(':nth-child(3) > .ant-table-column-sorters').click({ force: true});
        cy.get(':nth-child(4) > .ant-table-column-sorters').click({ force: true});
        cy.get(':nth-child(5) > .ant-table-column-sorters').click({ force: true});
        cy.get(':nth-child(6) > .ant-table-column-sorters').click({ force: true});
        cy.get(':nth-child(7) > .ant-table-column-sorters').click({ force: true});
        cy.get('[style="margin-top: 10px; float: right; margin-right: 10px;"] > .ant-btn > span').click({ force: true});
        
    });
});
