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

import React from 'react';
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
export default Legend;
