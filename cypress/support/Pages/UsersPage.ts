export function CreateUser() {}

export function CheckTheUserAndDeleteIfExist(useremail) {
	cy.visit(Cypress.env('users_page'));
	cy.xpath('//input[@id="searchbar"]').clear().type(useremail);
	cy.xpath('//input[@value="Search"]').click();

	cy.get('body').then($body => {
		// console.log($body);
		if ($body.find('[name="_selected_action"]').length) {
			cy.log('User Exist need to be deleted');
			cy.xpath('//tbody/tr[1]/td[1]/input[1]').click();
			cy.get('[name="action"]').select('Delete selected users');
			cy.xpath('//button[@title="Run the selected action"]').click();
			cy.xpath('//h1[contains(text(),"Are you sure?")]').should(
				'be.visible'
			);
			cy.xpath('//input[starts-with(@value,"Yes, I")]')
				.should('be.visible')
				.click();
		} else {
			cy.log('No user found it have to be created before delete action');
			cy.wait(200);
		}
	});
}

export function SearchForUser(SearchQuery) {
	cy.visit(Cypress.env('users_page'));
	cy.xpath('//input[@id="searchbar"]').clear().type(SearchQuery);
	cy.xpath('//input[@value="Search"]').click();
}

export function getfIframeBody() {
	// get the document
	return getIframeDocument()
		.its('body')
		.should('not.be.undefined')
		.then(cy.wrap);
}
const getIframeDocument = () => {
	return cy
		.xpath('//iframe[contains (@src, "https://portal")]')
		.its('0.contentDocument')
		.should('exist');
};
