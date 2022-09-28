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
import classNames from 'classnames';
import React from 'react';

import Container from '../../common/components/container';

export default function () {
	const newdata = [
		['data1', 4453],
		['data2', 3234.8],
		['data3', 2334.5],
		['data4', 1323.99],
	];
	const oldData = [
		['data1', 9462.9],
		['data2', 3334.55],
		['data3', 7333.9],
		['data4', 424.99],
	];
	const totalRevenue = newdata
		.map((value) => value[1])
		.reduce((previusValue, currentValue) => previusValue + currentValue);

	const lastMonthRevenue = oldData
		.map((value) => value[1])
		.reduce((previusValue, currentValue) => previusValue + currentValue);

	const colors = {
		data1: '#000239',
		data2: '#FF6060',
		data3: '#83B6FE',
		data4: '#7B61FF',
	};

	// const newItems = [
	// 	{
	// 		name: 'New Business',
	// 		value: 92029.5,
	// 	},
	// 	{
	// 		name: 'Renewal Business',
	// 		value: 12029.5,
	// 	},
	// 	{
	// 		name: 'Renewal Business',
	// 		value: 2029.5,
	// 	},
	// 	{
	// 		name: 'Renewal Business',
	// 		value: 62029.5,
	// 	},
	// ];

	// const oldItems = [
	// 	{
	// 		name: 'New Business',
	// 		value: 1112029.5,
	// 	},
	// 	{
	// 		name: 'Renewal Business',
	// 		value: 92029.5,
	// 	},
	// 	{
	// 		name: 'Renewal Business',
	// 		value: 92029.5,
	// 	},
	// 	{
	// 		name: 'Renewal Business',
	// 		value: 92029.5,
	// 	},
	// ];

	const legendItems = [
		{
			color: colors.data1,
			lasMonthValue: 1112029.5,
			name: 'New Business',
			value: 92029.5,
		},
		{
			color: colors.data2,
			lasMonthValue: 92029.5,
			name: 'Renewal Business',
			value: 12029.5,
		},
		{
			color: colors.data3,
			lasMonthValue: 92029.5,
			name: 'Renewal Business',
			value: 2029.5,
		},
		{
			color: colors.data4,
			lasMonthValue: 92029.5,
			name: 'Renewal Business',
			value: 62029.5,
		},
	];

	const percentFormat = (newValue, odlValue) => {
		return (newValue / odlValue) * 100;
	};

	const currencyFormat = (value) => {
		return value.toLocaleString('US', {
			currency: 'USD',
			maximumFractionDigits: 2,
			style: 'currency',
		});
	};

	const revenueComparison = percentFormat(totalRevenue, lastMonthRevenue);

	return (
		<>
			<Container title="Revenue">
				<div className="d-flex px-4">
					<div className="d-flex justify-content-start">
						<ClayChart
							className="d-flex justify-content-center"
							data={{
								colors,
								columns: newdata,
								type: 'donut',
							}}
							donut={{
								expand: false,
								label: {
									ratio: 1,
									show: true,
								},
								legend: {
									show: false,
								},
								width: 65,
							}}
							legend={{show: false}}
							size={{
								height: 400,
								width: 300,
							}}
						/>
					</div>

					<div className="d-flex flex-column justify-content-between pb-4 pl-4">
						<div>
							<div className="font-weight-semi-bold mt-3">
								Total Revenue
							</div>

							<div
								className="font-weight-bolder"
								style={{
									fontFamily:
										'Source Sans Pro, sans-serif !important',
									fontSize: '2.23rem',
									fontWeight: '800 !important',
								}}
							>
								{`USD ${currencyFormat(totalRevenue)}`}
							</div>

							<div className="d-flex">
								<div
									className={classNames(
										'font-weight-semi-bold ',
										{
											'text-danger':
												revenueComparison <= 0,
											'text-success':
												revenueComparison > 0,
										}
									)}
								>
									{`${revenueComparison.toFixed(0)} %`}
								</div>

								<div className="text-neutral-6">
									&nbsp; compared to last month
								</div>
							</div>

							<div>
								<hr />
							</div>
						</div>

						<div className="d-flex flex-column h-100 justify-content-between">
							<div className="d-flex flex-wrap h-100 justify-content-between mb-1">
								{legendItems.map((item, index) => {
									return (
										<div className="col-6 p-0" key={index}>
											<div className="align-items-center d-flex">
												<span
													className="mr-2 rounded-xs"
													style={{
														backgroundColor:
															item.color,
														height: '15px',
														width: '15px',
													}}
												></span>

												<div>{item.name}</div>
											</div>

											<div className="font-weight-semi-bold">
												{`USD ${item.value}`}
											</div>

											<div className="d-flex">
												<div
													className={classNames(
														'font-weight-semi-bold ',
														{
															'text-danger':
																percentFormat(
																	item.value,
																	item.lasMonthValue
																) <= 0,
															'text-success':
																percentFormat(
																	item.value,
																	item.lasMonthValue
																) > 0,
														}
													)}
												>
													{`${percentFormat(
														item.value,
														item.lasMonthValue
													).toFixed(0)} %`}
												</div>

												<div className="text-neutral-6">
													&nbsp; compared to last
													month
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
