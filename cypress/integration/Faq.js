Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });
  describe('Faq', () => {
    beforeEach(() => {
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

    it("visit genealogy page",()=>{
      const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/genealogy')
        cy.log('Load Landing Page')
        cy.wait(10000)
    })
        
    // it("should login successfully using Ad", () => {
    //     cy.log("opening faq drawer")
    //     cy.wait(10000)
    //     cy.get('.hepIcon ').click({force:true})
    //     cy.get('.help_item').eq(0).click({force:true})
    //     cy.get('#helptext').click({force:true})

    //     cy.log("closing the drawer")
    //     cy.get(".ant-drawer-close").click({force:true})

    //     cy.log("searching test")
    //     cy.log("opening faq drawer")
    //     cy.get('.hepIcon ').click({force:true})
    //     cy.get('.help_item').eq(0).click({force:true})
    //     cy.get('#helptext').click({force:true})
    //     cy.get('input[placeholder="Search"]').click({force:true})
    //     cy.get('input[placeholder="Search"]').type("a")
    //     cy.get('.ant-input-search-button').click({force:true})

    //     cy.log("View all Faqs page")
    //     cy.get("#view_all_faq").click({force:true})

    // });
  });