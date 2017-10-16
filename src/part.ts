import { Feedback } from "./feedback";
import { Hint } from "./hint";

/**
 * A Part belongs to a {@link Question}, and is the home for hints, for whatever widgets the user interacts
 * with to complete the question, and for an enumeration of possible feedback.
 *
 * We build up parts imperatively, by adding one element of feedback and one hint at a time with the {@link
 * addFeedback} and {@link addHint} functions.
 */

export class Part {
    private id: string;
    private typ: string | undefined;
    private component: Element | undefined;
    private feedback: { [id: string]: Feedback };
    private hints: Hint[];

    /**
     * @param id The part's unique identifier, unique to the {@link Question question{ that this part belongs
     * to.
     *
     * XXX - does this id field need to be globally unique?
     *
     * Part's {@link Question}).
     *
     * XXX - should the id field be optional? Are there any examples that set it later with setId in a
     * meaningful way?
     */
    constructor(id: string, typ?: string, component?: Element) {
        this.id = id;
        this.typ = typ;
        this.component = component;
        this.feedback = {};
    }

    /**
     * Set the unique identifier for the part.
     *
     * XXX - is this ever used? If any application ever uses this, it could break the invariant that
     * question.getPart(id).getId() === id, so I would suggest deprecating and eliminating this method with
     * extreme prejudice.
     */
    public setId(id: string) {
        this.id = id;
    }

    /**
     * Get the unique identifier for the part.
     */
    public getId(): string {
        return this.id;
    }

    /**
     * XXX - I need an example for this to know what it's all about.
     */
    public setType(typ: string) {
        this.typ = typ;
    }

    /**
     * XXX - I need an example for this to know what it's all about.
     */
    public getType(): string | undefined {
        return this.typ;
    }

    /**
     * XXX - I need an example for this to know what it's all about.
     */
    public setInputComponent(component: Element) {
        this.component = component;
    }

    /**
     * XXX - I need an example for this to know what it's all about.
     */
    public getInputComponent(): Element | undefined {
        return this.component;
    }

    /**
     * Add a new {@link Feedback} option to the question. If feedback with the same unique identifier
     * has already been added, the old feedback will be replaced by the new feedback without warning.
     */
    public addFeedback(feedback: Feedback): void {
        this.feedback[feedback.id] = feedback;
    }

    /**
     * Get a piece of feedback based on that feedback's unique identifier.
     */
    public getFeedback(id: string): Feedback | null {
        if (id in this.feedback) {
            return this.feedback[id];
        } else {
            return null;
        }
    }

    /**
     * Search for a matching {@link Feedback} for a given answer id. A defined Feedback record will always be
     * returned; if no specific match, then the generic match, the match with name "*", will be returned. A
     * dummy generic match will be returned if no generic match has been added.
     *
     * If feedback IDs are not unique to the {@link Part}, or if there is more than one generic match, then it
     * is unspecified which Feedback will be returned.
     */
    public getFeedbackForAnswerId(answerId: string): Feedback {
        // answerId
        let lcAnswerId = answerId.toLowerCase();
        let generic_match: Feedback = {
            id: "_no-feedback",
            pattern: "*",
            content: "No Feedback"
        };

        for (let id of Object.keys(this.feedback)) {
            if (this.feedback[id].pattern.toLowerCase() === lcAnswerId) {
                return this.feedback[id];
            } else if (this.feedback[id].pattern === "*") {
                generic_match = this.feedback[id];
            }
        }

        return generic_match;
    }

    /**
     * Add a {@link Hint} to this part.
     */
    public addHint(hint: Hint): void {
        this.hints.push(hint);
    }

    /**
     * Return all hints, in the order they were added. Returned array should be treated as read-only.
     */
    public getHints(): Hint[] {
        return this.hints;
    }

    /**
     * Returns the earliest hint with a given id, or null if no hint is found.
     */
    public getHint(id: string): Hint | null {
        for (let hint in this.hints) {
            if (this.hints[hint].id == id) {
                return this.hints[hint];
            }
        }

        return null;
    }
}
