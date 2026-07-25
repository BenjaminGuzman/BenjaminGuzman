describe('Portfolio Responsive E2E Tests', () => {
  context('Mobile Resolution (iphone-x)', () => {
    beforeEach(() => {
      cy.viewport('iphone-x');
      cy.visit('/');
    });

    it('should show hamburger menu and allow navigation', () => {
      // Hamburger menu button should be visible
      cy.get('button.lg\\:hidden').should('be.visible');

      // Open mobile menu
      cy.get('button.lg\\:hidden').click();
      
      // Wait for animation
      cy.wait(300);

      // Check if Portfolio link is visible inside the menu and click it
      cy.get('#menu-sm').contains('Portfolio').should('be.visible').click();

      // Check if it scrolled to portfolio
      cy.get('app-portfolio').should('be.visible');
    });
  });

  context('Desktop Resolution (macbook-15)', () => {
    beforeEach(() => {
      cy.viewport('macbook-15');
      cy.visit('/');
    });

    it('should show header navigation and NO hamburger menu', () => {
      // Hamburger menu button should NOT be visible
      cy.get('button.lg\\:hidden').should('not.be.visible');

      // Check main about section
      cy.get('#about').should('be.visible');
      cy.contains('Benjamín Guzmán').should('be.visible');
      
      // Header nav should contain links
      cy.get('header nav').contains('Skills').should('be.visible').click();

      // It should scroll to skills
      cy.get('app-skills').should('be.visible');
    });

    it('should toggle description on project hover/click', () => {
      // Scroll to portfolio
      cy.get('header nav').contains('Portfolio').click();
      cy.get('app-portfolio').should('be.visible');
      
      // We have projects. Let's find the first one
      cy.get('app-project').first().as('firstProject');
      
      // Click the project card to toggle description
      // Assuming it responds to mouseenter or click (toggleDescriptionAnimation)
      cy.get('@firstProject').trigger('mouseenter');
      cy.wait(600); // wait for 500ms debounce
      
      // The description should be open (display flex instead of none or height > 0)
      cy.get('@firstProject').find('.text-opacity-70').should('be.visible');
    });
  });
});
