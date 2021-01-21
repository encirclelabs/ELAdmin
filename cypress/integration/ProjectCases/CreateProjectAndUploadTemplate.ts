import { Logout, LogoutIfLoggedIn } from '../../support/Pages/GeneralPage';

describe('Create project and upload template file', function () {
	const validemail = Cypress.env('username');
	const validpassword = Cypress.env('password');

	expect(validemail, 'username was set').to.be.a('string').and.not.be.empty;
	expect(validpassword, 'password was set').to.be.a('string').and.not.be
		.empty;
	it('Should login with POST message', function () {
		cy.visit('/');
		LogoutIfLoggedIn();
		// cy.request('POST', 'login/?next=/admin/', {
		// 	username: 'superuser@encirclelabs.com',
		// 	password: 'encircle1',
		// })
		// 	.its('body')
		// 	.as('currentUser');
		// cy.pause();
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
});
