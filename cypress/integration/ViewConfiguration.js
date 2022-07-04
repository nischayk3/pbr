Cypress.Commands.add("multiselect", (options) => {
    options.forEach((option) => {
        cy.log(option)
        cy.get('.ant-select-item-option').contains(option).click()
    });
});


describe('Renders the view config page', () => {
    beforeEach(() => {
        cy.viewport(1280, 720)
        localStorage.setItem("test_enabled", true);
        localStorage.setItem("user", "bhanu.thareja@mareana.com");
        localStorage.setItem("username", "Bhanu");
        localStorage.setItem(
            "login_details",
            JSON.stringify({
                ad_role: false,
                email_id: "bhanu.thareja@mareana.com",
                firstname: "Bhanu",
                lastname: "Thareja",
                email_id: "bhanu.thareja@mareana.com",
                mdh_role: "USER",
                screen_set: "1000_USER",
                token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
            })
        );
    })

    it('Renders use roles and access correctly', () => {
        const url = Cypress.config().baseUrl
        // cy.log('Opening a report template')
        cy.visit(url + '/#/dashboard/workspace')
        // cy.visit('http://localhost:3030/#/dashboard/workspace')
        cy.wait(5000)
        cy.get('#user-roles-and-access > .ant-menu-title-content > a').click();
        cy.wait(1000)
    })

    it('Loads user configuration page correctly', () => {
        cy.intercept('GET', '/services/v1/user-config', { fixture: 'userConfig.json' }).as('userConfigGet')
        cy.log('Clicking on User Configuration')
        cy.contains('User Configuration').click()
        cy.wait('@userConfigGet').then(() => {
            cy.wait(500)
            cy.log('Adding new user')
            cy.get('#editable-table-button-add-new-user').click()

            cy.wait(250)
            cy.log('Editing editable text input')
            cy.get('.editable-cell-value-wrap').first().click()
            cy.get('.ant-form-item').clear()
            cy.get('.ant-form-item').type('NEW_USER')

            cy.wait(500)
            cy.log('Changing Role')
            cy.get('.ant-select-selector').first().click()
            cy.get('.ant-table-row').first().scrollIntoView()
            cy.get('.ant-select-item-option').first().click()

            cy.wait(500)
            cy.log('Changing Approvar Resource')
            cy.get('.ant-select-multiple').eq(0).click().multiselect(['AUDIT_REPORT', 'REPORT_DESIGNER', 'CHART'])

            cy.wait(500)
            cy.log('Changing Molecule')
            cy.get('.ant-select-multiple').eq(1).click().multiselect(['BELATACEPT'])

            cy.wait(500)
            cy.log('Changing Site')
            cy.get('.ant-select-multiple').eq(2).click().multiselect(['1680', '2024'])

            cy.log('Setting Approved to true')
            cy.get('.ant-switch').eq(0).click()

            cy.wait(250)
            cy.log('Setting Unapproved to false')
            cy.get('.ant-switch').eq(1).click()

            cy.wait(250)
            cy.log('Setting Lock User to true')
            cy.get('.ant-switch').eq(2).click()
            cy.get('.ant-table-row').first().scrollIntoView({ offset: { top: -5, left: 0 } })

            cy.intercept('PUT', '/services/v1/user-config', { fixture: 'configSuccess.json' }).as('userConfigPut')
            cy.log('Saving user')
            cy.get('#editable-table-button-save').click()
            cy.wait('@userConfigPut').then(() => {
                cy.wait(2000)
                cy.log('Selecting all users for deletion')
                cy.get('.ant-checkbox-input').eq(0).click()

                cy.wait(500)
                cy.log('Unselecting all users')
                cy.get('.ant-checkbox-input').eq(0).click()

                cy.wait(1000)
                cy.log('Selecting first user for deletion')
                cy.get('.ant-checkbox-input').eq(1).click()

                cy.wait(500)
                cy.log('Clicking on delete button to show confirmation modal')
                cy.get('#editable-table-button-delete').click()

                cy.wait(500)
                cy.log('Clicking on cancel')
                cy.get('#editable-modal-button-cancel').click()

                cy.wait(1000)
                cy.log('Clicking on delete button to show confirmation modal')
                cy.get('#editable-table-button-delete').click()

                cy.intercept('DELETE', '/services/v1/user-config', { fixture: 'configSuccess.json' }).as('userConfigDel')
                cy.log('Deleting the user')
                cy.get('#editable-modal-button-delete').click()
                cy.wait('@userConfigDel').then(() => {
                    cy.wait(1000)
                    cy.go('back')
                })

            })
        })
    })

    it('Loads roles and access page correctly', () => {
        cy.intercept('GET', '/services/v1/role-config', { fixture: 'rolesConfig.json' }).as('roleConfigGet')
        cy.log('Clicking on Roles And Access')
        cy.contains('Roles And Access').click()
        cy.wait('@roleConfigGet').then(() => {
            cy.wait(500)
            cy.log('Adding new user')
            cy.get('#editable-table-button-add-new-user').click()

            cy.wait(250)
            cy.log('Editing editable text input')
            cy.get('.editable-cell-value-wrap').first().click()
            cy.get('.ant-form-item').clear()
            cy.get('.ant-form-item').type('NEW_USER')

            cy.wait(500)
            cy.log('Changing Resources')
            cy.get('.ant-select-multiple').eq(0).click().multiselect(['VIEW', 'CHART', 'GENEALOGY', 'DASHBOARD'])

            cy.wait(500)
            cy.log('Changing Visibility')
            cy.get('.ant-select-multiple').eq(1).click().multiselect(['OWN', 'APRD'])

            cy.wait(500)
            cy.log('Changing Access')
            cy.get('.ant-select-multiple').eq(2).click().multiselect(['READ'])
            cy.get('.ant-table-row').first().scrollIntoView({ offset: { top: -5, left: 0 } })

            cy.intercept('PUT', '/services/v1/role-config', { fixture: 'configSuccess.json' }).as('roleConfigPut')
            cy.log('Saving user')
            cy.get('#editable-table-button-save').click()
            cy.wait('@roleConfigPut').then(() => {
                cy.wait(1000)
                cy.go('back')
            })
        })
    })

    it('Loads screen controls page correctly', () => {
        cy.log('Clicking on Screen Controls')
        cy.contains('Application Controls').click()
        cy.url().should('include', '/application-controls')
        cy.wait(2000)


        cy.log('Opening first panel')
        cy.get('.ant-collapse-item').eq(0).click()

        cy.wait(500)
        cy.log('Closing first panel')
        cy.get('.ant-collapse-item').eq(0).click()

        cy.wait(500)
        cy.log('Opening second panel')
        cy.get('.ant-collapse-item').eq(1).click()

        cy.wait(500)
        cy.log('Opening third panel')
        cy.get('.ant-collapse-item').eq(2).click()

        cy.wait(500)
        cy.log('Deleting third panel')
        cy.get('.anticon-delete').eq(2).click()

        cy.wait(500)
        cy.log('Opening first panel')
        cy.get('.ant-collapse-item').eq(0).click()

        cy.wait(500)
        cy.log('Adding control')
        cy.get('.ant-btn-dashed').first().click()

        cy.wait(500)
        cy.log('Adding control')
        cy.get('.ant-btn-dashed').first().click()

        cy.wait(500)
        cy.log('Changing Application Control')
        cy.get('.ant-select-multiple').eq(0).click().multiselect(['Screen A', 'Screen B'])

        cy.wait(500)
        cy.log('Changing Widget Control')
        cy.get('.ant-select-multiple').eq(1).click().multiselect(['Widget D', 'Widget E'])

        cy.wait(500)
        cy.log('Deleting first control')
        cy.get('.anticon-delete').eq(3).click()

        cy.wait(500)
        cy.log('Deleting last control')
        cy.get('.anticon-delete').eq(2).click()

        cy.wait(1000)
        cy.go('back')
    })
})
