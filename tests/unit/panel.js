describe("Panel", function () {
    beforeAll(function(){
        this.domService = new DOMService()
        this.subtitledPanel = {
            title: 'Title 1',
            subtitle: 'subtitle 1',
            content: '<p>HTML content 1</p>'
        };
        this.subtitlelessPanel = {
            title: 'Title 1',
            content: '<p>HTML content 1</p>'
        };
    })
    it("expects subtitled PanelModel in constructor", function () {
        try{
            var p = new Panel(this.subtitledPanel,this.domService);
        }
        catch(e){
            fail(e);
        }
    });
    it("expects subtitleless PanelModel in constructor", function () {
        try{
            var p = new Panel(this.subtitlelessPanel,this.domService);
        }
        catch(e){
            fail(e);
        }
    });
    it("refuses objects not PanelModel", function () {
        var refused = {foo:'bar'};
        try{
            var p = new Panel(refused,this.domService);
        }
        catch(e){
            return; //test passed
        }
        fail("No exception raised");
    });
    it('creates correct content',function(){
        var p = new Panel(this.subtitledPanel,this.domService);
    });
    it('toggle with toggle method', function(){
        var p = new Panel(this.subtitledPanel,this.domService);
        expect(p.htmlElement.classList).toContain('item-closed');
        p.toggle();
        expect(p.htmlElement.classList).not.toContain('item-closed');
        p.toggle();
        expect(p.htmlElement.classList).toContain('item-closed');
    });
    it('toggle with dropdown button (class item-dropdown)', function(){
        var p = (new Panel(this.subtitledPanel,this.domService)).htmlElement;
        expect(p.classList).toContain('item-closed');
        p.getElementsByClassName('item-dropdown')[0].onclick();
        expect(p.classList).not.toContain('item-closed');
        p.getElementsByClassName('item-dropdown')[0].onclick();
        expect(p.classList).toContain('item-closed');
    });
    it('toggle with title (class item-title)', function(){
        var p = (new Panel(this.subtitledPanel,this.domService)).htmlElement;
        expect(p.classList).toContain('item-closed');
        p.getElementsByClassName('item-title')[0].onclick();
        expect(p.classList).not.toContain('item-closed');
        p.getElementsByClassName('item-title')[0].onclick();
        expect(p.classList).toContain('item-closed');
    });
});