class UserDashboard {

  constructor() {
    this.searchLocator = "#clr-form-control-1";
    this.customerCellLocator = 'app-suche-kunden > .ag-theme-balham.ng-star-inserted .ag-center-cols-viewport .ag-center-cols-container .ag-cell-value';
  }

  typeInSearchBox(searchName) {
    cy.get(this.searchLocator).type(`${searchName}{enter}`);
  }

  clickOnCustomerNo(customerNo) {
    cy.contains('span', customerNo)
        .closest('a')
        .invoke("removeAttr", "target")
        .click();
  }

  dataGatheringFromTable() {
    let data = [];
    let currentRow = {};
    const keys = ['art_role', 'firma_name', 'strasse_ort', 'vermittler', 'portfolio'];
    cy.wait(500);
    cy.get(this.customerCellLocator).then($cells => {
      $cells.each((index, cell) => {
        const value = Cypress.$(cell).text().trim();
        const keyIndex = index % 5;
        currentRow[keys[keyIndex]] = value;
        if (keyIndex === 4) {
          data.push(currentRow);
          currentRow = {};
        }
      });

      cy.log(JSON.stringify(data));
    });
    return cy.wrap(data);
  }

  searchCustomerName(searchName,data){
    const nameRegex = this.createNameRegex(searchName);
    const filteredData = data.filter(row => {
      const artRoleMatch = row.art_role.toLowerCase() === 'kunde';
      const firmaNameMatch = nameRegex.test(row.firma_name);
      return artRoleMatch && firmaNameMatch;
    });
    cy.log(JSON.stringify(filteredData));
    return filteredData;
  }

  createNameRegex(name) {
    const nameParts = name.split(' ');
    const regexString = nameParts.map(part => `(?=.*${part})`).join('');
    return new RegExp(regexString, 'i');
  }
}

export default UserDashboard;
