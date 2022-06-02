Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Manual data upload', () => {
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
        cy.get('#manual_data_upload > .ant-menu-title-content > a',{timeout:20000}).click({ force: true,multiple:true});
        cy.location('href', {timeout: 10000}).should('include', '/manual_data_upload');
        cy.get('.ant-btn > a').click();
        cy.get('.ant-btn-primary > :nth-child(1)').click();
        // duplicate record found
        cy.get('input[type=file]').selectFile({contents:'cypress_duplicate_no_approved_data.xlsx'},{ force: true })
        cy.get('.ant-upload > .ant-btn > span').click();
       
        cy.get('.ant-alert-description').should('have.text', 'Do you want to continue or cancel? ');
        cy.get('[style=""] > .ant-btn > span').click();
        cy.get('.ant-alert-message').should('have.text', 'No approved data !!');
        cy.get('.steps-action > [ant-click-animating-without-extra-node="false"] > :nth-child(1)').click();
        cy.get('.ant-alert-description').should('have.text', 'Please provide a final digital signature to revalidate the Excel/CSV file.');
        cy.get('[style=""] > .ant-btn > span').click();
        cy.get(':nth-child(1) > .ant-input').clear();
        cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
        cy.get(':nth-child(2) > .ant-input').clear();
        cy.get(':nth-child(2) > .ant-input').type('Iqbal@110192');
        cy.get('.signature-modal > .ant-btn > span').click();
        cy.get('.sign-form1 > :nth-child(2) > p').should('have.text', 'Reason');
        cy.get('.ant-select-selection-item').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('.signature-modal > .ant-btn-primary > span').click();
        cy.get('.ant-result-title').should('have.text', 'The file is succesfully uploaded !!!');
        cy.get('.ant-btn-default > span').click();
        
    });
});
