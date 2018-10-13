export class GPanelOptions {
    title: string
    subtitle: string
    content: string
    static isValid(o: GPanelOptions):Boolean{
        if(!o) return false;
        if(!o.title) return false;
        if(!o.subtitle) return false;
        if(!o.content) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

export class GPanel {
    title: string
    subtitle: string
    content: string
    isOpen: Boolean
    toggleListeners: { (): void; } []
    toggle(){
        this.isOpen = !this.isOpen;
        for(let f of this.toggleListeners){
            f();
        }
    }

    constructor(options: GPanelOptions){
        this.title = options.title;
        this.subtitle = options.subtitle;
        this.content = options.content
        this.isOpen = false;
        this.toggleListeners = [];
    }
}