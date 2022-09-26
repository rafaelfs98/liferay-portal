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

import ClayButton from '@clayui/button';
import classNames from 'classnames';
import React from 'react';

import LegendMdf from './components/mdfLegend';

const NaNToZero = (value) => (Number.isNaN(value) ? 0 : value);

const Progress = {
	approved: {qtd: 300, total: 'USD $80.000,29'},
	pending: {qtd: 92, total: 'USD $12.993,00'},
};
const ProgressClain = {
	approved: {qtd: 120, total: 'USD $6.500,50'},
	pending: {qtd: 100, total: 'USD $5.500,00'},
};

function MdfbarProgress({
	items,
	MdfbarClassNames = {
		approved: 'approved',
		pending: 'pending',
	},
}) {
	const total = items
		.map(([, value]) => value.qtd)
		.reduce((prevValue, currentValue) => prevValue + currentValue);

	return (
		<>
			<div className="progress-bar-border">
				<div className="mdf-progress-bar">
					{items.map((item, index) => {
						const [label, value] = item;

						const percent = NaNToZero((value.qtd / total) * 100);

						return (
							<div
								className={classNames(
									'progress-bar-item',
									MdfbarClassNames[label],
									{
										approvedItem: index === 0,
									}
								)}
								key={index}
								style={{width: `${percent}%`}}
								title={`${value.qtd} ${label}`}
							/>
						);
					})}
				</div>
			</div>

			<div className="d-flex mdf-progress-bar">
				{items.map((item, index) => {
					const [label, value] = item;
					const percent = NaNToZero((value.qtd / total) * 100);

					return (
						<div
							className="d-flex flex-row"
							key={index}
							style={{width: `${percent}%`}}
						>
							<div className="align-items-center">
								<div className="d-flex flex-column">
									<span
										className="font-family-sans-serif mx-1"
										title={value.qtd}
									>
										{value.qtd} {label}
									</span>

									<span className="font-family-sans-serif mx-1">
										{value.total}
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default function () {
	const sortedItems = Object.entries(Progress);

	const sortedItemsClain = Object.entries(ProgressClain);

	const _totalRequest = Progress.approved.qtd + Progress.pending.qtd;

	const _totalClain = ProgressClain.approved.qtd + ProgressClain.pending.qtd;

	return (
		<div className="bg-neutral-0 container d-flex flex-column p-4">
			<div className="titleMDF">MDF Requests</div>

			<div>
				<hr />
			</div>

			<div>
				<div className="mb-5">
					<div className="d-flex flex-row justify-content-between">
						<div className="titleChart">Request Funds</div>

						<div>
							<span className="font-weight-bold text-neutral-9">
								{_totalRequest}
							</span>{' '}
							total requests |
							<span className="font-weight-bold text-neutral-9">
								USD $92.993,29
							</span>
						</div>
					</div>

					<MdfbarProgress items={sortedItems} />
				</div>

				<div className="mb-3">
					<div className="d-flex flex-row justify-content-between">
						<div className="titleChart">Clain Funds</div>

						<div>
							<span className="font-weight-bold text-neutral-9">
								{_totalClain}
							</span>{' '}
							total |
							<span className="font-weight-bold text-neutral-9">
								USD $12.000,50
							</span>
						</div>
					</div>

					<MdfbarProgress items={sortedItemsClain} />
				</div>
			</div>

			<div className="mt-4">
				<LegendMdf />
			</div>

			<div>
				<hr />
			</div>

			<div className="d-flex">
				<ClayButton
					className="clayButtonPrimary mr-1 mt-2"
					displayType="primary"
					size="sm"
				>
					New MDF Request
				</ClayButton>

				<ClayButton
					className="clayButtonSecondary mt-2"
					displayType="secondary"
					size="sm"
				>
					View all
				</ClayButton>
			</div>
		</div>
	);
}
