/// <reference path="panel-model.ts" />
/// <reference path="htmlelement-model.ts" />

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