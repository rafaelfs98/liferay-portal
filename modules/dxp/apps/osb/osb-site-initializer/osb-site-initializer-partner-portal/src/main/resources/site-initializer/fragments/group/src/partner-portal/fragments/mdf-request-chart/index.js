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

import classNames from 'classnames';
import React, {useMemo} from 'react';

const NaNToZero = (value) => (Number.isNaN(value) ? 0 : value);

export const LABEL_GREATER_THAN_99 = '> 99';

export const LABEL_LESS_THAN_1 = '< 1';

const Progress = {
	approved: 300,
	pending: 92,
};
const ProgressClain = {
	approved: 120,
	pending: 100,
};

function TaskbarProgress({
	items,
	legend,
	taskbarClassNames = {
		approved: 'approved',
		pending: 'pending',
	},
}) {
	const total = items
		.map(([, value]) => value)
		.reduce((prevValue, currentValue) => prevValue + currentValue);

	return (
		<>
			<div className="progress-bar-border">
				<div className="testray-progress-bar">
					{items.map((item, index) => {
						const [label, value] = item;

						const percent = NaNToZero((value / total) * 100);

						return (
							<div
								className={classNames(
									'progress-bar-item',
									taskbarClassNames[label],
									{
										approvedItem: index === 0,
									}
								)}
								key={index}
								style={{width: `${percent}%`}}
								title={`${value} ${label}`}
							/>
						);
					})}
				</div>
			</div>

			{legend && (
				<div className="d-flex testray-progress-bar">
					{items.map((item, index) => {
						const [label, value] = item;

						return (
							<div className="d-flex flex-row" key={index}>
								<div className="align-items-center d-flex">
									<span
										className="font-family-sans-serif mx-2"
										title={value}
									>
										{value}
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

function Label({
	items,
	taskbarClassNames = {
		approved: 'approved',
		pending: 'pending',
	},
}) {
	return (
		<>
			<div className="d-flex testray-progress-bar">
				{items.map((item, index) => {
					const [label] = item;

					return (
						<div className="d-flex flex-row" key={index}>
							<div className="align-items-center d-flex">
								<div
									className={classNames(
										'legend-bar-item font-family-sans-serif',
										taskbarClassNames[label]
									)}
								/>
							</div>

							<span className="legend-item-label ml-1 mr-2 mt-1 text-neutral-6">
								{label.toUpperCase()}
							</span>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default function ({legend = true}) {
	const items = Progress;
	const sortedItems = Object.entries(items).sort(
		([, valueA], [, valueB]) => valueB - valueA
	);
	const itemsClain = ProgressClain;
	const sortedItemsClain = Object.entries(itemsClain).sort(
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

	const totalCompletedClain = useMemo(() => {
		const _totalCompletedClain = sortedItemsClain
			.filter(([label, value]) => {
				if (label !== 'incomplete') {
					return value;
				}
			})
			.map(([, value]) => value);

		if (_totalCompletedClain.length) {
			return _totalCompletedClain.reduce(
				(previus, current) => previus + current
			);
		}

		return 0;
	}, [sortedItemsClain]);

	return (
		<div className="bg-neutral-0 container d-flex flex-column p-4">
			<div className="title">MDF Requests</div>

			<hr />

			<div>
				<div className="mb-4">
					<div className="d-flex flex-row justify-content-between">
						<div className="title">Request Funds</div>

						<div>
							<span className="font-weight-bold text-neutral-9">
								{totalCompleted}
							</span>{' '}
							total requests|
							<span className="font-weight-bold text-neutral-9">
								USD $92.993,29
							</span>
						</div>
					</div>

					<TaskbarProgress items={sortedItems} legend={legend} />
				</div>

				<div className="mb-4">
					<div className="d-flex flex-row justify-content-between">
						<div className="title">Clain Funds</div>

						<div>
							<span className="font-weight-bold text-neutral-9">
								{totalCompletedClain}
							</span>{' '}
							total |
							<span className="font-weight-bold text-neutral-9">
								USD $12.000,50
							</span>
						</div>
					</div>

					<TaskbarProgress
						items={sortedItemsClain}
						legend={legend}
						totalCompleted={totalCompletedClain}
					/>
				</div>
			</div>

			<div>
				<Label items={sortedItems} />
			</div>

			<div>
				<button>teste</button>
			</div>
		</div>
	);
}
