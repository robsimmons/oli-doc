/**
 * An Input object represents both the user's feedback and the class.
 */
export interface Input {
    /**
     * The (case-insensitive) key linking the user's answer to the appropriate {@link Feedback}.
     */
    readonly id: string;

    /**
     * The user's answer, or otherwise serialized data that can be used to restore the state of the user's
     * question upon reload.
     */
    readonly value: string;
}
