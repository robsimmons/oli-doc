export interface Feedback {
    /**
     * The id of the feedback. Must be unique to the feedback's {@link Part}.
     *
     * XXX - Does this id field need to be unique to the question? Does it need to be globally unique?
     */
    readonly id: string;

    /**
     * The pattern match that allows this answer to be selected. In its simplest form, the pattern is what we
     * expect students to enter, where "*" represents that any pattern is valid. For more sophisticated
     * question types, there is usually some logic that maps the student answer down to one of the finite
     * patterns that is expected.
     *
     * Patterns are case-insensitive.
     */
    readonly pattern: "*" | string;

    /**
     * Student-facing feedback associated with this pattern.
     */
    readonly content: string;
}
