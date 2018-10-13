export class HTMLElementOptions{
    tagname: string
    innerHTML?: string
    classList?: string[]
    children?: HTMLElement[]
    onclick?: any
    static isValid(o: HTMLElementOptions):Boolean{
        if(!o) return false;
        if(!o.tagname) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }
}

export interface IDOMService{
    createElement(options: HTMLElementOptions): HTMLElement
    findById(id: string): HTMLElement
}

export class DOMService{
    findById(id: string): HTMLElement{
        let e = document.getElementById(id);
        if(!e) throw new Error("Cant find `" + id + "` in document");
        return e;
    }
    createElement(options: HTMLElementOptions): HTMLElement{
        let e = document.createElement(options.tagname);
        if(!e) throw new Error("Cant create `" + options.tagname + "` in document");
        if(options.innerHTML){
            e.innerHTML = options.innerHTML
        }
        if(options.classList){
            options.classList.forEach(classname => {
                e.classList.add(classname);
            });
        }
        if(options.children){
            options.children.forEach(child => {
                e.appendChild(child);
            });
        }
        if(options.onclick){
            e.onclick = options.onclick;
        }
        return e;
    }
}