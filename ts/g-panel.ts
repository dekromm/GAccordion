import { GPanel, GPanelOptions } from "./panel";
import { DOMService, HTMLElementOptions } from "./domservice";

export class GHTMLPanel {
    htmlElement: HTMLElement
    constructor(p: GPanel, $domService: DOMService){

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

        let dropdownButton = $domService.createElement({
            tagname: 'i',
            classList: ['material-icons', 'item-dropdown'],
            onclick: function(){toggle(domPanel)}
        });
        children.push(dropdownButton);

        let title = $domService.createElement({
            tagname: 'h1',
            classList: ['item-title'],
            innerHTML: p.title,
            onclick: function(){toggle(domPanel)}
        });
        children.push(title);

        if(p.subtitle){
            let subtitle = $domService.createElement({
                tagname: 'h2',
                classList: ['item-subtitle'],
                innerHTML: p.subtitle
            });
            children.push(subtitle);
        }

        let content = $domService.createElement({
            tagname: 'div',
            classList: ['item-content'],
            innerHTML: p.content
        });
        children.push(content);

        let domPanel = $domService.createElement({
            tagname: 'div',
            classList: ['item','item-closed'],
            children: children
        });
        this.htmlElement = domPanel;
    }
}
