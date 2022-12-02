Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});
describe('Dashboard', () => {
	// it("should login successfully using Ad", () => {
	beforeEach(() => {
		cy.intercept('GET', '**/dashboards', { fixture: 'dashboard.json' })
		cy.viewport(1400, 720);
		cy.visit("/");
		cy.url().should("include", "/user/login");
		localStorage.setItem("test_enabled", true);
		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		localStorage.setItem("username", "Dinesh");
		localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: "USER",
				screen_set: "1000_USER",
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
			})
		);
	})
	it('Load View Landing Page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/dashboard')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/dashboard')
	})
	it('Load Screen Header', () => {
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get(':nth-child(2) > .ant-menu-submenu-title', { timeout: 20000 }).click({ force: true });
		cy.get('#chart_configuration > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		const date = new Date();
		const month = date.toLocaleString('default', { month: 'long' });
		const latestDate = date.getDate();
		const year = date.getFullYear();
		const currentDate = month + ' ' + latestDate + ',' + ' ' + year;
		cy.log('Verify Screen Header Component')
		cy.get('.screen_header_head')
		cy.log('Verify User Name')
		cy.get('.screen_header_username').should("have.text", "Howdy Dinesh,")
		// cy.log('Verify Header Text')
		// cy.get('.screen_header_text').should("have.text", "Time to draw up some charts? Lets go!")
		cy.log('Verify Current Date')
		cy.get('.screen_header_resultdate').should("have.text", currentDate)
	})
	it('Load Landing Page Table Component', () => {
		cy.log('Load Search Bar')
		cy.log('Search View Id In Search Component')
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get(':nth-child(2) > .ant-menu-submenu-title', { timeout: 20000 }).click({ force: true });
		cy.get('#chart_configuration > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.wait(6000);
		cy.get(".ant-input-affix-wrapper").eq(1).type("D132").click({ force: true })
		cy.get(".ant-input-search-button").eq(1).click()
	})
	it('Click on Table row', () => {
		cy.log('Load Search Bar')
		cy.log('Search View Id In Search Component')
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get(':nth-child(2) > .ant-menu-submenu-title', { timeout: 20000 }).click({ force: true });
		cy.get('#chart_configuration > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.wait(6000);
		cy.intercept('GET', '**/dashboards', { fixture: 'dashboard.json' })
		cy.get(".ant-input-affix-wrapper").eq(1).type("D132").click({ force: true })
		cy.wait(6000);
		cy.get(".ant-input-search-button").eq(1).click({ force: true })
		cy.wait(6000);
		cy.get('.ant-table-row > :nth-child(2) > div').click();
	})
	it('Close Modal', () => {
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get(':nth-child(2) > .ant-menu-submenu-title', { timeout: 20000 }).click({ force: true });
		cy.get('#chart_configuration > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.wait(2000);
		cy.get('.create-new > .anticon > svg').click();
		cy.wait(2000);
		cy.get('.ant-modal-close-x').click();
	})
	it('Recently Created Dashboard', () => {
		cy.log('Recent View Verify')
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get(':nth-child(2) > .ant-menu-submenu-title', { timeout: 20000 }).click({ force: true });
		cy.get('#chart_configuration > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.wait(6000);
		cy.get(':nth-child(1) > .chart-tiles').should('have.length', 1)
	})
	it("should login successfully using Ad", () => {
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get(':nth-child(2) > .ant-menu-submenu-title', { timeout: 20000 }).click({ force: true });
		cy.get('#chart_configuration > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.intercept('GET', '**/chart-list?chart_status=ALL', { fixture: 'allChartsDashboard.json' })
		cy.get('.create-new > .anticon > svg', { timeout: 10000 }).click({ force: true });
		cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ant-input').clear();
		cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ant-input').type('new dashboard');
		cy.get('.ant-input-wrapper > .ant-input').click();
		cy.wait(3000);
		cy.get('.ant-input-wrapper > .ant-input').type('C263{enter}');
		cy.get('.ant-table-row > :nth-child(2)').click();
		//cy.get('[data-row-key="0"] > :nth-child(1)').click();
		//cy.get('[data-row-key="0"]').type("C263").click({ force: true });
		cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
		cy.intercept('GET', '**/chart-object?chartId=C263', { fixture: 'chartDashboard.json' })
		// cy.intercept('GET', '**/chart-list?chart_status=ALL', { fixture: 'chartDashboard.json' })
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg > path').click({ force: true });
		cy.get('.select_field > .ant-select > .ant-select-selector').click();
		cy.get('.ant-col > .ant-btn').click();
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click();
		cy.get('.global-filters > :nth-child(2) > .ant-btn > span').click();
		cy.wait(6000);
		cy.get('[d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"]').click();
		// cy.get('.btns > .ant-btn > span').click({ force: true });
		// cy.get('[style="background-color: rgb(9, 49, 133); color: white; border-radius: 4px;"] > span').click({ force: true });
		// /* ==== Generated with Cypress Studio ==== */
		cy.get(':nth-child(3) > .ant-breadcrumb-link > a').click({ force: true });
		cy.wait(6000);
		cy.get(':nth-child(1) > .chart-tiles').click({ force: true });
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click({ force: true });
		cy.get('.select_field > .ant-select > .ant-select-selector > .ant-select-selection-item').click({ force: true });
		cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({ force: true });
		cy.get('.ant-col > .ant-btn > span').click({ force: true });
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click({ force: true });
		cy.get('.btns > :nth-child(2) > span').click({ force: true });
		// /* ==== End Cypress Studio ==== */
		// /* ==== Generated with Cypress Studio ==== */
		// //loaded chart with date filters
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click({ force: true });
		cy.get(':nth-child(3) > .ant-picker > .ant-picker-input > input').click({ force: true });
		cy.get('.ant-picker-super-prev-icon').click({ force: true });
		cy.get('.ant-picker-super-prev-icon').click({ force: true });
		cy.get(':nth-child(1) > .ant-picker-cell-start > .ant-picker-cell-inner').click({ force: true });
		cy.get(':nth-child(4) > .ant-picker > .ant-picker-input > input').click({ force: true });
		cy.get('.ant-picker-cell-today > .ant-picker-cell-inner').click({ force: true });
		cy.get('.ant-col > .ant-btn > span').click({ force: true });
		cy.wait(6000);
		cy.get('[d="M699 353h-46.9c-10.2 0-19.9 4.9-25.9 13.3L469 584.3l-71.2-98.8c-6-8.3-15.6-13.3-25.9-13.3H325c-6.5 0-10.3 7.4-6.5 12.7l124.6 172.8a31.8 31.8 0 0051.7 0l210.6-292c3.9-5.3.1-12.7-6.4-12.7z"]').click({ force: true });
		// /* ==== End Cypress Studio ==== */
		// /* ==== Generated with Cypress Studio ==== */
		// //creating a new chart with date filters
		cy.get('.before-new-card > .anticon > svg').click({ force: true });
		cy.wait(4000);
		cy.get('.select_field > .ant-select > .ant-select-selector > .ant-select-selection-item').click({ force: true });
		cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
		cy.wait(4000);
		cy.get('.ant-input').eq(1).click({ force: true });
		cy.wait(6000);
		cy.get('.ant-input-wrapper > .ant-input').type('C263{enter}');
		cy.get('.ant-table-row > :nth-child(2)').click({ force: true });
		//cy.get('[data-row-key="0"] > :nth-child(1)').click();
		cy.wait(6000);
		cy.get('.ant-col-8 > .show-data > .ant-switch > .ant-switch-handle').click({ force: true });
		cy.wait(6000);
		cy.get(':nth-child(3) > .ant-picker > .ant-picker-input > input').click({ force: true });
		cy.get('.ant-picker-super-prev-icon').click({ force: true });
		cy.get('.ant-picker-super-prev-icon').click({ force: true });
		cy.get(':nth-child(1) > .ant-picker-cell-start > .ant-picker-cell-inner').click({ force: true });
		cy.get(':nth-child(4) > .ant-picker > .ant-picker-input > input').click({ force: true });
		cy.wait(6000);
		cy.get('.ant-picker-cell-today > .ant-picker-cell-inner').click({ force: true });
		cy.get('.ant-col > .ant-btn > span').click({ force: true });
		cy.get('.inner-chart-filters > div > [style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg').click({ force: true });
		// /* ==== End Cypress Studio ==== */
		// /* ==== Generated with Cypress Studio ==== */
		// //global date filters
		// cy.get(':nth-child(1) > .ant-picker-input > input').click({ force: true });
		// cy.get(':nth-child(1) > .ant-picker-cell-start > .ant-picker-cell-inner').click();
		// cy.get(':nth-child(2) > .ant-picker-input > input').click();
		// cy.wait(6000);
		// cy.get('.ant-picker-cell-today > .ant-picker-cell-inner').eq(1).click({ force: true });
		// cy.get('.global-filters > :nth-child(2) > .ant-btn > span').click();
		// cy.get('.btns > [ant-click-animating-without-extra-node="false"] > span').click();
		/* ==== End Cypress Studio ==== */
		/* ==== Generated with Cypress Studio ==== */
		//deleting one card when loaded
		// cy.get(':nth-child(2) > .chartCard > .inner-chart-filters > [style="display: flex; flex-direction: row; justify-content: space-between; margin: 5px 7px;"] > :nth-child(2) > [style="margin-left: 10px;"] > .anticon > svg').click();
		// cy.get('.btns > [ant-click-animating-without-extra-node="false"] > span').click();
		/* ==== End Cypress Studio ==== */
		/* ==== Generated with Cypress Studio ==== */
		// new added
		cy.get(':nth-child(2) > :nth-child(1) > .ant-picker-input').click({ force: true });
		cy.get(':nth-child(8) > :nth-child(1) > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel > .ant-picker-date-panel > .ant-picker-body > .ant-picker-content > tbody > :nth-child(1) > .ant-picker-cell-start > .ant-picker-cell-inner').click({ force: true });
		cy.get(':nth-child(2) > .ant-picker-input').click({ force: true });
		cy.get(':nth-child(9) > :nth-child(1) > .ant-picker-dropdown > .ant-picker-panel-container > .ant-picker-panel > .ant-picker-footer > .ant-picker-today-btn').click({ force: true });
		/* ==== End Cypress Studio ==== */
	});
	it('Checbox and site change', () => {
		cy.get("#login-btn", { timeout: 2000 }).click();
		cy.get(':nth-child(2) > .ant-menu-submenu-title', { timeout: 20000 }).click({ force: true });
		cy.get('#chart_configuration > .ant-menu-title-content > a', { timeout: 20000 }).click({ force: true });
		cy.location('href', { timeout: 10000 }).should('include', '/dashboard');
		cy.intercept('GET', '**/chart-list?chart_status=ALL', { fixture: 'allChartsDashboard.json' })
		cy.get('.create-new > .anticon > svg', { timeout: 10000 }).click({ force: true });
		cy.intercept('GET', '**/chart-object?chartId=C263', { fixture: 'chartDashboard.json' })
		cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ant-input').clear();
		cy.get(':nth-child(1) > :nth-child(2) > :nth-child(1) > .ant-input').type('new dashboard');
		cy.get('.ant-input-wrapper > .ant-input').click();
		cy.wait(6000);
		cy.get('.ant-input-wrapper > .ant-input').type('C263{enter}');
		cy.get('.ant-table-row > :nth-child(2)').click();
		cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
		cy.get('[style="margin-left: 20px; margin-right: 20px;"] > .anticon > svg > path').click({ force: true });
		cy.get('.ant-col-8 > .show-data > .ant-switch > .ant-switch-handle').click();
		cy.get('.ant-col > .ant-btn > span').click();
		cy.get('.global-filters > :nth-child(1) > .show-data > .ant-switch > .ant-switch-handle').click();
		cy.wait(4000);
		cy.get('[style="display: flex; flex-direction: row;"] > :nth-child(1) > .anticon > svg').click();
	})
});