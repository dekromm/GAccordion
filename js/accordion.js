var PanelModel = /** @class */ (function () {
    function PanelModel() {
    }
    PanelModel.isValid = function (o) {
        if (!o)
            return false;
        if (!o.title)
            return false;
        if (!o.content)
            return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true;
    };
    return PanelModel;
}());
var Panel = /** @class */ (function () {
    function Panel(model) {
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
    Panel.prototype.setStatus = function (open) {
        this._isOpen = open;
        if (this._isOpen) {
            this.htmlElement.classList.remove('item-closed');
        }
        else {
            this.htmlElement.classList.add('item-closed');
        }
    };
    Panel.prototype.isOpen = function () { return this._isOpen; };
    Panel.prototype.toggle = function () {
        this.setStatus(!this._isOpen);
    };
    return Panel;
}());
var AccordionModel = /** @class */ (function () {
    function AccordionModel() {
    }
    AccordionModel.isValid = function (o) {
        if (!o)
            return false;
        if (!o.container)
            return false;
        if (!o.panels)
            return false;
        for (var _i = 0, _a = o.panels; _i < _a.length; _i++) {
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
var Accordion = /** @class */ (function () {
    function Accordion(model, $domService) {
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
        var DOMcontainer = $domService.findById(this.model.container);
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
            var p = new Panel(currentPanel);
            DOMcontainer.appendChild(p.htmlElement);
            this.panels.push(p);
        }
        this.htmlElement = DOMcontainer;
    }
    return Accordion;
}());
var HTMLElementModel = /** @class */ (function () {
    function HTMLElementModel() {
    }
    HTMLElementModel.isValid = function (o) {
        if (!o)
            return false;
        if (!o.tagname)
            return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true;
    };
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
