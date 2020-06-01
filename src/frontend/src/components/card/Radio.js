import React, { useState } from 'react';

export default function Radio() {
	const [ difficulty, setDifficulty ] = useState('easy');
	const handleDifficulty = (e) => {
		setDifficulty(e.target.value);
	};
	return (
		<form id="smileys" className="bg-light pt-4">
            <span className="d-flex justify-content-center pb-3">This question is<span className="difficultyText">{difficulty}</span>..</span>
			<div className="w-50 mx-auto text-center">
				<input
					type="radio"
					name="smiley"
					value="difficult"
					className="sad"
					onClick={handleDifficulty}
                    defaultChecked
				/>
				<input
					type="radio"
					name="smiley"
					value="neutral"
					className="neutral"
					onClick={handleDifficulty}
					defaultChecked
				/>
				<input
					type="radio"
					name="smiley"
					value="easy"
					className="happy"
					onClick={handleDifficulty}
					defaultChecked
				/>
			</div>
		</form>
	);
}
