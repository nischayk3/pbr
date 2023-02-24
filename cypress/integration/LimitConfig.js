Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe("Renders the Limit config page", () => {
	afterEach(() => {
		cy.viewport(1360, 720)
		cy.loginWithAD()
	});

	beforeEach(() => {
		cy.viewport(1366, 720)
		cy.loginWithAD()

		cy.intercept("GET", "**/chart-limit", {
			fixture: "chartLimits.json",
		});
		cy.intercept("POST", "**/chart-limit", {
			fixture: "saveChartLimits.json",
		});
	});

	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/limit-config')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/limit-config')
		cy.wait(1000)
	})

	it('Expanding limits', () => {
		cy.get('.ant-table-row > .ant-table-row-expand-icon-cell').click();
		cy.get('.ant-table-row > .ant-table-row-expand-icon-cell').click();
	})

	it('Operating More button', () => {
		cy.get('.action-table > :nth-child(1)').click();
		cy.get('.ant-space').click();
		cy.get('.ant-dropdown-menu-title-content > div > a').click();
		cy.get('.ant-upload-select > .ant-upload').click();
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/chartLimit.xlsx' }, { force: true })
		cy.wait(1000)
		cy.get('.ant-table-row > .ant-table-row-expand-icon-cell').click();
	})

	it('Editing Limits', () => {
		cy.get('.action-table > :nth-child(1)').click();
		cy.wait(1000)
		cy.get(':nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
		cy.get('[title="7-7"]').click({multiple:'true', force: true});
		cy.get(':nth-child(2) > .ant-select > .ant-select-selector > .ant-select-selection-item').click();
		cy.get('[title="BELATACEPT"]').click({multiple:'true', force: true});
		cy.wait(1000)
		cy.get('[data-row-key="1"] > :nth-child(2) > .select_field > .ant-select > .ant-select-selector').click();
		cy.get('[title="V494"]').click({multiple:'true', force: true});
		cy.get('[data-row-key="1"] > :nth-child(3) > .select_field > .ant-select > .ant-select-selector').click();
		cy.get('[title="1"]').click({multiple:'true', force: true});
		cy.wait(1000);
		cy.get('[data-row-key="1"] > :nth-child(4) > .select_field > .ant-select > .ant-select-selector').click();
		cy.get('[title="init_a"]').click({multiple:'true', force: true});
		cy.get('[data-row-key="1"] > :nth-child(5) > .select_field > .ant-select > .ant-select-selector').click();
		cy.get('[title="1255"]').click({multiple:'true', force: true});
		cy.get('[data-row-key="1"] > :nth-child(6) > .ant-select > .ant-select-selector').click();
		cy.get('[title="CPP"]').click({multiple:'true', force: true});
		cy.get('[data-row-key="1"] > :nth-child(5) > .select_field > .ant-select > .ant-select-selector').click();
		cy.get('[title="control"]').click({multiple:'true', force: true});
		cy.get('[data-row-key="1"] > :nth-child(8) > .ant-input').click().clear().type(9.3);
		cy.get('[data-row-key="1"] > :nth-child(9) > .ant-input').click().clear().type(15.6);
		cy.get('[data-row-key="1"] > :nth-child(10) > .ant-picker').click();
		cy.get(".ant-picker-cell").eq(7).click();
		cy.get('[data-row-key="1"] > :nth-child(11) > .ant-input').clear().type("test.csv")
		cy.get('[data-row-key="1"] > :nth-child(12) > .ant-input').clear().type("test.url")
		cy.get('.add-button-limit > .ant-btn').click();
		cy.get('.action-table > :nth-child(1)').click();
		cy.wait(1000)
	})

	it('Deleting parameters in limit table', () => {
		cy.get('.action-table > :nth-child(1)').click();
		cy.get('[data-row-key="5"] > :nth-child(1) > .anticon > svg').click();
		cy.get('.ant-btn-primary').click();
		cy.wait(1000)
	})

	it('Deleting molecule', () => {
		cy.get('.action-table > :nth-child(2)').click();
		cy.get('.ant-btn-primary').click();
		cy.wait(1000)
	})
	it('adding molecule', () => {
		cy.get('.landing-card-limit > .ant-btn > span').click();
	})
});
