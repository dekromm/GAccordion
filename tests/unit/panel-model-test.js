describe('PanelModel',function(){
    it('validates object', function(){
        let panel = {
            title: 'Title 1',
            subtitle: 'subtitle 1',
            content: '<p>HTML content 1</p>'
        };
        expect(PanelModel.isValid(panel)).toBe(true);
        panel.foo='bar';
        expect(PanelModel.isValid(panel)).toBe(true);
        let a = {
            title: 'Title 1',
            content: '<p>HTML content 1</p>'
        };
        expect(PanelModel.isValid(a)).toBe(true);
        let foo = {
            foo: 'bar'
        };
        expect(PanelModel.isValid(foo)).toBe(false);
    });
});