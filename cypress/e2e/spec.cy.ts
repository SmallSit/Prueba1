describe('Prueba de aplicación', () => {
  it('Prueba de login con credenciales incorrectas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.get('#correo').invoke('val', 'correo-incorrecto@duocuc.cl');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Iniciar').click();
      cy.intercept('/inicio').as('route').then(() => {
        //cy.get('ion-title').should('contain.text', 'Sistema de asistencia DuocUC');
        //cy.get('#saludar').should('contain.text', 'Bienvenido')
      });
    });
  });

  it('Prueba de login con credenciales correctas', () => {
    cy.visit('http://localhost:8100/ingreso').then(() => {
      cy.get('#correo').invoke('val', 'atorres@duocuc.cl');
      cy.get('#password').invoke('val', '1234');
      cy.contains('Iniciar').click();
      cy.intercept('/inicio').as('route').then(() => {
        //cy.contains('Cerrar').click();
      });
    });
  });
});