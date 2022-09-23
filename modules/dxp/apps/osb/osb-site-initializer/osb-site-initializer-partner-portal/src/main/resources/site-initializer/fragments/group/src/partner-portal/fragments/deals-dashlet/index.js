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

export default function () {
	const COLUMNS = [
		['data1', 100, 20, 30],
		['data2', 20, 70, 100],
	];

	return (
		<div>
			<ClayChart
				bar={{
					radius: {
						ratio: 0.2,
					},
					width: {
						data: 20,
					},
				}}
				data={{
					columns: COLUMNS,
					groups: [['data1', 'data2']],
					type: 'bar',
				}}
			/>
		</div>
	);
}
