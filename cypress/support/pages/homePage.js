class HomePage {
  acceptCookiesLocator = ".tag.cmp-banner__agree";
  loginLocator = ".login-widget .login-widget__link";

  acceptCookies() {
    cy.get(this.acceptCookiesLocator).click();
  }
  clickOnLoginPage() {
    cy.get(this.loginLocator).invoke("removeAttr", "target").click({ force: true });
  }
}

export default HomePage;
