
Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
});

describe('PBR', () => {
    // it("should login successfully using Ad", () => {
    beforeEach(() => {
        
        cy.intercept('GET', '/pbr/udh/get_data_view?actionType=get_product_num&productNum=', { fixture: 'productNum' }).as("get_data_view")
        cy.intercept('GET', '/pbr/udh/pbr_template', { fixture: 'paperBatchLanding' }).as("pbr_template")
        cy.intercept('GET', '/pbr/udh/pbr_template?limit=8', { fixture: 'paperBatchLmitList' }).as("limitlist")
        cy.intercept('GET', '/pbr/udh/get_data_view?actionType=get_all&productNum=1091460', { fixture: 'paperBatchFileList' }).as("productNum")
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

    it("go back to landing page",()=>{
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
    })
    it("wait",()=>{
        cy.wait(60000);
    })
    it("Click on the card",()=>{
        
        cy.get('.ant-input').click({force:true})
        cy.get('.ant-input').type("p258")
        cy.get('.ant-input-search-button').click({force:true})
        cy.wait(6000)
        // cy.get('.ant-table-row > :nth-child(1)').click({force:true})
        
        cy.get('.chart-tiles').click({force:true})
    })

    it("Edit Created Template", () => {
        cy.wait(6000)
        cy.get('#page-Identifier > .ant-collapse-header').click({ force: true });
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
        cy.wait(6000)
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

   

});
