import { Input } from "./input";

/**
 * PartData encapsulates the user's response to a {@link Part}, as well as the 
 */
export class PartData {
    private id: string;
    private key: string;
    private value: string;
    private output: string | null;
    private evaluation: string | null;
    private correct: boolean;
    private score: number;
    private feedback: string | null;
    private hint: string | null;

    /**
     * @param id - The id for the {@link Part} that this PartData is linked to.
     * @param input - A representation of the user's input.
     */
    constructor(id: string, input: Input) {
        this.id = id;
        this.key = input.id;
        this.value = input.value;
        this.output = null;
        this.evaluation = null;
        this.correct = false;
        this.score = 0;
        this.feedback = null;
        this.hint = null;
    }

    /**
     * Get the unique identifier for the {@link Part}'s data.
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Set the unique identifier for the {@link Part}'s data.
     *
     * XXX - is this ever used? This seems like a bad idea for all the reasons that {@link Part.setId} is a
     * bad idea.
     */
    public setId(id: string): void {
        this.id = id;
    }

    /**
     * Get the input object for the {@link Part}'s data.
     */
    public getInput(): Input {
        return {
            id: this.key,
            value: this.value
        };
    }

    /**
     * Set the input object for the {@link Part}'s data.
     *
     * XXX - is this ever used? It seems error-prone.
     */
    public setInput(input: Input): void {
        this.key = input.id;
        this.value = input.value;
    }

    /**
     * Some custom activity types interact with an outside service (such as a compiler) that generates output
     * for the user directly. Rather than re-querying the service when this feedback is collected and
     * presented to the user, this feedback can be stored in the data model.
     */
    public getOutput(): string | null {
        return this.output;
    }

    /**
     * Save feedback from an outside service in this PartData.
     */
    public setOutput(output: string): void {
        this.output = output;
    }

    /**
     * XXX - I need an example for this to know what it's all about.
     */
    public getEvaluation(): string | null {
        return this.evaluation;
    }

    /**
     * XXX - I need an example for this to know what it's all about.
     */
    public setEvaluation(evaluation: string): void {
        this.evaluation = evaluation;
    }

    /**
     * Get the PartData's correctness property.
     */
    public getCorrect(): boolean {
        return this.correct;
    }

    /**
     * Set the question's correct property.
     */
    public setCorrect(correct: boolean): void {
        this.correct = correct;
    }

    /**
     * Get the PartData's score.
     */
    public getScore(): number {
        return this.score;
    }

    /**
     * Set the PartData's score.
     */
    public setScore(score: number): void {
        this.score = score;
    }

    /**
     * Get the user-facing feedback for this PartData (see {@link Feedback.content}). The contents of this
     * field should be the same as the result of {@link Part.getFeedbackForAnswerId}(this.{@link
     * getInput}().id).
     */
    public getFeedback(): string | null {
        return this.feedback;
    }

    /**
     * Set the user-facing feedback for this PartData.
     */
    public setFeedback(feedback: string): void {
        this.feedback = feedback;
    }

    /**
     * XXX - I'm not sure this makes sense, given how hints are shown it seems like it's treated as basically
     * a boolean field (falsy or non-falsy).
     */
    public getHint(): string | null {
        return this.hint;
    }

    /**
     * XXX - I'm not sure this makes sense, given how hints are shown it seems like it's treated as basically
     * a boolean field (falsy or non-falsy).
     */
    public setHint(hint: string): void {
        this.hint = hint;
    }

    /**
     * Serialize this PartData to XML.
     */
    public toXML(): XMLDocument {
        throw new Error("Unimplemented");
    }
}
