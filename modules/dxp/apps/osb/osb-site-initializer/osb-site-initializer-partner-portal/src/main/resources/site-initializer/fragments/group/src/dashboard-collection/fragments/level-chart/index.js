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

import Container from '../../common/components/container/index';
import PartenerIcon from '../../common/components/icons/partenerIcon';
import LevelProgressBar from './levelProgressBar';

const TOTAL_LEVEL = {
	business: 600,
	newBusiness: 450,
};

function Legend() {
	const label = {
		sales: 'Sales Revenue QSP’s',
		suplemental: 'Supplemental QSP’s',
	};

	return (
		<>
			<div className="d-flex level-progress-bar">
				<div className="d-flex flex-row">
					<div className="align-items-center d-flex">
						<div className="achieved legend-bar-item" />
					</div>

					<span className="legend-item-label ml-1 mr-2 mt-1 text-neutral-6">
						{label.sales}
					</span>
				</div>

				<div className="d-flex flex-row">
					<div className="align-items-center d-flex">
						<div className="legend-bar-item supplemental" />
					</div>

					<span className="legend-item-label ml-1 mr-2 mt-1 text-neutral-6">
						{label.suplemental}
					</span>
				</div>
			</div>
		</>
	);
}

export default function () {
	const progressNewMoc = {
		achieved: {qtd: 350, total: 'USD $80.000,29'},
		remaining: {qtd: 100, total: 'USD $5.500,00'},
	};
	const progressTotalMoc = {
		achieved: {qtd: 350, total: 'USD $6.500,50'},
		supplemental: {qtd: 100, total: 'USD $5.500,00'},
	};
	const sortedItems = Object.entries(progressNewMoc);

	const sortedItemsClain = Object.entries(progressTotalMoc);

	return (
		<Container
			footer={
				<ClayButton
					className="clayButtonPrimary mr-1 mt-2"
					displayType="primary"
					size="sm"
				>
					Request level change
				</ClayButton>
			}
			title="Level"
		>
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
				<div className="mb-4">
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

				<div className="mb-2">
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
		</Container>
	);
}
