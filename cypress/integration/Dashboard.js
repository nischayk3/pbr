Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});
describe('Dashboard', () => {
	beforeEach(() => {
		// cy.intercept('GET', '**/chart-list?chart_status=ALL', { fixture: 'chartDashboard.json' })
		cy.loginWithAD()
		cy.viewport(1400, 720);

		cy.intercept('GET', '**/dashboards', { fixture: 'dashboard.json' })
		cy.intercept("GET", "/services/v1/chart-list?chart_status=ALL", {
			fixture: "chartListDashboard.json",
		}).as("chartListDashboard");

		cy.intercept("GET", "/services/v1/chart-object?chartId=C842", {
			fixture: "chartObj_C842.json",
		}).as("chartObj_C842");
		cy.intercept("GET", "/services/v1/site_ids", {
			fixture: "dashboardSite.json",
		}).as("dashboardSite");
	})

	afterEach(() => {
		cy.loginWithAD()
		cy.viewport(1400, 720);

		cy.intercept('GET', '**/dashboards', { fixture: 'dashboard.json' })
		cy.intercept("GET", "/services/v1/chart-list?chart_status=ALL", {
			fixture: "chartListDashboard.json",
		}).as("chartListDashboard");
		cy.intercept("GET", "/services/v1/chart-object?chartId=C842", {
			fixture: "chartObj_C842.json",
		}).as("chartObj_C842");
		cy.intercept("GET", "/services/v1/site_ids", {
			fixture: "dashboardSite.json",
		}).as("dashboardSite");
	})

	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/dashboard')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/dashboard')
	})

	it('Create New Config', () => {
		cy.log('Click on New Button');
		cy.get('.create-new > .anticon > svg').click();

		cy.log('Enter Configurator name');
		cy.get('#config_name').type('TEST_CONFIG');

		cy.log('Add Chart ID');
		cy.get('#chart_key').type('C842');

		cy.log('Click on Search');
		cy.get('.ant-btn > .anticon > svg').click();

		cy.log('Click on table row');
		cy.get('.ant-table-row > :nth-child(2)').click();

		cy.wait(2000)
		cy.log('Lets go to the Create a config');
		cy.get('#create_config').click();
	})

	it('FIlter Chart Config', () => {
		cy.wait(2000)
		cy.log('Select Site')
		cy.get('#site').click({ force: true })
		cy.get('.ant-select-item-option-content').click({ force: true })

		cy.wait(500)
		cy.log('show unapproved data')
		cy.get('#show_unapproved').click()

		// cy.wait(500)
		// cy.log("select start date")
		// cy.get('#start_date').click({ force: true })
		// cy.get('[title="2023-02-07"]').click({ force: true })
		// cy.wait(500)

		cy.wait(1000)
		cy.log("select end date")
		cy.get('#end_date').click()
		// cy.get(':nth-child(2) > .ant-picker-input')
		// cy.get(':nth-child(6) > :nth-child(1) > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel > .ant-picker-date-panel > .ant-picker-body > .ant-picker-content > tbody > :nth-child(4) > [title="2023-02-23"]').click({ force: true })

		cy.wait(1000)
		cy.log('select exploration controls')
		cy.get('#exploration_control').click({ force: true })
	})

	it('Click on Edit Chart', () => {
		cy.wait(1000)
		cy.log('Click on edit chart')
		cy.get('#edit_chart').click()
	})
	it(' Edit Chart Config', () => {
		cy.wait(500)
		cy.log('Click on type of Charts')
		cy.get('.select_field > .ant-select > .ant-select-selector').click()
		cy.get('[title="Charts"] > .ant-select-item-option-content')

		cy.wait(500)
		cy.log('import charts')
		cy.get('#import_chart').click()
		cy.get('.ant-input-group-addon > .ant-btn').click()

		cy.wait(500)
		cy.log('show unapproved chart')
		cy.get('.ant-col-8 > .show-data > #show_unapproved').click()

		cy.wait(500)
		cy.log('select site')
		cy.get('.ant-col-6 > .ant-select > .ant-select-selector > .ant-select-selection-item').click()
		// cy.get(':nth-child(9) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item > .ant-select-item-option-content').click()

		cy.wait(500)
		cy.log('select start date')
		cy.get('#start_date_1').click()
		// cy.get(':nth-child(10) > :nth-child(1) > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel > .ant-picker-date-panel > .ant-picker-body > .ant-picker-content > tbody > :nth-child(2) > [title="2023-02-06"]').click()

		cy.wait(500)
		cy.log('select end date')
		cy.get('#end_date_1').click()
		// cy.get(':nth-child(11) > :nth-child(1) > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel > .ant-picker-date-panel > .ant-picker-body > .ant-picker-content > tbody > :nth-child(4) > [title="2023-02-24"]').click()

		cy.log('show preview')
	})

	it(' Add new Chart', () => {
		cy.wait(1000)
		cy.get('#new_chart').click()
	})



});