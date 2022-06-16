
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('PBR', () => {
    // it("should login successfully using Ad", () => {
    beforeEach(() => {
        cy.viewport(1366, 768);
        cy.visit("/");
        cy.url().should("include", "/user/login");
        localStorage.setItem("test_enabled", true);
        localStorage.setItem("user", "fahad.siddiqui@mareana.com");
        localStorage.setItem("username", "Fahad");
        localStorage.setItem(
            "login_details",
            JSON.stringify({
                ad_role: false,
                email_id: "fahad.siddiqui@mareana.com",
                firstname: "Fahad",
                lastname: "siddiqui",
                email_id: "fahad.siddiqui@mareana.com",
                mdh_role: "USER",
                screen_set: "1000_USER",
                token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
            })
        );
    })
    it('Load View Landing Page Correctly', () => {
        const url = Cypress.config().baseUrl
        cy.intercept('GET', '**/pbr_template', { fixture: 'paperBatchLanding.json' })
        cy.visit(url + '/#/dashboard/paper_batch_records')

        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    })

    it('Load Screen Header', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')

        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const latestDate = date.getDate();
        const year = date.getFullYear();
        const currentDate = month + ' ' + latestDate + ',' + ' ' + year;
        cy.wait(5000)
        cy.log('Verify Screen Header Component')
        cy.get('.screen_header_head')

        cy.log('Verify User Name')
        cy.get('.screen_header_username').should("have.text", "Howdy Fahad,")

        cy.log('Verify Header Text')
        cy.get('.screen_header_text').should("have.text", "In the mood to draw up some template today?")

        cy.log('Verify Current Date')
        cy.get('.screen_header_resultdate').should("have.text", currentDate)
    })

    it('Load Landing Page Table Component', () => {
        cy.log('Load Search Bar')
        cy.log('Search View Id In Search Component')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);
        cy.get(".ant-input-affix-wrapper").type("P137").click({ force: true })
        cy.get(".ant-input-search-button").click()

    })

    it('Recently Created Dashboard', () => {
    	cy.log('Recent View Verify')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.intercept('GET', '**/pbr_template', { fixture: 'paperBatchLanding.json' })
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    	cy.wait(6000);
    	cy.get(':nth-child(1) > .chart-tiles').should('have.length', 1)
    })

    it('Create New Template', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.intercept('GET', '**/get_data_view', { fixture: 'paperBatchFileList.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
        cy.get('#basic_templateName').clear();
        cy.get('#basic_templateName').type('test');
        cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
        cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
        /* ==== End Cypress Studio ==== */
    })
    it('Create and save new template', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.intercept('GET', '**/get_data_view', { fixture: 'paperBatchFileList.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
        cy.get('#basic_templateName').clear();
        cy.get('#basic_templateName').type('test');
        cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
        cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click();
        cy.get('#dynamic_form_nest_item_users_0_name').clear();
        cy.get('#dynamic_form_nest_item_users_0_name').type('sadsad');
        cy.get('#dynamic_form_nest_item_users_0_method').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').click({force:true});
        cy.get('[coords="112.1646672189235,57.75071974843737,177.8917653262614,69.12309839390213"]').click({force:true});
        cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').click({force:true});
        cy.get('[coords="205.9177034795284,57.737608179450035,267.68761689960945,69.00609723292283"]').click({force:true});
        cy.get('.pbrCenterPanelHeader-para').click();
        cy.get('.ant-modal-close-x').click();
        cy.get(':nth-child(7) > .ant-btn').click({force:true});
        cy.wait(1000);
        cy.get('.saveSnippetsBlock > .ant-btn').click({force:true});
        /* ==== End Cypress Studio ==== */
    })

    it("Edit Created Template", () => {
        cy.log('Edit Created Template')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.intercept('GET', '**/pbr_template', { fixture: 'paperBatchLanding.json' })
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);


        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(1) > .chart-tiles').click();
        cy.get('.pbrTemplateLeft > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .ant-collapse > .ant-collapse-item-active > .ant-collapse-header').click();
        cy.get(':nth-child(2) > .ant-collapse-header').click();
        cy.get('#page_identifier_key').clear();
        cy.get('#page_identifier_key').type('1. Virus filtration');
        cy.get('#page_identifier_key_2').clear();
        cy.get('#page_identifier_key_2').type('Filter Lot Number:');
        cy.get('.pbrTemplateLeft > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .ant-collapse > .ant-collapse-item-active > .ant-collapse-header').click();
        cy.get('.pbrCenterPanelHeader-para').click();
        cy.get('.ant-modal-close-x > .anticon > svg').click();
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click({multiple:true});
        cy.get('.ant-btn > :nth-child(2)').click({multiple:true,force:true});

    });

    it("Toggle and add parameter", () => {
        cy.log('Toggle and add parameter')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);

        cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
        cy.get('#basic_templateName').clear();
        cy.get('#basic_templateName').type('test');
        cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
        cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.ant-notification-notice-btn > .ant-btn > span').click();
        cy.get('.pbrTemplateLeft > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
        cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
        cy.get('.pdfToImgBlock > div > img').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click();

    });

    it("Add all parameter section", () => {
        cy.log('Toggle and add parameter')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.log('Load Landing Page')
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
        cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
        cy.get('[coords="305.73044443130493,57.42703981697556,359.3141876310109,68.98802669718857"]').click({force:true});
        cy.get(':nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
        cy.get('[coords="363.9767521619797,58.17100867629048,382.82751093059767,69.43234605714675"]').click({force:true});
        cy.get(':nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();


    })

    it("Add value section", () => {
        cy.log('Toggle and add parameter')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.log('Load Landing Page')
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
        cy.get('[coords="409.7616002559662,57.580265291035175,466.13211452960957,68.88628209941082"]').click({ force: true });
        cy.get(':nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
        cy.get('[coords="506.286269903183,57.52309657633298,579.7775461822747,68.99929273873552"]').click({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_time_rule').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('#dynamic_form_nest_item_users_0_time_min').clear();
        cy.get('#dynamic_form_nest_item_users_0_time_min').type('1');
        cy.get('#dynamic_form_nest_item_users_0_time_max').clear();
        cy.get('#dynamic_form_nest_item_users_0_time_max').type('2');
        cy.get(':nth-child(6) > :nth-child(7) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
        cy.get(':nth-child(4) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('#dynamic_form_nest_item_users_0_time_valueTransformation').clear();
        cy.get('#dynamic_form_nest_item_users_0_time_valueTransformation').type('111');
        /* ==== End Cypress Studio ==== */



    })

    it("Add Date section", () => {
        cy.log('Toggle and add parameter')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.log('Load Landing Page')
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
        cy.get('[coords="597.2250137329102,57.67178233712908,648.5210151225327,68.81591958925124"]').click({ force: true });
        cy.get(':nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
        cy.get('[coords="730.5601224899292,57.60334555059665,775.6920582279563,68.81478161551048"]').click({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_date_rule').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('#dynamic_form_nest_item_users_0_date_valueArea').clear();
        cy.get('#dynamic_form_nest_item_users_0_date_valueArea').type('asdad');
        cy.get(':nth-child(7) > :nth-child(7) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
        cy.get(':nth-child(4) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('#dynamic_form_nest_item_users_0_date_valueTransformation').clear();
        cy.get('#dynamic_form_nest_item_users_0_date_valueTransformation').type('111');
        /* ==== End Cypress Studio ==== */

    })

    it("Change Coordinates", () => {
        cy.log('Toggle and add parameter')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.log('Load Landing Page')
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
        cy.get('[coords="111.94621527194977,57.53743443638084,178.1889796704054,68.96316892467435"]').click({ force: true });
        cy.get(':nth-child(3) > :nth-child(1) > .ant-input').clear();
        cy.get(':nth-child(3) > :nth-child(1) > .ant-input').type('120.88259327411652');
        cy.get(':nth-child(3) > :nth-child(2) > .ant-input').clear();
        cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type('556.9567814283073');
        cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
        cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('146.49597273766994');
        cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
        cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('78.26721033919598');
        /* ==== End Cypress Studio ==== */

    })

    it("Add All parameters", () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.intercept('GET', '**/get_data_view', { fixture: 'paperBatchFileList.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
        cy.get('#basic_templateName').clear();
        cy.get('#basic_templateName').type('Cy-press-test');
        cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
        cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */

        /* ==== End Cypress Studio ==== */
        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.pbrTemplateLeft > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > :nth-child(2) > .ant-collapse-item-active > .ant-collapse-header').click();
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
        cy.get('#dynamic_form_nest_item_users_0_name').clear();
        cy.get('#dynamic_form_nest_item_users_0_name').type('asdf');
        cy.get('#dynamic_form_nest_item_users_0_method').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').click();
        cy.get('[coords="112.1646672189235,57.75071974843737,177.8917653262614,69.12309839390213"]').click({ force: true });
        cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').click();
        cy.get('[coords="205.9177034795284,57.737608179450035,267.68761689960945,69.00609723292283"]').click({ force: true });
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('Documents');
        cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
        cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('IDs');
        cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
        cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
        cy.get('.ant-form > :nth-child(3) > :nth-child(1) > .ant-input').clear();
        cy.get('.ant-form > :nth-child(3) > :nth-child(1) > .ant-input').type('210.74213027954102');
        cy.get('.ant-form > :nth-child(3) > :nth-child(2) > .ant-input').clear();
        cy.get('.ant-form > :nth-child(3) > :nth-child(2) > .ant-input').type('66.97486957535148');
        cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
        cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('275.11642265319813');
        cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
        cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('69.16671761870377');
        cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
        /* ==== End Cypress Studio ==== */

    })

    it("Add multiple parameters", () => {
        cy.log('Toggle and add parameter')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.log('Load Landing Page')
        cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%202.pdf&tempalteName=test&fromScreen=Workspace')
        cy.wait(6000);

        /* ==== Generated with Cypress Studio ==== */
        cy.get(':nth-child(3) > .ant-collapse-header').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click();
        cy.get('#dynamic_form_nest_item_users_0_name').clear();
        cy.get('#dynamic_form_nest_item_users_0_name').type('asdasd');
        cy.get('#dynamic_form_nest_item_users_0_method').click();
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('asdasd');
        cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
        cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('dasdsad');
        cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
        cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadas');
        cy.get(':nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
        cy.get(':nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dasdas');
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadsa');
        cy.get(':nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
        cy.get(':nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dasdsa');
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
        cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dsadsa');
        cy.get(':nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
        cy.get(':nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dasdsa');
        cy.get('.firstParameter-para > p').click();
        cy.get('.singleParameterBlock > .ant-collapse > :nth-child(2) > .ant-collapse-header > .ant-collapse-header-text').click();
        cy.get('.firstParameter-para > p').click();
        cy.get('#dynamic_form_nest_item_users_1_name').clear();
        cy.get('#dynamic_form_nest_item_users_1_name').type('dasdsa');
        cy.get('#dynamic_form_nest_item_users_1_method').click();
        cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('dasdas');
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('dasdsa');
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadsa');
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadsa');
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsad');
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dsadsa');
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dasd');
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
        cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dsads');
        /* ==== End Cypress Studio ==== */
    })


});
