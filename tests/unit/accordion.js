describe('Accordion', function () {
    beforeAll(function () {
        this.domMock = {
            findById: function (id) { // Mocks DOM
                let container = document.createElement('div');
                container.id = id;
                return container;
            }
        }
        this.options = {
            container: 'my-accordion',
            mainTitle: 'Full witdth',
            panels: [{
                title: 'Title 1',
                content: '<p>HTML content 1</p>'
            }, {
                title: 'Title 2',
                subtitle: 'Subtitle 2',
                content: '<h4>Lorem Ipsum...</h4>   <p><b>Lorem ipsum dolor sit amet</b>, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.<br> <i>Ut enim ad minim veniam</i>, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p><p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
            }, {
                title: 'Title 3',
                subtitle: 'Subtitle 3',
                content: '<p>HTML content 3</p>'
            }]
        };
    });
    it('has a constructor that throws exception if input parameter is not GAccordionOptions', function () {
        try {
            let p = new Accordion({ foo: 'bar' }, this.domMock);
        }
        catch (e) {
            return; // test pass
        }
        fail('Accordion created with corrupted AccordionModel');
    });
    it('creates correct content', function () {
        let accordion = (new Accordion(this.options, this.domMock)).htmlElement;
        expect(accordion.id).toEqual(this.options.container);
        expect(accordion.classList).toContain('g-accordion');
    });
    it('has independent panels', function () {
        let accordion = new Accordion(this.options, this.domMock);
        let panels = accordion.panels;
        let initialStatus = []
        for (let i = 0; i < panels.length; i++) {
            initialStatus[i] = panels[i].isOpen();
        }
        panels[0].toggle();
        expect(panels[0].isOpen()).toBe(!initialStatus[0]);
        for (let i = 1; i < panels.length; i++) {
            expect(panels[i].isOpen()).toBe(initialStatus[i]);
        }
    });
});