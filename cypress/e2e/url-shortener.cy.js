describe('URL Shortener', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      body: {
        urls: [
          {
            id: 1,
            long_url:
              'https://images.squarespace-cdn.com/content/v1/5abef86f7e3c3a242ca0bd46/7bb5d762-74c3-445b-97d3-4b40f5038e7b/0Y2A6620.jpg',
            short_url: 'http://localhost:3001/useshorturl/1',
            title: 'Supposed to be a frenchie',
          },
        ],
      },
    }).as('getUrls')

    cy.visit('http://localhost:3000')
    cy.wait('@getUrls')
  })

  it('should display the existing shortened URLs', () => {
    cy.get('section').children().should('have.length', 1)
    cy.get('section > :nth-child(1)').should('contain', 'Supposed to be a frenchie')
    cy.get('section > :nth-child(1)').should('contain', 'http://localhost:3001/useshorturl/1')
    cy.get('section > :nth-child(1)').should('contain', 'https://images.squarespace-cdn.com/content/v1/5abef86f7e3c3a242ca0bd46/7bb5d762-74c3-445b-97d3-4b40f5038e7b/0Y2A6620.jpg')
  })

  it('should be able to shorten a URL', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      body: {
        id: 2,
        long_url:
          'https://www.reddit.com/r/nasa/comments/1bu69i7/how_astronauts_cut_their_hair_on_the/',
        short_url: 'http://localhost:3001/useshorturl/2',
        title: 'Astronaut haircut',
      },
    }).as('postUrl')

    cy.get('input[name="title"]')
      .type('Astronaut haircut')
      .get('input[name="urlToShorten"]')
      .type(
        'https://www.reddit.com/r/nasa/comments/1bu69i7/how_astronauts_cut_their_hair_on_the/'
      )
      .get('button')
      .click()
      .wait('@postUrl')

    cy.get('section').children().should('have.length', 2)
    cy.get('section > :nth-child(2)').should('contain', 'Astronaut haircut')
    cy.get('section > :nth-child(2)').should('contain', 'http://localhost:3001/useshorturl/2')
    cy.get('section > :nth-child(2)').should('contain', 'https://www.reddit.com/r/nasa/comments/1bu69i7/how_astronauts_cut_their_hair_on_the/')
  })
})
