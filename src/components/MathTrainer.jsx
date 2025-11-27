import React, { useState, useEffect, useRef } from 'react';

const MathTrainer = () => {
	const [num1, setNum1] = useState(0);
	const [num2, setNum2] = useState(0);
	const [userAnswer, setUserAnswer] = useState('');
	const [score, setScore] = useState(0);
	const [total, setTotal] = useState(0);
	const [message, setMessage] = useState('');

	const inputRef = useRef(null);

const generateProblem = () => {
    setNum1(Math.floor(Math.random() * 50) + 1);
    setNum2(Math.floor(Math.random() * 50) + 1);
    setUserAnswer('');
    setMessage('');
    

    setTimeout(() => {
		if (inputRef.current){
			inputRef.current.focus();
		}
    }, 0);
};

	useEffect(() => {
		generateProblem();
	}, []);

	const checkAnswer = () => {
		const correct = num1 + num2;
		const userNum = parseInt(userAnswer);
    
    if (isNaN(userNum)) {
		setMessage('Введите число!');
		if (inputRef.current) {
			inputRef.current.focus();
		}
		return;
    }

    setTotal(total + 1);
    
    if (userNum === correct) {
		setScore(score + 1);
		setMessage('Правильно!');
    } else {
		setMessage(`Неправильно! Ответ: ${correct}`);
    }

    setTimeout(() => {
		generateProblem();
    }, 1500);
};

	return (
    <div>
		<h3>Статистика: {score} из {total}</h3>
		{total > 0 && (
        	<p>Процент правильных: {Math.round((score / total) * 100)}%</p>
    )}

		<div>
			<h2>Решите пример:</h2>
			<div>
			<span>{num1}</span>
			<span> + </span>
			<span>{num2}</span>
			<span> = </span>
			<input
				ref={inputRef}
				type="number"
				value={userAnswer}
				onChange={(e) => setUserAnswer(e.target.value)}
				autoFocus
			/>
			</div>
		</div>

		<div>
			<button onClick={checkAnswer}>Проверить</button>
			<button onClick={generateProblem}>Пропустить</button>
			<button onClick={() => { 
			setScore(0); 
			setTotal(0); 
			generateProblem(); 
			}}>
			Начать заново
			</button>
		</div>

		{message && (
			<div>
			{message}
			</div>
		)}
    </div>
);
};

export default MathTrainer;