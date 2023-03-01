Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('PBR', () => {

	beforeEach(() => {

		// cy.intercept('POST', '/pbr/udh/get_cpv_pbr_count', { fixture: 'pbrStatusCount.json' }).as("statusCount")
		// cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' }).as("get_cpv_pbr")
		// cy.intercept('GET', '/pbr/udh/get_tran_pbr_template_id', { fixture: 'pbrTemplateList' })
		// cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbrUpdate' })
		//cy.intercept('POST', '/pbr/udh/get_cpv_pbr_count', { fixture: 'pbrConfidenceCount.json' }).as("cofidenceCount")

		// cy.intercept('GET', '/pbr/udh/get_cpv_pbr?id=27', { fixture: 'pbrUpdate' })
		// cy.intercept('GET', '/pbr/udh/get_cpv_pbr_count?key=status', { fixture: 'pbrStatusCount' })
		// cy.intercept('GET', '/pbr/udh/get_cpv_pbr_count?key=confidence', { fixture: 'pbrConfidenceCount' })

		cy.intercept('POST', '**/pbr/udh/get_cpv_pbr_count', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbrStatusCount.json'
			})
		}).as("statusCount")
		cy.intercept('POST', '**/pbr/udh/get_cpv_pbr', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbr_review.json'
			})
		}).as("get_cpv_pbr")
		cy.intercept('GET', '**/pbr/udh/get_tran_pbr_template_id', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbrTemplateList.json'
			})
		}).as("pbrTemplateList")

		cy.viewport(1366, 768);
		cy.loginWithAD()
	})

	it("PBR", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/pbr_reviewer')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/pbr_reviewer')
		cy.wait(6000);
	});

	it("Search Table", () => {
		cy.get('.ant-input-affix-wrapper').type('1');
		cy.get('.ant-input-group-addon > .ant-btn').click({ force: true });
	})

	it("Navigate to reviewer", () => {
		const url = Cypress.config().baseUrl
		cy.intercept('POST', '**/pbr/udh/get_cpv_pbr', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbrUpdate.json'
			})
		}).as("pbrUpdate")
		cy.visit(url + '/#/dashboard/pbr_update?id=185')
		cy.wait(10000);
	})

	it("Save and Audit logs", () => {
		cy.wait(1000);
		cy.get("#save_button").click({ force: true })
		cy.wait(6000);
		cy.intercept('POST', '**/pbr/udh/get_cpv_pbr', (req) => {
			req.reply({
				["status-code"]: 200, fixture: 'pbrUpdate.json'
			})
		}).as("pbrUpdate")
		cy.get("#editLogs > a").click({ force: true })
	})

	// it("Confidence chart", () => {
	//     cy.get(".slice").eq(2).click({ force: true })
	//     cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' })
	//     cy.wait(6000);
	//     cy.get(".status-confi").click({ force: true })

	//     cy.wait(6000);
	// })

	// it("Click Approve", () => {
	//     cy.get('#pbr-approve').click({ force: true })
	//     cy.wait(1000);
	//     cy.get('.ant-modal-close-x > .anticon > svg').click({ force: true })
	// })

});


//pbr file upload

// Cypress.on("uncaught:exception", (err, runnable) => {
// 	return false;
// });
// describe("PbrFileUpload", () => {
// 	afterEach(() => {
// 		localStorage.setItem("test_enabled", true);
// 		localStorage.setItem("user", "dinesh.kumar@mareana.com ");
// 		localStorage.setItem("username", "Dinesh");
// 		localStorage.setItem("loginwith", "WITH_AD");
// 		localStorage.setItem(
// 			"login_details", JSON.stringify({
// 				ad_role: false,
// 				email_id: "dinesh.kumar@mareana.com ",
// 				firstname: "Dinesh",
// 				lastname: "Kumar",
// 				mdh_role: "USER",
// 				screen_set: "1000_USER",
// 				token:
// 					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkRpbmVzaCAgSmluamFsYSIsInVuaXhfdGltZXN0YW1wIjoxNjc3MDU2NzE1LjY0MTg5MywidGltZXN0YW1wIjoiMjIvMDIvMjAyMyAwOTowNToxNSIsImV4cCI6MzMyMTMwNTY3MTUsImFkX3JvbGUiOmZhbHNlLCJtZGhfcm9sZSI6IlNZU1RFTV9BRE1JTiIsImVtYWlsX2lkIjoiZGluZXNoLmppbmphbGFAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.j5ZwCYeiIBFHregUuKeA_MLfGZ7U0_qBCBkwsUWnKOk"
// 			})
// 		);
// 		cy.intercept('POST', '/pbr/udh/project_filter_search', { fixture: 'pbrFileUpload.json' })
// 	});

// 	beforeEach(() => {
// 		localStorage.setItem("username", "Dinesh");
// 		localStorage.setItem("test_enabled", true);
// 		localStorage.setItem("user", "dinesh.kumar@mareana.com ");
// 		localStorage.setItem("loginwith", "WITH_AD");
// 		localStorage.setItem(
// 			"login_details", JSON.stringify({
// 				ad_role: false,
// 				email_id: "dinesh.kumar@mareana.com ",
// 				firstname: "Dinesh",
// 				lastname: "Kumar",
// 				mdh_role: "USER",
// 				screen_set: "1000_USER",
// 				token:
// 					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkRpbmVzaCAgSmluamFsYSIsInVuaXhfdGltZXN0YW1wIjoxNjc3MDU2NzE1LjY0MTg5MywidGltZXN0YW1wIjoiMjIvMDIvMjAyMyAwOTowNToxNSIsImV4cCI6MzMyMTMwNTY3MTUsImFkX3JvbGUiOmZhbHNlLCJtZGhfcm9sZSI6IlNZU1RFTV9BRE1JTiIsImVtYWlsX2lkIjoiZGluZXNoLmppbmphbGFAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.j5ZwCYeiIBFHregUuKeA_MLfGZ7U0_qBCBkwsUWnKOk"
// 			})
// 		);
// 		cy.intercept('POST', '/pbr/udh/project_filter_search', { fixture: 'pbrFileUpload.json' })
// 	})

// 	it("Render Upload screen", () => {
// 		const url = Cypress.config().baseUrl
// 		cy.visit(url + '/#/dashboard/pbr_file_upload')
// 		cy.log('Load Landing Page')
// 		cy.url().should('eq', url + '/#/dashboard/pbr_file_upload')
// 	});

// 	it("Select Project", () => {
// 		cy.wait(4000)
// 		cy.get('#projectDropdown').click({ force: true })
// 		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })
// 	});

// 	it("Select Group", () => {
// 		cy.wait(4000)
// 		cy.get('#groupDropdown').click({ force: true })
// 		cy.get(".ant-select-item-option-content").eq(9).click({ force: true })
// 		cy.wait(4000)
// 	});

// 	it("Select Sub-Group", () => {
// 		cy.wait(4000)
// 		cy.get('#subGroupDropdown').click({ force: true })
// 		cy.get(".ant-select-item-option-content").eq(11).click({ force: true })
// 		cy.wait(4000)
// 	});

// 	it("Click Upload", () => {
// 		cy.get('#uploadPDf').click({ force: true })
// 		cy.wait(4000)
// 		cy.get('.ant-modal-close-x > .anticon > svg > path').click({ force: true })
// 	});
// })