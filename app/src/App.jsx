import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const buttons = ['C', '←', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', '☻', 0, '☺', '='];
	const isWhite = (el) => (typeof el === 'number' ? styles.white : styles.orange);

	const [view, setView] = useState(0);
	const [result, setResult] = useState(false);

	const numClick = (e) => {
		if (e.target.innerText === '=') {
			try {
				setResult(true);
				setView(eval(view));
			} catch (error) {
				setResult(false);
				setView('Неверный ввод! ');
				setTimeout(() => {
					setView(0);
				}, 1500);
			}
		} else if (e.target.innerText === 'C') {
			setResult(false);
			setView(0);
		} else {
			setResult(false);
			setView((prev) => (prev === 0 ? e.target.innerText : prev + e.target.innerText));
		}
	};

	return (
		<div className={styles.app}>
			<div className={styles.calc}>
				<div className={styles.header + ' ' + (result ? styles.orange : styles.white)}>{view}</div>
				{buttons.map((el) => (
					<div className={styles.ceil + ' ' + isWhite(el)} key={el} onClick={(e) => numClick(e)}>
						{el}
					</div>
				))}
			</div>
		</div>
	);
};
