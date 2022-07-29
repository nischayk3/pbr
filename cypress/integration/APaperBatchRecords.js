
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('PBR', () => {
    // it("should login successfully using Ad", () => {
    beforeEach(() => {
        cy.intercept('GET', '/pbr/udh/get_data_view?actionType=get_product&productNum=1091460', { fixture: 'paperBatchFileList' })
        cy.intercept('GET', '/pbr/udh/get_data_view?actionType=get_product_num&productNum=', { fixture: 'productNum' })
        cy.intercept('GET', '/pbr/udh/pbr_template', { fixture: 'paperBatchLanding' })
        cy.intercept('GET', '/pbr/udh/pbr_template?limit=8', { fixture: 'paperBatchLmitList' }).as("limitlist")
        cy.intercept('POST', '/pbr/udh/ocr-json-extraction', { fixture: 'pbrBoundingBox' })
        cy.intercept('GET', '/pbr/udh/pbr_template?template_displ_id=P258&version=1', { fixture: 'pbrLoadData' })
        cy.viewport(1366, 768);
        localStorage.setItem("test_enabled", true);
        localStorage.setItem("user", "fahad.siddiqui@mareana.com");
        localStorage.setItem(
            "login_details",
            JSON.stringify({
                ad_role: false,
                email_id: "fahad.siddiqui@mareana.com",
                firstname: "Fahad",
                lastname: "siddiqui",
                mdh_role: "USER",
                screen_set: "1000_USER",
                token:
                    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
            })
        );
    })
    it('Load View Landing Page Correctly', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    })

    it('Create New Template', () => {
        cy.wait(6000);
        cy.intercept(
            {
                method: 'POST',
                path: 'pbr/udh/ocr-json-extraction',
            },
            {
                fixture: 'pbrBoundingBox',
            },
        ).as('saveDocument')
        cy.get('.create-new').click({ force: true });
        cy.get('#basic_templateName').clear();
        cy.get('#basic_templateName').type('test');
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
    })

    it("click of parameter pannel", () => {
        cy.wait(6000);
        cy.get('#parameter-panel > .ant-collapse-header').click({ force: true });

    })

    it("click on add on first parameter", () => {
        cy.wait(3000);
        cy.get('.firstParameter-para > p').click({ force: true });
    })

    it("Adding method parameters", () => {
        cy.get('#dynamic_form_nest_item_users_0_name').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_name').type('para1');
        cy.get('#dynamic_form_nest_item_users_0_method').click({ force: true });
        cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click({ force: true });
    })

    it("adding input 1", () => {
        cy.get('#form_input1').click({ force: true });
        cy.get('#form_input1').type("Document")
    })

    it("adding input 2", () => {
        cy.get('#form_input2').click({ force: true });
        cy.get('#form_input2').type("MBR-0001")
    })
    it('selecting date', () => {
        cy.wait(6000);
        cy.get('#rule1').click({ force: true })
        // cy.get(':nth-child(3) > :nth-child(5) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click({ force: true });
        cy.get('.ant-select-item-option').eq(5).click({ force: true })
    })

    it("entering date", () => {
        cy.wait(3000)
        cy.get('#dynamic_form_nest_item_users_0_param_valueArea').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_param_valueArea').type('12/10/12022');
    })
    it("Add UOM", () => {
        cy.get('#form_input3').click({ force: true });
        cy.get('#form_input3').type("1.0")
        cy.get('#form_input4').click({ force: true });
        cy.get('#form_input4').type("Effective")
        cy.get('#dynamic_form_nest_item_users_0_uom_transformation').click({ force: true })
        // cy.get(':nth-child(5) > :nth-child(5) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click({ force: true });
        cy.get('.ant-select-item-option-content').eq(10).click({ force: true })
        cy.get('#dynamic_form_nest_item_users_0_uom_valueTransformation').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_uom_valueTransformation').type('10');
    })

    it("Add Time", () => {
        cy.get('#form_input5').click({ force: true });
        cy.get('#form_input5').type("Date:")
        cy.get('#form_input6').click({ force: true });
        cy.get('#form_input6').type("01AUG2021");
        cy.get('#dynamic_form_nest_item_users_0_time_rule').click({ force: true })
        // cy.get(':nth-child(6) > :nth-child(5) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click({ force: true });
        cy.get('.ant-select-item-option-content').eq(6).click({ force: true })
        cy.get('#dynamic_form_nest_item_users_0_param_min').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_param_min').type(2)
        cy.get('#dynamic_form_nest_item_users_0_param_max').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_param_max').type(4)
    })

    it("Add Date", () => {
        cy.get('#form_input7').click({ force: true });
        cy.get('#form_input7').type("Process");
        cy.get('#form_input8').click({ force: true });
        cy.get('#form_input8').type("Stage:")
    })

    it("Find and preview", () => {
        cy.intercept(
            {
                method: 'POST',
                path: '/pbr/udh/extract_from_template_find',
            },
            {
                fixture: 'paperFind',
            },
        ).as('findDocument')
        cy.get('.defineTableBtn').click({ force: true });
        cy.wait(6000)
        cy.intercept(
            {
                method: 'POST',
                path: '/pbr/udh/extract_from_template_find',
            },
            {
                fixture: 'paperPreview',
            },
        ).as('previewDocument')
        cy.wait(6000)
        cy.get('.pbrCenterPanelHeader-para').click({force:true});


    })

    it("closing preview popup", () => {
        cy.wait(3000)
        cy.get('.ant-modal-close-x').click({ force: true })
    })

    it("Save template", () => {

        cy.intercept(
            {
                method: 'PUT',
                path: 'pbr/udh/save_records',
            },
            {
                fixture: 'savePbrTemplate',
            },
        ).as('saveDocument')
        cy.wait(6000)
        cy.get("#saveButton").click({ force: true })
    })

    it("handle toggel", () => {
        cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click({ force: true })
        cy.wait(2000)
        cy.get('.pbrTemplateLeft > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click({ force: true })
    })

    it("add multiple parameter", () => {
        cy.get('.firstParameter-para > p').click({ force: true })
        cy.wait(2000)
        cy.get('.firstParameter-para > p').click({ force: true })

    })

    it("Click publish", () => {
        cy.get("#publisgButton").click({ force: true })
        cy.wait(2000)
        // cy.get(':nth-child(10) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-close > .ant-modal-close-x > .anticon > svg > path').click({ force: true })
        cy.get(':nth-child(9) > .ant-modal-root > .ant-modal-wrap > .ant-modal > .ant-modal-content > .ant-modal-close > .ant-modal-close-x > .anticon > svg > path').click({ force: true })
    })

    it("Edit Created Template", () => {
        cy.intercept(
            {
                method: 'GET',
                path: 'pbr/udh/pbr_template',
            },
            {
                fixture: 'paperBatchLanding',
            },
        ).as('saveDocument')
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.wait(60000);
        cy.get('.chart-tiles').eq(0).click({ force: true });
        cy.get('#page-Identifier > .ant-collapse-header').click({ force: true });
        cy.intercept('POST', '/pbr/udh/pbr_template?template_displ_id=P258&version=1', { fixture: 'pbrLoadData' })
        cy.wait(10000);
        cy.get('#page_identifier_key').clear({ force: true });
        cy.get('#page_identifier_key').type('1. Virus filtration');
        cy.get('#page_identifier_key_2').clear({ force: true });
        cy.get('#page_identifier_key_2').type('Filter Lot Number:');
        cy.wait(3000);
        cy.get('#parameter-panel > .ant-collapse-header').click({ force: true });
        cy.wait(3000);
        cy.get('.firstParameter-para > p').click({ force: true });

    });
    it("Save Edited template", () => {

        cy.intercept(
            {
                method: 'PUT',
                path: 'pbr/udh/save_records',
            },
            {
                fixture: 'savePbrTemplate',
            },
        ).as('saveDocument')
        cy.wait(60000)
        cy.get("#saveButton").click({ force: true })
    })
    it('Create without name', () => {
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records')
        cy.log('Load Landing Page')
        cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
        cy.wait(6000);
        cy.intercept('POST', '/pbr/udh/ocr-json-extraction', { fixture: 'pbrBoundingBox' }).as("boundingBox")
        cy.get('.create-new').click({ force: true });
        cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
        cy.get('.ant-modal-close-x > .anticon > svg').click({ force: true });
    })
    it('Load Landing Page Table Component', () => {
        cy.wait(8000);
        cy.get(".ant-input-affix-wrapper").type("P").click({ force: true })
        cy.get(".ant-input-search-button").click({ force: true })
        cy.wait(2000);
        cy.get('.ant-input-clear-icon > .anticon > svg').click({ force: true })
    })
    it('Visit using url', () => {
        cy.wait(6000);
        const url = Cypress.config().baseUrl
        cy.visit(url + '/#/dashboard/paper_batch_records/P258?file=Batch%20Record%20Example%203.pdf&temp_disp_id=P258&tempalteName=test&fromScreen=Workspace&version=1')
        cy.wait(10000);
        cy.intercept('GET', '/pbr/udh/pbr_template?template_displ_id=P258&version=1', { fixture: 'pbrLoadData' })
        cy.wait(6000);
        cy.get('#parameter-panel > .ant-collapse-header').click({ force: true });
        cy.wait(3000);
    })
    
    it('Save without parameter', () => {
        cy.wait(3000);
        cy.get('.firstParameter-para > p').click({ force: true });
        cy.wait(3000);
        cy.get('.firstParameter-para > p').click({ force: true });
        cy.get("#saveButton").click({ force: true })
        cy.wait(3000);

    })
    it('Delete Parameter', () => {
        cy.wait(3000);
        cy.get("#deleteParameter").click({ force: true })
    })
    it('Range Validation', () => {
        cy.wait(6000);
        cy.get('#rule1').click({ force: true })
        // cy.get(':nth-child(3) > :nth-child(5) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click({ force: true,multiple:true });
        cy.get('.ant-select-item-option').eq(1).click({ force: true })
        cy.get('#dynamic_form_nest_item_users_0_param_min').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_param_min').type(4)
        cy.get('#dynamic_form_nest_item_users_0_param_max').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_param_max').type(2)
        cy.wait(2000);
        cy.get('#dynamic_form_nest_item_users_0_uom_rule').click({ force: true })
        // cy.get(':nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click({ force: true,multiple:true });
        cy.get('.ant-select-item-option').eq(4).click({ force: true })
        cy.get('#dynamic_form_nest_item_users_0_uom_min').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_uom_min').type(4)
        cy.get('#dynamic_form_nest_item_users_0_uom_max').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_uom_max').type(2)
        cy.wait(2000);
        cy.get('#dynamic_form_nest_item_users_0_time_rule').click({ force: true })
        // cy.get(':nth-child(6) > :nth-child(5) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click({ force: true,multiple:true })
        cy.get('.ant-select-item-option').eq(6).click({ force: true })
        cy.get('#dynamic_form_nest_item_users_0_time_min').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_time_min').type(4)
        cy.get('#dynamic_form_nest_item_users_0_time_max').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_time_max').type(2)
        cy.get('#dynamic_form_nest_item_users_0_date_rule').click({ force: true })
        // cy.get(':nth-child(7) > :nth-child(5) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click({ force: true,multiple:true })
        cy.get('.ant-select-item-option').eq(9).click({ force: true })
        cy.get('#dynamic_form_nest_item_users_0_date_min').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_date_min').type(4)
        cy.get('#dynamic_form_nest_item_users_0_date_max').clear({ force: true });
        cy.get('#dynamic_form_nest_item_users_0_date_max').type(2)
    })
    it("Change Coordinates", () => {
        cy.wait(6000);
        cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click({ force: true });
        cy.wait(2000);
        cy.get('#cord1').clear({ force: true });
        cy.get('#cord1').type('120.88259327411652');
        cy.get('#cord2').clear({ force: true });
        cy.get('#cord2').type('120.88259327411652');
        cy.get('#cord3').clear({ force: true });
        cy.get('#cord3').type('120.88259327411652');
        cy.get('#cord4').clear({ force: true });
        cy.get('#cord4').type('120.88259327411652');
    })


    // it("Toggle and add parameter", () => {
    //     cy.log('Toggle and add parameter')
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records')
    //     cy.log('Load Landing Page')
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    //     cy.wait(6000);

    //     cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
    //     cy.get('#basic_templateName').clear();
    //     cy.get('#basic_templateName').type('test');
    //     cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
    //     cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
    //     cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.firstParameter-para > p').click({force:true});
    //     cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
    //     cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
    //     cy.get('.firstParameter-para > p').click();
    //     cy.get('.ant-notification-notice-btn > .ant-btn > span').click();
    //     cy.get('.pbrTemplateLeft > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
    //     cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
    //     cy.get('.pdfToImgBlock > div > img').click();
    //     cy.get('.firstParameter-para > p').click();
    //     cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click();

    // });

    // it("Add all parameter section", () => {
    //     cy.log('Toggle and add parameter')
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.log('Load Landing Page')
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.firstParameter-para > p').click({force:true});
    //     // cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
    //     cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
    //     cy.get('[coords="305.73044443130493,57.42703981697556,359.3141876310109,68.98802669718857"]').click({force:true});
    //     cy.get(':nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
    //     cy.get('[coords="363.9767521619797,58.17100867629048,382.82751093059767,69.43234605714675"]').click({force:true});
    //     cy.get(':nth-child(3) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
    //     cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();


    // })

    // it("Add value section", () => {
    //     cy.log('Toggle and add parameter')
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.log('Load Landing Page')
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.firstParameter-para > p').click({force:true});
    //     // cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
    //     cy.get('[coords="409.7616002559662,57.580265291035175,466.13211452960957,68.88628209941082"]').click({ force: true });
    //     cy.get(':nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
    //     cy.get('[coords="506.286269903183,57.52309657633298,579.7775461822747,68.99929273873552"]').click({ force: true });
    //     cy.get('#dynamic_form_nest_item_users_0_time_rule').click();
    //     cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get('#dynamic_form_nest_item_users_0_time_min').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_time_min').type('1');
    //     cy.get('#dynamic_form_nest_item_users_0_time_max').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_time_max').type('2');
    //     cy.get(':nth-child(6) > :nth-child(7) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get('#dynamic_form_nest_item_users_0_time_valueTransformation').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_time_valueTransformation').type('111');
    //     /* ==== End Cypress Studio ==== */



    // })

    // it("Add Date section", () => {
    //     cy.log('Toggle and add parameter')
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.log('Load Landing Page')
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.firstParameter-para > p').click({force:true});
    //     // cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
    //     cy.get('[coords="597.2250137329102,57.67178233712908,648.5210151225327,68.81591958925124"]').click({ force: true });
    //     cy.get(':nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
    //     cy.get('[coords="730.5601224899292,57.60334555059665,775.6920582279563,68.81478161551048"]').click({ force: true });
    //     cy.get('#dynamic_form_nest_item_users_0_date_rule').click();
    //     cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get('#dynamic_form_nest_item_users_0_date_valueArea').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_date_valueArea').type('asdad');
    //     cy.get(':nth-child(7) > :nth-child(7) > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-select > .ant-select-selector').click();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get('#dynamic_form_nest_item_users_0_date_valueTransformation').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_date_valueTransformation').type('111');
    //     /* ==== End Cypress Studio ==== */

    // })

    

    // it("Add All parameters", () => {
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records')
    //     cy.log('Load Landing Page')
    //     cy.intercept('GET', '**/get_data_view', { fixture: 'paperBatchFileList.json' })
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
    //     cy.get('#basic_templateName').clear();
    //     cy.get('#basic_templateName').type('Cy-press-test');
    //     cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
    //     cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
    //     cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */

    //     /* ==== End Cypress Studio ==== */
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.pbrTemplateLeft > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > :nth-child(2) > .ant-collapse-item-active > .ant-collapse-header').click();
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.firstParameter-para > p').click({force:true});
    //     // cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header > .ant-collapse-header-text').click();
    //     cy.get('#dynamic_form_nest_item_users_0_name').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_name').type('asdf');
    //     cy.get('#dynamic_form_nest_item_users_0_method').click();
    //     cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').click();
    //     cy.get('[coords="111.94621527194977,57.53743443638084,178.1889796704054,68.96316892467435"]').click({ force: true });
    //     cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').click();
    //     cy.get('[coords="205.69649124145508,57.55570698529482,267.6595058441161,68.86165171861641"]').click({ force: true });
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('Documents');
    //     cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
    //     cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('IDs');
    //     cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click();
    //     cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
    //     cy.get('.ant-form > :nth-child(3) > :nth-child(1) > .ant-input').clear();
    //     cy.get('.ant-form > :nth-child(3) > :nth-child(1) > .ant-input').type('210.74213027954102');
    //     cy.get('.ant-form > :nth-child(3) > :nth-child(2) > .ant-input').clear();
    //     cy.get('.ant-form > :nth-child(3) > :nth-child(2) > .ant-input').type('66.97486957535148');
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('275.11642265319813');
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('69.16671761870377');
    //     cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
    //     /* ==== End Cypress Studio ==== */

    // })

    // it("Add multiple parameters", () => {
    //     cy.log('Toggle and add parameter')
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.log('Load Landing Page')
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records/Untitled?file=Batch%20Record%20Example%201.pdf&tempalteName=test&fromScreen=Workspace')
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.firstParameter-para > p').click();
    //     // cy.get('.singleParameterBlock > .ant-collapse > .ant-collapse-item > .ant-collapse-header').click();
    //     cy.get('#dynamic_form_nest_item_users_0_name').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_name').type('asdasd');
    //     cy.get('#dynamic_form_nest_item_users_0_method').click();
    //     cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('asdasd');
    //     cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
    //     cy.get(':nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('dasdsad');
    //     cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
    //     cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadas');
    //     cy.get(':nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
    //     cy.get(':nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dasdas');
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadsa');
    //     cy.get(':nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
    //     cy.get(':nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dasdsa');
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dsadsa');
    //     cy.get(':nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
    //     cy.get(':nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dasdsa');
    //     cy.get('.firstParameter-para > p').click();
    //     // cy.get('.singleParameterBlock > .ant-collapse > :nth-child(2) > .ant-collapse-header > .ant-collapse-header-text').click();
    //     cy.get('.firstParameter-para > p').click();
    //     cy.get('#dynamic_form_nest_item_users_1_name').clear();
    //     cy.get('#dynamic_form_nest_item_users_1_name').type('dasdsa');
    //     cy.get('#dynamic_form_nest_item_users_1_method').click();
    //     cy.get(':nth-child(5) > :nth-child(1) > .ant-select-dropdown > :nth-child(1) > .rc-virtual-list > .rc-virtual-list-holder > :nth-child(1) > .rc-virtual-list-holder-inner > .ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('dasdas');
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(3) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-row > .ant-col > .ant-form-item-control-input > .ant-form-item-control-input-content > .ant-input').type('dasdsa');
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadsa');
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(5) > :nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsadsa');
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').type('dsad');
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dsadsa');
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dasd');
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').clear();
    //     cy.get('.ant-collapse-item-active > .ant-collapse-content > .ant-collapse-content-box > .addParameterBlock > .parameterAdded-block > :nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').type('dsads');
    //     /* ==== End Cypress Studio ==== */
    // })
    // it("Save Multiple", () => {
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records')
    //     cy.log('Load Landing Page')
    //     cy.intercept('GET', '**/get_data_view', { fixture: 'paperBatchFileList.json' })
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    //     cy.wait(6000);

    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get('[d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"]').click({ force: true });
    //     cy.get('#basic_templateName').clear();
    //     cy.get('#basic_templateName').type('Cypress-test');
    //     cy.get(':nth-child(1) > :nth-child(2) > .pdfListBlock > span').click({ force: true });
    //     cy.get(':nth-child(1) > .ant-radio-button > .ant-radio-button-input').check({ force: true });
    //     cy.get('.ant-modal-footer > .ant-btn > span').click({ force: true });
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.wait(6000);
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(3) > .ant-collapse-header').click();
    //     cy.get('.firstParameter-para > p').click();
    //     cy.get('#dynamic_form_nest_item_users_0_name').clear();
    //     cy.get('#dynamic_form_nest_item_users_0_name').type('para1');
    //     cy.get('#dynamic_form_nest_item_users_0_method').click();
    //     cy.get('.ant-select-item-option-active > .ant-select-item-option-content').click();
    //     cy.get('#dynamic_form_nest_item_users_0_param_key').click({ force: true });
    //     cy.get('[coords="111.94621527194977,57.53743443638084,178.1889796704054,68.96316892467435"]').click({ force: true });
    //     cy.get('#dynamic_form_nest_item_users_0_param_snippet_value').click({ force: true });
    //     cy.get('[coords="205.69649124145508,57.55570698529482,267.6595058441161,68.86165171861641"]').click({ force: true });
    //     cy.get(':nth-child(1) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click({ force: true });
    //     cy.get('[coords="305.73044443130493,57.42703981697556,359.3141876310109,68.98802669718857"]').click({ force: true });
    //     cy.get(':nth-child(2) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click({ force: true });
    //     cy.get('[coords="363.9767521619797,58.17100867629048,382.82751093059767,69.43234605714675"]').click({ force: true });
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .ant-input').click({ force: true });
    //     cy.get('[coords="409.7616002559662,57.580265291035175,466.13211452960957,68.88628209941082"]').click({ force: true });
    //     cy.get(':nth-child(6) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click({ force: true });
    //     cy.get('[coords="506.286269903183,57.52309657633298,579.7775461822747,68.99929273873552"]').click({ force: true });
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
    //     cy.get('.pdfToImgBlock > div > img').click();
    //     cy.get(':nth-child(3) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
    //     cy.get('[coords="597.2250137329102,57.67178233712908,648.5210151225327,68.81591958925124"]').click({ force: true });
    //     cy.get(':nth-child(7) > :nth-child(4) > .ant-upload-drag > .ant-upload > .ant-upload-drag-container > .ant-upload-text-input > .input_field > .ant-input').click();
    //     cy.get('[coords="697.802242398262,57.54827614873646,725.8861341178416,71.42041257582598"]').click({ force: true });
    //     cy.get('.ant-btn > :nth-child(2)').click();
    //     cy.get('.pbrCenterPanelHeader-para').click();
    //     cy.get('.ant-modal-close-x > .anticon > svg > path').click();
    //     cy.get('.custom-primary-btn > span').click();
    //     cy.wait(6000);
    //     /* ==== End Cypress Studio ==== */
    // })
    // it("Edit Created Template", () => {
    //     cy.log('Edit Created Template')
    //     const url = Cypress.config().baseUrl
    //     cy.visit(url + '/#/dashboard/paper_batch_records')
    //     cy.intercept('GET', '**/pbr_template', { fixture: 'paperBatchLanding.json' })
    //     cy.log('Load Landing Page')
    //     cy.url().should('eq', url + '/#/dashboard/paper_batch_records')
    //     cy.wait(6000);


    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get(':nth-child(1) > .chart-tiles').click();
    //     cy.intercept('POST', '**/ocr-json-extraction', { fixture: 'pbrBoundingBox.json' })
    //     cy.wait(6000);
    //     /* ==== Generated with Cypress Studio ==== */
    //     cy.get('.pbrTemplateRight > .pbrPanel > .ant-layout-sider > .ant-layout-sider-children > .trigger > .panelImg').click();
    //     cy.get('[coords="111.94621527194977,57.53743443638084,178.1889796704054,68.96316892467435"]').click({ force: true })
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').type('150.88259327411652');
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type('66.95678142830727');
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('178.49597273766994');
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('78.26721033919598');
    //     cy.get('[coords="205.69649124145508,57.55570698529482,267.6595058441161,68.86165171861641"]').click({ force: true });
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').type('3.742130279541021');
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type('26.97486957535148');
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('235.11642265319813');
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('65.16671761870377');
    //     cy.get('[coords="305.73044443130493,57.42703981697556,359.3141876310109,68.98802669718857"]').click({ force: true });
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').type('2.825642108917241');
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type('56.24750088304278');
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('355.9002761095761');
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('63.29181725345548');
    //     cy.get('[coords="409.7616002559662,57.580265291035175,466.13211452960957,68.88628209941082"]').click({ force: true });
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').type('5.86837840080263');
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type('36.99918004497886');
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('261.70330584049213');
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('48.19109943602227');
    //     cy.get('[coords="597.2250137329102,57.67178233712908,648.5210151225327,68.81591958925124"]').click({ force: true });
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').type('291.550666809082');
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type('27.08977352455255');
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('242.3592952638863');
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('28.12144700624044');
    //     cy.get('[coords="697.802242398262,57.54827614873646,725.8861341178416,71.42041257582598"]').click({ force: true });
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(1) > .ant-input').type('291.1722923517227');
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(3) > :nth-child(2) > .ant-input').type('26.96751372888683');
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(1) > .ant-input').type('728.9893537461757');
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').clear();
    //     cy.get(':nth-child(4) > :nth-child(2) > .ant-input').type('20.69965611863874');
    //     cy.get('.custom-secondary-btn > span').click();
    //     cy.get('.ant-modal-close-x > .anticon > svg > path').click();
    //     /* ==== End Cypress Studio ==== */


    // });


});
