/// <reference types="cypress" />
import HomePage from "../../cypress/support/pages/homePage";
import Login from "../../cypress/support/pages/loginPage";
import UserDashboard from "../support/pages/userDashboard";
import CustomerOverview from "../support/pages/customerOverview"

describe("User Workflow: Login, Search, and Dashboard View", () => {
    const homePage = new HomePage();
    const loginPage = new Login();
    const userDashboard = new UserDashboard();
    const customerOverview = new CustomerOverview();

    const searchValue = "Mustermann Maximilian";

    beforeEach(()=>{
        cy.visit("/");
        homePage.acceptCookies();
        homePage.clickOnLoginPage();
        loginPage.typeUsername("UP163395");
        loginPage.typePassword( "probetag");
    })

  it("Should be able landing on home page and login into the account successfully ", () => {
      loginPage.clickOnLoginBtn();
      cy.title().should("eq", "Dashboard ⋅ Evolution");

  });
    it("Search a customer and verify customer data based on the search", () => {
        loginPage.clickOnLoginBtn();

        userDashboard.typeInSearchBox(searchValue);
        cy.wait(1000);
        userDashboard.dataGatheringFromTable().then(customerData => {
            let getDesireCustomer = userDashboard.searchCustomerName(searchValue, customerData);
            getDesireCustomer.forEach(row => {
                expect(row.art_role.toLowerCase()).to.equal('kunde');
                const nameRegex = userDashboard.createNameRegex(searchValue);
                expect(nameRegex.test(row.firma_name)).to.be.true;
            });
            expect(getDesireCustomer.length).to.be.greaterThan(0);
        });
    })

    it("Verify the customer data matches with customer portfolio", () => {
        loginPage.clickOnLoginBtn();

        userDashboard.typeInSearchBox(searchValue);
        cy.wait(2000);
        userDashboard.dataGatheringFromTable().then(customerData => {
            let getDesireCustomer = userDashboard.searchCustomerName(searchValue, customerData);
            const customerNo = getDesireCustomer.map(row => {
                const match = row.firma_name.match(/\(([^)]+)\)/);
                return match ? match[1] : null;
            }).filter(num => num !== null)[0];

            cy.wrap(customerNo).as('customerNo');
        });
        cy.get('@customerNo').then(customerNo => {
            userDashboard.clickOnCustomerNo(customerNo);
            customerOverview.getCustomerNo().then((customerNumber) => {
                expect(customerNumber).to.contain(customerNo);
            });
        })
    })
});