Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Nome padrão',
    lastName: 'Sobre nome padrão',
    email: 'email@padrao.com',
    text: 'Teste padrão.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    cy.get('button[type="submit"]').click()
})