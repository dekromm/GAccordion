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