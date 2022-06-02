Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('chart Personalization', () => {
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
        cy.get('#chart_personalization > .ant-menu-title-content > a',{timeout:20000}).click({ force: true});
        cy.location('href', {timeout: 10000}).should('include', '/chart_personalization');
        cy.get('.create-new').click();
        cy.get('.ant-input').click({force:true});
        cy.get('[data-row-key="7"] > :nth-child(1)').click();
        cy.get('.input_field > .ant-input').clear();
        cy.get('.input_field > .ant-input').type('new chart');
        cy.get('.ant-input-affix-wrapper > .ant-input').click();
        cy.get('.details-container > :nth-child(2)').click();
        cy.get('#rc_select_2').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('#rc_select_3').click();
        cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get(':nth-child(3) > .select_field > .ant-select > .ant-select-selector').click();
        cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('.button-visible > .ant-btn > span').click();
        cy.get('#rc-tabs-0-tab-2').click();
        cy.get('#rc-tabs-0-tab-3').click();
        cy.get('.btns > div > :nth-child(4) > span').click();
        cy.get('div > :nth-child(5) > :nth-child(3)').click();
        cy.get('.ant-modal-close-x > .anticon > svg > path').click();
       
    });
});
