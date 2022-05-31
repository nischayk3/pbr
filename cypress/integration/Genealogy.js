Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Genealogy', () => {
	it('should login successfully using Ad', () => {
        cy.visit('/');
        cy.url().should('include', '/user/login');
        cy.get('#login-btn').click();
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
        cy.get('#genealogy > .ant-menu-title-content > a').click({
			       force: true,
			     });
        /* backward Genealogu */
		cy.get(':nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item',{ timeout: 20000 }).click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click();
        cy.get(':nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item',{ timeout: 20000 }).click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click({ multiple: true,force: true});
        cy.get(':nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item',{ timeout: 20000 }).click();
        cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click();
        cy.get('.ant-select-selection-overflow',{ timeout: 20000 }).click();
        cy.get(':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click();
        cy.get('.ant-btn-primary > span').click();
        /* ==== End of backward Genealogu */ 

		/* forward Genealogu */
        // cy.get(':nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item',{ timeout: 20000 }).click();
        // cy.get('.ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click();
        // cy.get(':nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item',{ timeout: 20000 }).click();
        // cy.get('.ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click({ multiple: true,force: true});
        // cy.get(':nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item',{ timeout: 20000 }).click();
        // cy.get(':nth-child(6) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click();
        // cy.get('.ant-select-selection-overflow',{ timeout: 20000 }).click();
        // cy.get(':nth-child(7) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content',{ timeout: 20000 }).click();
        // cy.get('.ant-btn-primary > span').click();
        /* ==== End of forward Genealogu */ 
    });

	
});
