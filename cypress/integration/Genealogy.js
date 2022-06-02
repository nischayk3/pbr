Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Genealogy', () => {
	it('should login successfully using Ad', () => {
        cy.visit('/');
        cy.url().should('include', '/user/login');
        localStorage.setItem('test_enabled', true);
        localStorage.setItem(
			'login_details',
			JSON.stringify({
				firstname: 'Fahad',
				lastname: 'siddiqui',
				email_id: 'fahad.siddiqui@mareana.com',
				token:
					'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc',
			})
		);
        /* geneaology tab */
        cy.get("#login-btn",{timeout:2000}).click();
        cy.get('#genealogy > .ant-menu-title-content > a',{timeout:20000}).click({ force: true});
        cy.location('href', {timeout: 10000}).should('include', '/genealogy');

        // cy.get(':nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
        // cy.get('#rc_select_0').clear();
        // cy.get('#rc_select_0').type('1338');
        // cy.get('.ant-select-item-option-content').click();
        // cy.get(':nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
        // cy.get('[title="1054482 - FLAVOR PULVESSENCE MANDARINE PWD"] > .ant-select-item-option-content').click();
        // cy.get(':nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
        // cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        // cy.get('.ant-select-selection-overflow').click();
        // cy.get(':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        // cy.get('.ant-btn-primary > span').click();
        // cy.get(':nth-child(4) > .search-block > .ant-btn > .anticon > svg').click();
        // cy.get('.ant-btn-primary').click();
        // cy.get('#treeviewidbackward').click();
        // cy.get('#node-4298 > image').click();
        // cy.get('#popup > :nth-child(3) > span').click();
        // cy.get('.expand-drawer > img').click();
        // cy.get('.popout-table > .ant-collapse > :nth-child(1) > .ant-collapse-header > :nth-child(1)').click();
        // cy.get('.popout-table > .ant-collapse > :nth-child(2) > .ant-collapse-header > :nth-child(1)').click();
        // cy.get('.popout-table > .ant-collapse > :nth-child(3) > .ant-collapse-header > .panel-header').click();
        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
        cy.get('#rc_select_0').clear();
        cy.get('#rc_select_0').type('1338');
        cy.get('.ant-select-item-option-content').click({force:true});
        cy.get(':nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
        cy.get('#rc_select_1').clear();
        cy.get('#rc_select_1').type('1089084');
        cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content').click({force:true});
        cy.get(':nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
        cy.get('#rc_select_2').clear();
        cy.get('[style="height: 2496px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('.ant-btn-primary > span').click();
        cy.get('#node-13548 > image').click();
        cy.get('#popup > :nth-child(3) > span').click();
        cy.get('.expand-drawer > img').click({force:true});
        cy.get('.popout-table > .ant-collapse > :nth-child(1) > .ant-collapse-header > :nth-child(1)').click();
        cy.get('.popout-table > .ant-collapse > :nth-child(2) > .ant-collapse-header > :nth-child(1) > .anticon > svg').click();
        cy.get('.popout-table > .ant-collapse > :nth-child(3) > .ant-collapse-header > :nth-child(1) > .anticon > svg').click();
        cy.get('#rc-tabs-0-tab-1').click();
        cy.get(':nth-child(2) > .toggle-text').click();
        cy.get('#isChecked').uncheck({force:true});
        cy.get('.param-filter-btn > .ant-btn-primary > span').click();
        
    });

	
});
