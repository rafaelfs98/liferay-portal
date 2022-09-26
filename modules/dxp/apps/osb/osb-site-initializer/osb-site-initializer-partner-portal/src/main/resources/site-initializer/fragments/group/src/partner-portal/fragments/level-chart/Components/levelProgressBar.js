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
import React from 'react';

const NaNToZero = (value) => (Number.isNaN(value) ? 0 : value);

function LevelProgressBar({
	items,
	total,
	taskbarClassNames = {
		achieved: 'achieved',
		remaining: 'remaining ',
	},
}) {
	return (
		<>
			<div className="progress-bar-border">
				<div className="level-progress-bar">
					{items.map((item, index) => {
						const [label, value] = item;

						const percent = NaNToZero(value.qtd / total) * 100;

						return (
							<div
								className={classNames(
									'progress-bar-item',
									taskbarClassNames[label],
									{
										achievedItem: index === 0,
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
		</>
	);
}

export default LevelProgressBar;
