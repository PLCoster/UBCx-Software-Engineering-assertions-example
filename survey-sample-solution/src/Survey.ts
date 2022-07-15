import { MultipleChoiceAnswer, SurveyQuestion } from './SurveyQuestion';

/**
 * @class Represents a survey runner for user.
 * Keeps track of user's position in survey
 * And all questions to be answered.
 */

export class Survey {
  // list of all questions in this survey
  private questions: SurveyQuestion[];

  // the question currently available to answer
  private currentQuestion: number;

  /**
   * Initializes a survey with no questions, starting at index 0.
   */
  constructor() {
    this.questions = [];
    this.currentQuestion = 0;
  }

  /**
   * Returns the current question.
   * If currentQuestion does not exist, throws an error.
   *
   * @return {SurveyQuestion} The current question
   */
  getQuestion(): SurveyQuestion {
    if (this.questions[this.currentQuestion]) {
      return this.questions[this.currentQuestion];
    }

    throw new Error('No current question to return');
  }

  /**
   * Returns the next question.
   * If the next question does not exist, throws an error.
   *
   * @return {SurveyQuestion} The current question
   */
  getNextQuestion(): SurveyQuestion {
    if (this.questions[this.currentQuestion + 1]) {
      this.currentQuestion += 1;
      return this.questions[this.currentQuestion];
    }

    throw new Error('No next question to return');
  }

  /**
   * Returns array of all SurveyQuestions in this Survey
   *
   * @return {SurveyQuestion[]} The current array of SurveyQuestions
   */
  getAllQuestions(): SurveyQuestion[] {
    return this.questions;
  }

  /**
   * Add a SurveyQuestion to this Survey
   *
   * @param {SurveyQuestion} sq The SurveyQuestion to add to this survey
   */
  addQuestion(sq: SurveyQuestion) {
    this.questions.push(sq);
  }

  /**
   * Adds multiple questions from an array of SuveryQuestions to this Survey
   *
   * @param {SurveyQuestion[]} sqArr The Array of SurveyQuestions to be added to the Survey
   */
  addManyQuestions(sqArr: SurveyQuestion[]) {
    this.questions.push(...sqArr);
  }

  /**
   * Answer the current question in the Survey
   * If there is no current question, throws an error
   *
   * @param ans {any} The answer for the current question
   */
  answerQuestion(ans: any) {
    if (this.questions[this.currentQuestion]) {
      const question = this.questions[this.currentQuestion];
      question.answer = ans;
      return;
    }

    throw new Error('No current question to give an answer to');
  }

  /**
   * Returns in string format the contents of a .txt file at param fileName
   *
   * If no such file found, reject the promise
   *
   * @param {string} fileName The path to the file
   * @returns {Promise<string>} The contents of the file
   */
  getFileInformation(fileName: string): Promise<string> {
    let fs = require('fs');
    return new Promise((fulfill, reject) => {
      fs.readFile(fileName, 'utf-8', (err: Error, result: string) => {
        if (err) {
          reject(err);
        } else {
          fulfill(result);
        }
      });
    });
  }

  /**
   * Set the questions list to one loaded from a file
   * File must contain valid JSON
   *
   * @param {string} fileName The path to the file
   * @return {Promise<any>} The parsed JSON Object
   */
  loadQuestionsFromFile(fileName: string): Promise<any> {
    return new Promise((fulfill, reject) => {
      // Try to get the File Info from the given fileName
      this.getFileInformation(fileName)
        .then((data) => {
          let parsed = JSON.parse(data);
          this.questions = parsed;
          fulfill(parsed);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
