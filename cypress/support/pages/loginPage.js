class Login {
  usernameLocator = 'input[formcontrolname="username"]';
  passwordLocator = 'input[formcontrolname="password"]';
  loginButtonLocator = ".btn.btn-primary";

  typeUsername(username) {
    cy.get(this.usernameLocator).type(username);
  }

  typePassword(password) {
    cy.get(this.passwordLocator).type(password);
  }
  clickOnLoginBtn() {
    cy.get(this.loginButtonLocator).click();
  }
}

export default Login;
