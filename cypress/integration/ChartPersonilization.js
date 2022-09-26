Cypress.Commands.add("multiselect", (options) => {
  options.forEach((option) => {
    cy.log(option);
    cy.get(".ant-select-item-option").contains(option).click();
  });
});

describe("Renders chart personalization", () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    localStorage.setItem("test_enabled", true);
    localStorage.setItem("user", "vinay.reddy@mareana.com");
    localStorage.setItem("username", "Vinay");
    localStorage.setItem("loginwith", "WITH_AD");
    localStorage.setItem(
      "login_details",
      JSON.stringify({
        ad_role: false,
        email_id: "vinay.reddy@mareana.com",
        firstname: "Vinay",
        lastname: "Reddy",
        email_id: "vinay.reddy@mareana.com",
        mdh_role: "USER",
        screen_set: "1000_USER",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc",
      })
    );
  });

  it("Chart Personalization working correctly", () => {
    const url = Cypress.config().baseUrl;
    cy.visit(url + "/#/dashboard/chart_personalization");
    cy.intercept("GET", "/services/v1/chart-list?chart_status=ALL", {
      fixture: "chartList.json",
    }).as("chartList");

    cy.wait("@chartList").then(() => {
      cy.log("Focusing on search input and waiting for data");
      cy.get(".ant-input").eq(1).focus();

      cy.log("Searching chart");
      cy.get(".ant-input").eq(1).type("C261");

      cy.wait(500);
      cy.get(".ant-input").eq(1).clear();

      cy.wait(500);
      cy.log("Searching chart");
      cy.get(".ant-input").eq(1).type("C263");

      cy.log(500);
      cy.get(".ant-input-search-button").eq(1).click();

      cy.log(500);
      cy.log("Selecting first row");

      cy.intercept("GET", "/services/v1/chart-object?chartId=*").as("chartId");
      cy.get(".ant-table-row").first().click();
      cy.wait("@chartId").then(() => {
        cy.log("Back on chart personalization page");
      });
    });
  });

  it("Chart Personalization page tile selection working correctly", () => {
    const url = Cypress.config().baseUrl;
    cy.visit(url + "/#/dashboard/chart_personalization");
    cy.intercept("GET", "/services/v1/chart-list?chart_status=ALL", {
      fixture: "chartList.json",
    }).as("chartList");
    cy.wait(5000);
    cy.wait("@chartList").then(() => {
      cy.log("clicking on first tile");
      cy.intercept("GET", "/services/v1/chart-object?chartId=*").as("chartId");
      cy.get(".chart-tiles").eq(1).click();
      cy.wait("@chartId").then(() => {
        cy.get(".chart-table").scrollTo("top");
        cy.get(
          ".cartesianlayer > .subplot > .plot > .scatterlayer > .trace > .points > path.point"
        )
          .eq(1)
          .click({ force: true, multiple: true });
        cy.get(
          ".cartesianlayer > .subplot > .plot > .scatterlayer > .trace > .points > path.point"
        )
          .eq(2)
          .click({ force: true, multiple: true });
        cy.log("Opening rules tab");
        cy.intercept("GET", "/services/v1/rules", {
          fixture: "chartPersonalizationRules.json",
        }).as("rulesPreload");
        cy.get(".ant-tabs-tab").eq(4).click({ force: true });
        cy.wait("@rulesPreload").then(() => {
          cy.log("rules loaded");
        });
      });
    });
  });

  it("Chart Personalization redirecting on create new correctly", () => {
    const url = Cypress.config().baseUrl;
    cy.intercept("GET", "/services/v1/chart-list?chart_status=ALL", {
      fixture: "chartList.json",
    }).as("chartList");
    cy.intercept("GET", "/services/v1/views-list?vew_status=APRD", {
      fixture: "viewListAPRD.json",
    }).as("viewList");
    cy.intercept("GET", "/services/v1/site_ids?view_id=", {
      fixture: "siteIdsEQUALS.json",
    }).as("siteIds");
    cy.visit(url + "/#/dashboard/chart_personalization");
    cy.wait(5000);
    cy.get(".create-new").first().click();
  });

  it("View is working correctly", () => {
    cy.wait(1000);

    // cy.log('Focussing on search to get list of view Ids')
    // cy.get('input[type="text"]').focus()

    cy.wait(500);
    cy.log("Inputing View Id");
    cy.get('input[type="text"]').eq(1).click();
    cy.get('input[type="text"]').eq(1).type("V238");

    cy.wait(3000);
    cy.log("Searching for a View Id");
    cy.get(".ant-input-search-button").eq(1).click();

    cy.wait(500);
    cy.intercept("GET", "/services/v1/site_ids?view_id=V238").as("viewId");
    cy.log("Selecting the first row");
    cy.get(".ant-table-row").first().click();
    cy.wait("@viewId").then(() => {
      cy.log("Changing version");
      cy.get(".ant-select-single").eq(0).click();

      cy.wait(500);
      cy.intercept("POST", "/services/v1/chart-object", {
        fixture: "changeVersion.json",
      }).as("chartObject");
      cy.intercept("GET", "/services/v1/site_ids?view_id=", {
        fixture: "siteIdsEQUALS.json",
      }).as("siteIds");
      cy.log("Selecting option 0");
      cy.get(".ant-select-item-option").eq(0).click();
      cy.wait("@chartObject").then(() => {
        cy.log("Changing site");
        cy.get(".ant-select-single").eq(1).click();

        cy.wait(500);
        cy.log("Selecting option last option");
        cy.get(".ant-select-item-option").last().click({ force: true });

        cy.wait(500);
        cy.log("Changing show unapproved data");
        cy.get(".ant-switch").first().click();

        cy.wait(500);
        cy.log("Selecting date range");
        cy.get(".ant-picker-range").click();
        cy.get(".ant-picker-header-prev-btn").first().click();
        cy.get(".ant-picker-cell").eq(7).click();
        cy.get(".ant-picker-cell").eq(12).click();

        cy.wait(500);
        cy.log("Hovering over tags");
        cy.get(".ant-tag").eq(0).trigger("mouseover");
        cy.wait(500);
        cy.get(".ant-tag").eq(0).trigger("mouseout");
        cy.get(".ant-tag").eq(1).trigger("mouseover");
        cy.wait(500);
        cy.get(".ant-tag").eq(1).trigger("mouseout");

        cy.wait(500);
        cy.log("Clicking on filter");
        cy.get(".anticon-filter").first().click();

        cy.wait(500);
        cy.log("Entering filter data");
        cy.get("#show-last-number").type(2);
        cy.get("#show-last-duration").click();
        cy.get(".ant-select-item-option-content").contains("days").click();

        cy.wait(500);
        cy.log("Clearing filters");
        cy.get(".clear").first().click();

        cy.wait(500);
        cy.log("Entering filter data");
        cy.get("#show-last-number").type(2);
        cy.get("#show-last-duration").click();
        cy.get(".ant-select-item-option-content").contains("days").click();

        cy.log("Applying filters");
        cy.get(".apply").first().click();

        cy.wait(500);
        cy.log("Clicking on apply");
        cy.get("#side-view-batch-coverage-apply-button").click();

        cy.wait(500);
        cy.intercept("POST", "/services/v1/chart-object", {
          fixture: "chartObjectFiltersApplied.json",
        }).as("chartObjectFilters");
        cy.log("Applying filters");
        cy.get("#side-view-batch-coverage-apply-button").click();
        cy.wait("@chartObjectFilters").then(() => {
          cy.log("Filters applied");
        });
      });
    });
  });

  it("Creating new chart working correctly", () => {
    cy.wait(500);
    cy.get(".ant-input").eq(2).type("NEW_CHART");
    cy.get(".ant-input").eq(3).type("NEW_CHART_DESCRIPTION");

    cy.wait(500);
    cy.log("Selecting Chart Type");
    cy.get(".ant-select-selector").eq(2).click();
    cy.get(".ant-select-item-option-content")
      .contains("Process Control")
      .click();

    cy.wait(500);
    cy.log("Selecting X-axis");
    cy.get(".ant-select-selector").eq(3).click();
    cy.get(".ant-select-item-option-active").contains("Batch").click();

    cy.wait(500);
    cy.log("Selecting Y-axis");
    cy.get(".ant-select-selector").eq(4).click();
    cy.get(
      '[title="NORMAL_MUL_HEAVY"] > .ant-select-item-option-content'
    ).click();

    cy.intercept("POST", "/services/v1/chart-object", {
      fixture: "chartObjectCreate.json",
    }).as("chartObjectPost");
    cy.get(".button-visible > .ant-btn").click();
    cy.wait("@chartObjectPost");
  });

  it("Applying limits is working correctly", () => {
    cy.wait(500);
    cy.log("Opening limits tab");
    cy.get(".ant-tabs-tab").eq(1).click({ force: true });

    cy.wait(500);
    cy.log("Adding control limit");
    cy.get(".table-bottom .ant-btn").eq(1).click();

    cy.get(".control-header").first().scrollIntoView();
    cy.get(".ant-table-tbody .ant-input").eq(0).type("10.1", { force: true });
    cy.get(".ant-table-tbody .ant-input").eq(1).type("10.2", { force: true });

    cy.log("Adding second control limit");
    cy.get(".table-bottom .ant-btn").eq(1).click();
    cy.get(".ant-table-tbody .ant-input").eq(2).type("10.1", { force: true });
    cy.get(".ant-table-tbody .ant-input").eq(3).type("10.2", { force: true });

    cy.log("Deleting second control limit");
    cy.get(".control-header").first().scrollIntoView();
    cy.get('[data-row-key="2"] > :nth-child(1)').click();
    cy.get(".ant-btn-primary").click();

    cy.log("Adding specification");
    cy.get(".table-bottom .ant-btn").eq(2).click();
    cy.get(".ant-table-tbody .ant-input").eq(2).type("10.1", { force: true });
    cy.get(".ant-table-tbody .ant-input").eq(3).type("10.2", { force: true });

    cy.log("Adding second specification");
    cy.get(".table-bottom .ant-btn").eq(2).click();
    cy.get(".ant-table-tbody .ant-input").eq(4).type("10.1", { force: true });
    cy.get(".ant-table-tbody .ant-input").eq(5).type("10.2", { force: true });

    cy.log("Deleting second specification");
    cy.get('[data-row-key="2"] > :nth-child(1)').click();
    cy.get(".ant-btn-primary").click();

    cy.log("Adding Warning");
    cy.get(".table-bottom .ant-btn").eq(3).click();
    cy.get(".ant-table-tbody .ant-input").eq(4).type("10.1", { force: true });
    cy.get(".ant-table-tbody .ant-input").eq(5).type("10.2", { force: true });

    cy.log("Adding second warning");
    cy.get(".table-bottom .ant-btn").eq(3).click();
    cy.get(".ant-table-tbody .ant-input").eq(6).type("10.1", { force: true });
    cy.get(".ant-table-tbody .ant-input").eq(7).type("10.2", { force: true });

    cy.log("Deleting second warning");
    cy.get('[data-row-key="2"] > :nth-child(1)').click();
    cy.get(".ant-btn-primary").click();
    cy.intercept("POST", "/services/v1/chart-object", {
      fixture: "chartObjectLimits.json",
    }).as("chartObjectLimits");
    cy.get(".control-header > .ant-btn").click();
    cy.wait("@chartObjectLimits").then(() => {
      cy.log("Limits applied");
    });
  });

  it("Changing display is working correctly", () => {
    cy.wait(500);
    cy.log("Opening display tab");
    cy.get(".ant-tabs-tab").eq(2).click({ force: true });

    cy.wait(500);
    cy.log("Opening Figure");
    cy.get(".ant-collapse-item").first().click();

    cy.log("Changing height");
    cy.get(":nth-child(1) > .ant-col-16 > .input_field > .ant-input").clear();
    cy.get(":nth-child(1) > .ant-col-16 > .input_field > .ant-input").type(
      "500"
    );

    cy.log("Changing width");
    cy.get(":nth-child(2) > .ant-col-16 > .input_field > .ant-input").clear();
    cy.get(":nth-child(2) > .ant-col-16 > .input_field > .ant-input").type(
      "1200"
    );

    cy.log("Changing plot color");
    cy.get(':nth-child(3) > .ant-col-16 > .container > [type="text"]').clear();
    cy.get(':nth-child(3) > .ant-col-16 > .container > [type="text"]').type(
      "#EEEEEE"
    );

    cy.log("Changing marker shape");
    cy.get(".figure-container .select_field").eq(0).click();
    cy.get('[title="triangle-up"] > .ant-select-item-option-content').click();

    cy.log("Changing marker color");
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(1)
      .clear();
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(1)
      .type("#228B22");

    cy.log("Changing marker size");
    cy.get(".figure-container .figure-inputs .input_field").eq(2).clear();
    cy.get(".figure-container .figure-inputs .input_field").eq(2).type("18");

    cy.log("Changing violations shape");
    cy.get(".figure-container .select_field").eq(1).click();
    cy.get('[title="triangle-down"] > .ant-select-item-option-content')
      .eq(1)
      .click();

    cy.log("Changing violations color");
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(2)
      .clear();
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(2)
      .type("#FFA500");

    cy.log("Changing violations size");
    cy.get(".figure-container .figure-inputs .input_field").eq(3);
    cy.get(".figure-container .figure-inputs .input_field").eq(3).clear();
    cy.get(".figure-container .figure-inputs .input_field").eq(3).type("18");

    cy.log("Adding title");
    cy.get(":nth-child(14) > .ant-col-16 > .input_field > .ant-input").clear();
    cy.get(":nth-child(14) > .ant-col-16 > .input_field > .ant-input").type(
      "NEW CHART"
    );

    cy.log("Changing font size");
    cy.get(":nth-child(14) > .ant-col-16 > .input_field > .ant-input").clear();
    cy.get(":nth-child(14) > .ant-col-16 > .input_field > .ant-input").type(
      "24"
    );

    cy.wait(500);
    cy.log("Opening Legend");
    cy.get(".ant-collapse-item").eq(1).click();

    cy.get(":nth-child(3) > .ant-col-16 > .input_field > .ant-input").clear();
    cy.get(":nth-child(3) > .ant-col-16 > .input_field > .ant-input").type(
      "Legend!"
    );

    cy.get(":nth-child(4) > .ant-col-16 > .input_field > .ant-input").clear();
    cy.get(":nth-child(4) > .ant-col-16 > .input_field > .ant-input").type(
      "10"
    );

    cy.log("Changing legend color");
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(4)
      .clear();
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(4)
      .type("#F2F2F2");

    cy.log("Changing border color");
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(5)
      .clear();
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(5)
      .type("#F2F2F2");

    cy.log("Changing background color");
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(6)
      .clear();
    cy.get('.figure-container .figure-inputs .container input[type="text"]')
      .eq(6)
      .type("#F2F2F2");

    cy.wait(500);
    cy.log("Opening Axis");
    cy.get(".ant-collapse-item").eq(2).click();

    cy.log("Hiding X-axis grid lines");
    cy.get(".figure-container .ant-switch").eq(1).click({ force: true });
  });
  it("Applying Threshold parameters working correctly", () => {
    cy.wait(500);
    cy.log("Opening threshold tab");
    cy.get(".ant-tabs-tab").eq(3).click({ force: true });

    cy.wait(500);
    cy.get(".tresh-container > .ant-row > .ant-col > .ant-btn").click();
    cy.wait(500);
    cy.get(".extra-coll").click();
    cy.get(".ant-btn-primary").click();
    cy.wait(500);
    cy.get(".tresh-container > .ant-row > .ant-col > .ant-btn").click();
    cy.get(
      ":nth-child(2) > .ant-collapse > .ant-collapse-item > .ant-collapse-header"
    ).click();
    cy.get(
      ".ant-collapse-content-box > :nth-child(1) > .ant-col > .select_field > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.get(
      '[title="NORMAL_MUL_HEAVY"] > .ant-select-item-option-content'
    ).click({ multiple: true, force: true });
    cy.get(".ant-select-item-option-active")
      .contains("NORMAL_MUL_HEAVY")
      .click({ force: true });
    cy.get(
      ":nth-child(2) > :nth-child(1) > .select_field > .ant-select > .ant-select-selector"
    ).click();
    cy.get(".ant-select-item-option-active").contains("Lesser than").click();
    cy.get("#threshold_value").type("10.1");
    cy.get(
      ":nth-child(4) > :nth-child(1) > .select_field > .ant-select > .ant-select-selector"
    ).click();
    cy.get(".ant-select-item-option-active").contains("circle").click();
    cy.get(
      ".ant-collapse-content-box > :nth-child(4) > :nth-child(2) > .input_field > .ant-input"
    )
      .clear()
      .type("14");
    cy.get(
      '.ant-collapse-content-box > :nth-child(5) > .ant-col > .container > [type="text"]'
    )
      .clear()
      .type("#d21010");
    // cy.get('.container > [type="text"]').clear().type("#d21010");
    cy.get(".extra-coll > .ant-btn").click();
    cy.get(".extra-coll").click();
    cy.get(".ant-btn-primary").click();
    cy.get(".tresh-container > .ant-row > .ant-col > .ant-btn").click();
    cy.get(
      ":nth-child(2) > .ant-collapse > .ant-collapse-item > .ant-collapse-header"
    ).click();
    cy.get(
      ".ant-collapse-content-box > :nth-child(1) > .ant-col > .select_field > .ant-select > .ant-select-selector > .ant-select-selection-item"
    ).click();
    cy.get(
      '[title="NORMAL_MUL_HEAVY"] > .ant-select-item-option-content'
    ).click({ multiple: true, force: true });
    cy.get(".ant-select-item-option-active")
      .contains("NORMAL_MUL_HEAVY")
      .click({ force: true });
    cy.get(
      ":nth-child(2) > :nth-child(1) > .select_field > .ant-select > .ant-select-selector"
    ).click();
    cy.get(".ant-select-item-option-active").contains("Lesser than").click();
    cy.get("#threshold_value").type("10.1");
    cy.get(
      ":nth-child(4) > :nth-child(1) > .select_field > .ant-select > .ant-select-selector"
    ).click();
    cy.get(".ant-select-item-option-active").contains("circle").click();
    cy.get(
      ".ant-collapse-content-box > :nth-child(4) > :nth-child(2) > .input_field > .ant-input"
    )
      .clear()
      .type("14");
    cy.get(
      '.ant-collapse-content-box > :nth-child(5) > .ant-col > .container > [type="text"]'
    )
      .clear()
      .type("#d21010");
    cy.get(".extra-coll > .ant-btn").click();
  });
  it("Applying rules is working correctly", () => {
    cy.wait(500);
    cy.log("Opening rules tab");
    cy.intercept("GET", "/services/v1/rules", {
      fixture: "chartPersonalizationRules.json",
    }).as("rules");
    cy.get(".ant-tabs-tab").eq(4).click({ force: true });
    cy.wait("@rules").then(() => {
      cy.log("Opening Nelson");
      cy.get(".rule-container .ant-collapse-item").eq(0).click();

      cy.get(".rule-container .anticon-plus-circle").eq(0).click();
      cy.get("#my-inputs").clear();
      cy.get("#my-inputs").type("10");
      cy.get(".rule-container .ant-checkbox-input").first().click();
      cy.get(".rule-container .ant-checkbox-input").first().click();
      cy.get(".rule-container .ant-checkbox-input").first().click();
      cy.get(".rule-container .anticon-plus-circle").eq(0).click();

      cy.log("Applying new rules");
      cy.intercept("POST", "/services/v1/chart-object", {
        fixture: "chartRulesNelson.json",
      }).as("newRules1");
      cy.get(".apply-cont .ant-btn").last().click();
      cy.wait("@newRules1");

      cy.intercept("POST", "/services/v1/chart-object", {
        fixture: "chartRulesReset.json",
      }).as("newRules2");
      cy.get(".rule-container p").contains("Reset").click();
      cy.wait("@newRules2");

      cy.log("Opening Wecko");
      cy.get(".rule-container .ant-collapse-item").eq(1).click();
    });
  });

  it("Scheduled Alert is working correctly", () => {
    cy.log("Opening schedule alert modal");
    cy.get(".sub-header > .btns .ant-btn").eq(1).click({ force: true });

    cy.wait(500);
    cy.log("Selecting date");
    cy.get(".chart-notify .ant-picker").first().click();
    cy.wait(500);
    cy.get(".ant-picker-header-next-btn").last().click();
    cy.wait(500);
    cy.get(".ant-picker-cell.ant-picker-cell-start.ant-picker-cell-in-view");
    cy.get(".ant-picker-cell.ant-picker-cell-start.ant-picker-cell-in-view")
      .last()
      .click();

    cy.wait(500);
    cy.log("Selecting repetition");
    cy.get(".select-report-antd").first().click();
    cy.log("Selecting Repeat once");
    cy.get('[title="Repeat once"]').click();

    cy.wait(500);
    cy.log("Selecting Time");
    cy.get(".ant-picker").last().click();
    cy.get(".ant-picker-now").last().click();
    cy.wait(500);
    cy.get(".ant-picker").last().click();
    cy.get(".ant-picker-time-panel-cell").eq(7).click();
    cy.get(".ant-picker-time-panel-cell").eq(24).click();
    cy.get(".ant-picker-time-panel-cell").eq(84).click();
    cy.get(".ant-picker-ok").click();

    cy.intercept("PUT", "/services/v1/jobs").as("schedule");
    cy.get(
      ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
    ).click();
    cy.wait("@schedule").then(() => {
      cy.wait(500);
      cy.log("Selecting repetition");
      cy.get(".select-report-antd").first().click();
      cy.log("Selecting Daily");
      cy.get('[title="Daily"]').click();

      cy.intercept("PUT", "/services/v1/jobs").as("schedule");
      cy.get(
        ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
      ).click();
      cy.wait("@schedule").then(() => {
        cy.get(".radio-daily .ant-space-item .ant-radio-input").eq(0).click();
        cy.intercept("PUT", "/services/v1/jobs").as("schedule");
        cy.get(
          ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
        ).click();
        cy.wait("@schedule").then(() => {
          cy.get(".radio-daily .ant-space-item .ant-radio-input").eq(1).click();
          cy.intercept("PUT", "/services/v1/jobs").as("schedule");
          cy.get(
            ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
          ).click();
          cy.wait("@schedule").then(() => {
            cy.get(".radio-daily .ant-space-item .ant-radio-input")
              .eq(2)
              .click();
            cy.intercept("PUT", "/services/v1/jobs").as("schedule");
            cy.get(
              ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
            ).click();
            cy.wait("@schedule").then(() => {
              cy.get(".radio-daily .ant-space-item #everyFewTimeUnits").type(
                "6"
              );
              cy.intercept("PUT", "/services/v1/jobs").as("schedule");
              cy.get(
                ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
              ).click();
              cy.wait("@schedule").then(() => {
                cy.wait(500);
                cy.log("Selecting repetition");
                cy.get(".select-report-antd").first().click();
                cy.log("Selecting Weekly");
                cy.get('[title="Weekly"]').click();
                cy.get(".evaluation-tabs .select-days .day-buttons")
                  .eq(1)
                  .click();
                cy.intercept("PUT", "/services/v1/jobs").as("schedule");
                cy.get(
                  ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
                ).click();
                cy.wait("@schedule").then(() => {
                  cy.wait(500);
                  cy.log("Selecting repetition");
                  cy.get(".select-report-antd").first().click();
                  cy.log("Selecting Monthly");
                  cy.get('[title="Monthly"]').click();
                  cy.intercept("PUT", "/services/v1/jobs").as("schedule");
                  cy.get(
                    ".ant-tabs-extra-content .evaluation .schedule-evalutaion-button"
                  ).click();
                  cy.wait("@schedule").then(() => {
                    cy.wait(500);
                    cy.get(
                      '.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab'
                    )
                      .eq(1)
                      .click();
                    cy.get(".ant-modal-close-icon").eq(1).click();

                    cy.wait(500);
                    cy.get(
                      '.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab'
                    )
                      .eq(0)
                      .click();

                    cy.wait(500);
                    cy.get(
                      '.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab'
                    )
                      .eq(1)
                      .click();
                    cy.get(".schedule-notification-different").first().click();

                    cy.wait(500);
                    cy.get(
                      '.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab'
                    )
                      .eq(0)
                      .click();

                    cy.wait(500);
                    cy.get(
                      '.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab'
                    )
                      .eq(1)
                      .click();
                    cy.get(".schedule-notification-same").first().click();

                    cy.wait(500);
                    cy.get(
                      '.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab'
                    )
                      .eq(0)
                      .click();
                    cy.get(".chart-notify .evaluation .clear-schedule")
                      .first()
                      .click();

                    cy.wait(500);
                    cy.log("Opening scheduled alerts");
                    cy.intercept(
                      "GET",
                      "/services/v1/jobs?app_type=CHART&app_id=*",
                      { fixture: "scheduledAlerts.json" }
                    ).as("jobs");

                    cy.get(
                      ".ant-tabs-left > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)"
                    ).click();
                    cy.wait("@jobs").then(() => {
                      cy.intercept("DELETE", "/services/v1/jobs").as(
                        "scheduleDelete"
                      );
                      cy.intercept(
                        "GET",
                        "/services/v1/jobs?app_type=CHART&app_id=*",
                        { fixture: "scheduledAlertsRecall.json" }
                      ).as("jobs");
                      cy.get(
                        ".schedule-table .ant-table-tbody > .ant-table-row-level-0"
                      )
                        .first()
                        .get(".anticon.anticon-delete")
                        .eq(2)
                        .click();
                      cy.get(".ant-popover-buttons > .ant-btn-primary").click();
                      cy.wait("@scheduleDelete");
                      cy.wait("@jobs").then(() => {
                        cy.intercept(
                          "GET",
                          "/services/v1/jobs?app_type=CHART&dag_id=*"
                        ).as("dagId");
                        cy.log("Closing modal");
                        cy.get(".ant-modal-close-icon").first().click();
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });

  it("Saves correctly", () => {
    cy.log("Saving chart");
    // cy.intercept('PUT', '/services/v1/chart-object', { fixture: 'saveChart.json' }).as('saveChart')
    cy.wait(3000);
    cy.get(".ant-btn").eq(3).click();
    cy.wait(5000);
  });

  it("Publishes correctly", () => {
    cy.log("Publishing chart");
    cy.get(".ant-btn").eq(5).click();

    cy.wait(500);
    cy.get(".ant-modal-content .ant-modal-close-x");
    cy.get(".ant-modal-content .ant-modal-close-x").last().click();

    cy.wait(500);
    cy.get(".ant-btn").eq(5).click();

    //cy.get('.sign-cols > :nth-child(1) > .ant-input').type('bhanu.thareja@mareana.com')
    cy.get(".sign-cols > :nth-child(2) > .ant-input").type("1@Gam95367");

    cy.intercept("GET", "/auth/login-pass", {
      fixture: "authenticateWithAD.json",
    }).as("authenticateWithAD");
    cy.get(".ant-modal-footer > :nth-child(1)").click();
    cy.wait("@authenticateWithAD").then(() => {
      cy.get(
        ".electronic-sig > :nth-child(2) > .ant-select > .ant-select-selector"
      ).click();
      cy.get('[title="I am an approver"]').click();
      cy.intercept("PUT", "/services/v1/workflow-publish-event").as("publish");
      cy.get(".ant-modal-footer > .custom-secondary-btn").click();
    });
  });
});
