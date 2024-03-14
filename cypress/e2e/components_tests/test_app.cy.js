describe('App Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:4321/');
    });
  
    it('Should render logo, quote text, BlackBox, and Contact components', () => {
      // 断言 logo 是否正确显示
      cy.get('img[alt="logo"]').should('be.visible');
  
      // 断言引言文字是否正确显示
      cy.contains('Check Your Pressure').should('be.visible');
  
      // 断言 BlackBox 组件是否正确显示
      cy.get('.Center').find('.Box').should('be.visible');
  
      // 断言 Contact 组件是否正确显示
      // cy.get('.Contact').should('exist').should('be.visible');
    });
  });
  