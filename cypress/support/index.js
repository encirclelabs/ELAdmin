// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-file-upload';
import 'cypress-promise/register';
import 'cypress-xpath';
import { logout } from './Pages/GeneralPage';
import 'cypress-mochawesome-reporter/register';

require('cypress-xpath');
require('cypress-iframe');

// Alternatively you can use CommonJS syntax:
// require('./commands')

function LogoutifloggedIn() {
	cy.wait(1000);
	cy.getCookie('sessionid').then(val => {
		console.log(val);
		if (val > 0) {
			cy.log('COOKIE NOT FOUND: Performing logout…');
		} else {
			cy.log('COOKIE FOUND: Logged in');
			cy.wait(2000);
			logout();
			cy.wait(2000);
		}
	});
}

before(() => {
	// cy.viewport(1920, 1100);
	// cy.log(cy.getCookie('sessionid'));
	cy.clearCookies();
	cy.clearLocalStorage();
	// LogoutifloggedIn();

	cy.log(cy.getCookie('sessionid'));
	Cypress.Cookies.defaults({
		preserve: 'sessionid',
	});
});
beforeEach(() => {
	cy.viewport(1920, 1100);
});
