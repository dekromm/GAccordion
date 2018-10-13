import { GPanel, GPanelOptions } from "./panel";

export class GAccordionOptions {
    container: string  // id of DOM element to build onto
    mainTitle?: string
    panels: [GPanelOptions]
    static isValid(o: GAccordionOptions):Boolean{
        if(!o) return false;
        if(!o.container) return false;
        if(!o.panels) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

export class GAccordion {
    container: string
    mainTitle: string
    panels: GPanel[]
    constructor(options: GAccordionOptions) {
        if(!GAccordionOptions.isValid(options)){
            throw new Error("Given options are not ok");
        }
        this.container = options.container;
        this.mainTitle = options.mainTitle ? options.mainTitle : "";    
        this.panels = [];
        for(let currentPanel of options.panels){
            this.panels.push(new GPanel(currentPanel));
        }
    }
}