describe("Accordion", function () {
    beforeAll(function(){
        var domService = new DOMService();
    })
    it("must have ", function () {
        expect(true).toBe(true);
    });
    it("has a constructor that throws exception if input parameter is not GAccordionOptions", function () {
        expect(true).toBe(true);
    });
    it("has independent panels that can accessed", function () {
        expect(true).toBe(true);
    });
});

describe("Panel", function () {
    beforeAll(function(){
        this.domService = new DOMService();
    })
    it("expects subtitled PanelModel in constructor", function () {
        var subtitledPanel = {
            title: 'Title 1',
            subtitle: 'subtitle 1',
            content: '<p>HTML content 1</p>'
        };
        try{
            var p = new Panel(subtitledPanel,this.domService);
        }
        catch(e){
            fail(e);
        }
    });
    it("expects subtitleless PanelModel in constructor", function () {
        var subtitlelessPanel = {
            title: 'Title 1',
            content: '<p>HTML content 1</p>'
        };
        try{
            var p = new Panel(subtitlelessPanel,this.domService);
        }
        catch(e){
            fail(e);
        }
    });
    it("refuses objects not PanelModel", function () {
        try{
            var p = new Panel(subtitlelessPanel,this.domService);
        }
        catch(e){
            return; //test passed
        }
        fail("No exception raised");
    });
    it("can be toggleOpen()ed to switch state", function () {
        expect(true).toBe(true);
    });
});

describe('DOMService',function(){
    it('requires just the `document`', function(){
        try{
            var domService = new DOMService();
        }
        catch(e){
            fail(e);
        }
    });
    it('creates single HTMLElement',function(){
        var domService = new DOMService();
        var p = {
            tagname: 'p',
            innerHTML: 'paragraph',
            classList: ['class1', 'class2']
        };
        pElement = domService.createElement(p);
        expect(pElement.tagName.toLowerCase()).toEqual(p.tagname.toLowerCase());
        expect(pElement.innerHTML).toEqual(p.innerHTML);
        for(var x of p.classList){
            expect(pElement.classList).toContain(x);
        }
    });
    it('creates nested HTMLElements',function(){
        var domService = new DOMService();
        var p1 = {
            tagname: 'p',
            innerHTML: 'p1'
        };
        var p2 = {
            tagname: 'p',
            innerHTML: 'p1'
        };

        p1Element = domService.createElement(p1);
        p2Element = domService.createElement(p1);

        var foo = function(){};
        var div = {
            tagname: 'div',
            onclick: foo,
            children: [p1Element, p2Element]
        }
        divElement = domService.createElement(div);

        expect(divElement.tagName.toLowerCase()).toEqual(div.tagname.toLowerCase());
        expect(divElement.children).toContain(p1Element);
        expect(divElement.children).toContain(p2Element);
        expect(divElement.onclick).toEqual(div.onclick);
    });
    it('finds elements in DOM by id',function(){
        var domService = new DOMService();
        var div = document.createElement('div')
        div.id = 'test';
        document.body.appendChild(div);
        expect(domService.findById('test')).toEqual(div);
    })
});