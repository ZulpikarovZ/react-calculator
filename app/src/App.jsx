import React, { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const buttons = ['C', '←', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '☻', 0, '☺', '='];
	const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	const operations = ['+', '-', '*', '/'];

	const [orange, setOrange] = useState(false);
	const [state, setState] = useState({
		view: '0',
		first: '',
		second: '',
		sign: '',
	});

	const { view, first, second, sign } = state;

	const handleNumberClick = (btn) => {
		setOrange(false);

		if (!sign) {
			const newFirst = first === '0' ? btn : first + btn;
			setState({ ...state, first: newFirst, view: newFirst });
		} else {
			const newSecond = second === '0' ? btn : second + btn;
			setState({ ...state, second: newSecond, view: newSecond });
		}
	};

	const handleOperationClick = (btn) => {
		setOrange(false);

		setState({ ...state, sign: btn, view: btn });
	};

	const handleEqualClick = () => {
		setOrange(true);

		let result;
		const numFirst = parseFloat(first);
		const numSecond = parseFloat(second);

		switch (sign) {
			case '+':
				result = numFirst + numSecond;
				break;
			case '-':
				result = numFirst - numSecond;
				break;
			case '*':
				result = numFirst * numSecond;
				break;
			case '/':
				result = numFirst / numSecond;
				break;
			default:
				return;
		}

		const newView = String(result);
		setState({ view: newView, first: newView, second: '', sign: '' });
	};

	const handleClearClick = () => {
		setOrange(false);
		setState({ view: '0', first: '', second: '', sign: '' });
	};

	const handleButtonClick = (btn) => {
		if (numbers.includes(btn)) {
			handleNumberClick(btn);
			return;
		}

		if (operations.includes(btn)) {
			handleOperationClick(btn);
			return;
		}

		if (btn === '=') {
			handleEqualClick();
			return;
		}

		if (btn === 'C') {
			handleClearClick();
		}
	};

	const isWhite = (el) => (typeof el === 'number' ? styles.white : styles.orange);

	return (
		<div className={styles.app}>
			<div className={styles.calc}>
				<div className={styles.header + ' ' + (orange ? styles.orange : styles.white)}>{view}</div>
				{buttons.map((el) => (
					<div
						className={`${styles.ceil} ${isWhite(el)}`}
						key={el}
						onClick={() => handleButtonClick(String(el))}
					>
						{el}
					</div>
				))}
			</div>
		</div>
	);
};
