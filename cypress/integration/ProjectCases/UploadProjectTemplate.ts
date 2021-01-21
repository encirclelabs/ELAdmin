import { Logout, LogoutIfLoggedIn } from '../../support/Pages/GeneralPage';
import { deleteTemplate } from '../../support/Pages/Projects/EditProjectPage';

describe("Verify that admin person can't upload invalid template file and getting error message", function () {
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
	it('Should navigate to the project template page', function () {
		cy.xpath('//a[contains(text(),"Project templates")]').click();
	});
	it('Should click on import CSV link', function () {
		cy.xpath('//a[contains(text(),"Import CSV")]').click();
	});

	it('Should upload CSV template file', function () {
		const filename = 'invalidtemplate.csv';
		cy.xpath('//input[@id="id_csv_file"]').attachFile(
			'../fixtures/inputFiles/' + filename
		);
	});
	it('Should coonfirm upload CSV template file', function () {
		cy.xpath('//button[contains(text(),"Upload CSV")]').click();
	});
	it('Should confirm that error message displayed', function () {
		cy.xpath('//li[@class="error"]')
			.should('be.visible')
			.invoke('text')
			.then(text => {
				expect(text.trim()).contain('Error occurred in row ');
			});
	});
	it('Should reload the page', () => {
		cy.reload();
	});
	it('Should confirm that error message Not dispalyed after page reload', () => {
		cy.xpath('//li[@class="error"]').should('not.exist');
	});
});

describe('Verify that admin person can sucessfuly upload template file', function () {
	it('Should navigate to the dashboard', function () {
		cy.visit('/projects/projecttemplate/');
	});

	it('Should click on import CSV link', function () {
		cy.xpath('//a[contains(text(),"Import CSV")]').click();
	});

	it('Should upload CSV template file', function () {
		const filename = 'validtemplate.csv';
		cy.xpath('//input[@id="id_csv_file"]').attachFile(
			'../fixtures/inputFiles/' + filename
		);
	});
	it('Should coonfirm upload CSV template file', function () {
		cy.xpath('//button[contains(text(),"Upload CSV")]').click();
	});
	it('Should confirm that error message Not dispalyed', () => {
		cy.xpath('//li[@class="error"]').should('not.exist');
	});
	it('Should delete the projects', function () {
		deleteTemplate('QA Imported Project');
	});
});
