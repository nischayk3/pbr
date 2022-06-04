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
        
        cy.get('.steps-action')

        cy.log("Un Authorized user")
        cy.get('input[type=file]').selectFile({contents:'cypress_manual_duplicate_no_approved_and_approved_data.xlsx'},{ force: true })
        cy.wait(3000)
        cy.get('.ant-alert-close-icon').click()

       

      
        cy.log("duplicate approved records")
        cy.get('input[type=file]').selectFile({contents:'cypres_manual_duplicate_approved_data.xlsx'},{ force: true })
        cy.wait(3000)

        cy.log("Cancel upload file")
        cy.get('.ant-btn-ghost').click()

        cy.wait(3000)
        cy.log("load duplicate approved records again")
        cy.get('.ant-btn-primary > :nth-child(1)').click();
        cy.get('input[type=file]').selectFile({contents:'cypres_manual_duplicate_approved_data.xlsx'},{ force: true })
        cy.wait(1000)


        cy.log("continute to digital gisnature")
        cy.get('.ant-space-item').eq(0).click()
        cy.wait(10000)
        cy.get('.ant-btn-primary').eq(1).click();
        
        cy.wait(10000)
        cy.log("click on digital signature button")
        cy.get('.ant-space-item').eq(0).click()
       
        cy.log("close signature modal")
        cy.get('.ant-modal-close').click()

        cy.log("click on digital signature button")
        cy.get('.ant-space-item').eq(0).click()

        
        cy.log("digital signature modal input")
        cy.get(':nth-child(1) > .ant-input').clear();
        cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
        cy.get(':nth-child(2) > .ant-input').clear();
        cy.get(':nth-child(2) > .ant-input').type('Iqbal@110192');
        cy.get('.signature-modal > .ant-btn-primary').click();
        cy.wait(2000)
        
        cy.log("selecting reason")
        cy.get('.ant-select-selection-item').click();
        cy.get('.ant-select-item-option-content').eq(0).click();
        cy.get('.ant-select-selection-item').click();
        cy.get('.ant-select-item-option-content').eq(1).click();
        cy.get('.ant-select-selection-item').click();
        cy.get('.ant-select-item-option-content').eq(2).click();
        cy.get('.signature-modal > .ant-btn-primary > span').click();
        cy.wait(6000)
        

        cy.log("cancel digital signature")
        cy.reload()
        cy.wait(3000)
        cy.get('.ant-btn-primary > :nth-child(1)').click();
        cy.wait(3000)
        cy.log("load duplicate approved records again")
        cy.get('input[type=file]').selectFile({contents:'cypres_manual_duplicate_approved_data.xlsx'},{ force: true })
        cy.wait(1000)
        cy.log("continute to digital gisnature")
        cy.get('.ant-space-item').eq(0).click()
        cy.wait(10000)
        cy.get('.ant-btn-primary').eq(1).click();
        
        cy.log("click on digital signature button")
        cy.get('.ant-space-item').eq(1).click()

        cy.log("close signature modal")
        cy.get('.ant-modal-close').click()

        cy.log("click on digital signature button")
        cy.get('.ant-space-item').eq(1).click()


        cy.log("selecting cancel reason")
        cy.get('.ant-select-selection-item').click();
        cy.get('.ant-select-item-option-content').eq(0).click();
        cy.get('.ant-select-selection-item').click();
        cy.get('.ant-select-item-option-content').eq(1).click();
        cy.get('.ant-select-selection-item').click();
        cy.get('.ant-select-item-option-content').eq(2).click();
        cy.get('.signature-modal > .ant-btn-primary > span').click();
        cy.wait(6000)


        cy.log("cancel button for lear data")
        cy.reload()
        cy.wait(3000)
        cy.get('.ant-btn-primary > :nth-child(1)').click();
        cy.scrollTo(0,5000)
        cy.get('.steps-action').get('button').eq(3).click()

        cy.log("going to complete section and pressing previous button")
        cy.get('.ant-btn-primary > :nth-child(1)').click();
        cy.wait(3000)
        cy.get('.ant-btn-primary').eq(1).click();
        cy.wait(3000)
        cy.get('.ant-btn-primary').eq(1).click();
        cy.wait(3000)
        cy.get('.ant-btn-primary').eq(2).click()
        cy.wait(3000)
        cy.get('.ant-btn-primary').eq(0).click();
        cy.wait(3000)
        cy.get('.ant-btn-primary').eq(1).click();
        cy.wait(3000)
        cy.get('.ant-btn-primary').eq(0).click();
        cy.wait(3000)
        cy.get('.ant-btn-primary').eq(0).click();

        
        cy.log("status 200")
        cy.get('.ant-btn-primary > :nth-child(1)').click();
        cy.get('input[type=file]').selectFile({contents:'res_200.xlsx'},{ force: true })
        
        cy.wait(3000)

        cy.log("status 201")
        cy.get('input[type=file]').selectFile({contents:'res_data_201.xlsx'},{ force: true })

        cy.log("status 300")
        cy.get('input[type=file]').selectFile({contents:'300_cypress_status.xlsx'},{ force: true })

        cy.log("pdf file error")
        cy.get('input[type=file]').selectFile({contents:'blank.pdf'},{ force: true })

        cy.wait(3000)
        cy.log("removing upload file")
        cy.log("removing upload file")
        cy.get('button[title="Remove file"]').click()
 
    });
});
