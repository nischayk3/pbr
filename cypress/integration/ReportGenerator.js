Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});
describe("Report", () => {

	afterEach(() => {
		cy.viewport(1280, 720)
		cy.loginWithAD()
		cy.intercept('GET', '**/report-load?report_displ_id=R391', { fixture: 'reportGenLoad.json' })
		cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
		cy.intercept('GET', '**/report-load?report_displ_id=R520', { fixture: 'reportFiveTwenty.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 720)
		cy.loginWithAD()
		cy.intercept('GET', '**/report-load?report_displ_id=R391', { fixture: 'reportGenLoad.json' })
		cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
		cy.intercept('GET', '**/report-load?report_displ_id=R520', { fixture: 'reportFiveTwenty.json' })
	});
	it('Renders Report Landing Page ', () => {
		const url = Cypress.config().baseUrl
		cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
		cy.log('Opening a report template')
		cy.visit(url + '/#/dashboard/report_generator')
		cy.get('.ant-tabs-nav-list > :nth-child(2)').click({ force: true });
		cy.wait(1000)
		cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .create-new > .anticon > svg').click({ force: true });
		cy.wait(1000)
		cy.get('.ant-input-wrapper > .ant-input').clear();
		cy.get('.ant-input-wrapper > .ant-input').type('r391{enter}', { force: true });
		cy.get('.ant-input-wrapper > .ant-input').clear();
		cy.get('.ant-input-wrapper > .ant-input').type('r391{enter}', { force: true });

		// cy.get('.ant-btn > .anticon > svg').click({ force: true });
		cy.intercept('GET', '**/report-load?report_displ_id=R391', { fixture: 'reportGenLoad.json' })
		cy.get('.ant-table-tbody > :nth-child(2) > :nth-child(2) > div').click({ force: true })
		cy.wait(2000)
		cy.get('[style="background-color: rgb(9, 49, 133); color: white; border-radius: 4px; margin-left: 88%; margin-top: 70px;"] > span').click({ force: true });
		cy.wait(5000)
		cy.get(':nth-child(1) > .ant-collapse-item > .ant-collapse-header').click({ force: true });
		// cy.get('.ant-input').click({force:true});
		cy.get('.td > .ant-input').click({ force: true })
		cy.wait(1000)
		cy.get(':nth-child(2) > .ant-collapse-item > .ant-collapse-header > div').click({ force: true });
		cy.wait(1000)
		cy.get(':nth-child(1) > .chart-name-rep > .tag-div > :nth-child(1) > .anticon > svg > path').click({ force: true });
		cy.wait(1000)
		cy.get('#rc-tabs-1-tab-Exclusion').click({ force: true });
		cy.wait(1000)
		cy.get('#rc-tabs-1-tab-Violation').click({ force: true });
		cy.wait(1000)

		cy.get(':nth-child(1) > .chart-name-rep > .tag-div > :nth-child(2) > .anticon > svg').click({ force: true });
		cy.get(':nth-child(1) > .chart-name-rep > .tag-div > :nth-child(3) > .anticon > svg').click({ force: true });
		cy.get('[style="margin-left: 16px; margin-right: 16px;"]').click({ force: true });
		cy.wait(2000)
		cy.get('.ant-modal-close-x').click({ force: true });
		cy.get('.report-secondary-btn > :nth-child(2)').click({ force: true });
		cy.log("Downloading report")
		cy.wait(2000)

		cy.get('.sub-header-btns > :nth-child(1) > span').click({ force: true });
		cy.get('.ant-select-selection-overflow').click({ force: true });
		cy.get('#rc_select_0').clear();
		cy.get('#rc_select_0').type('mihir@mareana.com{enter}');
		// cy.get('.ant-select-item-option-content').click({force:true});
		// cy.get('.email-content').click({force:true});
		cy.get('#rc-tabs-3-tab-email_schedule').click({ force: true });
		cy.get('[style="width: 300px;"] > .ant-picker > .ant-picker-input > input').click({ force: true });
		cy.get('.ant-picker-today-btn').click({ force: true });
		cy.get('.ant-select-selector > .ant-select-selection-item').click({ force: true });
		cy.get(':nth-child(2) > :nth-child(1) > .ant-picker > .ant-picker-input > input').click({ force: true });
		cy.get('.ant-picker-now-btn').click({ force: true });
		cy.get('.schedule-evalutaion-button').click({ force: true });
		cy.get('[style="color: grey; font-family: Roboto; font-style: normal; font-weight: 400; font-size: 16px;"] > [style="font-size: 17px; margin-bottom: 20px;"]').click({ force: true });
		cy.wait(5000)
		cy.get(':nth-child(1) > [style="text-align: center;"] > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click({ force: true });
		cy.get('.ant-popover-buttons > .ant-btn-primary > span').click({ force: true });
		cy.wait(2000)
		//cy.get(':nth-child(1) > :nth-child(2) > u > a').click({ force: true });
		/* ==== Generated with Cypress Studio ==== */
		/* ==== End Cypress Studio ==== */
	})

	it('Load Report generator via search', () => {
		const url = Cypress.config().baseUrl
		cy.log('Opening a report template')
		cy.visit(url + '/#/dashboard/report_generator')
		cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
		cy.get('.ant-tabs-nav-list > :nth-child(2)').click({ force: true });
		cy.wait(1000)
		// cy.get('.ant-input').clear();
		// cy.get('.ant-input').type('R391{enter}');
		cy.get('[style="width: 794px; margin-left: 210px;"] > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').clear();
		cy.get('[style="width: 794px; margin-left: 210px;"] > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-affix-wrapper > .ant-input').type('R391{enter}');


		cy.get('.ant-table-row > :nth-child(1)').click({ force: true });
		// cy.get('.ant-table-row > :nth-child(1) > div').click({force:true});
		// cy.wait(5000)
		// cy.get('.ant-table-row > :nth-child(2)').click({ force: true });
		// cy.get('.td > .ant-input').clear()
		// cy.get('.td > .ant-input').type('key1')
	})
	it('Load Report Generator via tile ', () => {
		const url = Cypress.config().baseUrl
		cy.log('Opening a report template')
		cy.visit(url + '/#/dashboard/report_generator')
		cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
		cy.get('.ant-tabs-nav-list > :nth-child(2)').click({ force: true });
		cy.intercept('GET', '**/report-load?report_displ_id=R520', { fixture: 'reportFiveTwenty.json' })
		cy.wait(1000)
		cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .tile > :nth-child(1) > .chart-tiles').click({ force: true });
		cy.get(':nth-child(1) > .ant-collapse-item > .ant-collapse-header').click({ force: true });
		cy.get('.td > .ant-input').clear()
		cy.get('.td > .ant-input').type('key1')
	})
	it("Close Modal", () => {
		const url = Cypress.config().baseUrl
		cy.log('Opening a report template')
		cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
		cy.visit(url + '/#/dashboard/report_generator')
		cy.get('.ant-tabs-nav-list > :nth-child(2)').click({ force: true });
		cy.wait(1000)
		cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .create-new > .anticon > svg').click({ force: true });
		cy.get('.ant-modal-close-x').click({ force: true });
	});

	it("Create via Modal", () => {
		const url = Cypress.config().baseUrl
		cy.log('Opening a report template')
		cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
		cy.visit(url + '/#/dashboard/report_generator')
		cy.get('.ant-tabs-nav-list > :nth-child(2)').click({ force: true });
		cy.wait(1000)
		cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .create-new > .anticon > svg').click({ force: true });
		cy.wait(500);
		cy.get(':nth-child(1) > .landing-tile').click({ force: true })
		cy.wait(4000)
		cy.get('[style="background-color: rgb(9, 49, 133); color: white; border-radius: 4px; margin-left: 88%; margin-top: 70px;"] > span').click({ force: true })

	});

});
