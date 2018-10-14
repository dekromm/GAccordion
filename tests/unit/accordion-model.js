describe('AccordionModel',function(){
    it('validates object', function(){
        let accordion = {
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
        expect(AccordionModel.isValid(accordion)).toBe(true);
        accordion.foo='bar';
        expect(AccordionModel.isValid(accordion)).toBe(true);
        let a = {
            container: 'my-accordion',
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
        expect(AccordionModel.isValid(a)).toBe(true);
        let foo = {
            foo: 'bar'
        };
        expect(AccordionModel.isValid(foo)).toBe(false);
    });
});