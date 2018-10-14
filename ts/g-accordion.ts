/// <reference path="dom.ts" />
/// <reference path="htmlelement-model.ts" />
/// <reference path="panel-model.ts" />
/// <reference path="g-panel.ts" />
/// <reference path="accordion-model.ts" />

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