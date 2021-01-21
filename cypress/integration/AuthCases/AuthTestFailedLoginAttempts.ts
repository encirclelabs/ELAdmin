import {} from '../../support/Pages/GeneralPage';

describe('Verifying negative cases for Auth with failed login attempts', function () {
	const invalidemail = 'invalid@email.com';
	const invalidpassword = '1q2w3e4r';
	it('Should open the login page', function () {
		cy.visit('/');
	});
	it('Should check that admin page opened and title visible', function () {
		cy.xpath('//a[contains(text(),"Encircle Admin")]').should('be.visible');
	});
	it('Should set an invalid email', function () {
		cy.xpath('//input[@id="id_username"]').type(invalidemail);
	});

	it('Should set an invalid password', function () {
		cy.xpath('//input[@id="id_password"]').type(invalidpassword);
	});
	it('Should submit form and check that validation appeared', function () {
		cy.xpath('//form[@id="login-form"]/div[3]/input[1]').click();
	});
	it('Should check that error message displayed', function () {
		cy.xpath(
			'//p[contains(text(),"Please enter the correct User email and password")]'
		).should('be.visible');
	});
});
