/**
 * Represents an accordion panel's data
 */
var PanelModel = /** @class */ (function () {
    function PanelModel() {
    }
    /**
     * Checks wether the given data is compatible with the PanelModel class.
     * @param panel The PanelModel to verify
     * @returns true when the given panel is compatible with PanelModel, otherwise false
     */
    PanelModel.isValid = function (panel) {
        if (!panel)
            return false;
        if (!panel.title)
            return false;
        if (!panel.content)
            return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true;
    };
    return PanelModel;
}());
/// <reference path="panel-model.ts" />
/**
 * Represents accordion data
 */
var AccordionModel = /** @class */ (function () {
    function AccordionModel() {
    }
    /**
     * Checks wether the given data is compatible with the AccordionModel class.
     * @param accordion The AccordionModel to verify
     * @returns true when the given panel is compatible with AccordionModel, otherwise false
     */
    AccordionModel.isValid = function (accordion) {
        if (!accordion)
            return false;
        if (!accordion.container)
            return false;
        if (!accordion.panels)
            return false;
        for (var _i = 0, _a = accordion.panels; _i < _a.length; _i++) {
            var p = _a[_i];
            if (!PanelModel.isValid(p))
                return false;
        }
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true;
    };
    return AccordionModel;
}());
/**
 * Represents an interface to access the standard `document` DOM
 * @implements IDOM
 */
var DOM = /** @class */ (function () {
    function DOM() {
    }
    DOM.prototype.findById = function (id) {
        var e = document.getElementById(id);
        if (!e)
            throw new Error("Cant find `" + id + "` in document");
        return e;
    };
    return DOM;
}());
/**
 * Represents a HTML element description
 */
var HTMLElementModel = /** @class */ (function () {
    function HTMLElementModel() {
    }
    /**
     * Checks wether the given data is compatible with the HTMLElementModel class.
     * @param panel The HTMLElementModel to verify
     * @returns true when the given panel is compatible with HTMLElementModel, otherwise false
     */
    HTMLElementModel.isValid = function (o) {
        if (!o)
            return false;
        if (!o.tagname)
            return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true;
    };
    /**
     * Creates an HTMLElement compatible with the given description
     * @param model
     * @returns the HTMLElement created
     */
    HTMLElementModel.createElement = function (model) {
        var e = document.createElement(model.tagname);
        if (!e)
            throw new Error("Cant create `" + model.tagname + "` in document");
        if (model.innerHTML) {
            e.innerHTML = model.innerHTML;
        }
        if (model.classList) {
            model.classList.forEach(function (classname) {
                e.classList.add(classname);
            });
        }
        if (model.children) {
            model.children.forEach(function (child) {
                e.appendChild(child);
            });
        }
        if (model.onclick) {
            e.onclick = model.onclick;
        }
        return e;
    };
    return HTMLElementModel;
}());
/// <reference path="panel-model.ts" />
/// <reference path="htmlelement-model.ts" />
/**
 * HTML UI class for PanelModel
 */
var GPanel = /** @class */ (function () {
    /**
     * Builds the object using the given PanelModel
     * @param model PanelModel to use
     */
    function GPanel(model) {
        if (!model) {
            throw new Error("PanelModel is null");
        }
        if (!PanelModel.isValid(model)) {
            throw new Error("PanelModel is not valid");
        }
        this.model = model;
        this._isOpen = false;
        var children = [];
        var self = this;
        var dropdownButton = HTMLElementModel.createElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function () { self.toggle(); }
        });
        children.push(dropdownButton);
        var title = HTMLElementModel.createElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: this.model.title,
            onclick: function () { self.toggle(); }
        });
        children.push(title);
        if (this.model.subtitle) {
            var subtitle = HTMLElementModel.createElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: this.model.subtitle
            });
            children.push(subtitle);
        }
        var content = HTMLElementModel.createElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: this.model.content
        });
        children.push(content);
        var domPanel = HTMLElementModel.createElement({
            tagname: 'div',
            classList: ['item', 'item-closed'],
            children: children
        });
        this.htmlElement = domPanel;
    }
    GPanel.prototype.setStatus = function (open) {
        this._isOpen = open;
        if (this._isOpen) {
            this.htmlElement.classList.remove('item-closed');
        }
        else {
            this.htmlElement.classList.add('item-closed');
        }
    };
    /**
     * Tells wether the GPanel is open or closed
     * @returns true when open, false when closed
     */
    GPanel.prototype.isOpen = function () { return this._isOpen; };
    /**
     * Toggles between open and closed state
     */
    GPanel.prototype.toggle = function () {
        this.setStatus(!this._isOpen);
    };
    return GPanel;
}());
/// <reference path="dom.ts" />
/// <reference path="htmlelement-model.ts" />
/// <reference path="panel-model.ts" />
/// <reference path="g-panel.ts" />
/// <reference path="accordion-model.ts" />
/**
 * HTML UI class for AccordionModel.
 */
var GAccordion = /** @class */ (function () {
    /**
     * Builds the object using the given AccordionModel
     * @param model AccordionModel to use
     * @param $dom the IDOM to build the accordion in
     */
    function GAccordion(model, $dom) {
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
        var DOMcontainer = $dom.findById(this.model.container);
        DOMcontainer.classList.add('g-accordion');
        if (this.model.mainTitle) {
            var maintitle = HTMLElementModel.createElement({
                tagname: 'div',
                classList: ['main-title'],
                innerHTML: this.model.mainTitle
            });
            DOMcontainer.appendChild(maintitle);
        }
        this.panels = [];
        for (var _i = 0, _a = this.model.panels; _i < _a.length; _i++) {
            var currentPanel = _a[_i];
            var p = new GPanel(currentPanel);
            DOMcontainer.appendChild(p.htmlElement);
            this.panels.push(p);
        }
        this.htmlElement = DOMcontainer;
    }
    return GAccordion;
}());
