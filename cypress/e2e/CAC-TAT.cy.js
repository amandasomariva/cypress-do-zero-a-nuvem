describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
     cy.visit('./src/index.html')

  })

  it('verifica o título da aplicação', () => {
      cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('prenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdfghij', 15)
    cy.get('#firstName').type('Jonas', {delay: 50})
    cy.get('#lastName').type('Américo')
    cy.get('#email').type('jonas@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()
    
    cy.get('.success').should('be.visible')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Jonas')
    cy.get('#lastName').type('Américo')
    cy.get('#email').type('jonas@gmail,com')
    cy.get('#open-text-area').type('teste de erro')
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preechido com um valor não númerico', () => {
    cy.get('#phone')
      .type('abcd')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Jonas')
    cy.get('#lastName').type('Américo')
    cy.get('#email').type('jonas@gmail.com')
    cy.get('#open-text-area').type('teste de erro')
    cy.get('#phone-checkbox').click()
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Jonas')
      .should('have.value', 'Jonas')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Teste Sobrenome')
      .should('have.value', 'Teste Sobrenome')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('jonas@gmail.com')
      .should('have.value', 'jonas@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('123456789')
      .should('have.value', '123456789')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()
    //cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Envia formulário com sucesso usando um customizado', () => {
    const data = {
      firstName: 'Amanda',
      lastName: 'Sobrenome',
      email: 'amanda@gmail.com',
      text: 'Teste.'
    }
    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('Envia formulário com sucesso usando um customizado chamando padrão', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
    .select('YouTube')
    .should('have.value', 'youtube')
    
  })

  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
    .select('mentoria')
    .should('have.value', 'mentoria')
    
  })

  it('Seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
    .select(1)
    .should('have.value', 'blog')
    
  })

  it('Marca o tipo de atendimento "FeedBack"', () => {
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('be.checked')
    
  })

   it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => {
      cy.wrap(typeOfService)
        .check()
        .should('be.checked')
    })
  })

   it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .check()
    .should("be.checked")
    .last()
    .uncheck()
    .should("not.be.checked")
    
  })

    it('Refazendo - Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido', () => {
    cy.get('#firstName').type('Jonas')
    cy.get('#lastName').type('Américo')
    cy.get('#email').type('jonas@gmail.com')
    cy.get('#open-text-area').type('teste de erro')
    cy.get('#phone-checkbox').check()
    cy.get('button[type="submit"]').click()
    
    cy.get('.error').should('be.visible')
  })

    it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
      //console.log(input[0].files[0].name)
       expect(input[0].files[0].name).to.equal('example.json')
      }) 
  })

    it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
      .should(input => {
      //console.log(input[0].files[0].name)
       expect(input[0].files[0].name).to.equal('example.json')
      }) 
  })

    it('Seleciona um arquivo utilizando uma fixture que foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => {
      //console.log(input[0].files[0].name)
       expect(input[0].files[0].name).to.equal('example.json')
      }) 
  })

    it('Verifica  que a política de privacidade abre em outra aba sem a necessidade de um clique ', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
    
  })


  it('Verifica  que a política de privacidade removendo o target e então clicando no link ', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
    
  })








})