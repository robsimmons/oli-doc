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

    constructor(id: string, prompt: string) {
        this.id = id;
        this.prompt = prompt;
        this.parts = {};
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string) {
        this.id = id;
    }

    public getPrompt(): string {
        return this.prompt;
    }

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
