Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe("Sharing", () => {
	afterEach(() => {
		cy.viewport(1280, 720)
		localStorage.setItem("loginwith", "WITH_AD");
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
		cy.intercept('GET', '**/last-views-and-charts?limit=8', { fixture: 'approvedChart.json' })
	});

	beforeEach(() => {
		cy.viewport(1280, 720)
		localStorage.setItem("loginwith", "WITH_AD");
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
		cy.intercept('GET', '**/last-views-and-charts?limit=8', { fixture: 'approvedChart.json' })
	});

	it('Load Chart Landing page Correctly', () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/chart_personalization')

		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/chart_personalization')

		cy.wait(2000)
		cy.log('Open Approved Chart')
		cy.get('[href="#/dashboard/chart_personalization/C615&1"] > .ant-col > .chart-tiles').click()
	})

	it('Share Email', () => {
		cy.wait(5000)
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.wait(5000)
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
		cy.get('.ant-modal-close-x').click({ force: true })
	})

	it('Clear all added emails', () => {
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
		cy.get('.ant-modal-close-x').click({ force: true })
	})


	it('Copy Link', () => {
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.get('.copy > .ant-btn > span').click({ force: true });
		cy.get('.ant-modal-close-x').click({ force: true })
	})

	it('Share Created Chart', () => {
		cy.get('.btns > div > :nth-child(1) > span').click({ force: true });
		cy.get('.recepients-input > .ant-select > .ant-select-selector').click({ force: true });
		cy.get('[title="dinesh@mareana.com"] > .ant-select-item-option-content').click({ multiple: true })
		cy.get('.ant-modal-body').click({ force: true });
		cy.wait(2000)
		cy.get('.ant-modal-body > :nth-child(1) > .ant-btn > span').click({ force: true });
		cy.get('.ant-modal-close-x').click({ force: true })
	})
});
