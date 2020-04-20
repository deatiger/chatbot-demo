import React from 'react';
import {Answer} from './index'

const AnswersList = (props) => {
    const answersList = props.answers.map((key, index) => {
        return <Answer answer={props.answers[index]} key={index.toString()} select={props.select} />
    });

    return (
        <div className="c-grid__answer">
            {answersList}
        </div>
    );
};

export default AnswersList;