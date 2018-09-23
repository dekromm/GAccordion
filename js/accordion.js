/* Reusable Accordion Component
    Example input options JSON:
    {
        container: 'my-accordion',              // Id of the DOM element to buil onto
        mainTitle: 'Main accordion title',      // Optional: instantiate an Item in the Accordion to use as main title
        panels: [{                              // Array of panels
            title: 'Title 1',                   // Panel title
            subtitle: 'Subtitle 1',             // Panel subtitle
            content: '<p>HTML content 1</p>'    // Panel content
        },{
            title: 'Title 2',                   
            subtitle: 'Subtitle 2',             
            content: '<p>HTML content 2</p>'    
        },{
            title: 'Title 3',
            subtitle: 'Subtitle 3',
            content: '<p>HTML content 3</p>'
        }]
    }
*/
function GAccordion(options) {
    // declare panels behaviour (toggle open/close state)
    function toggle(element){
        isClosed=false;
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

    /* Instantiate DOM panels in 3 steps
        Target DOM Structure:
        
        <div id="my-accordion2" class="g-accordion"> // existing div to build into

            <div class="main-title">{item.title}</div>

            <div class="item item-closed"> // remove item-closed class to open an 
            
                <i class="material-icons item-dropdown"></i>

                <h1 class="item-title">{item.title}</h1>

                <h2 class="item-subtitle">{item.subtitle}</h2>

                <div class="item-content">
                    {item.content}
                </div>
            </div>
            .
            . repeat for other items
            .
        </div>
    */
    
    
    // 1/3 Container
    var DOMcontainer = document.getElementById(options.container);
    DOMcontainer.classList.add('g-accordion');

    // 2/3 Main Title (if any)
    if(options.mainTitle){
        var mainTitle = GElement({
            tagname: 'div',
            classList: ['main-title'],
            innerHTML: options.mainTitle
        })
        DOMcontainer.appendChild(mainTitle);
    }

    // 3/3 Accordion items
    options.panels.forEach(item => {

        var children = []

        var dropdownButton = GElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function(){toggle(domPanel)}
        });
        children.push(dropdownButton);

        var title = GElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: item.title,
            onclick: function(){toggle(domPanel)}
        });
        children.push(title);

        if(item.subtitle){
            var subtitle = GElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: item.subtitle
            });
            children.push(subtitle);
        }

        var content = GElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: item.content
        });
        children.push(content);

        var domPanel = GElement({
            tagname: 'div',
            classList: ['item','item-closed'],
            children: children
        });

        DOMcontainer.appendChild(domPanel);
        
    });
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
    element = document.createElement(options.tagname);
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
