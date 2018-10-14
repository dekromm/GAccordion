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