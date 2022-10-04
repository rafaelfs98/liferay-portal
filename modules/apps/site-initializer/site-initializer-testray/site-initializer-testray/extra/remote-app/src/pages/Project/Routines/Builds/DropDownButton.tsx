/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

import {ClayButtonWithIcon} from '@clayui/button';
import ClayDropDown, {Align} from '@clayui/drop-down';
import ClayIcon from '@clayui/icon';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Form from '../../../../components/Form';
import Tooltip from '../../../../components/Tooltip';
import {Dropdown} from '../../../../context/HeaderContext';
import {useFetch} from '../../../../hooks/useFetch';
import i18n from '../../../../i18n';
import {APIResponse, TestrayBuild} from '../../../../services/rest';
import {testrayBuildImpl} from '../../../../services/rest/TestrayBuild';
import {searchUtil} from '../../../../util/search';

type DropDownProps = {
	routineId: string;
};

const DropDownButton: React.FC<DropDownProps> = ({routineId}) => {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);

	const {data} = useFetch<APIResponse<TestrayBuild>>(
		`${testrayBuildImpl.resource}&filter=${searchUtil.eq(
			'routineId',
			routineId
		)} and ${searchUtil.eq('template', true)} and ${searchUtil.eq(
			'active',
			true
		)} `
	);

	const items: Dropdown = [
		{
			items: [
				{
					icon: 'plus',
					label: 'New Build',
					path: './create',
				},
				{
					icon: 'plus',
					label: 'New Template',
					path: './create?template=true',
				},
			],

			title: i18n.translate('create'),
		},
	];

	return (
		<ClayDropDown
			active={active}
			alignmentPosition={Align.BottomCenter}
			onActiveChange={setActive}
			trigger={
				<div>
					<Tooltip position="down" title={i18n.translate('manage')}>
						<div className="testray-sidebar-item">
							<ClayButtonWithIcon
								className="nav-btn nav-btn-monospaced"
								symbol="plus"
							/>
						</div>
					</Tooltip>
				</div>
			}
		>
			<ClayDropDown.ItemList>
				{items.map((section, index) => (
					<div key={index}>
						<ClayDropDown.Group header={section.title}>
							{section.items.map(
								(
									{divider, icon, label, onClick, path},
									itemIndex
								) => (
									<React.Fragment key={itemIndex}>
										<ClayDropDown.Item
											onClick={() => {
												if (onClick) {
													setActive(false);

													return onClick();
												}

												if (!path) {
													return;
												}

												const isHttpUrl = path.startsWith(
													'http'
												);

												if (isHttpUrl) {
													window.location.href = path;

													return;
												}

												setActive(false);

												navigate(path);
											}}
										>
											<div className="align-items-center d-flex testray-sidebar-item text-dark">
												{icon && (
													<ClayIcon
														fontSize={16}
														symbol={icon}
													/>
												)}

												<span className="ml-1 testray-sidebar-text">
													{label}
												</span>
											</div>
										</ClayDropDown.Item>

										{divider && <ClayDropDown.Divider />}
									</React.Fragment>
								)
							)}

							<div className="align-items-center d-flex ml-2 text-dark">
								<Form.Input
									label="screen-name"
									name="alternateName"
								/>
							</div>

							<div>
								<ul>
									{data?.items.map((item, index) => (
										<ClayDropDown.Item
											key={index}
											onClick={() => {
												alert('teste');
											}}
										>
											<li style={{listStyle: 'none'}}>
												{item.name}
											</li>
										</ClayDropDown.Item>
									))}
								</ul>
							</div>
						</ClayDropDown.Group>

						{items.length - 1 !== index && <ClayDropDown.Divider />}
					</div>
				))}
			</ClayDropDown.ItemList>
		</ClayDropDown>
	);
};

export default DropDownButton;
