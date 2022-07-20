Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
describe("Report", () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        localStorage.setItem("test_enabled", true);
        localStorage.setItem("user", "mihir.bagga@mareana.com");
        localStorage.setItem("username", "Mihir");
        localStorage.setItem(
            "login_details",
            JSON.stringify({
                ad_role: false,
                firstname: "Mihir",
                lastname: "Bagga",
                email_id: "mihir.bagga@mareana.com",
                mdh_role: "USER",
                screen_set: "1000_USER",
                token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
            })
        );
    })
    it('Renders Report Landing Page ', () => {
        const url = Cypress.config().baseUrl
        cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
        cy.log('Opening a report template')
        cy.visit(url + '/#/dashboard/report_designer')
        cy.get('.ant-tabs-nav-list > :nth-child(2)').click();
        cy.wait(1000)
        cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .create-new > .anticon > svg').click();
        cy.wait(1000)
        cy.get('.ant-input-wrapper > .ant-input').clear();
        cy.get('.ant-input-wrapper > .ant-input').type('r391{enter}', { force: true });
        cy.get('.ant-input-wrapper > .ant-input').clear();
        cy.get('.ant-input-wrapper > .ant-input').type('r391{enter}', { force: true });

        cy.get('.ant-btn > .anticon > svg').click({ force: true });
        cy.intercept('GET', '**/report-load?report_displ_id=R391', { fixture: 'reportGenLoad.json' })
        cy.get('.ant-table-tbody > :nth-child(2) > :nth-child(2) > div').click()
        cy.wait(2000)
        cy.get('[style="background-color: rgb(9, 49, 133); color: white; border-radius: 4px; margin-left: 88%; margin-top: 70px;"] > span').click();
        cy.wait(1000)
        cy.get(':nth-child(1) > .ant-collapse-item > .ant-collapse-header').click();
        cy.get('.ant-input').click();
        cy.wait(1000)
        cy.get(':nth-child(2) > .ant-collapse-item > .ant-collapse-header > div').click();
        cy.wait(1000)
        cy.get(':nth-child(1) > .chart-name-rep > .tag-div > :nth-child(1) > .anticon > svg > path').click();
        cy.wait(1000)
        cy.get('#rc-tabs-1-tab-Exclusion').click();
        cy.wait(1000)
        cy.get('#rc-tabs-1-tab-Violation').click();
        cy.wait(1000)

        cy.get(':nth-child(1) > .chart-name-rep > .tag-div > :nth-child(2) > .anticon > svg').click();
        cy.get(':nth-child(1) > .chart-name-rep > .tag-div > :nth-child(3) > .anticon > svg').click();
        cy.get('[style="margin-left: 16px; margin-right: 16px;"]').click();
        cy.wait(2000)
        cy.get('.ant-modal-close-x').click();
        cy.get('.report-secondary-btn > :nth-child(2)').click();
        cy.log("Downloading report")
        cy.wait(2000)

        cy.get('.sub-header-btns > :nth-child(1) > span').click();
        cy.get('.ant-select-selection-overflow').click();
        cy.get('#rc_select_0').clear();
        cy.get('#rc_select_0').type('mihir@mareana.com{enter}');
        // cy.get('.ant-select-item-option-content').click();
        // cy.get('.email-content').click();
        cy.get('#rc-tabs-3-tab-email_schedule').click();
        cy.get('[style="width: 300px;"] > .ant-picker > .ant-picker-input > input').click();
        cy.get('.ant-picker-today-btn').click();
        cy.get('.ant-select-selector > .ant-select-selection-item').click();
        cy.get(':nth-child(2) > :nth-child(1) > .ant-picker > .ant-picker-input > input').click();
        cy.get('.ant-picker-now-btn').click();
        cy.get('.schedule-evalutaion-button').click();

        cy.get('[style="color: grey; font-family: Roboto; font-style: normal; font-weight: 400; font-size: 16px;"] > [style="font-size: 17px; margin-bottom: 20px;"]').click();

        cy.wait(5000)
        cy.get(':nth-child(1) > [style="text-align: center;"] > .anticon > svg > [d="M292.7 840h438.6l24.2-512h-487z"]').click();
        cy.get('.ant-popover-buttons > .ant-btn-primary > span').click();
        cy.wait(2000)
        cy.get(':nth-child(1) > :nth-child(2) > u > a').click();
        /* ==== Generated with Cypress Studio ==== */

        /* ==== End Cypress Studio ==== */
    })

    it('Load Report generator via search', () => {
        const url = Cypress.config().baseUrl
        cy.log('Opening a report template')
        cy.visit(url + '/#/dashboard/report_designer')
        cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
        cy.get('.ant-tabs-nav-list > :nth-child(2)').click();
        cy.intercept('GET', '**/report-load?report_displ_id=R391', { fixture: 'reportGenLoad.json' })
        cy.wait(1000)
        cy.get('.ant-input').clear();
        cy.get('.ant-input').type('R391{enter}');

        cy.get('.ant-table-row > :nth-child(1)').click();
        // cy.get('.ant-table-row > :nth-child(1) > div').click();
        cy.wait(5000)
        cy.get('.ant-table-row > :nth-child(2)').click();
        cy.get('.ant-input').clear()
        cy.get('.ant-input').type('key1')
    })
    it('Load Report Generator via tile ', () => {
        const url = Cypress.config().baseUrl
        cy.log('Opening a report template')
        cy.visit(url + '/#/dashboard/report_designer')
        cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
        cy.get('.ant-tabs-nav-list > :nth-child(2)').click();
        cy.intercept('GET', '**/report-load?report_displ_id=R391', { fixture: 'reportGenLoad.json' })
        cy.wait(1000)
        cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .tile > :nth-child(1) > .chart-tiles').click();
    })
    it("Close Modal", () => {
        const url = Cypress.config().baseUrl
        cy.log('Opening a report template')
        cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
        cy.visit(url + '/#/dashboard/report_designer')
        cy.get('.ant-tabs-nav-list > :nth-child(2)').click();
        cy.wait(1000)
        cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .create-new > .anticon > svg').click();
        cy.get('.ant-modal-close-x').click();
    });

    it("Create via Modal", () => {
        const url = Cypress.config().baseUrl
        cy.log('Opening a report template')
        cy.intercept('GET', '**/reports?rep_status=all', { fixture: 'reportAll.json' })
        cy.visit(url + '/#/dashboard/report_designer')
        cy.get('.ant-tabs-nav-list > :nth-child(2)').click();
        cy.wait(1000)
        cy.get('#rc-tabs-0-panel-Generate\\ Report\\ Variant > .create-new > .anticon > svg').click();
        cy.wait(500);
        cy.get(':nth-child(1) > .landing-tile').click()
        cy.wait(4000)
        cy.get('[style="background-color: rgb(9, 49, 133); color: white; border-radius: 4px; margin-left: 88%; margin-top: 70px;"] > span').click()

    });

});
