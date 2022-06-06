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

  it('Loads chart personalization page correctly', () => {
    cy.visit('http://localhost/#/dashboard/workspace')
    cy.wait(5000)
    cy.get('#chart_personalization').click()
    // cy.intercept('/services/v1/last-views-and-charts?limit=5').as('lastViews')
    // cy.wait('@lastViews').then(res => {
    //   cy.log(JSON.stringify(res))
    //   cy.log('last view resolved')
    //   cy.intercept('/services/v1/chart-list?chart_status=ALL').as('charts')
    //   cy.wait('@charts').then(res => {
    //     cy.log(JSON.stringify(res))
    //     cy.log('charts resolved')
    //   })
    // })
  })

  // it('Chart Personalization page search working correctly', () => {
  //   cy.wait(1000)

  //   cy.log('Focusing on search input and waiting for data')
  //   cy.get('.ant-input').first().focus()
  //   cy.wait(15000)

  //   cy.log('Searching chart')
  //   cy.get('.ant-input').first().type('C263')

  //   cy.wait(1000)
  //   cy.log('Selecting first row')
  //   cy.get('.ant-table-row').first().click()

  //   cy.intercept('GET', '/chart-object?chartId=*').then((res) => {
  //     cy.log(res)
  //     cy.wait(2000)
  //     cy.go('back')
  //   })
  // })

  // it('Chart Personalization page tile selection working correctly', () => {
  //   cy.wait(2000)

  //   cy.log('clicking on first tile')
  //   cy.get('.chart-tiles').first().click()

  //   cy.intercept('GET', '/chart-object?chartId=*').then(() => {
  //     cy.wait(2000)
  //     cy.go('back')
  //   })
  // })

  it('Chart Personalization redirecting on create new correctly', () => {
    cy.wait(1000)
    cy.intercept('GET', '/services/v1/views-list?vew_status=APRD').as('viewList')
    cy.intercept('GET', '/services/v1/site_ids?view_id=').as('siteIds')

    cy.get('.create-new').first().click()
    cy.log('Waiting for view-list and site_ids apis to finish')

    cy.wait('@viewList')
    cy.wait('@siteIds')
  })

  // it('View working correctly', () => {
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
  //     cy.intercept('POST', '/services/v1/chart-object').as('chartObject')
  //     cy.log('Selecting option 0')
  //     cy.get('.ant-select-item-option').eq(0).click()
  //     cy.wait('@chartObject').then(() => {
  //       // cy.log('Changing site')
  //       // cy.get('.ant-select-single').eq(1).click()

  //       // cy.wait(500)
  //       // cy.log('Selecting option last option')
  //       // cy.get('.ant-select-item-option').last().click()

  //       // cy.wait(500)
  //       // cy.log('Changing show unapproved data')
  //       // cy.get('.ant-switch').first().click()

  //       // cy.wait(500)
  //       // cy.log('Selecting date range')
  //       // cy.get('.ant-picker-range').click()
  //       // cy.wait(500)
  //       // cy.get('.ant-picker-header-prev-btn').first().click()
  //       // cy.wait(500)
  //       // cy.get('.ant-picker-cell').eq(0).click()
  //       // cy.wait(500)
  //       // cy.get('.ant-picker-cell').eq(6).click()

  //       // cy.wait(1000)
  //       // cy.log('Hovering over tags')
  //       // cy.get('.ant-tag').eq(0).trigger('mouseover')
  //       // cy.wait(500)
  //       // cy.get('.ant-tag').eq(0).trigger('mouseout')
  //       // cy.wait(500)
  //       // cy.get('.ant-tag').eq(1).trigger('mouseover')
  //       // cy.wait(500)
  //       // cy.get('.ant-tag').eq(1).trigger('mouseout')

  //       // cy.wait(500)
  //       // cy.log('Clicking on filter')
  //       // cy.get('.anticon-filter').first().click()

  //       // cy.wait(500)
  //       // cy.log('Entering filter data')
  //       // cy.get('#show-last-number').type(2)
  //       // cy.wait(500)
  //       // cy.get('#show-last-duration').click()
  //       // cy.wait(500)
  //       // cy.get('.ant-select-item-option-content').contains('days').click()

  //       // cy.wait(500)
  //       // cy.log('Clearing filters')
  //       // cy.get('.clear').first().click()

  //       // cy.wait(500)
  //       // cy.log('Entering filter data')
  //       // cy.get('#show-last-number').type(2)
  //       // cy.wait(500)
  //       // cy.get('#show-last-duration').click()
  //       // cy.wait(500)
  //       // cy.get('.ant-select-item-option-content').contains('days').click()

  //       // cy.wait(500)
  //       // cy.log('Applying filters')
  //       // cy.get('.apply').first().click()

  //       cy.wait(500)
  //       cy.log('Selecting Chart Type')
  //       cy.get('.ant-select-selector').eq(2).click()
  //       cy.wait(500)
  //       cy.get('.ant-select-item-option-active').contains('Scatter Plot').click()

  //       cy.wait(500)
  //       cy.log('Selecting X-axis')
  //       cy.get('.ant-select-selector').eq(3).click()
  //       cy.wait(500)
  //       cy.get('.ant-select-item-option-active').contains('CARB_NORMAL').click()

  //       cy.wait(500)
  //       cy.log('Selecting Y-axis')
  //       cy.get('.ant-select-selector').eq(4).click()
  //       cy.wait(500)
  //       cy.get('.ant-select-item-option-active').eq(3).click()

  //       cy.wait(500)
  //       cy.log('Clicking on apply')
  //       cy.get('.ant-btn').last().click()

  //       // cy.wait(500)
  //       // cy.intercept('POST', '/services/v1/chart-object').as('chartObjectFilters')
  //       // cy.log('Clicking on Apply')
  //       // cy.get('#side-view-batch-coverage-apply-button').click()
  //       // cy.wait('@chartObjectFilters').then(() => { 
  //       //   cy.log('Filters applied')

  //       //   cy.wait(500)
  //       //   cy.get('.ant-input').eq(1).type('NEW_CHART')

  //       //   cy.wait(500)
  //       //   cy.get('.ant-input').eq(2).type('NEW_CHART_DESCRIPTION')


  //       // })
  //     })
  //   })






  // })

  it('Scheduled Alert is working correctly', () => {

    cy.log('Opening schedule alert modal')
    cy.get('.ant-btn').eq(1).click()

    // cy.wait(500)
    // cy.log('Selecting date')
    // cy.get('.ant-picker').first().click()
    // cy.wait(500)
    // cy.get('.ant-picker-header-next-btn').first().click()
    // cy.wait(500)
    // cy.get('.ant-picker-cell-in-view').first().click()

    // cy.wait(500)
    // cy.log('Selecting repetition')
    // cy.get('.select-report-antd').first().click()

    // cy.wait(500)
    // cy.log('Selecting Daily')
    // cy.get('.ant-select-item-option-content').eq(1).click()

    // cy.wait(500)
    // cy.log('Selecting Time')
    // cy.get('.ant-picker').eq(1).click()
    // cy.wait(500)
    // cy.get('.ant-picker-now').click()
    // cy.wait(500)
    // cy.get('.ant-picker').eq(1).click()
    // cy.get('.ant-picker-time-panel-cell').eq(7).click()
    // cy.get('.ant-picker-time-panel-cell').eq(24).click()
    // cy.get('.ant-picker-time-panel-cell').eq(84).click()
    // cy.wait(500)
    // cy.get('.ant-picker-ok').click()

    cy.wait(500)
    cy.get('#rc-tabs-2-tab-email').click()

    cy.wait(500)
    cy.log('Opening scheduled alerts')
    cy.intercept('GET', '/services/v1/jobs?app_type=CHART&app_id=').as('jobs')
    cy.get('.ant-tabs-left > :nth-child(1) > .ant-tabs-nav-wrap > .ant-tabs-nav-list > :nth-child(2)').click()
    cy.wait('@jobs').then(() => {
      cy.wait(500)
      cy.log('Closing modal')
      cy.get('.ant-modal-close-icon').first().click()
    })
  })
})
