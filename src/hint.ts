export interface Hint {
    /**
     * The id of the hint. Does not need to be unique to the hint's {@link Part}.
     */
    readonly id: string;

    /**
     * User-facing feedback associated with this hint.
     */
    readonly content: string;
}
