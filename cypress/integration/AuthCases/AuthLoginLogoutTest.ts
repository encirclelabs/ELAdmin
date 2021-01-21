import { Logout, LogoutIfLoggedIn } from '../../support/Pages/GeneralPage';

describe('Verifying Validation for positive login scenarios', function () {
	const validemail = Cypress.env('username');
	const validpassword = Cypress.env('password');

	expect(validemail, 'username was set').to.be.a('string').and.not.be.empty;
	expect(validpassword, 'password was set').to.be.a('string').and.not.be
		.empty;
	it('Should check that admin page opened and title visible', function () {
		cy.visit('/');
		LogoutIfLoggedIn();
	});
	it('Should check that admin page opened and title visible', function () {
		cy.xpath('//a[contains(text(),"Encircle Admin")]').should('be.visible');
	});
	it('Should set a valid email', function () {
		cy.xpath('//input[@id="id_username"]').type(validemail);
	});

	it('Should set a valid password', function () {
		cy.xpath('//input[@id="id_password"]').type(validpassword);
	});
	it('Should submit form and check that no validation errors are displayed', function () {
		cy.xpath('//form[@id="login-form"]/div[3]/input[1]').click();
	});
	it('Should confirm that user is logged in', function () {
		cy.xpath('//div[@id="user-tools"]')
			.filter(':contains("Welcome")')
			.should('be.visible');
	});
	it('Should log out active user', function () {
		cy.wait(1000);
		Logout();
	});
	it('Should confirm that user is logged out and admin login screen displayed', function () {
		cy.xpath('//a[contains(text(),"Encircle Admin")]').should('be.visible');
	});
});
