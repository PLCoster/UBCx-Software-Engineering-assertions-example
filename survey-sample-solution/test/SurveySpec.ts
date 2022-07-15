import 'mocha';
import { expect } from 'chai';

import { Survey } from '../src/Survey';
import { MultipleChoiceAnswer, SurveyQuestion } from '../src/SurveyQuestion';

// Given - When - Then

// Given clause
describe('Basic test for survey', function () {
  // Test setup:
  let s: Survey;
  let members: any[];
  let members2: any[];

  this.beforeEach(function () {
    members = [
      {
        num: 0,
        question: 'What is your favourite operating system?',
        answer: null,
      },
      {
        num: 1,
        question: "Please select 'C' to preserve your answers",
        answer: null,
        rightanswer: MultipleChoiceAnswer.C,
      },
      {
        num: 2,
        question:
          'On a scale of 1 to 5, how much do you enjoy Computer Science?',
        answer: null,
        rightanswer: MultipleChoiceAnswer.C,
      },
      {
        num: 3,
        question: 'What is pi to at least 3 decimal places?',
        answer: null,
      },
    ];

    s = new Survey();
    s.addManyQuestions(members);

    members2 = [
      {
        num: 4,
        question: 'What is your favourite sport to play?',
        answer: null,
      },
      {
        num: 5,
        question: 'How many years have you spend in school?',
        answer: null,
      },
      {
        num: 6,
        question:
          'What year did the French Revolution begin? \n A. 1492 \nB. 1779 \nC. 1792 \nD. 1812',
        answer: null,
      },
    ];
  });

  // When clause
  it('Should return the next question', function () {
    const actual = s.getQuestion();
    const expected = members[0];
    expect(actual).to.equal(expected); // Then clause

    const noProp = 'rightAnswer';
    expect(actual).to.not.have.property(noProp); // Then clause

    const allKeys = ['num', 'answer', 'question'];
    expect(actual).to.have.all.keys(allKeys); // Then clause
  });

  it('Should throw an error if a question does not exist', function () {
    const test = new Survey();

    const getActual = () => {
      test.getQuestion();
    };

    expect(getActual).to.throw('No current question to return');
  });

  it('Should be able to iterate to the next question', function () {
    const actual = s.getNextQuestion();
    const expected = members[1];
    expect(actual).to.equal(expected);
  });

  it('Should throw an error if the next question does not exist', function () {
    const test = new Survey();

    const getActual = () => {
      test.getNextQuestion();
    };

    expect(getActual).to.throw('No next question to return');
  });

  it('Should be able to test numerical answers', function () {
    const q = s.getQuestion();
    s.answerQuestion(22 / 7);
    expect(q.answer).to.be.within(3.141, 3.143); // Numerical tolerance
  });

  // Asynchronous Test - badly formed (asserting before the promise resolves)
  // it('Should be able to load questions from file', function () {
  //   const test = new Survey();
  //   s.loadQuestionsFromFile('sample.txt');

  //   const actual = test.getAllQuestions().length;
  //   const expected = 3;
  //   expect(actual).to.equal(expected);
  // });

  // Asynchronous Test - properly formed
  it('Should be able to load questions from file', function () {
    const test = new Survey();
    // Return the promise with assertion in the .then block
    return test.loadQuestionsFromFile('sample.txt').then((data) => {
      const actual = test.getAllQuestions().length;
      const expected = 3;
      expect(actual).to.equal(expected);
    });
  });
});
