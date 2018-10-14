/// <reference path="panel-model.ts" />

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