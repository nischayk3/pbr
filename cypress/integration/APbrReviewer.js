Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('PBR', () => {
	// it("should login successfully using Ad", () => {
	beforeEach(() => {
		//  cy.intercept({ method: 'POST', url: '/pbr/udh/get_cpv_pbr_count', times: 1 }, (req) => {
		//     req.reply({
		//         delay: 1000,
		//         fixture: 'pbrStatusCount.json'
		//     });
		// }).as("statusCount")
		// cy.intercept({ method: 'POST', url: '/pbr/udh/get_cpv_pbr_count', times: 1 }, (req) => {
		//     req.reply({
		//         delay: 1000,
		//         fixture: 'pbrConfidenceCount.json'
		//     });
		// }).as("cofidenceCount")
		cy.intercept('POST', '/pbr/udh/get_cpv_pbr_count', { fixture: 'pbrStatusCount.json' }).as("statusCount")
		//cy.intercept('POST', '/pbr/udh/get_cpv_pbr_count', { fixture: 'pbrConfidenceCount.json' }).as("cofidenceCount")
		cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' }).as("get_cpv_pbr")
		// cy.intercept('GET', '/pbr/udh/get_cpv_pbr?id=27', { fixture: 'pbrUpdate' })
		// cy.intercept('GET', '/pbr/udh/get_cpv_pbr_count?key=status', { fixture: 'pbrStatusCount' })
		// cy.intercept('GET', '/pbr/udh/get_cpv_pbr_count?key=confidence', { fixture: 'pbrConfidenceCount' })
		cy.intercept('GET', '/pbr/udh/get_tran_pbr_template_id', { fixture: 'pbrTemplateList' })
		cy.viewport(1366, 768);
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

	it("PBR", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/pbr_reviewer')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/pbr_reviewer')
		cy.wait(6000);


	});
	it("Search Table", () => {

		cy.get('.ant-col-16 > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-affix-wrapper').type('1');
		cy.get('.ant-col-16 > .ant-input-group-wrapper > .ant-input-wrapper > .ant-input-group-addon > .ant-btn').click({ force: true });

	})
	// it("Select checkbox", () => {
	//     cy.get('.ant-checkbox-input').eq(1).click({ force: true })
	// })
	// it("Status chart", () => {
	//     cy.get(".slicetext").eq(1).click({ force: true })
	//     cy.wait(6000);
	//     cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' })
	//     cy.intercept('POST', '**/get_cpv_pbr', { fixture: 'pbr_review.json' })
	//     cy.get(".status-approved").click({ force: true })
	//     cy.wait(6000);
	//     cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbr_review.json' })
	//     cy.intercept('POST', '**/get_cpv_pbr', { fixture: 'pbr_review.json' })
	// })


	it("Navigate to reviewer", () => {
		const url = Cypress.config().baseUrl
		cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbrUpdate' })
		cy.visit(url + '/#/dashboard/pbr_update?id=185')
		cy.wait(10000);

	})

	// it("Edit fields", () => {
	//     cy.wait(6000);
	//     cy.get(':nth-child(4) > :nth-child(2) > .editable-cell-value-wrap').click({ force: true })
	//     cy.get('#value').type("claimss")


	// })
	it("Save and Audit logs", () => {
		cy.wait(1000);
		cy.get("#save_button").click({ force: true })
		cy.wait(6000);
		cy.intercept('POST', '/pbr/udh/get_cpv_pbr', { fixture: 'pbrUpdate' })
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
// 		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
// 		localStorage.setItem("username", "Dinesh");
// 		localStorage.setItem("loginwith", "WITH_AD");
// 		localStorage.setItem(
// 			"login_details", JSON.stringify({
// 				ad_role: false,
// 				email_id: "dinesh.jinjala@mareana.com",
// 				firstname: "Dinesh",
// 				lastname: "Jinjala",
// 				mdh_role: "USER",
// 				screen_set: "1000_USER",
// 				token:
// 					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
// 			})
// 		);
// 		cy.intercept('POST', '/pbr/udh/project_filter_search', { fixture: 'pbrFileUpload.json' })
// 	});

// 	beforeEach(() => {
// 		localStorage.setItem("username", "Dinesh");
// 		localStorage.setItem("test_enabled", true);
// 		localStorage.setItem("user", "dinesh.jinjala@mareana.com");
// 		localStorage.setItem("loginwith", "WITH_AD");
// 		localStorage.setItem(
// 			"login_details", JSON.stringify({
// 				ad_role: false,
// 				email_id: "dinesh.jinjala@mareana.com",
// 				firstname: "Dinesh",
// 				lastname: "Jinjala",
// 				mdh_role: "USER",
// 				screen_set: "1000_USER",
// 				token:
// 					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6Ik1paGlyICBCYWdnYSIsInVuaXhfdGltZXN0YW1wIjoxNjUwNDIyMDcyLjgzNTg5MSwidGltZXN0YW1wIjoiMjAvMDQvMjAyMiAwODowNDozMiIsImV4cCI6NDgwNDA0MTg3MiwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjoiVVNFUiIsImVtYWlsX2lkIjoibWloaXIuYmFnZ2FAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.NpmhWhMBWtRcDkSBDdw-94Kqy9vuZyY1PSHbOpTyzMM"
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