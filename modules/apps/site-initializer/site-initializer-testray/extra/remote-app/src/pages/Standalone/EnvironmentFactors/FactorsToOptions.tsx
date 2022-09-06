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

import {useEffect, useState} from 'react';
import {UseFormRegister} from 'react-hook-form';

import Form from '../../../components/Form';
import {useFetch} from '../../../hooks/useFetch';
import yupSchema from '../../../schema/yup';
import {
	APIResponse,
	TestrayFactor,
	testrayFactorRest,
} from '../../../services/rest';
import {testrayFactorCategoryRest} from '../../../services/rest/TestrayFactorCategory';
import {searchUtil} from '../../../util/search';

type FactorOptionForm = typeof yupSchema.enviroment.__outputType;

type FactorsToOptionsProps = {
	lastStep: Boolean;
	register: UseFormRegister<FactorOptionForm>;
	routineId: number;
	selectedEnvironmentFactors: {label: string; value: number}[];
	setOptionsItens: any;
	setValue: any;
};

const FactorsToOptions: React.FC<FactorsToOptionsProps> = ({
	register,
	routineId,
	selectedEnvironmentFactors,
	setValue,
}) => {
	const [factorOptionsList, setFactorOptionsList] = useState<
		TestrayFactor[][]
	>([[] as any]);

	const {data: factorsData} = useFetch<APIResponse<TestrayFactor>>(
		`${testrayFactorRest.resource}&filter=${searchUtil.eq(
			'routineId',
			routineId
		)}`,
		(response) => testrayFactorRest.transformDataFromList(response)
	);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const factorItems = factorsData?.items || [];

	useEffect(() => {
		const options = [] as any;

		factorItems.forEach((factor) => {
			options.push({factorOptionId: factor.factorOption?.id});
		});
		setValue('options', options);
	}, [factorItems, setValue]);

	useEffect(() => {
		testrayFactorCategoryRest
			.getFactorCategoryItems(
				selectedEnvironmentFactors.map(({value}) => ({
					factorCategory: {id: value},
				})) as TestrayFactor[]
			)
			.then(setFactorOptionsList);
	}, [selectedEnvironmentFactors]);

	return (
		<>
			{selectedEnvironmentFactors.map((environmentFactor, index) => {
				const defaultValue = factorItems.find(
					({factorCategory}) =>
						factorCategory?.id === Number(environmentFactor.value)
				)?.factorOption?.id;

				return (
					<Form.Select
						defaultValue={defaultValue}
						key={index}
						label={environmentFactor.label}
						name={`options.${index}`}
						options={(factorOptionsList[index] || []).map(
							({id, name}: any) => ({
								label: name,
								value: id,
							})
						)}
						register={register}
						required
					/>
				);
			})}
		</>
	);
};

export default FactorsToOptions;
