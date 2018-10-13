import { GAccordion, GAccordionOptions } from "./accordion";
import { GHTMLPanel } from "./g-panel";
import { DOMService, HTMLElementOptions } from "./domservice";


class GAccordionHTML {
    accordion: GAccordion
    htmlElement: HTMLElement
    constructor(options: GAccordionOptions, $domService: DOMService) {
    
        this.accordion = new GAccordion(options);

        this.accordion = new GAccordion(options);

        let DOMcontainer = $domService.findById(this.accordion.container);
        if(!DOMcontainer){
            throw new Error("Can\'t find id in document");
        }
        DOMcontainer.classList.add('g-accordion');
    
        if(this.accordion.mainTitle){
            let maintitle = $domService.createElement({
                tagname: 'div',
                classList: ['main-title'],
                innerHTML: this.accordion.mainTitle
            });
            DOMcontainer.appendChild(maintitle);
        }
    
        for(let currentPanel of this.accordion.panels){
            let p: GHTMLPanel = new GHTMLPanel(currentPanel, $domService);
            DOMcontainer.appendChild(p.htmlElement);
        }
    }
}


