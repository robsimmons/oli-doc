import { QuestionData } from "./questiondata";

/**
 * SaveData encapsulates a group of answers to a group of {@link Question}s, stored in the form of {@link
 * QuestionData}. This also includes the current state of responding to those answers.
 */
export class SaveData {
    private attemptScore: number;
    private questions: { [id: string]: QuestionData | undefined };

    constructor() {
        this.attemptScore = 0;
        this.questions = {};
    }

    /**
     * Get all question data.
     */
    public getQuestionsData(): { readonly [id: string]: QuestionData | undefined } {
        return this.questions;
    }

    /**
     * Get a {@link QuestionData} that has been previously stored based on its unique identifier.
     */
    public getQuestionData(id: string): QuestionData | null {
        if (this.questions.hasOwnProperty(id)) {
            return this.questions[id] as QuestionData;
        } else {
            return null;
        }
    }

    /**
     * Whenever a student answers a single question, we add the data for that question to the SaveData
     * object. If question data with the same unique identifier has already been added, the old question data
     * will be replaced by the new question data without warning.
     */
    public addQuestionData(questionData: QuestionData): void {
        this.questions[questionData.getId()] = questionData;
    }

    /**
     * Increments the attempt score by running getScore() on all child {@link QuestionData} objects.
     *
     * XXX - this has the same weird problem as {@link QuestionData.evaluateQuestion}; if you run it twice
     * you'll double-increment the attempt score. Notably, {@link numberOfQuestionsAnswered} doesn't work like
     * that!
     */
    public evaluateQuestions(): void {
        Object.getOwnPropertyNames(this.questions).forEach(id => {
            this.attemptScore += this.questions[id]!.getScore();
        });
    }

    /**
     * Calculates the number of questions that have been attempted and had their {@link QuestionData} stored
     * in this object.
     */
    public numberOfQuestionsAnswered(): number {
        return Object.getOwnPropertyNames(this.questions).length;
    }

    /**
     * Return the score.
     */
    public getAttemptScore(): number {
        this.evaluateQuestions();
        return this.attemptScore;
    }

    /**
     * Serialize to XML.
     */
    public toXML(): XMLDocument {
        throw new Error("Unimplemented");
    }
}
