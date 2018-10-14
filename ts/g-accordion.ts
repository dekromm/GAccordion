/**
 * Represents an accordion panel's data
 */
class PanelModel {
    title: string
    subtitle?: string
    content: string

    /**
     * Checks wether the given data is compatible with the PanelModel class.
     * @param panel The PanelModel to verify
     * @returns true when the given panel is compatible with PanelModel, otherwise false
     */
    static isValid(panel: PanelModel): Boolean {
        if (!panel) return false;
        if (!panel.title) return false;
        if (!panel.content) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

/**
 * HTML UI class for PanelModel
 */
class GPanel {
    /**
     * the source PanelModel used in constructor
     */
    model: PanelModel
    private _isOpen: Boolean
    /**
     * the rendered HTML root element
     */
    htmlElement: HTMLElement

    private setStatus(open: Boolean): void {
        this._isOpen = open;
        if (this._isOpen) {
            this.htmlElement.classList.remove('item-closed')
        } else {
            this.htmlElement.classList.add('item-closed')
        }
    }

    /**
     * Tells wether the GPanel is open or closed
     * @returns true when open, false when closed
     */
    isOpen():Boolean {return this._isOpen;}

    /**
     * Toggles between open and closed state
     */
    toggle() {
        this.setStatus(!this._isOpen);
    }

    /**
     * Builds the object using the given PanelModel
     * @param model PanelModel to use
     */
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
/**
 * Represents accordion data
 */
class AccordionModel {
    /**
     * id of DOM element to build onto
     */
    container: string
    mainTitle?: string
    panels: PanelModel[]

    /**
     * Checks wether the given data is compatible with the AccordionModel class.
     * @param accordion The AccordionModel to verify
     * @returns true when the given panel is compatible with AccordionModel, otherwise false
     */
    static isValid(accordion: AccordionModel): Boolean {
        if (!accordion) return false;
        if (!accordion.container) return false;
        if (!accordion.panels) return false;
        for (let p of accordion.panels) {
            if (!PanelModel.isValid(p)) return false;
        }
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

/**
 * HTML UI class for AccordionModel.
 */
class GAccordion {
    /**
     * the source AccordionModel used in constructor
     */
    model: AccordionModel

    /**
     * the rendered HTML root element
     */
    htmlElement: HTMLElement

    /**
     * this instance's GPanels
     */
    panels: GPanel[]

    /**
     * Builds the object using the given AccordionModel
     * @param model AccordionModel to use 
     * @param $dom the IDOM to build the accordion in
     */
    constructor(model: AccordionModel, $dom: IDOM) {
        if (!model) {
            throw new Error("AccordionModel is null");
        }
        if (!AccordionModel.isValid(model)) {
            throw new Error("AccordionModel is not valid");
        }
        if (!$dom) {
            throw new Error("IDOMService dependency is null");
        }
        this.model = model;
        let DOMcontainer = $dom.findById(this.model.container);
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

/**
 * Represents a HTML element description
 */
class HTMLElementModel {
    tagname: string
    innerHTML?: string
    classList?: string[]
    children?: HTMLElement[]
    onclick?: any
    
    /**
     * Checks wether the given data is compatible with the HTMLElementModel class.
     * @param panel The HTMLElementModel to verify
     * @returns true when the given panel is compatible with HTMLElementModel, otherwise false
     */
    static isValid(o: HTMLElementModel): Boolean {
        if (!o) return false;
        if (!o.tagname) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }

    /**
     * Creates an HTMLElement compatible with the given description
     * @param model
     * @returns the HTMLElement created
     */
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

/**
 * describe an interface to access a DOM
 */
interface IDOM {
    /**
     * returns the HTMLElement with the given id in the accessed DOM
     * @param id 
     */
    findById(id: string): HTMLElement
}

/**
 * Represents an interface to access the standard `document` DOM
 * @implements IDOM
 */
class DOM implements IDOM {
    findById(id: string): HTMLElement {
        let e = document.getElementById(id);
        if (!e) throw new Error("Cant find `" + id + "` in document");
        return e;
    }
}