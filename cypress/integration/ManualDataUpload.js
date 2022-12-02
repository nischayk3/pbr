Cypress.on('uncaught:exception', (err, runnable) => {
	return false;
});

describe('Manual data upload', () => {
	afterEach(() => {

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
	});

	beforeEach(() => {
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
	});


	it("visiting Manual data upload screen", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/manual_data_upload')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/manual_data_upload')
	});
	it("download template", () => {
		cy.get('.ant-btn > a').click();
		cy.get('.ant-btn-primary > :nth-child(1)').click();
	});
	it("Un authorized user check", () => {
		cy.wait(3000)
		cy.log("Un Authorized user")
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypress_manual_duplicate_no_approved_and_approved_data.xlsx' }, { force: true })
		cy.get('.ant-alert-close-icon').click()
	});

	it("duplicate approved records", () => {
		cy.log("duplicate approved records")
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(3000)
	});

	it("Cancel uploaded files", () => {
		cy.log("Cancel upload file")
		cy.get('.ant-btn-ghost').click()
	});

	it("load duplicate records", () => {
		cy.wait(3000)
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(1000)
	});

	it("Continue to digital signature", () => {
		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(10000)
		cy.get('.ant-btn-primary').eq(1).click();
	});

	it("open digital signature popup", () => {
		cy.wait(10000)
		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(0).click()
	})

	it("Close digital signature popup", () => {
		cy.log("close signature modal")
		cy.get('.ant-modal-close').click()
	});

	it("Reopen digital signature popup", () => {
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()
	});

	if (localStorage.getItem("loginwith") != 'WITH_AD')
		it("Reopen digital signature popup", () => {
			cy.wait(2000)
			cy.get('.ant-space-item').eq(0).click()

			cy.wait(2000)
		});
	if (localStorage.getItem("loginwith") == 'WITH_AD')

		it("digital signature modal without ad input", () => {
			// cy.get(':nth-child(1) > .ant-input').clear();
			// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
			cy.get(':nth-child(2) > .ant-input').clear();
			cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
			cy.get('.signature-modal > #auth_with_ad').click();
			cy.wait(3000)
		});

	it("select reason for Ad signature", () => {
		cy.log("selecting reason")
		cy.get('.ant-select-selection-item').click({ force: true });
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(1).click();
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(2).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(6000)
	})

	it("Final approved data API check", () => {
		cy.log("replicating final approved data api")
		cy.reload()
		cy.wait(3000)
		cy.log("load duplicate approved records again")
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(1000)


		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(7000)
		cy.get('.ant-btn-primary').eq(1).click();

		cy.wait(7000)
		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(0).click()

		cy.log("close signature modal")
		cy.get('.ant-modal-close').click()

		cy.log("click on digital signature button")
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()


		cy.log("digital signature modal input")
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
		cy.get('.signature-modal > #auth_with_ad').click();
		cy.wait(2000)

		cy.log("selecting reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(5000)

		cy.get("#nextButton").click()
		cy.log("click on digital signature button")
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()
		cy.log("digital signature modal input")
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
		cy.get('.signature-modal > #auth_with_ad').click();
		cy.wait(3000)

		cy.log("selecting reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(6000)
	});

	it("Internal server error check for upload data", () => {
		cy.log("replicating final approved data api")
		cy.reload()
		cy.wait(3000)
		cy.intercept(
			{
				method: 'POST',
				url: 'services/v1/final-upload',

			},
			"Internal Server Error"
		).as('cancel file-upload')
		cy.log("load duplicate approved records again")
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(1000)


		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(7000)
		cy.get('.ant-btn-primary').eq(1).click();

		cy.wait(7000)
		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(0).click()

		cy.log("close signature modal")
		cy.get('.ant-modal-close').click()

		cy.log("click on digital signature button")
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()


		cy.log("digital signature modal input")
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
		cy.get('.signature-modal > #auth_with_ad').click();
		cy.wait(2000)

		cy.log("selecting reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(7000)

		cy.get("#nextButton").click()
		cy.log("click on digital signature button")
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()
		cy.log("digital signature modal input")
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
		cy.get('.signature-modal > #auth_with_ad').click();
		cy.wait(2000)

		cy.log("selecting reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(6000)

	})


	it("final approved data api status 400", () => {
		cy.log("replicating final approved data api")
		cy.reload()
		cy.wait(3000)
		cy.intercept(
			{
				method: 'POST',
				url: 'services/v1/final-upload',
			},
			{
				data: {
					statuscode: 400
				}
			}
		).as('cancel file-upload')
		cy.log("load duplicate approved records again")
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(1000)


		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(7000)
		cy.get('.ant-btn-primary').eq(1).click();

		cy.wait(7000)
		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(0).click()

		cy.log("close signature modal")
		cy.get('.ant-modal-close').click()

		cy.log("click on digital signature button")
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()


		cy.log("digital signature modal input")
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
		cy.get('.signature-modal > #auth_with_ad').click();
		cy.wait(3000)

		cy.log("selecting reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(7000)

		cy.get("#nextButton").click()
		cy.log("click on digital signature button")
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()
		cy.log("digital signature modal input")
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
		cy.get('.signature-modal > #auth_with_ad').click();
		cy.wait(2000)

		cy.log("selecting reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(6000)
	});

	it("Api check", () => {
		cy.log("cancel digital signature")
		cy.reload()
		cy.wait(3000)
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.wait(3000)
		cy.log("load duplicate approved records again")
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(7000)
		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(3000)
		cy.get('.ant-btn-primary').eq(1).click();


		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(1).click()

		cy.log("close signature modal")
		cy.get('.ant-modal-close').click()

		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(1).click()


		cy.log("selecting cancel reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(1).click();
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(2).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(6000)


		cy.log("cancel digital signature with internalserver error")

		cy.reload()
		cy.wait(3000)
		cy.intercept(
			{
				method: 'POST',
				url: '/services/v1/cancel-file-upload',

			},

			"Internal Server Error"
		).as('cancel file-upload')
		cy.log("cancel digital signature")
		cy.reload()
		cy.wait(3000)
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.wait(3000)
		cy.log("load duplicate approved records again")
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(7000)
		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(3000)
		cy.get('.ant-btn-primary').eq(1).click();


		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(1).click()

		cy.log("close signature modal")
		cy.get('.ant-modal-close').click()

		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(1).click()


		cy.log("selecting cancel reason")
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(0).click();
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(1).click();
		cy.get('.ant-select-selection-item').click();
		cy.get('.ant-select-item-option-content').eq(2).click();
		cy.get('.signature-modal > .ant-btn-primary > span').click();
		cy.wait(6000)



		cy.log("cancel button for lear data")
		cy.reload()
		cy.wait(3000)

		cy.log("status 200")
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/res_200.xlsx' }, { force: true })

		cy.wait(3000)

		cy.log("status 201")
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/res_data_201.xlsx' }, { force: true })

		cy.log("status 300")
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypress_300_status.xlsx' }, { force: true })

		cy.log("pdf file error")
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/blank.pdf' }, { force: true })

		cy.wait(3000)
		cy.log("removing upload file")
		cy.log("removing upload file")
		cy.get('button[title="Remove file"]').click()
	})

	it("login-pass api 300", () => {
		cy.log("login-pass api 300")
		cy.reload()
		cy.wait(3000)
		cy.intercept(
			{
				method: 'GET',
				url: '/auth/login-pass',
			},
			{ Status: 300 }
		).as('cancel file-upload')
		cy.log("load duplicate approved records again")
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(1000)

		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(7000)
		cy.get('.ant-btn-primary').eq(1).click();

		cy.wait(7000)
		cy.log("click on digital signature button")
		cy.get('.ant-space-item').eq(0).click()

		cy.log("close signature modal")
		cy.get('.ant-modal-close').click()

		cy.log("click on digital signature button")
		cy.wait(2000)
		cy.get('.ant-space-item').eq(0).click()


		cy.log("digital signature modal input")
		// cy.get(':nth-child(1) > .ant-input').clear();
		// cy.get(':nth-child(1) > .ant-input').type('fahad.siddiqui@mareana.com');
		cy.get(':nth-child(2) > .ant-input').clear();
		cy.get(':nth-child(2) > .ant-input').type('Albert.Ramanujan.03');
		cy.get('.signature-modal > #auth_with_ad').click();
		cy.wait(2000)
	});

	it("Approved data api 206", () => {
		cy.log("approved data api response 206 mock")
		cy.reload()
		cy.wait(2000)
		cy.get('.ant-btn-primary > :nth-child(1)').click()
		cy.wait(2000)
		cy.intercept(
			{
				method: 'POST',
				url: '/services/v1/approve-data',
			},
			{
				data: {
					statuscode: 206,
					message: "test cases"
				}
			}
		).as('file-upload')

		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(3000)
		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(2000)

	});

	it("approved data api response 400", () => {
		cy.reload()
		cy.wait(2000)
		cy.get('.ant-btn-primary > :nth-child(1)').click();

		cy.log("approved data api response 400 mock")
		cy.wait(2000)
		cy.intercept(
			{
				method: 'POST',
				url: '/services/v1/approve-data',
			},
			{
				data: {
					statuscode: 400,
					message: "test cases"
				}
			}
		).as('file-upload')

		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(3000)
		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(2000)
	});

	it("approved data api response internal server error", () => {
		cy.reload()
		cy.wait(2000)
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.log("approved data api response internal mock")
		cy.wait(2000)
		cy.intercept(
			{
				method: 'POST',
				url: '/services/v1/approve-data',
			},
			"Internal Server Error"
		).as('file-upload')

		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx' }, { force: true })
		cy.wait(3000)
		cy.log("continute to digital gisnature")
		cy.get('.ant-space-item').eq(0).click()
		cy.wait(2000)
		cy.reload()
		cy.wait(2000)
		cy.get('.ant-btn-primary > :nth-child(1)').click();
	});

	it("file upload response 401", () => {
		cy.log("file upload response 401")
		cy.wait(2000)
		cy.intercept(
			{
				method: 'POST',
				url: '/services/v1/upload-file',
			},
			{
				data: {
					statuscode: 401,
					message: "test cases"
				}
			}
		).as('file-upload')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypress_300_status.xlsx' }, { force: true })
	});

	it("file upload internal server", () => {

		cy.log("file upload internal server")
		cy.wait(2000)
		cy.intercept(
			{
				method: 'POST',
				url: '/services/v1/upload-file',

			},
			"Internal Server Error"
		).as('file-upload')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/cypress_300_status.xlsx' }, { force: true })
	});


	it("file upload internal server", () => {

		cy.reload()
		cy.wait(4000)
		cy.get('.ant-btn-primary > :nth-child(1)').click();
		cy.intercept(
			{
				method: 'POST',
				url: '/services/v1/upload-file',

			},
			{
				data: {
					statuscode: 201,
					message: "test cases"
				}
			}
		).as('file-upload')
		cy.get('input[type=file]').selectFile({ contents: 'cypress/filefortest/res_200.xlsx' }, { force: true })

		cy.get('.ant-btn-primary').eq(1).click();
	});
});
