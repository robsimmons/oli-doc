/**
 * A Part belongs to a {@link Question].
 */
class Part {
    private id: string;
    private typ: string | undefined;
    private component: Element | undefined;

    /**
     * @param id The part's identifier (must be unique to the Part's {@link Question})
     * @param typ DEPRECATED
     * @param component DEPRECATED
     */
    constructor(id: string, typ?: string, component?: Element) {
        this.id = id;
        this.typ = typ;
        this.component = component;
    }

    public setId(id: string) {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    public setType(typ: string) {
        this.typ = typ;
    }

    public getType(): string | undefined {
        return this.typ;
    }

    public setInputComponent(component: Element) {
        this.component = component;
    }

    public getInputComponent(): Element | undefined {
        return this.component;
    }
}
