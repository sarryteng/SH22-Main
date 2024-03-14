
describe('BlackBox Component', () => {
   
    beforeEach(() => {
     
      cy.visit('http://localhost:4321/');
    });
  
    
    it('Should fetch car data and display license plate and QR code', () => {
      
      cy.intercept('GET', '/car-data', { fixture: 'carData.json' }).as('getCarData');
  
      
      cy.wait('@getCarData').then(() => {
        
        cy.get('.TextBox .TextInBox').should('contain', 'No.Plate: ABC123');
  
       
        cy.get('.Center QRCode').should('be.visible');
      });
    });
  });
  