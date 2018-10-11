var GPanel = /** @class */ (function () {
    function GPanel(options) {
        // declare panels behaviour (toggle open/close state)
        function toggle(element) {
            var isClosed = false;
            element.classList.forEach(function (className) {
                if (className == 'item-closed') {
                    isClosed = true;
                }
            });
            if (isClosed) {
                element.classList.remove('item-closed');
            }
            else {
                element.classList.add('item-closed');
            }
        }
        var children = [];
        var dropdownButton = GElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function () { toggle(domPanel); }
        });
        children.push(dropdownButton);
        var title = GElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: options.title,
            onclick: function () { toggle(domPanel); }
        });
        children.push(title);
        if (options.subtitle) {
            var subtitle = GElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: options.subtitle
            });
            children.push(subtitle);
        }
        var content = GElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: options.content
        });
        children.push(content);
        var domPanel = GElement({
            tagname: 'div',
            classList: ['item', 'item-closed'],
            children: children
        });
        this.element = domPanel;
    }
    return GPanel;
}());
var GAccordion = /** @class */ (function () {
    function GAccordion(options) {
        var DOMcontainer = document.getElementById(options.container);
        DOMcontainer.classList.add('g-accordion');
        if (options.mainTitle) {
            var maintitle = GElement({
                tagname: 'div',
                classList: ['main-title'],
                innerHTML: options.mainTitle
            });
            DOMcontainer.appendChild(maintitle);
        }
        for (var _i = 0, _a = options.panels; _i < _a.length; _i++) {
            var currentPanel = _a[_i];
            var p = new GPanel(currentPanel);
            DOMcontainer.appendChild(p.element);
        }
    }
    return GAccordion;
}());
/* Element Creator Helper Fuction
    returns a DOM element with the given properties (as JSON).
    Example:
    GElement({
        tagname: "div",
        onclick: onclickfunction,
        classList: ["class1","class2"],
        innerHTML: <p>div content</p>,
        children: [element1,element2]
    });

    tagname is mandatory.
*/
function GElement(options) {
    var element = document.createElement(options.tagname);
    if (options.innerHTML) {
        element.innerHTML = options.innerHTML;
    }
    if (options.classList) {
        options.classList.forEach(function (classname) {
            element.classList.add(classname);
        });
    }
    if (options.children) {
        options.children.forEach(function (child) {
            element.appendChild(child);
        });
    }
    if (options.onclick) {
        element.onclick = options.onclick;
    }
    return element;
}
