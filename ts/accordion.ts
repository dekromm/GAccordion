class PanelModel {
    title: string
    subtitle: string
    content: string
    static isValid(o: PanelModel): Boolean {
        if (!o) return false;
        if (!o.title) return false;
        if (!o.content) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

class Panel {
    htmlElement: HTMLElement
    model: PanelModel
    private isOpen: Boolean
    private setStatus(open: Boolean): void {
        this.isOpen = open;
        let targetClass: string;
        if (this.isOpen) {
            this.htmlElement.classList.remove('item-closed')
        } else {
            this.htmlElement.classList.add('item-closed')
        }
    }
    toggle() {
        this.setStatus(!this.isOpen);
    }
    getStatus(): Boolean{
        return this.isOpen;
    }
    constructor(model: PanelModel, $domService: IDOMService) {
        if(!model){
            throw new Error("PanelModel is null");
        }
        if(!PanelModel.isValid(model)){
            throw new Error("PanelModel is not valid");
        }
        if(!$domService){
            throw new Error("IDOMService dependency is null");
        }
        this.model = model;

        let children = []
        let self = this;

        let dropdownButton = $domService.createElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function(){self.toggle()}
        });
        children.push(dropdownButton);

        let title = $domService.createElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: this.model.title,
            onclick: function(){self.toggle()}
        });
        children.push(title);

        if (this.model.subtitle) {
            let subtitle = $domService.createElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: this.model.subtitle
            });
            children.push(subtitle);
        }

        let content = $domService.createElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: this.model.content
        });
        children.push(content);

        let domPanel = $domService.createElement({
            tagname: 'div',
            classList: ['item', 'item-closed'],
            children: children
        });
        this.htmlElement = domPanel;
    }
}

class AccordionModel {
    container: string  // id of DOM element to build onto
    mainTitle?: string
    panels: PanelModel[]
    static isValid(o: AccordionModel): Boolean {
        if (!o) return false;
        if (!o.container) return false;
        if (!o.panels) return false;
        for(let p of o.panels){
            if(!PanelModel.isValid(p)) return false;
        }
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

class Accordion {
    model: AccordionModel
    htmlElement: HTMLElement
    panels: Panel[]
    constructor(model: AccordionModel, $domService: IDOMService) {
        if(!model){
            throw new Error("AccordionModel is null");
        }
        if(!AccordionModel.isValid(model)){
            throw new Error("AccordionModel is not valid");
        }
        if(!$domService){
            throw new Error("IDOMService dependency is null");
        }
        this.model = model;
        let DOMcontainer = $domService.findById(this.model.container);
        DOMcontainer.classList.add('g-accordion');

        if (this.model.mainTitle) {
            let maintitle = $domService.createElement({
                tagname: 'div',
                classList: ['main-title'],
                innerHTML: this.model.mainTitle
            });
            DOMcontainer.appendChild(maintitle);
        }

        this.panels = [];
        for (let currentPanel of this.model.panels) {
            let p: Panel = new Panel(currentPanel, $domService);
            DOMcontainer.appendChild(p.htmlElement);
            this.panels.push(p);
        }
        this.htmlElement = DOMcontainer;
    }
}

class HTMLElementModel {
    tagname: string
    innerHTML?: string
    classList?: string[]
    children?: HTMLElement[]
    onclick?: any
    static isValid(o: HTMLElementModel): Boolean {
        if (!o) return false;
        if (!o.tagname) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

interface IDOMService {
    createElement(model: HTMLElementModel): HTMLElement
    findById(id: string): HTMLElement
}

class DOMService implements IDOMService{
    findById(id: string): HTMLElement {
        let e = document.getElementById(id);
        if (!e) throw new Error("Cant find `" + id + "` in document");
        return e;
    }
    createElement(model: HTMLElementModel): HTMLElement {
        let e = document.createElement(model.tagname);
        if (!e) throw new Error("Cant create `" + model.tagname + "` in document");
        if (model.innerHTML) {
            e.innerHTML = model.innerHTML
        }
        if (model.classList) {
            model.classList.forEach(classname => {
                e.classList.add(classname);
            });
        }
        if (model.children) {
            model.children.forEach(child => {
                e.appendChild(child);
            });
        }
        if (model.onclick) {
            e.onclick = model.onclick;
        }
        return e;
    }
}