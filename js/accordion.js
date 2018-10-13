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
    function Panel(model, $domService) {
        if (!model) {
            throw new Error("PanelModel is null");
        }
        if (!PanelModel.isValid(model)) {
            throw new Error("PanelModel is not valid");
        }
        if (!$domService) {
            throw new Error("IDOMService dependency is null");
        }
        this.model = model;
        var children = [];
        var self = this;
        var dropdownButton = $domService.createElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function () { self.toggle(); }
        });
        children.push(dropdownButton);
        var title = $domService.createElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: this.model.title,
            onclick: function () { self.toggle(); }
        });
        children.push(title);
        if (this.model.subtitle) {
            var subtitle = $domService.createElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: this.model.subtitle
            });
            children.push(subtitle);
        }
        var content = $domService.createElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: this.model.content
        });
        children.push(content);
        var domPanel = $domService.createElement({
            tagname: 'div',
            classList: ['item', 'item-closed'],
            children: children
        });
        this.htmlElement = domPanel;
    }
    Panel.prototype.setStatus = function (open) {
        this.isOpen = open;
        var targetClass;
        if (this.isOpen) {
            this.htmlElement.classList.remove('item-closed');
        }
        else {
            this.htmlElement.classList.add('item-closed');
        }
    };
    Panel.prototype.toggle = function () {
        this.setStatus(!this.isOpen);
    };
    Panel.prototype.getStatus = function () {
        return this.isOpen;
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
            var maintitle = $domService.createElement({
                tagname: 'div',
                classList: ['main-title'],
                innerHTML: this.model.mainTitle
            });
            DOMcontainer.appendChild(maintitle);
        }
        for (var _i = 0, _a = this.model.panels; _i < _a.length; _i++) {
            var currentPanel = _a[_i];
            var p = new Panel(currentPanel, $domService);
            DOMcontainer.appendChild(p.htmlElement);
        }
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
    return HTMLElementModel;
}());
var DOMService = /** @class */ (function () {
    function DOMService() {
    }
    DOMService.prototype.findById = function (id) {
        var e = document.getElementById(id);
        if (!e)
            throw new Error("Cant find `" + id + "` in document");
        return e;
    };
    DOMService.prototype.createElement = function (model) {
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
    return DOMService;
}());
