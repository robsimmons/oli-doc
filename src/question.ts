import { Part } from "./part";

/**
 * A Question represents a single (multipart) OLI question.
 *
 * Questions mainly serves to hold {@link Part Parts}.
 *
 * We build up questions imperatively, by adding one part at a time with the {@link addInput} function.
 */
export class Question {
    private id: string;
    private prompt: string;
    private parts: { [id: string]: Part | undefined };

    /**
     * @param id The unique identifier for the question.
     *
     * XXX - Does this have to be unique within an entire module? Or within an entire X? What is its use?
     *
     * @param prompt The question's prompt text. Generally shown to the user before any question parts, though
     * this is configurable.
     *
     * XXX - check whether this is expected to be HTML text or something like that.
     */
    constructor(id: string, prompt: string) {
        this.id = id;
        this.prompt = prompt;
        this.parts = {};
    }

    /**
     * Get the unique identifier for the question.
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Set the unique identifier for the question.
     *
     * XXX - is this ever used?
     */
    public setId(id: string): void {
        this.id = id;
    }

    /**
     * Get the question's prompt text.
     */
    public getPrompt(): string {
        return this.prompt;
    }

    /**
     * Set the question's prompt text.
     *
     * XXX - is this ever used?
     */
    public setPrompt(prompt: string): void {
        this.prompt = prompt;
    }

    /**
     * Get all the {@link Part Parts} of a question in a map keyed by the part's unique identifer.
     */
    public getParts(): { readonly [id: string]: Part | undefined } {
        return this.parts;
    }

    /**
     * Use a part's unique identifier to access the {@link Part}.
     */
    public getPart(id: string): Part | null {
        if (this.parts.hasOwnProperty(id)) {
            return this.parts[id] as Part;
        } else {
            return null;
        }
    }

    /**
     * Add a new {@link Part} to the question. If a part with the same unique identifier has already
     * been added, the old part will be replaced by the new part without warning.
     *
     * @param part - The new part.
     */
    public addInput(part: Part): void {
        this.parts[part.getId()] = part;
    }
}
