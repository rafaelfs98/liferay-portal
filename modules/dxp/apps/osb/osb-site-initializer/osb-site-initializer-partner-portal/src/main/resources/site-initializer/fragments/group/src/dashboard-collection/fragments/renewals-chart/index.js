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
import ClassNames from 'classnames';
import React from 'react';

import Container from '../../common/components/container';

export default function () {
	const items = [
		{
			name: 'Rent-A-Centre Texas, L.P',
			status: 30,
		},
		{
			name: 'Advance Stores Co, INC',
			status: 60,
		},
		{
			name: 'Mission of Hope Haiti',
			status: 60,
		},
		{
			name: 'Rite Aid',
			status: 90,
		},
	];

	return (
		<Container
			footer={
				<ClayButton displayType="secondary">
					View all Renewasl
				</ClayButton>
			}
			title="Renewals"
		>
			<div className="align-items-start d-flex flex-column mt-3">
				{items.map((item, index) => {
					return (
						<div
							className="align-items-center d-flex flex-row justify-content-center mb-4"
							key={index}
							style={{height: '50px'}}
						>
							<div
								className={ClassNames('mr-3 ', {
									'bg-accent-1': item.status === 30,
									'bg-success': item.status === 90,
									'bg-warning': item.status === 60,
								})}
								style={{
									borderRadius: '6px',
									height: '100%',
									width: '8px',
								}}
							></div>

							<div>
								<div className="font-weight-semi-bold">
									{item.name}
								</div>

								<div>
									Expires in &nbsp;
									<span className="font-weight-semi-bold">
										{item.status} days
									</span>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</Container>
	);
}
