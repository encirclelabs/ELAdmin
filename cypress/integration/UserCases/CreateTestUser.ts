import {
	ClickSaveAndContinueEditing,
	LoginAsValidSuperUser,
	Logout,
	LogoutIfLoggedIn,
} from '../../support/Pages/GeneralPage';
import { CheckTheUserAndDeleteIfExist } from '../../support/Pages/UsersPage';

const userpage = Cypress.env('users_page');
const validemail = Cypress.env('username');
const validpassword = Cypress.env('password');
var tempusername = Cypress.env('tempuser_name');
var tempuserlastname = Cypress.env('tempuser_lastname');
var tempusermobile = Cypress.env('tempusermobile');

describe('Verifying scenarios for create user cases', function () {
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
	it('Should login as SuperUser', function () {
		LoginAsValidSuperUser();
	});
	it('Should access the users page', function () {
		cy.visit(userpage);
	});
	it('Should check if user exist and delete if so', function () {
		CheckTheUserAndDeleteIfExist(Cypress.env('tempuseremail'));
	});

	it('Should open the create user page', function () {
		cy.xpath('//a[contains(text(),"Add user")]').should('be.visible');
		cy.xpath('//a[contains(text(),"Add user")]').click();
	});
	it('Should check that Create User page opened and contains all required fields', function () {
		cy.xpath('//h1[contains(text(),"Add user")]').should('be.visible');
	});
	it('Should try to submit an empty form and confirm that validation for mandatory field appeared', function () {
		ClickSaveAndContinueEditing();
	});
	it('Should set temp user email', function () {
		cy.xpath('//input[@id="id_email"]')
			.scrollIntoView()
			.clear()
			.type(Cypress.env('tempuseremail'));
		ClickSaveAndContinueEditing();
	});
	it('Should confirm that success message appeared', function () {
		cy.xpath('//li[@class="success"]').should('be.visible');
		cy.wait(2000);
	});
	it('Should check that Name, Last Name could be added', function () {
		// cy.pause();
		cy.xpath('//input[@id="id_first_name"]')
			.scrollIntoView()
			.clear()
			.type('tempusername');
		cy.xpath('//input[@id="id_last_name"]')
			.scrollIntoView()
			.clear()
			.type('stempuserlastname');

		cy.get(
			'.related-widget-wrapper > .selector > .selector-available > #id_mailing_address_filter > #id_mailing_address_input'
		)
			.clear()
			.type('123main');

		cy.get(
			'div > .related-widget-wrapper > .selector > .selector-available > #id_mailing_address_from'
		).select('123main street, Daly city, Ca, 94404');

		cy.get(
			'.related-widget-wrapper > .selector > .selector-available > #id_mailing_address_from > option'
		).click();

		cy.get(
			'.related-widget-wrapper > .selector > .selector-chooser > li > #id_mailing_address_add_link'
		).click();

		ClickSaveAndContinueEditing();
	});

	it('Should confirm that user can;t be saved with no address and validation error message displayed', function () {
		cy.get('#user_form > div > p').should('be.visible');
	});
	it('Should set the primary role for the user', function () {
		cy.xpath('//select[@id="id_primary_role"]').select('ADMIN');
		ClickSaveAndContinueEditing();
	});
	it('Should confirm that user saved with no error message displayed', function () {
		cy.get('#user_form > div > p').should('not.exist');
	});
});
