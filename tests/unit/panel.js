describe("GPanel", function () {
    beforeAll(function(){
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
            let p = new GPanel(this.subtitledPanel);
        }
        catch(e){
            fail(e);
        }
    });
    it("expects subtitleless PanelModel in constructor", function () {
        try{
            let p = new GPanel(this.subtitlelessPanel);
        }
        catch(e){
            fail(e);
        }
    });
    it("refuses objects not PanelModel", function () {
        let refused = {foo:'bar'};
        try{
            let p = new GPanel(refused);
        }
        catch(e){
            return; //test passed
        }
        fail("No exception raised");
    });
    it('creates as expected',function(){
        let panel = new GPanel(this.subtitledPanel);
        expect(panel.isOpen()).toBe(false);
        let panelElement = panel.htmlElement;
        expect(panelElement.tagName.toLowerCase()).toEqual('div');
        expect(panelElement.classList).toContain('item');
        expect(panelElement.classList).toContain('item-closed');
        expect(panelElement.children).not.toBeUndefined();
        let children = panelElement.children;
        expect(children.length).toBeGreaterThanOrEqual(3);
        let dropdown = children[0];
        expect(dropdown.tagName.toLowerCase()).toEqual('i');
        expect(dropdown.classList).toContain('item-dropdown');
        let title = children[1];
        expect(title.tagName.toLowerCase()).toEqual('h1');
        expect(title.classList).toContain('item-title');
        expect(title.innerHTML).toEqual(this.subtitledPanel.title);
        let subtitle = children[2];
        expect(subtitle.tagName.toLowerCase()).toEqual('h2');
        expect(subtitle.classList).toContain('item-subtitle');
        expect(subtitle.innerHTML).toEqual(this.subtitledPanel.subtitle);
        let content = children[3];
        expect(content.tagName.toLowerCase()).toEqual('div');
        expect(content.classList).toContain('item-content');
        expect(content.innerHTML).toEqual(this.subtitledPanel.content);
    });
    it('toggle with toggle method', function(){
        let panel = new GPanel(this.subtitledPanel);
        panel.toggle();
        expect(panel.htmlElement.classList).not.toContain('item-closed');
        panel.toggle();
        expect(panel.htmlElement.classList).toContain('item-closed');
    });
    it('toggle with dropdown button (class item-dropdown)', function(){
        let panel = (new GPanel(this.subtitledPanel)).htmlElement;
        panel.getElementsByClassName('item-dropdown')[0].onclick();
        expect(panel.classList).not.toContain('item-closed');
        panel.getElementsByClassName('item-dropdown')[0].onclick();
        expect(panel.classList).toContain('item-closed');
    });
    it('toggle with title (class item-title)', function(){
        let panel = (new GPanel(this.subtitledPanel)).htmlElement;
        panel.getElementsByClassName('item-title')[0].onclick();
        expect(panel.classList).not.toContain('item-closed');
        panel.getElementsByClassName('item-title')[0].onclick();
        expect(panel.classList).toContain('item-closed');
    });
});