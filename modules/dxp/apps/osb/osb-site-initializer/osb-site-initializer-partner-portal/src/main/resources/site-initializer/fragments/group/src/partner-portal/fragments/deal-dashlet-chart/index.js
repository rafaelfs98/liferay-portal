/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * The contents of this file are subject to the terms of the Liferay Enterprise
 * Subscription License ("License"). You may not use this file except in
 * compliance with the License. You can obtain a copy of the License by
 * contacting Liferay, Inc. See the License for the specific language governing
 * permissions and limitations under the License, including but not limited to
 * distribution rights of the Software.
 */

//  * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
//  *
//  * The contents of this file are subject to the terms of the Liferay Enterprise
//  * Subscription License ("License"). You may not use this file except in
//  * compliance with the License. You can obtain a copy of the License by
//  * contacting Liferay, Inc. See the License for the specific language governing
//  * permissions and limitations under the License, including but not limited to
//  * distribution rights of the Software.
//  */

// import React from 'react';

// export default function () {
// 	return (
// 		<>
// 			<div className="container d-flex flex-clounm justfy-content-between p-3">
// 				<div>title</div>

// 				<div>contet</div>

// 				<div>Fotter</div>
// 			</div>
// 		</>
// 	);
// }

import classNames from 'classnames';
import React, {useMemo} from 'react';

const NaNToZero = (value) => (Number.isNaN(value) ? 0 : value);

export const LABEL_GREATER_THAN_99 = '> 99';

export const LABEL_LESS_THAN_1 = '< 1';

function getPercentLabel(percent) {
	let percentValue = Math.round(percent) || 0;

	if (percent > 99 && percent < 100) {
		percentValue = LABEL_GREATER_THAN_99;
	} else if (percent > 0 && percent < 1) {
		percentValue = LABEL_LESS_THAN_1;
	}

	const percentLabel = `${percentValue}%`;

	return percentLabel;
}

const Progress = {
	incomplete: 100,
	other: 200,
	self: 59,
};

// const Tasks = {
// 	blocked: 0,
// 	failed: 0,
// 	incomplete: 0,
// 	passed: 0,
// 	test_fix: 0,
// };

function TaskbarProgress({
	displayTotalCompleted,
	items,
	legend,
	taskbarClassNames = {
		blocked: 'blocked',
		failed: 'failed',
		incomplete: 'test-incomplete',
		other: 'others-completed',
		passed: 'passed',
		self: 'self-completed',
		test_fix: 'test-fix',
	},
	totalCompleted,
}) {
	const total = items
		.map(([, value]) => value)
		.reduce((prevValue, currentValue) => prevValue + currentValue);

	return (
		<>
			<div className="testray-progress-bar">
				{items.map((item, index) => {
					const [label, value] = item;

					const percent = NaNToZero((value / total) * 100);

					const percentLabel = getPercentLabel((value / total) * 100);

					return (
						<div
							className={classNames(
								'progress-bar-item',
								taskbarClassNames[label]
							)}
							key={index}
							style={{width: `${percent}%`}}
							title={`${percentLabel} ${label}`}
						/>
					);
				})}
			</div>

			{legend && (
				<div className="d-flex testray-progress-bar">
					{displayTotalCompleted && (
						<div className="justify-content-between mr-5">
							<div className="align-items-center d-flex">
								<span className="font-family-sans-serif font-weight-semi-bold mr-1 text-paragraph-lg">
									{totalCompleted}
								</span>

								<span>/</span>

								<span className="font-family-sans-serif ml-1 text-paragraph-sm">
									{total}
								</span>
							</div>

							<span className="font-family-sans-serif legend-item-label text-neutral-6">
								total-completed
							</span>
						</div>
					)}

					{items.map((item, index) => {
						const [label, value] = item;

						const percentLabel = getPercentLabel(
							(value / total) * 100
						);

						const percentTitle = `${percentLabel} (${value})`;

						return (
							<div className="d-flex flex-column" key={index}>
								<div className="align-items-center d-flex mr-5">
									<div
										className={classNames(
											'legend-bar-item font-family-sans-serif',
											taskbarClassNames[label]
										)}
										title={percentTitle}
									/>

									<span
										className="font-family-sans-serif mx-2"
										title={percentTitle}
									>
										{percentTitle}
									</span>
								</div>

								<span className="legend-item-label mt-1 text-neutral-6">
									{label.toUpperCase()}
								</span>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
}

export default function ({displayTotalCompleted = true, legend = false}) {
	const items = Progress;
	const sortedItems = Object.entries(items).sort(
		([, valueA], [, valueB]) => valueB - valueA
	);

	const totalCompleted = useMemo(() => {
		const _totalCompleted = sortedItems
			.filter(([label, value]) => {
				if (label !== 'incomplete') {
					return value;
				}
			})
			.map(([, value]) => value);

		if (_totalCompleted.length) {
			return _totalCompleted.reduce(
				(previus, current) => previus + current
			);
		}

		return 0;
	}, [sortedItems]);

	return (
		<TaskbarProgress
			displayTotalCompleted={displayTotalCompleted}
			items={sortedItems}
			legend={legend}
			totalCompleted={totalCompleted}
		/>
	);
}
