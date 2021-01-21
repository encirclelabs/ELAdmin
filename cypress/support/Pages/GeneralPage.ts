var logoutbtn = '//a[contains(text(),"Log out")]';

const validemail = Cypress.env('username');
const validpassword = Cypress.env('password');
expect(validemail, 'username was set').to.be.a('string').and.not.be.empty;
expect(validpassword, 'password was set').to.be.a('string').and.not.be.empty;

export function LoginAsValidSuperUser() {
	cy.xpath('//a[contains(text(),"Encircle Admin")]').should('be.visible');
	cy.xpath('//input[@id="id_username"]').clear().type(validemail);
	cy.xpath('//input[@id="id_password"]').type(validpassword);
	cy.xpath('//form[@id="login-form"]/div[3]/input[1]').click();
}

export function Logout() {
	cy.xpath(logoutbtn).should('be.visible');
	cy.xpath(logoutbtn).click();
}

export function LogoutIfLoggedIn() {
	cy.get('body').then($body => {
		// console.log($body);
		if ($body.find('[href="/admin/logout/"]').length) {
			cy.log('Button displayed, have to logout');
			Logout();
		} else {
			cy.log('COOKIE FOUND: Logged in');
			cy.wait(200);
		}
	});
}

export function ClickSaveAndContinueEditing() {
	cy.xpath('//input[@value="Save and continue editing"]').click();
}

export function ClickSaveAndAddAnother() {
	cy.xpath('//input[@value="Save and add another"]').click();
}
