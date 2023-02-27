Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});
describe('Audit Trail', () => {
	beforeEach(() => {
		cy.viewport(1280, 720);
		cy.loginWithAD();
		cy.intercept('POST', 'services/v1/audit-data-change', { fixture: 'auditTrail-data.json' })
		cy.intercept('GET', '/services/v1/audit-filter', { fixture: 'auditTrail-filter.json' })
	})

	afterEach(() => {
		cy.viewport(1280, 720);
		cy.loginWithAD();
		cy.intercept('POST', 'services/v1/audit-data-change', { fixture: 'auditTrail-data.json' })
		cy.intercept('GET', '/services/v1/audit-filter', { fixture: 'auditTrail-filter.json' })
	});


	it("should login successfully using Ad", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/audit_trail_report')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/audit_trail_report')
		cy.wait(2000)
	});
	it("selecting daterange", () => {
		cy.log("selecting daterange")
		cy.get('.ant-picker-input').first().click()
		cy.get('.ant-picker-header-prev-btn').first().click()
		cy.get('.ant-picker-cell').eq(7).click()
		cy.get('.ant-picker-cell').eq(12).click()
	});
	it("selecting user", () => {
		cy.log("selecting user")
		cy.get('.ant-select-selection-item').first().click()
		cy.get('.ant-select-item-option').first().click()
		cy.wait(1000)
	});
	it("selecting type", () => {
		cy.log("selecting type")
		cy.get('.ant-select-selection-item').eq(1).click({ force: true })
		cy.wait(2000)
		cy.get('.ant-select-item-option').contains('U').click({ force: true })
		cy.get('.divFilter > :nth-child(3) > .ant-select > .ant-select-selector').click({ force: true })
		cy.wait(1000)
	});
	it("clear filter", () => {
		cy.log("clearing filter")
		cy.get('.custom-secondary-btn').click({ force: true });
	});

	it("sorting of table and click of cell", () => {
		cy.log("sorting of table")
		cy.get(':nth-child(1) > .ant-table-column-sorters').click({ force: true });
		cy.get(':nth-child(2) > .ant-table-column-sorters').click({ force: true });
		cy.get(':nth-child(3) > .ant-table-column-sorters').click({ force: true });
		cy.get(':nth-child(4) > .ant-table-column-sorters').click({ force: true });
		cy.get(':nth-child(5) > .ant-table-column-sorters').click({ force: true });
		cy.get(':nth-child(6) > .ant-table-column-sorters').click({ force: true });
		cy.get(':nth-child(7) > .ant-table-column-sorters').click({ force: true });
		cy.get('.ant-btn-primary').eq(3).click()
		cy.wait(1000)
		cy.get('.ant-dropdown-menu-title-content').contains('Excel').click()
		cy.wait(1000)
		cy.get('.ant-btn-primary').eq(3).click()
		cy.wait(1000)
		cy.get('.ant-dropdown-menu-title-content').contains('CSV').click()
		cy.get('.ant-btn-primary').eq(3).click()
		cy.wait(1000)
		cy.get('.ant-dropdown-menu-title-content').contains('PDF').click()
		cy.log("sorting of table")
		cy.get('.ant-input').clear();
		cy.get('.ant-input-group-addon > .ant-btn').click({ force: true });
		cy.wait(2000)
		cy.get('.ant-table-column-sorter').eq(0).click({ force: true });
		cy.get('.ant-table-column-sorter').eq(1).click({ force: true });
		cy.get('.ant-table-column-sorter').eq(2).click({ force: true });
		cy.get('.ant-table-column-sorter').eq(3).click({ force: true });
		cy.get('.ant-table-column-sorter').eq(4).click({ force: true });
		cy.get('.ant-table-column-sorter').eq(5).click({ force: true });
		cy.get('.ant-table-column-sorter').eq(6).click({ force: true });
	});

	it("Check esign Details", () => {
		cy.wait(500)
		cy.get('#esign_id').click()
		cy.wait(2000)
		cy.get('.ant-modal-close-x').click()
	})

	it("searching table", () => {
		cy.wait(1000)
		cy.log("searching in table")
		cy.get('#table_input_search').clear();
		cy.get('#table_input_search').type('AWAP');
		cy.wait(2000)
		cy.get('.ant-input-group-addon > .ant-btn').click({ force: true });
		cy.wait(2000)
	});

});