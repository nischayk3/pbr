Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('DocumentCentral', () => {
    afterEach(() => {
        cy.loginWithAD()
    });
    beforeEach(() => {
		cy.viewport(1366, 768);
		cy.loginWithAD()
		cy.intercept('GET', '**/pbr/udh/upload-gngl-data?limit=8&page_index=1', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbrDocumentCentralLanding.json'
			})
		}).as("pbrDocumentCentralLanding")
        cy.intercept('GET', '**/pbr/udh/upload-gngl-data?file_id=400', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbrDocView.json'
			})
		}).as("pbrDocView")
		// cy.intercept('GET', '**/pbr/udh/get_data_view?actionType=get_product_num&productNum=', (req) => {
		// 	req.reply({
		// 		["status-code"]: 200, fixture: 'productNum.json'
		// 	})
		// }).as("get_product_num")
		
	})
    it("loadLandingPage", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/pbr-pdf-viewer')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/pbr-pdf-viewer')
		cy.log('Load Landing Page')
        cy.wait(6000)
	})
    it("SearchPdf", () => {
		cy.get('.ant-input-affix-wrapper').type('poc');
        cy.get('.ant-input-group-addon > .ant-btn').click({ force: true });
        cy.intercept('GET', '**/pbr/udh/upload-gngl-data?search_text=poc&limit=8&page_index=1', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbrDocumentCentralLanding.json'
			})
		}).as("pbrDocumentCentralLanding")
	})
    it("clickViewDetails", () => {
        cy.wait(6000)
        const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/pbr-pdf-viewer/400')
	})
});