describe('Accordion (integration)', function () {
    beforeAll(function () {
        this.dom = new DOM();
        this.options = {
            container: 'my-accordion1',
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
        let container = document.createElement('div');
        container.id = this.options.container;
        document.body.appendChild(container);
        this.accordion = new Accordion(this.options, this.dom);
    });
    it('creates accordion in DOM', function () {
        let id = this.options.container;
        expect(document.getElementById(id)).toEqual(this.accordion.htmlElement);
    });
    it('creates independent accordions in the same DOM', function () {
        // TODO this test is yet to be implement
     });
});