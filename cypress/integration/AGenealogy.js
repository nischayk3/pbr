Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});
describe("Genealogy", () => {
	beforeEach(() => {
		cy.loginWithAD()
		cy.intercept('POST', '/services/v1/genealogy-filter', { fixture: 'genealogyFilter.json' })
		cy.intercept('GET', '/services/v1/product-type-genealogy', { fixture: 'genealogyFilterProductType.json' })
		cy.intercept('GET', '/mdhgenealogy/v1/genealogy?levels=5&batch_id=1338%7C1089084%7C394154&backward=true&mat_type=%27RAW%27', (req) => {
			req.reply({
				statusCode: 200, // default
				fixture: 'backward.json'
			})
		})
		cy.intercept('GET', '/mdhgenealogy/v1/genealogy?levels=5&batch_id=1338%7C1089084%7C394154&backward=true', (req) => {
			req.reply({
				statusCode: 200, // default
				fixture: 'backward.json'
			})
		})
	});
	afterEach(() => {
		cy.loginWithAD()
		cy.intercept('POST', '/services/v1/genealogy-filter', { fixture: 'genealogyFilter.json' })
		cy.intercept('GET', '/services/v1/product-type-genealogy', { fixture: 'genealogyFilterProductType.json' })
		cy.intercept('GET', '/mdhgenealogy/v1/genealogy?levels=5&batch_id=1338%7C1089084%7C394154&backward=true&mat_type=%27RAW%27', (req) => {
			req.reply({
				statusCode: 200, // default
				fixture: 'backward.json'
			})
		})
		cy.intercept('GET', '/mdhgenealogy/v1/genealogy?levels=5&batch_id=1338%7C1089084%7C394154&backward=true', (req) => {
			req.reply({
				statusCode: 200, // default
				fixture: 'backward.json'
			})
		})
	});

	it("Render genealogy screen", () => {
		const url = Cypress.config().baseUrl
		cy.visit(url + '/#/dashboard/genealogy')
		cy.log('Load Landing Page')
		cy.url().should('eq', url + '/#/dashboard/genealogy')
	});

	it("reload", () => {
		cy.reload()
		cy.wait(3000)
	})

	it("Select plant", () => {
		cy.get(
			":nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_0").clear();
		cy.get("#rc_select_0").type("1338");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").click({ force: true });
		cy.wait(4000)
	});

	it("Selecting product", () => {
		cy.get(
			":nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_1").clear();
		cy.get("#rc_select_1").type("1089084");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })
		cy.wait(4000)
	})

	it("Selecting Batch", () => {
		cy.get(
			":nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_2").clear();
		cy.get("#rc_select_2").type("394154");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(2).click({ force: true })
		cy.wait(4000)
	})

	it("Selecting Product type", () => {
		cy.get('.ant-select-selection-overflow').click();
		cy.get("#rc_select_3").clear();
		cy.get("#rc_select_3").type("RAW");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(3).click({ force: true })
		cy.wait(4000)

	});

	it("click on search button", () => {
		cy.get('#genealogy-search').click({ force: true })
		cy.wait(6000)
	})

	it("search again", () => {
		cy.wait(10000)

	});

	it("search node", () => {
		cy.get('.ant-tabs-nav-list > :nth-child(2)').click()
		cy.wait(3000)
		cy.get('#rc_select_4').click();
		cy.get('[style="height: 888px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
		cy.get('.search-tree > .anticon > svg').click();
		cy.get('.close-searchicon > .anticon > svg').click();
	});


	it("reload", () => {
		cy.reload()
		cy.wait(6000)
	})

	it("Select plant", () => {
		cy.get(
			":nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_0").clear();
		cy.get("#rc_select_0").type("1338");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").click({ force: true });
	});

	it("Selecting product", () => {
		cy.get(
			":nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_1").clear();
		cy.get("#rc_select_1").type("1089084");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })
	})

	it("Selecting Batch", () => {
		cy.get(
			":nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_2").clear();
		cy.get("#rc_select_2").type("394154");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(2).click({ force: true })
		cy.wait(4000)
	})

	it("Selecting Product type", () => {
		cy.get('.ant-select-selection-overflow').click();
		cy.get("#rc_select_3").clear();
		cy.get("#rc_select_3").type("RAW");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(3).click({ force: true })
	});

	it("Search backword filters", () => {
		cy.wait(2000)
		cy.get("#genealogy-search").click({ force: true })
		cy.wait(6000)
	});


	it("Opening Drawer on click of material node", () => {
		cy.get('#node-1091535 > #material-img').click();
		cy.wait(3000)
		cy.get("#view-details-popup").click();
	});
	it("closing drawer", () => {
		cy.wait(5000)
		cy.get('.ant-drawer-mask').click()
	})

	it("click on process order", () => {
		cy.wait(5000)
		cy.get('#node-102279687 > #process-img').click({ force: true })
		cy.get("#view-details-popup").click({ force: true });
	});
	it("closing drawer", () => {
		cy.wait(5000)
		cy.get('.ant-drawer-mask').click({ force: true })
	});

	it("click on material node image", () => {
		cy.get('#node-1091460 > #material-img').click({ force: true });
	})

	it("click on backward from node popup", () => {
		cy.get('#backword-genealogy-popup > span').click({ force: true })
	})

	it("click on process image", () => {
		cy.wait(5000)
		cy.get("#process-img").click({ force: true });
	})

	it("click on purchase order", () => {

		cy.get("#view-details-popup").click({ force: true });
	});

	it("closing drawer", () => {
		cy.wait(5000)
		cy.get('.ant-drawer-mask').click({ force: true })
	});


	// it("click on forward from node popup",()=>{
	// 	cy.wait(5000)
	// 	cy.get('#1091460 > #material-img').click();
	// 	cy.get(3000)
	// 	cy.get('#forward-genealogy-popup > span').click();
	// })

	// it("fileupload",()=>{
	// 	cy.wait(3000)
	// 	cy.get('#1091460 > #material-img').click();
	// 	cy.wait(3000)
	// 	cy.get('#upload-file-popup').click();

	// })

	// // it("Select wrong file in popup",()=>{
	// // 	cy.get('input[type=file]').selectFile({contents:'cypress/filefortest/cypres_manual_duplicate_approved_data.xlsx'},{ force: true })
	// // 	cy.wait(3000)
	// // 	cy.get('.upload-btn > :nth-child(1) > span').click()

	// // });

	// it("Select multi file in popup",()=>{
	// 	cy.wait(5000)
	// 	cy.get('input[type=file]').selectFile({contents:'cypress/filefortest/batch_record_1.pdf'},{ force: true })
	// 	cy.wait(3000)
	// 	cy.get('input[type=file]').selectFile({contents:'cypress/filefortest/batch_record_1.pdf'},{ force: true })
	// 	cy.wait(3000)
	// 	cy.get('.upload-btn > :nth-child(1) > span').click()

	// });

	// it("closing file popup",()=>{
	// 	cy.wait(3000)
	// 	cy.get('.ant-modal-close-x').click()
	// })
	it("going back to filter screen", () => {
		cy.get('#rc-tabs-0-tab-1').click({ force: true })
	})

	it("click on forward toggle button in filter", () => {
		cy.get(':nth-child(2) > .toggle-text').click({ force: true })
		cy.wait(3000)
		cy.get('#genealogy-search').click({ force: true })
	})

	it("remove product type and search", () => {
		cy.get(':nth-child(4) > .search-block > .ant-btn > .anticon > svg').click({ force: true })
		cy.get('#genealogy-search').click({ force: true })
	})

	it("back to filter ", () => {
		cy.get('#rc-tabs-0-tab-1').click({ force: true })
	})


	// Gives bad request
	it("search forward from filter", () => {
		cy.get("#rc-tabs-0-tab-1").click({ force: true })
		cy.get(".toggleLabel").eq(1).click({ force: true })
		cy.wait(3000)
		cy.get("#genealogy-search").click({ force: true })
		cy.wait(3000)

	})

	it("Clear filters", () => {
		cy.get('#rc-tabs-0-tab-1').click({ force: true })
		cy.get("#clear-search").click({ force: true })
	})

	it("search item", () => {
		cy.wait(3000)
		cy.get("#clear-search").click({ force: true })
	})

	it("reload for backward 404", () => {
		cy.reload()
		cy.wait(3000)
	})


	it("genealogy 400 error on backward search", () => {
		cy.intercept(
			{
				method: 'GET',
				url: '/mdhgenealogy/v1/genealogy?levels=5&batch_id=1338%7C1089084%7C394154&backward=true&mat_type=%27RAW%27',

			},
			{
				"detail": "Genealogy with batchId: 1338|1089084|394154 and levels 5 not found",
				"status": 400,
				"title": "Bad Request",
				"type": "about:blank"
			}
		).as('genealogy-serach')
	})

	it("Select plant", () => {
		cy.get(
			":nth-child(1) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_0").clear();
		cy.get("#rc_select_0").type("1338");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").click({ force: true });
		cy.wait(4000)
	});

	it("Selecting product", () => {
		cy.get(
			":nth-child(2) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_1").clear();
		cy.get("#rc_select_1").type("1089084");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(1).click({ force: true })
		cy.wait(4000)
	})

	it("Selecting Batch", () => {
		cy.get(
			":nth-child(3) > .search-block > .ant-select > .ant-select-selector > .ant-select-selection-item"
		).click();
		cy.get("#rc_select_2").clear();
		cy.get("#rc_select_2").type("394154");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(2).click({ force: true })
		cy.wait(4000)
	})

	it("Selecting Product type", () => {
		cy.get('.ant-select-selection-overflow').click();
		cy.get("#rc_select_3").clear();
		cy.get("#rc_select_3").type("RAW");
		cy.wait(4000)
		cy.get(".ant-select-item-option-content").eq(3).click({ force: true })
		cy.wait(4000)

	});

	it("click on search button", () => {
		cy.get('#genealogy-search').click({ force: true })
		cy.wait(6000)
	})

	it("Click on node", () => {
		cy.reload()
		cy.wait(3000)
	})

	it("Reload final", () => {
		cy.reload()
		cy.wait(3000)
	})


});
