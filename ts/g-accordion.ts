interface GPanelOptions {
    title: string,
    subtitle: string,
    content: string
}

class GPanel {
    element: HTMLElement
    constructor(options: GPanelOptions){

        // declare panels behaviour (toggle open/close state)
        function toggle(element: HTMLElement){
            let isClosed: Boolean = false;
            element.classList.forEach(className => {
                if(className == 'item-closed'){
                    isClosed = true;
                }
            });
            if(isClosed){
                element.classList.remove('item-closed');
            } else {
                element.classList.add('item-closed');
            }
        }
    
        let children = []

        let dropdownButton = GElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function(){toggle(domPanel)}
        });
        children.push(dropdownButton);

        let title = GElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: options.title,
            onclick: function(){toggle(domPanel)}
        });
        children.push(title);

        if(options.subtitle){
            let subtitle = GElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: options.subtitle
            });
            children.push(subtitle);
        }

        let content = GElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: options.content
        });
        children.push(content);

        let domPanel = GElement({
            tagname: 'div',
            classList: ['item','item-closed'],
            children: children
        });
        this.element = domPanel;
    }
}


interface GAccordionOptions {
    container: string,  // id of DOM element to build onto
    mainTitle?: string,
    panels: [GPanelOptions]
}

class GAccordion {
    panels: [GPanel]
    constructor(options: GAccordionOptions) {
    
        let DOMcontainer = document.getElementById(options.container);
        DOMcontainer.classList.add('g-accordion');
    
        if(options.mainTitle){
            let maintitle = GElement({
                tagname: 'div',
                classList: ['main-title'],
                innerHTML: options.mainTitle
            });
            DOMcontainer.appendChild(maintitle);
        }
    
        for(let currentPanel of options.panels){
            let p: GPanel = new GPanel(currentPanel);
            DOMcontainer.appendChild(p.element);
        }
    }
}




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

function GElement(options){
    let element = document.createElement(options.tagname);
    if(options.innerHTML){
        element.innerHTML = options.innerHTML
    }
    if(options.classList){
        options.classList.forEach(classname => {
            element.classList.add(classname);
        });
    }
    if(options.children){
        options.children.forEach(child => {
            element.appendChild(child);
        });
    }
    if(options.onclick){
        element.onclick = options.onclick;
    }
    return element;
}
