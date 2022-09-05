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
import {Control, UseFormRegister, useFieldArray} from 'react-hook-form';

import Form from '../../../components/Form';
import yupSchema from '../../../schema/yup';
import {TestrayFactor, TestrayFactorOptions} from '../../../services/rest';
import {testrayFactorCategoryRest} from '../../../services/rest/TestrayFactorCategory';

type FactorOptionForm = typeof yupSchema.factorOption.__outputType;

type FactorsToOptionsProps = {
	control: Control<FactorOptionForm>;
	lastStep: Boolean;
	register: UseFormRegister<FactorOptionForm>;
	routineId: number;
	selectedEnvironmentFactors: {label: string; value: number}[];
	setOptionsItens: any;
};

const FactorsToOptions: React.FC<FactorsToOptionsProps> = ({
	control,
	register,
	selectedEnvironmentFactors,
}) => {
	const [factorOptionsList, setFactorOptionsList] = useState<
		TestrayFactor[][]
	>([[] as any]);

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
			{selectedEnvironmentFactors.map((factorItem, index) => (
				<Form.Select
					defaultOption={false}
					key={index}
					label={factorItem.label}
					name={`categories.${index}.factorOptionId`}
					options={(factorOptionsList[index] || []).map(
						({id, name}: any) => ({
							label: name,
							value: id,
						})
					)}
					required
				/>
			))}
		</>
	);
};

export default FactorsToOptions;
