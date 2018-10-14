describe('DOM',function(){
    it('only depends on `document` global object', function(){
        try{
            let dom = new DOM();
        }
        catch(e){
            fail(e);
        }
    });
    it('finds elements in DOM by id',function(){
        let dom = new DOM();
        let div = document.createElement('div')
        div.id = 'test';
        document.body.appendChild(div);
        expect(dom.findById('test')).toEqual(div);
    });
});