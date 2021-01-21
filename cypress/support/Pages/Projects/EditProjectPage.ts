import { first } from 'cypress/types/lodash';

export function deleteTemplate(templatename) {
	cy.xpath('//a[text()="' + templatename + '"]').then(val => {
		while (val.length > 0) {
			cy.log(
				'Hey, at least ' +
					val.length +
					' test template(s) that exist in our system and have to be deleted'
			);
			cy.xpath('//tr//a[text()="' + templatename + '"]')
				.first()
				.parent()
				.parent()
				.find('[type="checkbox"]')
				.check();
			cy.xpath(
				'//form[@id="changelist-form"]/div[1]/label[1]/select[1]'
			).select('Delete selected project templates');
			cy.xpath('//button[text()="Go"]').click();
			cy.xpath('//input[starts-with(@value,"Yes, I")]')
				.should('be.visible')
				.click();
			val.length--;
		}
	});
}
