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

		cy.get('#genealogy > .ant-menu-title-content > a', { timeout: 10000 }).click({
			force: true,
		});

		/* ==== Generated with Cypress Studio ==== */
		cy.get(
			':nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item',
			{ timeout: 10000 }
		).click({ multiple: true });
		cy.get('#rc_select_0').clear();
		cy.get('#rc_select_0', { timeout: 6000 }).type('1338');
		cy.get('.ant-select-item-option-content', { timeout: 6000 }).click({
			force: true,
		});
		cy.get(
			':nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item'
		).click({ multiple: true });
		cy.get('#rc_select_1').clear();
		cy.get('#rc_select_1',{ timeout: 6000 }).type('1089084');
		
		cy.get(
			':nth-child(3) > .search-block > .ant-select > .ant-select-selector'
		).click();
		cy.get('#rc_select_2').clear();
		cy.get('#rc_select_2').type('394154');
		cy.get(
			':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content',
			{ timeout: 10000 }
		).click({
			force: true,
		});
		cy.get('.ant-btn-primary > span').click();
		cy.get('#node-7795 > image', { timeout: 10000 }).click();
		cy.get('#popup > :nth-child(1) > span').click();
		cy.get('#treeviewidbackward').click();
		cy.get('#node-7795 > image').click();
		cy.get('#popup > :nth-child(2) > span').click({
			force: true,
		});
		cy.get('#treeviewidforward').click();
		cy.get('#node-10833 > image').click({
			force: true,
		});
		cy.get('#popup > :nth-child(3) > span').click({
			force: true,
		});
		cy.get('.expand-drawer > img').click();
		cy.get(
			'.popout-table > .ant-collapse > :nth-child(2) > .ant-collapse-header'
		).click();
		cy.get(
			'.popout-table > .ant-collapse > :nth-child(3) > .ant-collapse-header'
		).click();
		cy.get('#rc-tabs-0-tab-2 > .tab-label').click();
		cy.get('#rc_select_5').clear();
		cy.get('#rc_select_5').type('10887');

		cy.get('#rc-tabs-0-tab-1').click();
		/* ==== End Cypress Studio ==== */
		/* ==== Generated with Cypress Studio ==== */
		cy.get('#rc-tabs-0-tab-2 > .tab-label').click();
		cy.get('#node-308514 > image').click();
		cy.get('#popup > .ant-btn > span').click();
		cy.get(
			'.ant-drawer-body > .ant-collapse > :nth-child(1) > .ant-collapse-header'
		).click();
		cy.get('.ant-collapse-item-active > .ant-collapse-header').click();
		cy.get(
			'.ant-drawer-body > .ant-collapse > :nth-child(2) > .ant-collapse-header'
		).click();
		cy.get('.expand-drawer').click();
		cy.get(
			'.popout-table > .ant-collapse > :nth-child(1) > .ant-collapse-header'
		).click();
		cy.get(
			'.popout-table > .ant-collapse > :nth-child(2) > .ant-collapse-header'
		).click();
		cy.get('#rc-tabs-0-tab-2 > .tab-label').click();
		cy.get('#rc_select_5').click();
		cy.get(
			'[style="height: 2088px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
		).click({ force: true });
		cy.get('.search-tree > .anticon > svg > path').click({ force: true });
		cy.get('.close-searchicon > .anticon > svg').click({ force: true });
		cy.get('#rc-tabs-0-tab-1').click();
		cy.get('.param-filter-btn > .ant-btn-primary > span').click();
		cy.get('#rc_select_6').click();
		cy.get(
			'[style="height: 888px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content'
		).click();
		cy.get('.search-tree').click();
		cy.get('.close-searchicon > .anticon > svg > path').click();
		/* ==== End Cypress Studio ==== */
	});
});
