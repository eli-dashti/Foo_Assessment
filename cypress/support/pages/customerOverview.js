class CustomerOverview {
    dataCardLocator = '.card-section'
    getCustomerNo() {
        return cy.get(this.dataCardLocator).first()
            .within(() => {
                return cy.contains('span.faint', 'Kundennummer')
                    .parent()
                    .invoke('text');
            });
    }
}

export default CustomerOverview;