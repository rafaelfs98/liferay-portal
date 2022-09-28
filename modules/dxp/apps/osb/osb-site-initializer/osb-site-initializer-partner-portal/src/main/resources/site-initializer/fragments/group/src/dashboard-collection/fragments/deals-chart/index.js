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

import ClayChart from '@clayui/charts';
import React from 'react';

import Container from '../../common/components/container';

export default function () {
	const colors = {
		aproved: '#000239',
		rejected: '#FF6060',
		submited: '#83B6FE',
	};

	const chart = {
		bar: {
			radius: {
				ratio: 0.2,
			},
			width: {
				ratio: 0.3,
			},
		},
		data: {
			colors,
			columns: [
				['submited', 110, 80, 200, 190],
				['aproved', 200, 100, 140, 190],
				['rejected', 295, 250, 298, 320],
			],
			groups: [['submited', 'aproved']],
			order: 'desc',
			type: 'bar',
			types: {
				aproved: 'bar',
				rejected: 'spline',
				submited: 'bar',
			},
		},
		grid: {
			y: {
				lines: [{value: 100}, {value: 200}, {value: 300}, {value: 400}],
			},
		},
	};

	return (
		<Container title="Deals">
			<div className="align-items-start d-flex flex-column mt-3"></div>

			<ClayChart bar={chart.bar} data={chart.data} grid={chart.grid} />
		</Container>
	);
}
