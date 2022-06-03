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
    cy.wait(1000)
  })

  it('Chart Personalization page search working correctly', () => {
    cy.wait(1000)

    cy.log('Focusing on search input and waiting for data')
    cy.get('.ant-input').first().focus()
    cy.wait(15000)

    cy.log('Searching chart')
    cy.get('.ant-input').first().type('C263')

    cy.wait(1000)
    cy.log('Selecting first row')
    cy.get('.ant-table-row').first().click()

    cy.wait(5000)
    cy.go('back')
  })

  it('Chart Personalization page tile selection working correctly', () => {
    cy.wait(1000)

    cy.log('clicking on first tile')
    cy.get('.chart-tiles').first().click()

    cy.wait(5000)
    cy.go('back')
  })

  it('Chart Personalization redirecting on create new correctly', () => {
    cy.wait(1000)
    cy.get('.create-new').first().click()

    cy.log('Waiting for view-list and site_ids apis to finish')
    cy.wait(8000)
  })

  it('View working correctly', () => {
    cy.wait(1000)

    cy.log('Focussing on search to get list of view Ids')
    cy.get('input[type="text"]').focus()

    cy.wait(500)
    cy.log('Inputing View Id')
    cy.get('input[type="text"]').type('v238')
    
    cy.wait(500)
    cy.log('Searching for a View Id')
    cy.get('.ant-input-search-button').first().click()

    cy.wait(500)
    cy.log('Selecting the first row')
    cy.get('.ant-table-row').first().click()

    cy.wait(5000)
    cy.log('Changing version')
    cy.get('.ant-select-single').eq(0).click()

    cy.wait(500)
    cy.log('Selecting option 0')
    cy.get('.ant-select-item-option').eq(0).click()

    cy.wait(2000)
    cy.log('Changing site')
    cy.get('.ant-select-single').eq(1).click()

    cy.wait(500)
    cy.log('Selecting option last option')
    cy.get('.ant-select-item-option').last().click()

    cy.wait(500)
    cy.log('Changing show unapproved data')
    cy.get('.ant-switch').first().click()

    cy.wait(500)
    cy.log('Selecting date range')
    cy.get('.ant-picker-range').click()
    cy.wait(500)
    cy.get('.ant-picker-header-prev-btn').first().click()
    cy.wait(500)
    cy.get('.ant-picker-cell').eq(0).click()
    cy.wait(500)
    cy.get('.ant-picker-cell').eq(6).click()

    cy.wait(1000)
    cy.log('Hovering over tags')
    cy.get('.ant-tag').eq(0).trigger('mouseover')
    cy.wait(500)
    cy.get('.ant-tag').eq(0).trigger('mouseout')
    cy.wait(500)
    cy.get('.ant-tag').eq(1).trigger('mouseover')
    cy.wait(500)
    cy.get('.ant-tag').eq(1).trigger('mouseout')

    cy.wait(500)
    cy.log('Clicking on filter')
    cy.get('.anticon-filter').first().click()

    cy.wait(500)
    cy.log('Entering filter data')
    cy.get('#show-last-number').type(2)
    cy.wait(500)
    cy.get('#show-last-duration').click()
    cy.wait(500)
    cy.get('.ant-select-item-option-content').contains('days').click()

    cy.wait(500)
    cy.log('Clearing filters')
    cy.get('.clear').first().click()

    cy.wait(500)
    cy.log('Entering filter data')
    cy.get('#show-last-number').type(2)
    cy.wait(500)
    cy.get('#show-last-duration').click()
    cy.wait(500)
    cy.get('.ant-select-item-option-content').contains('days').click()

    cy.wait(500)
    cy.log('Applying filters')
    cy.get('.apply').first().click()

    cy.wait(500)
    cy.log('Clicking on Apply')
    cy.get('#side-view-batch-coverage-apply-button').click()
  })
})
