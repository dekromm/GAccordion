/* Reusable Accordion Component */
function Accordion(options) {
    // Step 1 of 2: declare panels behaviour
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

    //Step 2 of 2: instantiate DOM panels and bind behaviours
    var DOMcontainer = document.getElementById(options.container);
    options.panels.forEach(panel => {
        var domPanel = document.createElement('div');
        domPanel.id = panel.title;
        domPanel.classList.add('item-closed');
        domPanel.innerHTML = '<div class="item-header"><h1>'+panel.title+'</h1><h2>'+panel.subtitle+'</h2></div>';
        domPanel.innerHTML += '<div class="item-body">'+panel.content+'</div>';
        domPanel.onclick = function(){toggle(domPanel)};
        DOMcontainer.appendChild(domPanel);
    });
}
