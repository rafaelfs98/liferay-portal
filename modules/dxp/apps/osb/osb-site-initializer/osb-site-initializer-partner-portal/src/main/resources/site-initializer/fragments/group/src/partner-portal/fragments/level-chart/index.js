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
import React from 'react';

import Legend from './Components/levelLegend';
import LevelProgressBar from './Components/levelProgressBar';
import PartenerIcon from './Components/partenerIcon';

const TOTAL_LEVEL = {
	business: 600,
	newBusiness: 450,
};
const _progressNewMoc = {
	achieved: {qtd: 350, total: 'USD $80.000,29'},
	remaining: {qtd: _restNewBusiness, total: 'USD $5.500,00'},
};
const _progressTotalMoc = {
	achieved: {qtd: 350, total: 'USD $6.500,50'},
	remaining: {qtd: 100, total: 'USD $5.500,00'},
};

const _restNewBusiness = TOTAL_LEVEL.newBusiness - _progressNewMoc.achieved.qtd;

export default function () {
	const sortedItems = Object.entries(_progressNewMoc);

	const sortedItemsClain = Object.entries(_progressTotalMoc);

	return (
		<div className="bg-neutral-0 container d-flex flex-column font-weight-bold p-4">
			<div className="title">Level</div>

			<div>
				<hr className="mb-4 mt-2" />
			</div>

			<div className="flex-row mb-4">
				<div>
					<span className="label-gold mt-1">
						<PartenerIcon />
						Gold
					</span>

					<span className="label-partner ml-2 mt-1">Partner</span>
				</div>
			</div>

			<div>
				<div className="mb-5">
					<div className="d-flex flex-row justify-content-between">
						<div className="label-business">New Business</div>

						<div>
							<span className="font-weight-bold text-neutral-9">
								350
							</span>

							<span className="text-neutral-5"> / 450 </span>
						</div>
					</div>

					<LevelProgressBar
						items={sortedItems}
						total={TOTAL_LEVEL.newBusiness}
					/>

					<div className="d-flex flex-row label-progress text-neutral-7">
						<span className="font-weight-bold mr-1 number">
							100
						</span>
						more points for Platinum
					</div>
				</div>

				<div className="mb-3">
					<div className="d-flex flex-row justify-content-between">
						<div className="label-business">Total Business</div>

						<div>
							<span className="font-weight-bold">420</span>

							<span className="text-neutral-5"> / 600 </span>
						</div>
					</div>

					<LevelProgressBar
						items={sortedItemsClain}
						total={TOTAL_LEVEL.business}
					/>

					<div className="d-flex flex-row label-progress text-neutral-7">
						<span className="font-weight-bold mr-1 number">
							180
						</span>

						<span className="font-family-source-sans-pro text-neutral-7">
							more points for Platinum
						</span>
					</div>
				</div>
			</div>

			<div className="mt-4">
				<Legend />
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
					Request level change
				</ClayButton>
			</div>
		</div>
	);
}
