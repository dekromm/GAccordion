/**
 * Represents a HTML element description
 */
class HTMLElementModel {
    tagname: string
    innerHTML?: string
    classList?: string[]
    children?: HTMLElement[]
    onclick?: any

    /**
     * Checks wether the given data is compatible with the HTMLElementModel class.
     * @param panel The HTMLElementModel to verify
     * @returns true when the given panel is compatible with HTMLElementModel, otherwise false
     */
    static isValid(o: HTMLElementModel): Boolean {
        if (!o) return false;
        if (!o.tagname) return false;
        // TODO Check types
        // TODO investigate more transparent ways to do runtime type checking (https://github.com/fabiandev/ts-runtime)
        return true
    }

    /**
     * Creates an HTMLElement compatible with the given description
     * @param model
     * @returns the HTMLElement created
     */
    static createElement(model: HTMLElementModel): HTMLElement {
        let e = document.createElement(model.tagname);
        if (!e) throw new Error("Cant create `" + model.tagname + "` in document");
        if (model.innerHTML) {
            e.innerHTML = model.innerHTML
        }
        if (model.classList) {
            model.classList.forEach(classname => {
                e.classList.add(classname);
            });
        }
        if (model.children) {
            model.children.forEach(child => {
                e.appendChild(child);
            });
        }
        if (model.onclick) {
            e.onclick = model.onclick;
        }
        return e;
    }
}    