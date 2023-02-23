// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress.Commands.add("login", () => {
//   const auth = Cypress.env("apiAuthenticationURL") + "/signin";
//   cy.request({
//     method: "POST",
//     url: auth,
//     body: {
//       username: atob(Cypress.env("username")),
//       password: atob(Cypress.env("password")),
//     },
//   })
//     .its("body")
//     .then((body) => {
//       cy.setLocalStorage("user", "demo");
//       cy.setLocalStorage("user_token", body.accessToken);
//       cy.setLocalStorage("user_refresh_token", body.refreshToken);
//     });
// });
Cypress.Commands.add('loginWithAD', () => {
	cy.window().then((window) => {
		window.localStorage.setItem("test_enabled", true);
		localStorage.setItem("loginwith", "WITH_AD");
		window.localStorage.setItem("user", "dinesh.jinjala@mareana.com");
		window.localStorage.setItem("username", "Dinesh");
		window.localStorage.setItem(
			"login_details", JSON.stringify({
				ad_role: false,
				email_id: "dinesh.jinjala@mareana.com",
				user_id: "dinesh.kumar@mareana.com",
				firstname: "Dinesh",
				lastname: "Jinjala",
				mdh_role: ['SYSTEM_ADMIN'],
				screen_set: "1000_USER",
				resource_action: {
					"AUDIT_REPORT": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 10
					},
					"AUTO_ML": {
						"actions": [
							"READ",
							"MAINT",
							"APPR"
						],
						"resource_id": 14
					},
					"CHART": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 2
					},
					"CROSS_BATCH": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 15
					},
					"DASHBOARD": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 4
					},
					"DATA_ACCESS": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 23
					},
					"DSS": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 12
					},
					"ELOG_BOOK_DATA_ENTRY": {
						"actions": [
							"APPR",
							"READ",
							"MAINT"
						],
						"resource_id": 21
					},
					"ELOG_BOOK_TEMPLATE_CREATION": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 22
					},
					"GENEALOGY": {
						"actions": [
							"READ",
							"UPLOAD",
							"MAINT"
						],
						"resource_id": 3
					},
					"HIERARCHY_CONFIG": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 11
					},
					"LIMIT_CONFIG": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 25
					},
					"PARAM_DATA_FILE_UPLOAD": {
						"actions": [
							"READ",
							"UPLOAD"
						],
						"resource_id": 5
					},
					"PBR_DASHBOARD": {
						"actions": [
							"READ",
							"MAINT",
							"APPR"
						],
						"resource_id": 17
					},
					"PBR_FILE_SEARCH": {
						"actions": [
							"READ"
						],
						"resource_id": 27
					},
					"PBR_FILE_UPLOAD": {
						"actions": [
							"MAINT",
							"READ",
							"UPLOAD"
						],
						"resource_id": 18
					},
					"PBR_TEMPLATE": {
						"actions": [
							"READ",
							"MAINT",
							"APPR"
						],
						"resource_id": 16
					},
					"REPORT_DESIGNER": {
						"actions": [
							"READ",
							"MAINT",
							"APPR"
						],
						"resource_id": 8
					},
					"REPORT_GENERATOR": {
						"actions": [
							"READ",
							"MAINT",
							"APPR"
						],
						"resource_id": 6
					},
					"ROLES_CONFIG": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 20
					},
					"SYSTEM_CONFIG": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 26
					},
					"TABLEAU_DASHBOARD": {
						"actions": [
							"READ",
							"MAINT"
						],
						"resource_id": 24
					},
					"USER_CONFIG": {
						"actions": [
							"READ",
							"DOWNLOAD",
							"APPR",
							"UPLOAD",
							"MAINT"
						],
						"resource_id": 19
					},
					"USER_REPORT": {
						"actions": [
							"READ"
						],
						"resource_id": 13
					},
					"VIEW": {
						"actions": [
							"READ",
							"MAINT",
							"APPR"
						],
						"resource_id": 1
					},
					"WORKITEMS": {
						"actions": [
							"READ",
							"MAINT",
							"APPR"
						],
						"resource_id": 7
					}
				},
				token:
					"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IkRpbmVzaCAgSmluamFsYSIsInVuaXhfdGltZXN0YW1wIjoxNjc3MDU2NzE1LjY0MTg5MywidGltZXN0YW1wIjoiMjIvMDIvMjAyMyAwOTowNToxNSIsImV4cCI6MzMyMTMwNTY3MTUsImFkX3JvbGUiOmZhbHNlLCJtZGhfcm9sZSI6IlNZU1RFTV9BRE1JTiIsImVtYWlsX2lkIjoiZGluZXNoLmppbmphbGFAbWFyZWFuYS5jb20iLCJjdXN0X2tleSI6IjEwMDAifQ.j5ZwCYeiIBFHregUuKeA_MLfGZ7U0_qBCBkwsUWnKOk"
			})
		);

	})
})
