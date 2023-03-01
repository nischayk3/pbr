
Cypress.Commands.add('loginWithAD', () => {
	cy.window().then((window) => {
		window.localStorage.setItem("test_enabled", true);
		localStorage.setItem("loginwith", "WITH_AD");
		window.localStorage.setItem("user", "dinesh.kumar@mareana.com");
		window.localStorage.setItem("username", "Dinesh");
		window.localStorage.setItem(
			"login_details", JSON.stringify({
				"Session_Type": "Manual",
				"ad_role": false,
				"email_id": "dinesh.kumar@mareana.com",
				"firstname": "Dinesh",
				"lastname": "Kumar",
				"mdh_role": [
					"MI_CYPRESS_TESTCASE"
				],
				"resource_action": {
					"AUDIT_REPORT": {
						"actions": [
							"READ",
							"MAINT",
							"DOWNLOAD"
						],
						"resource_id": 10
					},
					"AUTO_ML": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 14
					},
					"CHART": {
						"actions": [
							"READ",
							"MAINT",
							"APPR",
							"DOWNLOAD",
							"SHARE"
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
							"MAINT",
							"DOWNLOAD"
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
							"MAINT",
							"UPLOAD"
						],
						"resource_id": 12
					},
					"ELOG_BOOK_DATA_ENTRY": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 21
					},
					"ELOG_BOOK_TEMPLATE_CREATION": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 22
					},
					"GENEALOGY": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"DOWNLOAD"
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
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR"
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
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 8
					},
					"REPORT_GENERATOR": {
						"actions": [
							"READ",
							"MAINT",
							"APPR",
							"DOWNLOAD"
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
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
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
							"UPLOAD",
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
				"screen_set": null,
				"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImN5cHJlc3NfdXNlciIsInVuaXhfdGltZXN0YW1wIjoxNjc3NjY2NDUxLjA3OTk2LCJ0aW1lc3RhbXAiOiIwMS8wMy8yMDIzIDEwOjI3OjMxIiwiZXhwIjoxMTEzODQ2NjQ1MSwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjpbIk1JX0NZUFJFU1NfVEVTVENBU0UiXSwiZW1haWxfaWQiOiJjeXByZXNzX3VzZXIiLCJjdXN0X2tleSI6IjEwMDAifQ.MkjbxTltCU4tVTKsN2JufjMRSN4p0wOTitUtN-Gvn3g",
				"user_id": "dinesh.kumar@mareana.com"
			})
		);

	})
})

Cypress.Commands.add('loginWithoutAD', () => {
	cy.window().then((window) => {
		window.localStorage.setItem("test_enabled", true);
		localStorage.setItem("loginwith", "WITHOUT_AD");
		window.localStorage.setItem("user", "dinesh.kumar@mareana.com");
		window.localStorage.setItem("username", "Dinesh");
		window.localStorage.setItem(
			"login_details", JSON.stringify({
				"Session_Type": "Manual",
				"ad_role": false,
				"email_id": "dinesh.kumar@mareana.com",
				"firstname": "Dinesh",
				"lastname": "Kumar",
				"mdh_role": [
					"MI_CYPRESS_TESTCASE"
				],
				"resource_action": {
					"AUDIT_REPORT": {
						"actions": [
							"READ",
							"MAINT",
							"DOWNLOAD"
						],
						"resource_id": 10
					},
					"AUTO_ML": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 14
					},
					"CHART": {
						"actions": [
							"READ",
							"MAINT",
							"APPR",
							"DOWNLOAD",
							"SHARE"
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
							"MAINT",
							"DOWNLOAD"
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
							"MAINT",
							"UPLOAD"
						],
						"resource_id": 12
					},
					"ELOG_BOOK_DATA_ENTRY": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 21
					},
					"ELOG_BOOK_TEMPLATE_CREATION": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 22
					},
					"GENEALOGY": {
						"actions": [
							"READ",
							"MAINT",
							"UPLOAD",
							"DOWNLOAD"
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
							"READ",
							"MAINT",
							"UPLOAD",
							"APPR"
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
							"APPR",
							"DOWNLOAD"
						],
						"resource_id": 8
					},
					"REPORT_GENERATOR": {
						"actions": [
							"READ",
							"MAINT",
							"APPR",
							"DOWNLOAD"
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
							"MAINT",
							"UPLOAD",
							"APPR",
							"DOWNLOAD"
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
							"UPLOAD",
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
				"screen_set": null,
				"token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImN5cHJlc3NfdXNlciIsInVuaXhfdGltZXN0YW1wIjoxNjc3NjY2NDUxLjA3OTk2LCJ0aW1lc3RhbXAiOiIwMS8wMy8yMDIzIDEwOjI3OjMxIiwiZXhwIjoxMTEzODQ2NjQ1MSwiYWRfcm9sZSI6ZmFsc2UsIm1kaF9yb2xlIjpbIk1JX0NZUFJFU1NfVEVTVENBU0UiXSwiZW1haWxfaWQiOiJjeXByZXNzX3VzZXIiLCJjdXN0X2tleSI6IjEwMDAifQ.MkjbxTltCU4tVTKsN2JufjMRSN4p0wOTitUtN-Gvn3g",
				"user_id": "dinesh.kumar@mareana.com"
			})
		);

	})
})
