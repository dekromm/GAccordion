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

class GPanel {
    model: PanelModel
    private _isOpen: Boolean
    htmlElement: HTMLElement

    private setStatus(open: Boolean): void {
        this._isOpen = open;
        if (this._isOpen) {
            this.htmlElement.classList.remove('item-closed')
        } else {
            this.htmlElement.classList.add('item-closed')
        }
    }

    isOpen():Boolean {return this._isOpen;}

    toggle() {
        this.setStatus(!this._isOpen);
    }

    constructor(model: PanelModel) {
        if (!model) {
            throw new Error("PanelModel is null");
        }
        if (!PanelModel.isValid(model)) {
            throw new Error("PanelModel is not valid");
        }
        this.model = model;
        this._isOpen = false;

        let children = []
        let self = this;

        let dropdownButton = HTMLElementModel.createElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function () { self.toggle() }
        });
        children.push(dropdownButton);

        let title = HTMLElementModel.createElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: this.model.title,
            onclick: function () { self.toggle() }
        });
        children.push(title);

        if (this.model.subtitle) {
            let subtitle = HTMLElementModel.createElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: this.model.subtitle
            });
            children.push(subtitle);
        }

        let content = HTMLElementModel.createElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: this.model.content
        });
        children.push(content);

        let domPanel = HTMLElementModel.createElement({
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
        for (let p of o.panels) {
            if (!PanelModel.isValid(p)) return false;
        }
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

class GAccordion {
    model: AccordionModel

    htmlElement: HTMLElement
    panels: GPanel[]

    constructor(model: AccordionModel, $domService: IDOM) {
        if (!model) {
            throw new Error("AccordionModel is null");
        }
        if (!AccordionModel.isValid(model)) {
            throw new Error("AccordionModel is not valid");
        }
        if (!$domService) {
            throw new Error("IDOMService dependency is null");
        }
        this.model = model;
        let DOMcontainer = $domService.findById(this.model.container);
        DOMcontainer.classList.add('g-accordion');

        if (this.model.mainTitle) {
            let maintitle = HTMLElementModel.createElement({
                tagname: 'div',
                classList: ['main-title'],
                innerHTML: this.model.mainTitle
            });
            DOMcontainer.appendChild(maintitle);
        }

        this.panels = [];
        for (let currentPanel of this.model.panels) {
            let p: GPanel = new GPanel(currentPanel);
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
    static createElement(model: HTMLElementModel): HTMLElement {
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

interface IDOM {
    findById(id: string): HTMLElement
}

class DOM implements IDOM {
    findById(id: string): HTMLElement {
        let e = document.getElementById(id);
        if (!e) throw new Error("Cant find `" + id + "` in document");
        return e;
    }
}