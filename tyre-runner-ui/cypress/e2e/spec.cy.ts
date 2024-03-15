import { BrowserMultiFormatReader } from '@zxing/browser';
const qrCode = '../screenshots/qr-code.png'

describe('Kiosk end to end testing', () => {
  
  it('loading page is render correctly', () => {
    cy.viewport(1000, 1080)
    cy.visit('http://localhost:4321')
    cy.get('#logo').should('be.visible')
    cy.get('.loading-text').should('contain', 'Loading')
    cy.get('.giphy-embed').should('be.visible')

  })

  it('Kiosk main page is render correctly', () => {
    cy.viewport(1000, 1080)
    cy.visit('http://localhost:4321')
    cy.intercept('GET', 'http://localhost:8000/get-data', {
      body: {
        vehicleDetected: true,
        url: 'https://gla-team22.azurewebsites.net/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31',
        registration_plate: 'AO12XZP'
      }
    }).as('getData')
    cy.wait(3000)
    cy.reload()

    
    cy.get('[src="/@fs/Users/atip/sh22-main/tyre-runner-ui/src/assets/Images/logo_transparent.png?origWidth=1260&origHeight=244&origFormat=png"]').should('be.visible')
    cy.get('[src="/@fs/Users/atip/sh22-main/tyre-runner-ui/src/assets/Images/tel_img.png?origWidth=50&origHeight=54&origFormat=png"]').should('be.visible')


    cy.get('.QuoteText').should('contain', 'Check Your Pressure')
    cy.get('.Label').should('contain', 'No.Plate:')
    cy.get('[style="display: flex; justify-content: space-between; align-items: center;"] > .TextInBox').should('contain', 'AO12XZP')
    cy.get('.Center > .TextInBox').should('contain', 'Scan HereCheck Your Pressure')

    cy.get('[style="margin-right: 50px; margin-left: 10px;"]').should('contain', '0131 358 6116')
    cy.get('[style="margin-left: 10px;"]').should('contain', 'hello@TyreRunner.com')
    

  })

  it('QR code scanning', () => {
      cy.viewport(1000, 1080)
      cy.visit('http://localhost:4321')
      cy.intercept('GET', 'http://localhost:8000/get-data', {
        body: {
          vehicleDetected: true,
          url: 'https://gla-team22.azurewebsites.net/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31',
          registration_plate: 'AO12XZP'
        }
      }).as('getData')

      cy.wait(3000)
      cy.reload()
      cy.get('.Center').find('svg')
      .screenshot('qr-code', { onAfterScreenshot : ($el: any, props: { path: any; }) => { console.log('screenshot taken');
      
      const reader = new BrowserMultiFormatReader();
      reader.decodeFromImageElement(props.path)
      .then((result: { getText: () => any; }) => {
        expect(result.getText()).to.equal('https://gla-team22.azurewebsites.net/url-data?licenseplate=AO12XZP&sensorreadings=30,32,28,31');

        
      });
      }
    })

  })

})