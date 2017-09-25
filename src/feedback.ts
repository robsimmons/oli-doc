export interface Feedback {
    /**
     * The id of the feedback. Must be unique to this part.
     */
    readonly id: string;

    /**
     * The pattern match that allows this answer to be selected. In its simplest form, the pattern is what we
     * expect students to enter, where "*" represents that any pattern is valid. For more sophisticated
     * question types, this . Patterns are case-insensitive.
     *
     * NOTE - this means that the current interface doesn't support algorithmically generated
     * feedback. A more general Feedback mechanism would take string -> bool, treating the string "*" as
     * ()=>true and any other string s as t=>t===s.
     */
    readonly pattern: "*" | string;

    /**
     * Student-facing feedback associated with this pattern.
     */
    readonly content: string;
}
