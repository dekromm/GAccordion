# GAccordion

GAccordion is a reusable accordion component that depends on accordion.js and accordion.css.

## Getting started

Declare a `div` element and use the GAccordion constructor to actually make it an accordion.

    
    <div id="my-accordion"></div>
    <script>
        var accordion = new GAccordion(options, new DOM());
    </script>

The `options` object (to feed the constructor with) represents the accordion content.

    {
        container: 'my-accordion',
        mainTitle: 'Full witdth',
        panels: [{
            title: 'Title 1',
            content: '<p>HTML content 1</p>'
        },{
            title: 'Title 2',
            subtitle: 'Subtitle 2',
            content: '<h4>Lorem Ipsum...</h4>   <p><b>Lorem ipsum dolor sit amet</b>, consectetur adipisci elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.<br> <i>Ut enim ad minim veniam</i>, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.</p><p>Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
        },{
            title: 'Title 3',
            subtitle: 'Subtitle 3',
            content: '<p>HTML content 3</p>'
        }]
    }

Note that the value of `container` property must be the same as the `div`'s id.

The `new DOM()` parameter is a wrapper for the DOM.

## What to improve

1. error handling (both JS and HTML element overflow)
2. max-height animation (should fix with js-measured height)
3. chevron alignment