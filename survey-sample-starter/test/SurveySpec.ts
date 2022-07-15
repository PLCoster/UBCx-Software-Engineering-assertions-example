import 'mocha';
import { expect } from 'chai';

import { Survey } from '../src/Survey';
import { MultipleChoiceAnswer, SurveyQuestion } from '../src/SurveyQuestion';

// Given - When - Then Tests

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
        question: 'How many years have you spent in school?',
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

  // WRITE ADDITIONAL TESTS HERE!
});
