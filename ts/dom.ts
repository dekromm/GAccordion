/**
 * describe an interface to access a DOM
 */
interface IDOM {
    /**
     * returns the HTMLElement with the given id in the accessed DOM
     * @param id 
     */
    findById(id: string): HTMLElement
}

/**
 * Represents an interface to access the standard `document` DOM
 * @implements IDOM
 */
class DOM implements IDOM {
    findById(id: string): HTMLElement {
        let e = document.getElementById(id);
        if (!e) throw new Error("Cant find `" + id + "` in document");
        return e;
    }
}