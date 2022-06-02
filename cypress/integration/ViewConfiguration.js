describe('renders the view config page', () => {
    it('renders use roles and access correctly', () => {
        cy.visit('https://bms-cpvdev.mareana.com/#/dashboard/user-roles-and-access')
    })
})

describe('renders user config page', () => {
    it('renders user configuration correctly', () => {
        cy.visit('https://bms-cpvdev.mareana.com/#/dashboard/user-roles-and-access/user-configuration')
    })
})