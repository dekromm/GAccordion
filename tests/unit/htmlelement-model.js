describe('HTMLElementModel',function(){
    it('validates object', function(){
        let p = {
            tagname: 'p',
            innerHTML: 'paragraph',
            classList: ['class1', 'class2']
        };
        expect(HTMLElementModel.isValid(p)).toBe(true);
        p.foo='bar';
        expect(HTMLElementModel.isValid(p)).toBe(true);
        let a = {
            tagname: 'a'
        };
        expect(HTMLElementModel.isValid(a)).toBe(true);
        let foo = {
            foo: 'bar'
        };
        expect(HTMLElementModel.isValid(foo)).toBe(false);
    });
    it('creates HTMLElement',function(){
        let p = {
            tagname: 'p',
            innerHTML: 'paragraph',
            classList: ['class1', 'class2']
        };
        pElement = HTMLElementModel.createElement(p);
        expect(pElement.tagName.toLowerCase()).toEqual(p.tagname.toLowerCase());
        expect(pElement.innerHTML).toEqual(p.innerHTML);
        for(var x of p.classList){
            expect(pElement.classList).toContain(x);
        }
    });
    it('creates nested HTMLElements',function(){
        let p1 = {
            tagname: 'p',
            innerHTML: 'p1'
        };
        let p2 = {
            tagname: 'p',
            innerHTML: 'p1'
        };

        p1Element = HTMLElementModel.createElement(p1);
        p2Element = HTMLElementModel.createElement(p1);

        let foo = function(){};
        let div = {
            tagname: 'div',
            onclick: foo,
            children: [p1Element, p2Element]
        }
        divElement = HTMLElementModel.createElement(div);

        expect(divElement.tagName.toLowerCase()).toEqual(div.tagname.toLowerCase());
        expect(divElement.children).toContain(p1Element);
        expect(divElement.children).toContain(p2Element);
        expect(divElement.onclick).toEqual(div.onclick);
    });
});