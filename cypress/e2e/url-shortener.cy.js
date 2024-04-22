describe('URL Shortener', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        urls: [

          // these links dont match ...
          {
            id: 1,
            long_url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783',
            short_url: 'http://localhost:3001/useshorturl/1',
            title: 'Awesome photo'
          },
          {
            id: 2,
            long_url: 'https://images.unsplash.com/photo-1560807707-8cc77767d783',
            short_url: 'http://localhost:3001/useshorturl/2',
            title: 'Another awesome photo'
          }
        ]
      }
    }).as('getUrls')

    cy.visit('http://localhost:3000')
    cy.wait('@getUrls')
  })

  it('should display the existing shortened URLs', () => {
    cy.get('section')
      .children()
      .should('have.length', 2)
  })

})