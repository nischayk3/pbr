describe("The App", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });
});

describe("<App/>", () => {
  before(() => {
    cy.visit("/user/login");
    cy.login();
    cy.saveLocalStorage();
  });

  describe("Login", () => {
    it("Should show login", () => {
      cy.url().should("include", "/user/login");
    });

    describe("Should validate user", () => {
      it("should login fail", () => {
        cy.get("#username").type("demo").should("have.value", "demo");
        cy.get("#password").type("demo123").should("have.value", "demo123");
        cy.get("#login-btn").click();
        cy.url().should("include", "/user/login");
        cy.get(".ant-notification").contains("Bad credentials");
      });
      it("should login successfully and show dashboard", () => {
        cy.get("#username").clear().type("demo").should("have.value", "demo");
        cy.get("#password").clear().type("demo1").should("have.value", "demo1");
        cy.get("#login-btn").click();
        // cy.url().should("include", "/dashboard/appRegister/appList");
      });
    });
  });

  
});
