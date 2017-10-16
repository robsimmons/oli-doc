import { PartData } from "./partdata";

/**
 * QuestionData encapsulates the user's answer to a {@link Question}, as well as the current state of
 * responding to that answer.
 */
export class QuestionData {
    private id: string;
    private score: number;
    private parts: { [id: string]: PartData | undefined };

    /**
     * @param id - The id for the {@link Question} that this QuestionData is linked to.
     */
    constructor(id: string) {
        this.id = id;
        this.score = 0;
    }

    /**
     * Get the unique identifier for the {@link Question}'s data.
     */
    public getId(): string {
        return this.id;
    }

    /**
     * Set the unique identifier for the {@link Question}'s data.
     *
     * XXX - is this ever used? This seems error-prone, similar to how {@link PartData.setId} worries me.
     */
    public setId(id: string): void {
        this.id = id;
    }

    /**
     * Get the question's stored score.
     */
    public getScore(): number {
        return this.score;
    }

    /**
     * Set the score
     *
     * XXX - this does not make much sense in light of {@link evaluateQuestion}.
     */
    public setScore(score: number): void {
        this.score = score;
    }

    /**
     * Return all the part data.
     */
    public getPartsData(): { readonly [id: string]: PartData | undefined } {
        return this.parts;
    }

    /**
     * Use a part's unique identifier to access the {@link PartData}.
     */
    public getParts(id: string): PartData | null {
        if (this.parts.hasOwnProperty(id)) {
            return this.parts[id] as PartData;
        } else {
            return null;
        }
    }

    /**
     * Add a new {@link PartData} to the question. Analagous to {@link Part.addInput}. If a part data
     * with the same unique identifier has already been added, the old part data will be replaced by the new
     * part data without warning.
     */
    public addPartData(partData: PartData) {
        this.parts[partData.getId()] = partData;
    }

    /**
     * Increment the score based on the results of {@link PartData.getScore()} on each constituent {@link
     * PartData}.
     *
     * XXX - This seems both in conflict with {@link setScore} and confusingly non-idempotent: if you set the
     * score once and the score goes from 0 to 6, if you accidentally call this function twice, the score will
     * go from 6 to 12! It seems like you'd want to reset the score as the first step in this method.
     */
    public evaluateQuestion(): void {
        Object.getOwnPropertyNames(this.parts).forEach(id => {
            this.score += this.parts[id]!.getScore();
        });
    }

    /**
     * Serialize to XML.
     */
    public toXML(): XMLDocument {
        throw new Error("Unimplemented");
    }
}
