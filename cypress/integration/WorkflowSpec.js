Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

const resizeObserverLoopErrRe = /^[^(ResizeObserver loop limit exceeded)]/
Cypress.on('uncaught:exception', (err) => {
	/* returning false here prevents Cypress from failing the test */
	if (resizeObserverLoopErrRe.test(err.message)) {
		return false
	}
})

describe("Render Workflow", () => {
	afterEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })

	});

	beforeEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
	});

	it("visiting workflow screen", () => {
		cy.wait(5000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow?apptype=CHART&active=Chart%20Personalization&count=2')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow?apptype=CHART&active=Chart%20Personalization&count=2')
	});

	it("visit recently approved", () => {
		cy.wait(2000)
		cy.log('click on recent approved')
		cy.get('#rc-tabs-0-tab-2').click()
	});
})

describe("Workflow Auto ML Analysis", () => {
	afterEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
	});

	it("visiting workflow screen", () => {
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
	});

	it("Check Unapproved Data", () => {
		cy.log('click on first card')
		cy.get('#approval-cards-0 > .card_desc').click()

		cy.wait(2000)
		cy.get('.table-head').should('have.text', 'Auto ML Analysis')

		cy.wait(500)
		cy.log("Click on Review Submission")
		cy.get('#review_submit_0').click()
	})
});

describe("Workflow e-Log Book", () => {
	afterEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
	});

	it("visiting workflow screen", () => {
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
	});

	it("Check Unapproved Data", () => {
		cy.log('click on first card')
		cy.get('#approval-cards-3 > .card_desc').click()

		cy.wait(2000)
		cy.get('.table-head').should('have.text', 'e-Log Book')

		cy.wait(500)
		cy.log("Click on Review Submission")
		cy.get('#review_submit_0').click()
	})
});

describe("Workflow Paper Batch Records", () => {
	afterEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/PBR/awaiting_approval', { fixture: 'pbr-awaiting-approval.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/PBR/awaiting_approval', { fixture: 'pbr-awaiting-approval.json' })
	});

	it("visiting workflow screen", () => {
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
	});



	it("Check Unapproved Data", () => {
		cy.log('click on first card')
		cy.get('#approval-cards-4 > .card_desc').click()

		cy.wait(2000)
		cy.get('.table-head').should('have.text', 'Paper Batch Records')

		cy.wait(500)
		cy.log("Click on Review Submission")
		cy.get('#review_submit_0').click()
	})
});

describe("Workflow Report", () => {
	afterEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/REPORT/awaiting_approval', { fixture: 'report-awaiting-approval.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/REPORT/awaiting_approval', { fixture: 'report-awaiting-approval.json' })
	});

	it("visiting workflow screen", () => {
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
	});

	it("Check Unapproved Data", () => {
		cy.log('click on first card')
		cy.get('#approval-cards-5 > .card_desc').click()

		cy.wait(2000)
		cy.get('.table-head').should('have.text', 'Report')

		cy.wait(500)
		cy.log("Click on Review Submission")
		cy.get('#review_submit_0').click()
	})
});

describe("Workflow View", () => {
	afterEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/VIEW/awaiting_approval', { fixture: 'view-awaiting-approval.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/VIEW/awaiting_approval', { fixture: 'view-awaiting-approval.json' })
	});

	it("visiting workflow screen", () => {
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
	});



	it("Check Unapproved Data", () => {
		cy.log('click on first card')
		cy.get('#approval-cards-6 > .card_desc').click()

		cy.wait(2000)
		cy.get('.table-head').should('have.text', 'View')

		cy.wait(500)
		cy.log("Click on Review Submission")
		cy.get('#review_submit_0').click()
	})
});

// describe("Workflow Param Data Approval", () => {
// 	afterEach(() => {
// 		cy.viewport(1280, 920)
// 		cy.loginWithoutAD()
// 		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
// 		cy.intercept('GET', 'services/v1/unapproved-param?limit=10', { fixture: 'unapproved-param.json' })
// 	});

// 	beforeEach(() => {
// 		cy.viewport(1280, 920)
// 		cy.loginWithoutAD()
// 		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
// 		cy.intercept('GET', 'services/v1/unapproved-param?limit=10', { fixture: 'unapproved-param.json' })
// 	});

// 	it("visiting workflow screen", () => {
// 		const url = Cypress.config().baseUrl
// 		cy.visit(url + '/#/dashboard/workflow')
// 		cy.log('Load Landing Page')
// 		cy.url().should('eq', url + '/#/dashboard/workflow')
// 	});

// 	it("Check Unapproved Data", () => {
// 		cy.log('click on first card')
// 		cy.get('#approval-cards-7 > .card_desc').click()

// 		cy.wait(2000)
// 		cy.get('.table-head').should('have.text', 'Param Data Approval')

// 		cy.wait(500)
// 		cy.log("Click on Review Submission")
// 		cy.get('#review_submit_0').click()
// 	})
// });

describe("Workflow Chart Personalization", () => {
	afterEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.intercept('GET', '**/token', (req) => {
			req.reply({
				statusCode: 200, // default
				fixture: 'esignLogin.json'
			})
		})
	});

	beforeEach(() => {
		cy.viewport(1280, 920)
		cy.loginWithoutAD()
		cy.intercept('GET', '**/workflow-count', { fixture: 'workflow-count.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/recently_approval', { fixture: 'recently-approved.json' })
		cy.intercept('GET', 'services/v1/approvals/CHART/awaiting_approval', { fixture: 'awaiting-approval.json' })
		cy.intercept('GET', '**/token', (req) => {
			req.reply({
				statusCode: 200, // default
				fixture: 'esignLogin.json'
			})
		})
	});

	it("visiting workflow screen", () => {
		cy.wait(2000)
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/workflow')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/workflow')
	});

	it("Count workflow screen for approvals", () => {
		cy.log('Verfiy Workflow Tab Length')
		cy.get('.approve-wrapper')
			.children()
			.should('have.length', 8)

		cy.log('Verfiy Workflow Tab Name')
		cy.get('#approval-cards-0 > .card_desc > .approve-desc').should("have.text", 'Auto ML Analysis')
		cy.get('#approval-cards-1 > .card_desc > .approve-desc').should("have.text", 'Chart Personalization')
		cy.get('#approval-cards-2 > .card_desc > .approve-desc').should("have.text", 'Data Load Screen')
		cy.get('#approval-cards-3 > .card_desc > .approve-desc').should("have.text", 'e-Log Book')
		cy.get('#approval-cards-4 > .card_desc > .approve-desc').should("have.text", 'Paper Batch Records')
		cy.get('#approval-cards-5 > .card_desc > .approve-desc').should("have.text", 'Report')
		cy.get('#approval-cards-6 > .card_desc > .approve-desc').should("have.text", 'View')
		cy.get('#approval-cards-7 > .card_desc > .approve-desc').should("have.text", 'Param Data Approval')
	})

	it("Check Unapproved Data", () => {
		cy.log('click on first card')
		cy.get('#approval-cards-1 > .card_desc').click()

		cy.wait(2000)
		cy.get('.table-head').should('have.text', 'Chart Personalization')

		cy.wait(500)
		cy.get('#rc-tabs-0-tab-1').should('have.text', 'Awaiting Approval')

		cy.wait(500)
		cy.get('#rc-tabs-0-tab-2').should('have.text', 'Recently Approved')

		cy.wait(500)
		cy.log("Click on Review Submission")
		cy.get('#review_submit_0').click()

		cy.wait(2000)
		cy.log("Click on Approve Chart")
		cy.get('#approve_chart > span').click()

		cy.wait(500)
		cy.log("Enter Password")
		cy.get('#password').type('Dkit@2023')

		cy.get('#auth_without_ad').click()

		cy.wait(1000)
		cy.log("Selct Esign Reason")
		cy.get('.ant-select-selector').click()
		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })

		cy.wait(500)
		cy.log('Click on Confirm')
		cy.get('#confirm').click()
	})

	it('Filter table data', () => {
		cy.wait(2000)
		cy.log('Click on search Icon in Table')
		cy.get(':nth-child(2) > .ant-table-filter-column > .ant-dropdown-trigger > #filter_icon > svg').click()

		cy.wait(2000)
		cy.log('Click on search Button')
		cy.get('#table_search_input').type('102')
		cy.get('#search_data').click()

		cy.wait(2000)
		cy.get(':nth-child(2) > .ant-table-filter-column > .ant-dropdown-trigger > #filter_icon > svg').click()
		cy.log('Click on Reset Button')
		cy.get('#reset_data').click()

		cy.wait(2000)
		cy.log('Click on Filter Button')
		cy.get('#filter_data').click()

	})
});