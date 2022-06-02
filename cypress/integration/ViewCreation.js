Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
  describe("ViewCreation", () => {
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
      cy.get('#view_creation > .ant-menu-title-content > a',{timeout:20000}).click({ force: true,multiple:true});
      cy.location('href', {timeout: 10000}).should('include', '/view_creation');



      cy.get('.create-new > .anticon > svg',{timeout:6000}).click();

      cy.get('#rc_select_0').click();
      cy.get('div[title="BELATACEPT"]').click({force:true})

      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.wait(4000)
      cy.get(':nth-child(1) > .ant-tree-list > .ant-tree-list-holder > :nth-child(1) > .ant-tree-list-holder-inner > .ant-tree-treenode > .ant-tree-switcher > .anticon > svg').click({force:true});
      cy.wait(4000)
      cy.get(':nth-child(2) > .ant-tree-switcher > .anticon > svg').click({force:true});
      cy.wait(4000)
      cy.get(':nth-child(4) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2) > .anticon > svg').click();
      cy.wait(4000)
      cy.get(':nth-child(5) > .ant-tree-node-content-wrapper > .ant-tree-title > .treenode-block > :nth-child(2)').click();
      cy.wait(4000)
      cy.get('.add-var_block > div > .anticon > svg').click();


      /* ==== Generated with Cypress Studio ==== */
      cy.get('.add-var_block > p').click();
      cy.wait(4000)
      // cy.get('[data-row-key="140L-1322454-ASPARAGINE DEAMIDATION 1DECPT"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
      // cy.get('#rc_select_3').click();
      // cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click({force:true});
      // cy.get('.ant-table-row-selected > [style="position: sticky; left: 182px;"] > .ant-radio-wrapper > .ant-radio > .ant-radio-input').check({force:true});
      // cy.get('.add-var_block > .ant-btn > span').click({force:true});
      // cy.get('.input_field > .ant-input').clear();
      // cy.get('.input_field > .ant-input').type('var1');
      // cy.get('.variable-name-popup > .ant-btn > span').click({force:true});
      // cy.get('.add-var_block > div > .anticon > svg').click({force:true});
      // cy.get('[data-row-key="140L-1322454-B7 BINDING  SPR"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check({force:true});
      // cy.get('.ant-table-row-selected > [style="position: sticky; left: 182px;"] > .ant-radio-wrapper > .ant-radio > .ant-radio-input').check({force:true});
      // cy.get('#rc_select_4').click({force:true});
      // cy.get(':nth-child(8) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click({force:true});
      // cy.get('.add-var_block > .ant-btn > span').click({force:true});
      // cy.get('.input_field > .ant-input').clear();
      // cy.get('.input_field > .ant-input').type('var2');
      // cy.get('.variable-name-popup > .ant-btn > span').click({force:true});
      // cy.get('.w-tc-editor-text').click({force:true});
      // cy.get(':nth-child(2) > .custom-eval-btn > span').click({force:true});
      // cy.get('.ant-modal-close-x > .anticon > svg').click({force:true});
      // cy.get('.custom-secondary-eval-btn > span').click({force:true});
      // cy.get('.function-input > .input_field > .ant-input').clear();
      // cy.get('.function-input > .input_field > .ant-input').type('function1');
      // cy.get('.custom-secondary-btn > span').click({force:true});
      // cy.get('.summary-column > p').click({force:true});
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      cy.get('.add-var_block > p').click();
      cy.get('[data-row-key="140L-1176024-ASSAY 1DECPT"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
      cy.get('.ant-table-row-selected > [style="position: sticky; left: 181.979px;"] > .ant-radio-wrapper > .ant-radio > .ant-radio-input').check();
      cy.get('#rc_select_3').click();
      cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
      cy.get('.add-var_block > .ant-btn > span').click();
      cy.get('.input_field > .ant-input').clear();
      cy.get('.input_field > .ant-input').type('var1');
      cy.get('.variable-name-popup > .ant-btn > span').click();
      cy.get('[data-row-key="140L-1176024-ASSAY 1DECPT"] > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input').check();
      cy.get('.add-var_block > .ant-btn > span').click();
      cy.get('.input_field > .ant-input').clear();
      cy.get('.input_field > .ant-input').type('var2');
      cy.get('.variable-name-popup > .ant-btn > span').click();
      cy.get('.w-tc-editor-text').click();
      // cy.get(':nth-child(2) > .custom-eval-btn > span').click();
      // cy.get('.ant-modal-close-x > .anticon > svg').click();
      // cy.get('.custom-secondary-eval-btn > span').click();
      // cy.get('.function-input > .input_field > .ant-input').clear();
      // cy.get('.function-input > .input_field > .ant-input').type('func1');
      // cy.get('.custom-secondary-btn > span').click();
      // cy.get('.summary-column > p').click();
      // cy.get('.summary-column > :nth-child(2) > .anticon > svg').click();
      /* ==== End Cypress Studio ==== */
      /* ==== Generated with Cypress Studio ==== */
      /* ==== End Cypress Studio ==== */
    });
  });
