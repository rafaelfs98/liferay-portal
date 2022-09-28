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

function Container({children, footer, title}) {
	return (
		<>
			<div className="bg-neutral-0 d-flex flex-column p-4 rounded shadow-sm">
				<div className="font-weight-semi-bold h5 m-0 pt-4 px-4">
					{title}
				</div>

				<div className="mb-3 mt-2 px-4">
					<hr />
				</div>

				<div>{children}</div>

				{footer && (
					<div className="mb-3 mt-3">
						<hr />
					</div>
				)}

				<div className="d-flex">{footer}</div>
			</div>
		</>
	);
}

export default Container;
