import { Feedback } from "./feedback";
import { Question } from "./question";

/**
 * A Part belongs to a {@link Question}.
 */

export class Part {
    private id: string;
    private typ: string | undefined;
    private component: Element | undefined;

    /**
     * @param id The part's identifier (must be unique to the Part's {@link Question}). NOTE - should the id
     * field be optional? Are there any examples that set it later with setId in a meaningful way?
     * @param typ UNKNOWN NOTE - I don't have any examples where this is used.
     * @param component UNKNOWN NOTE - I don't have any examples where this is used.
     */
    constructor(id: string, typ?: string, component?: Element) {
        this.id = id;
        this.typ = typ;
        this.component = component;
    }

    /**
     * NOTE is this ever used?
     */
    public setId(id: string) {
        this.id = id;
    }

    public getId(): string {
        return this.id;
    }

    /**
     * NOTE is this ever used?
     */
    public setType(typ: string) {
        this.typ = typ;
    }

    public getType(): string | undefined {
        return this.typ;
    }

    /**
     * NOTE is this ever used?
     */
    public setInputComponent(component: Element) {
        this.component = component;
    }

    public getInputComponent(): Element | undefined {
        return this.component;
    }

    public addFeedback(feedback: Feedback): void {
        throw new Error("Unimpl");
    }

    public getFeedback(id): any {
        throw new Error("Unimpl");
    }

    public getFeedbackForAnswerId(answerId): Feedback {
        throw new Error("Unimpl");
    }

    public addHint(hint: any): void {
        throw new Error("Unimpl");
    }

    public getHints(): any {
        throw new Error("Unimpl");
    }

    public getHint(id: string): any {
        throw new Error("Unimpl");
    }
}
