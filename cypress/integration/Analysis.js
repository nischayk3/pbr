Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});
describe('Analysis', () => {
    beforeEach(() => {
        localStorage.setItem("test_enabled", true);
        localStorage.setItem("user", "fahad.siddiqui@mareana.com");
        localStorage.setItem(
            "login_details",
            JSON.stringify({
                ad_role: false,
                email_id: "fahad.siddiqui@mareana.com",
                firstname: "Fahad",
                lastname: "siddiqui",
                mdh_role: "USER",
                screen_set: "1000_USER",
                token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
            })
        );
        cy.intercept('GET', '**/pipeline-list', { fixture: 'analysisLanding.json' })
        cy.intercept('GET', '**/views-list?vew_status=APRD', { fixture: 'analysisViewList.json' })
        cy.intercept('GET', '**/chart-object', { fixture: 'analysisChartObjLanding.json' })
        cy.intercept('GET', '**/site_ids?view_id=V238', { fixture: 'analysisSite.json' })


    })

    it("Visit Analysis Landing Page", () => {
        cy.log('Visit Landing page')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/analysis')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/analysis')
    })

    it("Create New Pipeline", () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/analysis')

        cy.log('Creating New Pipeline')
        cy.get('.create-new').click({ force: true })

        cy.log('Enter name of pipeline')
        cy.get('.input_field > .ant-input').click()

        cy.log('Type in Landing page')
        cy.get('.input_field > .ant-input').type('new_pipeline', { force: true })

        cy.log('Select View')
        cy.get('.ant-input-wrapper > .ant-input').click({ force: true })
        cy.get('p > .anticon > svg').click({ force: true })

        cy.log('Search View')
        cy.get('.header-title > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input').click({ force: true })
        cy.get('.header-title > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input').type('v238{enter}', { force: true })
        cy.get('.ant-table-row > :nth-child(1)').click({ force: true })

        cy.log('Click Ok')
        cy.get('.custom-secondary-btn').click({ force: true })

        cy.log('Select Version')
        cy.get('.ant-select-selector').click({ force: true })

        cy.log('Click Next')
        cy.get('.button-mt > .ant-btn').click({ force: true })

        cy.log('Site Select')
        cy.get('#rc_select_2').click({ force: true });
        cy.get('.ant-select-item-option-content').click({ force: true });

        cy.log('Switch and date range')
        cy.get('.ant-switch').click({ force: true })
        cy.get('.ant-picker').click({ force: true })
        cy.get('.ant-picker-cell-today > .ant-picker-cell-inner').click({ force: true });
        cy.get('.button-gap > .custom-secondary-btn').click({ force: true })


    })

    it("Search in Analysis Landing Page", () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/analysis')

        cy.log('Search in Landing page')
        cy.get('.ant-input').click({ force: true })

        cy.log('Type in Landing page')
        cy.get('.ant-input').type('P6{enter}', { force: true })

        cy.log('Click on the created pipeline')
        cy.get('.ant-table-row > :nth-child(1)').click({ force: true })

    })
});