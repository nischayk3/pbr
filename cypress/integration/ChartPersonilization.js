Cypress.Commands.add("multiselect", (options) => {
  options.forEach((option) => {
    cy.log(option)
    cy.get('.ant-select-item-option').contains(option).click()
  });
});

describe('Renders chart personalization', () => {
  beforeEach(() => {
    cy.viewport(1280, 720)
    localStorage.setItem("test_enabled", true);
    localStorage.setItem("user", "bhanu.thareja@mareana.com");
    localStorage.setItem("username", "Bhanu");
    localStorage.setItem(
      "login_details",
      JSON.stringify({
        ad_role: false,
        email_id: "bhanu.thareja@mareana.com",
        firstname: "Bhanu",
        lastname: "Thareja",
        email_id: "bhanu.thareja@mareana.com",
        mdh_role: "USER",
        screen_set: "1000_USER",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkZhaGFkIFNpZGRpcXVpIiwidW5peF90aW1lc3RhbXAiOjE2NDg0NTQ4OTUuMzc5OTQzLCJ0aW1lc3RhbXAiOiIyOC8wMy8yMDIyIDA4OjA4OjE1IiwiZXhwIjo0ODAyMDU0ODk1LCJhZF9yb2xlIjpmYWxzZSwibWRoX3JvbGUiOiJVU0VSIiwiZW1haWxfaWQiOiJmYWhhZC5zaWRkaXF1aUBtYXJlYW5hLmNvbSIsImN1c3Rfa2V5IjoiMTAwMCJ9.pP2tG-5PmpqozTuX1-q_GwEkvYkigrxLWGyUcgP-CDc"
      })
    );
  })

  it('Loads Chart personalization page correctly', () => {
    cy.visit('http://localhost/#/dashboard/workspace')
    cy.wait(5000)
  })

  it('Chart Personalization working correctly', () => {
    cy.intercept('GET', '/services/v1/chart-list?chart_status=ALL', { fixture: 'chartList.json' }).as('chartList')
    cy.get('#chart_personalization').click()

    cy.wait('@chartList').then(() => {
      cy.log('Focusing on search input and waiting for data')
      cy.get('.ant-input').first().focus()

      cy.log('Searching chart')
      cy.get('.ant-input').first().type('C261')

      cy.wait(500)
      cy.get('.ant-input').first().clear()

      cy.wait(500)
      cy.log('Searching chart')
      cy.get('.ant-input').first().type('C263')

      cy.log(500)
      cy.get('.ant-input-search-button').first().click()

      cy.log(500)
      cy.log('Selecting first row')

      cy.intercept('GET', '/services/v1/chart-object?chartId=*').as('chartId')
      cy.get('.ant-table-row').first().click()
      cy.wait('@chartId').then(() => {
        cy.intercept('GET', '/services/v1/chart-list?chart_status=ALL', { fixture: 'chartList.json' }).as('chartList2')
        cy.go('back')
        cy.wait('@chartList2')
      })
    })
  })

  it('Chart Personalization page tile selection working correctly', () => {
    cy.log('clicking on first tile')
    cy.intercept('GET', '/services/v1/chart-object?chartId=*').as('chartId')
    cy.get('.chart-tiles').eq(1).click()
    cy.wait('@chartId').then(() => {
      // cy.wait(2000)
      // cy.get('.cartesianlayer > .subplot > .plot > .scatterlayer > .trace > .points > path.point').eq(4).click({ force: true, multiple: true })
      // cy.log('Opening rules tab')
      // cy.intercept('GET', '/services/v1/rules', { fixture: 'chartPersonalizationRules.json' }).as('rulesPreload')
      // cy.get('.ant-tabs-tab').eq(4).click({ force: true })
      // // cy.wait('@rulesPreload').then(() => {
      // //   cy.log('rules loaded')
      // //   cy.go('back')
      // // })
    })
  })

  it('Scheduled Alert is working correctly', () => {

    cy.log('Opening schedule alert modal')
    cy.get('.sub-header > .btns .ant-btn').eq(1).click({ force: true })

    cy.wait(500)
    cy.log('Selecting date')
    cy.get('.chart-notify .ant-picker').first().click()
    cy.wait(500)
    cy.get('.ant-picker-header-next-btn').last().click()
    cy.wait(500)
    cy.get('.ant-picker-cell.ant-picker-cell-start.ant-picker-cell-in-view')
    cy.get('.ant-picker-cell.ant-picker-cell-start.ant-picker-cell-in-view').last().click()

    cy.wait(500)
    cy.log('Selecting repetition')
    cy.get('.select-report-antd').first().click()
    cy.log('Selecting Repeat once')
    cy.get('[title="Repeat once"]').click()

    cy.wait(500)
    cy.log('Selecting Time')
    cy.get('.ant-picker').last().click()
    cy.get('.ant-picker-now').last().click()
    cy.wait(500)
    cy.get('.ant-picker').last().click()
    cy.get('.ant-picker-time-panel-cell').eq(7).click()
    cy.get('.ant-picker-time-panel-cell').eq(24).click()
    cy.get('.ant-picker-time-panel-cell').eq(84).click()
    cy.get('.ant-picker-ok').click()

    cy.intercept('PUT', '/services/v1/jobs').as('schedule')
    cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
    cy.wait('@schedule').then(() => {
      cy.wait(500)
      cy.log('Selecting repetition')
      cy.get('.select-report-antd').first().click()
      cy.log('Selecting Daily')
      cy.get('[title="Daily"]').click()

      cy.intercept('PUT', '/services/v1/jobs').as('schedule')
      cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
      cy.wait('@schedule').then(() => {
        cy.get('.radio-daily .ant-space-item .ant-radio-input').eq(0).click()
        cy.intercept('PUT', '/services/v1/jobs').as('schedule')
        cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
        cy.wait('@schedule').then(() => {
          cy.get('.radio-daily .ant-space-item .ant-radio-input').eq(1).click()
          cy.intercept('PUT', '/services/v1/jobs').as('schedule')
          cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
          cy.wait('@schedule').then(() => {
            cy.get('.radio-daily .ant-space-item .ant-radio-input').eq(2).click()
            cy.intercept('PUT', '/services/v1/jobs').as('schedule')
            cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
            cy.wait('@schedule').then(() => {
              cy.get('.radio-daily .ant-space-item #everyFewTimeUnits').type('6')
              cy.intercept('PUT', '/services/v1/jobs').as('schedule')
              cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
              cy.wait('@schedule').then(() => {
                cy.wait(500)
                cy.log('Selecting repetition')
                cy.get('.select-report-antd').first().click()
                cy.log('Selecting Weekly')
                cy.get('[title="Weekly"]').click()
                cy.get('.evaluation-tabs .select-days .day-buttons').eq(1).click()
                cy.intercept('PUT', '/services/v1/jobs').as('schedule')
                cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
                cy.wait('@schedule').then(() => {
                  cy.wait(500)
                  cy.log('Selecting repetition')
                  cy.get('.select-report-antd').first().click()
                  cy.log('Selecting Monthly')
                  cy.get('[title="Monthly"]').click()
                  cy.intercept('PUT', '/services/v1/jobs').as('schedule')
                  cy.get('.ant-tabs-extra-content .evaluation .schedule-evalutaion-button').click()
                  cy.wait('@schedule').then(() => {
                    cy.wait(500)
                    cy.get('.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab').eq(1).click()
                    cy.get('.ant-modal-close-icon').eq(1).click()

                    cy.wait(500)
                    cy.get('.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab').eq(0).click()



                    cy.wait(500)
                    cy.get('.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab').eq(1).click()
                    cy.get('.schedule-notification-different').first().click()

                    cy.wait(500)
                    cy.get('.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab').eq(0).click()



                    cy.wait(500)
                    cy.get('.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab').eq(1).click()
                    cy.get('.schedule-notification-same').first().click()

                    cy.wait(500)
                    cy.get('.chart-notify [role="tablist"] .ant-tabs-nav-wrap .ant-tabs-nav-list .ant-tabs-tab').eq(0).click()
                    cy.get('.chart-notify .evaluation .clear-schedule').first().click()



                    cy.wait(500)
                    cy.log('Opening scheduled alerts')
                    cy.intercept('GET', '/services/v1/jobs?app_type=CHART&app_id=*').as('jobs')

                    cy.get('.ant-tabs-left > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click()
                    cy.wait('@jobs').then(() => {

                      cy.intercept('DELETE', '/services/v1/jobs').as('scheduleDelete')
                      cy.intercept('GET', '/services/v1/jobs?app_type=CHART&app_id=*').as('jobs')
                      cy.get('.schedule-alerts .schedule-table .ant-table-row .anticon.anticon-delete').first().click()
                      cy.get('.ant-popover-buttons > .ant-btn-primary').click()
                      cy.wait('@scheduleDelete')
                      cy.wait('@jobs').then(() => {
                        cy.intercept('GET', '/services/v1/jobs?app_type=CHART&dag_id=*').as('dagId')
                        cy.get('.schedule-alerts .schedule-table .ant-table-row .ant-table-cell').eq(1).get('u > a').first().click()
                        cy.wait('@dagId')
                      })
                      // cy.wait(500)
                      // cy.log('Closing modal')
                      // cy.get('.ant-modal-close-icon').first().click()
                    })
                  })
                })
              })
            })
          })
        })
      })
    })
  })

  // it('Chart Personalization redirecting on create new correctly', () => {
  //   cy.intercept('GET', '/services/v1/views-list?vew_status=APRD', { fixture: 'viewListAPRD.json' }).as('viewList')
  //   cy.intercept('GET', '/services/v1/site_ids?view_id=', { fixture: 'siteIdsEQUALS.json' }).as('siteIds')
  //   cy.get('.create-new').first().click()
  //   cy.log('Waiting for view-list and site_ids apis to finish')

  //   cy.wait('@viewList')
  //   cy.wait('@siteIds')
  // })

  // it('View is working correctly', () => {
  //   cy.wait(1000)

  //   cy.log('Focussing on search to get list of view Ids')
  //   cy.get('input[type="text"]').focus()

  //   cy.wait(500)
  //   cy.log('Inputing View Id')
  //   cy.get('input[type="text"]').type('v238')

  //   cy.wait(500)
  //   cy.log('Searching for a View Id')
  //   cy.get('.ant-input-search-button').first().click()

  //   cy.wait(500)
  //   cy.intercept('GET', '/services/v1/site_ids?view_id=V238').as('viewId')
  //   cy.log('Selecting the first row')
  //   cy.get('.ant-table-row').first().click()
  //   cy.wait('@viewId').then(() => {
  //     cy.log('Changing version')
  //     cy.get('.ant-select-single').eq(0).click()

  //     cy.wait(500)
  //     cy.intercept('POST', '/services/v1/chart-object', { fixture: 'changeVersion.json' }).as('chartObject')
  //     cy.log('Selecting option 0')
  //     cy.get('.ant-select-item-option').eq(0).click()
  //     cy.wait('@chartObject').then(() => {
  //       cy.log('Changing site')
  //       cy.get('.ant-select-single').eq(1).click()

  //       cy.wait(500)
  //       cy.log('Selecting option last option')
  //       cy.get('.ant-select-item-option').last().click()

  //       cy.wait(500)
  //       cy.log('Changing show unapproved data')
  //       cy.get('.ant-switch').first().click()

  //       cy.wait(500)
  //       cy.log('Selecting date range')
  //       cy.get('.ant-picker-range').click()
  //       cy.get('.ant-picker-header-prev-btn').first().click()
  //       cy.get('.ant-picker-cell').eq(0).click()
  //       cy.get('.ant-picker-cell').eq(6).click()

  //       cy.wait(500)
  //       cy.log('Hovering over tags')
  //       cy.get('.ant-tag').eq(0).trigger('mouseover')
  //       cy.wait(500)
  //       cy.get('.ant-tag').eq(0).trigger('mouseout')
  //       cy.get('.ant-tag').eq(1).trigger('mouseover')
  //       cy.wait(500)
  //       cy.get('.ant-tag').eq(1).trigger('mouseout')

  //       cy.wait(500)
  //       cy.log('Clicking on filter')
  //       cy.get('.anticon-filter').first().click()

  //       cy.wait(500)
  //       cy.log('Entering filter data')
  //       cy.get('#show-last-number').type(2)
  //       cy.get('#show-last-duration').click()
  //       cy.get('.ant-select-item-option-content').contains('days').click()

  //       cy.wait(500)
  //       cy.log('Clearing filters')
  //       cy.get('.clear').first().click()

  //       cy.wait(500)
  //       cy.log('Entering filter data')
  //       cy.get('#show-last-number').type(2)
  //       cy.get('#show-last-duration').click()
  //       cy.get('.ant-select-item-option-content').contains('days').click()

  //       cy.log('Applying filters')
  //       cy.get('.apply').first().click()

  //       cy.wait(500)
  //       cy.log('Clicking on apply')
  //       cy.get('#side-view-batch-coverage-apply-button').click()

  //       cy.wait(500)
  //       cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectFiltersApplied.json' }).as('chartObjectFilters')
  //       cy.log('Applying filters')
  //       cy.get('#side-view-batch-coverage-apply-button').click()
  //       cy.wait('@chartObjectFilters').then(() => {
  //         cy.log('Filters applied')
  //       })
  //     })
  //   })
  // })

  // it('Creating new chart working correctly', () => {
  //   cy.wait(500)
  //   cy.get('.ant-input').eq(1).type('NEW_CHART')
  //   cy.get('.ant-input').eq(2).type('NEW_CHART_DESCRIPTION')

  //   cy.wait(500)
  //   cy.log('Selecting Chart Type')
  //   cy.get('.ant-select-selector').eq(2).click()
  //   cy.get('.ant-select-item-option-content').contains('Process Control').click()

  //   cy.wait(500)
  //   cy.log('Selecting X-axis')
  //   cy.get('.ant-select-selector').eq(3).click()
  //   cy.get('.ant-select-item-option-active').contains('Batch').click()

  //   cy.wait(500)
  //   cy.log('Selecting Y-axis')
  //   cy.get('.ant-select-selector').eq(4).click()
  //   cy.get('[title="NORMAL_MUL_HEAVY"] > .ant-select-item-option-content').click()

  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectCreate.json' }).as('chartObjectPost')
  //   cy.get('.button-visible > .ant-btn').click()
  //   cy.wait('@chartObjectPost')
  // })

  // it('Applying limits is working correctly', () => {
  //   cy.wait(500)
  //   cy.log('Opening limits tab')
  //   cy.get('.ant-tabs-tab').eq(1).click({ force: true })

  //   cy.wait(500)
  //   cy.log('Adding Control limit')
  //   cy.get('.table-bottom .ant-btn').eq(1).click()

  //   cy.wait(500)
  //   cy.get('.control-header').first().scrollIntoView()
  //   cy.get('.ant-table-tbody .ant-input').eq(0).type('10.1', { force: true })
  //   cy.get('.ant-table-tbody .ant-input').eq(1).type('10.2', { force: true })

  //   cy.get('.ant-table-tbody .ant-picker').first().click()
  //   cy.wait(500)
  //   cy.get('.ant-picker-today-btn').eq(0).click()

  //   cy.wait(500)
  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectLimits.json' }).as('chartObjectLimits')
  //   cy.get('.table-bottom .ant-btn').eq(0).click()
  //   cy.wait('@chartObjectLimits')
  // })

  // it('Changing display is working correctly', () => {
  //   cy.wait(500)
  //   cy.log('Opening limits tab')
  //   cy.get('.ant-tabs-tab').eq(2).click({ force: true })

  //   cy.wait(500)
  //   cy.log('Opening Figure')
  //   cy.get('.ant-collapse-item').first().click()

  //   cy.wait(500)
  //   cy.log('Changing height')
  //   cy.get(':nth-child(1) > .ant-col-16 > .input_field > .ant-input').clear()
  //   cy.get(':nth-child(1) > .ant-col-16 > .input_field > .ant-input').type('500')

  //   cy.wait(500)
  //   cy.log('Changing plot color')
  //   cy.get(':nth-child(3) > .ant-col-16 > .container > [type="text"]').clear()
  //   cy.get(':nth-child(3) > .ant-col-16 > .container > [type="text"]').type('#EEEEEE')

  //   cy.wait(500)
  //   cy.log('Adding title')
  //   cy.get(':nth-child(8) > .ant-col-16 > .input_field > .ant-input').clear()
  //   cy.get(':nth-child(8) > .ant-col-16 > .input_field > .ant-input').type('NEW CHART')

  //   cy.wait(500)
  //   cy.log('Opening Legend')
  //   cy.get('.ant-collapse-item').eq(1).click()

  //   cy.wait(500)
  //   cy.get(':nth-child(3) > .ant-col-16 > .input_field > .ant-input').clear()
  //   cy.get(':nth-child(3) > .ant-col-16 > .input_field > .ant-input').type('Legend!')

  //   cy.wait(500)
  //   cy.log('Opening Axis')
  //   cy.get('.ant-collapse-item').eq(2).click()

  //   cy.wait(500)
  //   cy.log('Hiding X-axis grid lines')
  //   cy.get('.figure-container .ant-switch').eq(1).click({ force: true })
  // })

  // it('Applying Threshold parameters working correctly', () => {
  //   cy.wait(500)
  //   cy.log('Opening threshold tab')
  //   cy.get('.ant-tabs-tab').eq(3).click({ force: true })

  //   cy.wait(500)
  //   cy.log('Changing parameter')
  //   cy.get('.tresh-container .ant-select-single')
  //   cy.get('.tresh-container .ant-select-single').eq(0).click()
  //   cy.get('.ant-select-item-option-content').last().click()

  //   // Lesser than
  //   cy.wait(500)
  //   cy.log('Changing math symbols')
  //   cy.get('.tresh-container .ant-select-single').eq(1).click()
  //   cy.get('.ant-select-item-option-content')
  //   cy.get('.ant-select-item-option-content').contains('Lesser than').click()
  //   cy.log('Entering value')
  //   cy.get('#threshold_value').type('10.1')

  //   cy.log('Applying threshold')
  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectThreshold.json' }).as('chartThreshold')
  //   cy.get('.apply-cont .ant-btn').click()
  //   cy.wait('@chartThreshold')


  //   // Equal to
  //   cy.wait(500)
  //   cy.log('Changing math symbols')
  //   cy.get('.tresh-container .ant-select-single').eq(1).click()
  //   cy.get('.ant-select-item-option-content')
  //   cy.get('.ant-select-item-option-content').contains('Equal to').click()

  //   cy.log('Applying threshold')
  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectThreshold.json' }).as('chartThreshold')
  //   cy.get('.apply-cont .ant-btn').click()
  //   cy.wait('@chartThreshold')



  //   //Greater than or equal to
  //   cy.wait(500)
  //   cy.log('Changing math symbols')
  //   cy.get('.tresh-container .ant-select-single').eq(1).click()
  //   cy.get('.ant-select-item-option-content')
  //   cy.get('.ant-select-item-option-content').contains('Greater than or equal to').click()

  //   cy.log('Applying threshold')
  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectThreshold.json' }).as('chartThreshold')
  //   cy.get('.apply-cont .ant-btn').click()
  //   cy.wait('@chartThreshold')



  //   //Lesser than or equal to
  //   cy.wait(500)
  //   cy.log('Changing math symbols')
  //   cy.get('.tresh-container .ant-select-single').eq(1).click()
  //   cy.get('.ant-select-item-option-content')
  //   cy.get('.ant-select-item-option-content').contains('Lesser than or equal to').click()

  //   cy.log('Applying threshold')
  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectThreshold.json' }).as('chartThreshold')
  //   cy.get('.apply-cont .ant-btn').click()
  //   cy.wait('@chartThreshold')



  //   //Greater than
  //   cy.wait(500)
  //   cy.log('Changing math symbols')
  //   cy.get('.tresh-container .ant-select-single').eq(1).click()
  //   cy.get('.ant-select-item-option-content')
  //   cy.get('.ant-select-item-option-content').contains('Greater than').click()

  //   cy.log('Applying threshold')
  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectThreshold.json' }).as('chartThreshold')
  //   cy.get('.apply-cont .ant-btn').click()
  //   cy.wait('@chartThreshold')

  //   cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartObjectThreshold.json' }).as('chartThreshold')
  //   cy.get('.tresh-container p').contains('Reset').click()
  //   cy.wait('@chartThreshold')

  // })

  // it('Applying rules is working correctly', () => {
  //   cy.wait(500)
  //   cy.log('Opening rules tab')
  //   cy.intercept('GET', '/services/v1/rules', { fixture: 'chartPersonalizationRules.json' }).as('rules')
  //   cy.get('.ant-tabs-tab').eq(4).click({ force: true })
  //   cy.wait('@rules').then(() => {
  //     cy.log('Opening Nelson')
  //     cy.get('.rule-container .ant-collapse-item').eq(0).click()

  //     cy.get('.rule-container .anticon-plus-circle').eq(0).click()
  //     cy.get('#my-inputs').clear()
  //     cy.get('#my-inputs').type('10')
  //     cy.get('.rule-container .ant-checkbox-input').first().click()
  //     cy.get('.rule-container .ant-checkbox-input').first().click()
  //     cy.get('.rule-container .ant-checkbox-input').first().click()
  //     cy.get('.rule-container .anticon-plus-circle').eq(0).click()

  //     cy.log('Applying new rules')
  //     cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartRulesNelson.json' }).as('newRules1')
  //     cy.get('.apply-cont .ant-btn').last().click()
  //     cy.wait('@newRules1')

  //     cy.intercept('POST', '/services/v1/chart-object', { fixture: 'chartRulesReset.json' }).as('newRules2')
  //     cy.get('.rule-container p').contains('Reset').click()
  //     cy.wait('@newRules2')

  //     cy.log('Opening Wecko')
  //     cy.get('.rule-container .ant-collapse-item').eq(1).click()

  //   })
  // })

  // // it('Saves correctly', () => {
  // //   cy.wait(1000)
  // //   cy.log('Saving chart')
  // //   cy.intercept('PUT', '/services/v1/chart-object', { fixture: 'saveChart.json' }).as('saveChart')
  // //   cy.get('.ant-btn').eq(3).click()
  // //   cy.wait('@saveChart')
  // // })

  // it('Publish is working correctly', () => {

  // })
})
