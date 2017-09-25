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
    private parts: { [id: string]: Part };

    /**
     * @param id The unique identifier for the question. NOTE - Does this have to be unique within an entire
     * module? Or within an entire X? What is its use?
     * @param prompt The text shown to the student, generally (always?) before any question parts.
     */
    constructor(id: string, prompt: string) {
        this.id = id;
        this.prompt = prompt;
        this.parts = {};
    }

    public getId(): string {
        return this.id;
    }

    /**
     * NOTE is this ever used?
     */
    public setId(id: string) {
        this.id = id;
    }

    public getPrompt(): string {
        return this.prompt;
    }

    /**
     * NOTE is this ever used?
     */
    public setPrompt(prompt: string) {
        this.prompt = prompt;
    }

    public getParts(): { readonly [id: string]: Part } {
        return this.parts;
    }

    public getPart(id: string): Part {
        return this.parts[id];
    }

    public addInput(input: Part) {
        this.parts[input.getId()] = input;
    }
}
