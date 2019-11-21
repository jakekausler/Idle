import React from 'react';

export default function Footer() {
	return (
		<div
			style={{
				textAlign: 'center',
				padding: '4px',
				background: 'var(--color-dark)',
				color: 'var(--color-light)',
				height: '20px'
			}}
		>
			&copy; 2019 Jacob Kausler
		</div>
	);
}