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

import {useCallback, useEffect, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {useOutletContext} from 'react-router-dom';

import Form from '../../../components/Form';
import DualListBox, {Boxes} from '../../../components/Form/DualListBox';
import {useFetch} from '../../../hooks/useFetch';
import useFormActions from '../../../hooks/useFormActions';
import i18n from '../../../i18n';
import yupSchema, {yupResolver} from '../../../schema/yup';
import {APIResponse, TestrayFactor} from '../../../services/rest';
import {testrayFactorRest} from '../../../services/rest/TestrayFactor';
import {searchUtil} from '../../../util/search';
import FactorsToOptions from './FactorsToOptions';

type EnvironmentFactorsModalProps = {
	dispatch: React.Dispatch<any>;
	routineId: number;
};

type OutletContext = {
	testrayFactorOptions?: FactorEnviroment;
};

type FactorCategoryForm = typeof yupSchema.factorCategory.__outputType;
type FactorEnviroment = typeof yupSchema.enviroment.__outputType;

const onMapAvailable = (factor: FactorCategoryForm) => ({
	label: factor.name,
	value: String(factor?.id),
});

export type State = Boxes<[]>;
const EnvironmentFactorsModal: React.FC<EnvironmentFactorsModalProps> = ({
	dispatch,
	routineId,
}) => {
	const testrayFactorOptions: OutletContext = useOutletContext();
	const {
		form: {onError, onSubmit},
	} = useFormActions();

	const {
		control,
		formState: {errors},
		handleSubmit,
		register,
		setValue,
		watch,
	} = useForm<FactorEnviroment>({
		defaultValues: testrayFactorOptions
			? {
					factorCategoryId: [],
					options: [{}],
			  }
			: {
					options: [{}],
			  },

		resolver: yupResolver(yupSchema.enviroment),
	});

	const {append, fields, remove, update} = useFieldArray({
		control,
		name: 'options',
	});

	const [state, setState] = useState<State>([[], []]);

	const [step, setStep] = useState(0);

	const lastStep = step === 1;

	const [, selectedEnvironmentFactors] = state;

	const {data: factorCategoryResponse} = useFetch<
		APIResponse<FactorCategoryForm>
	>(`/factorcategories`);

	const {data: factorResponse} = useFetch<APIResponse<TestrayFactor>>(
		`${testrayFactorRest.resource}&filter=${searchUtil.eq(
			'routineId',
			routineId
		)}`,
		(response) => testrayFactorRest.transformDataFromList(response)
	);

	const getCategoryDualBox = useCallback(() => {
		const selectedItems =
			factorResponse?.items.map(({factorCategory}) => factorCategory) ||
			[];

		const availableItems =
			factorCategoryResponse?.items.filter(
				(factorCategory) =>
					!selectedItems.find(
						(item) => Number(item?.id) === Number(factorCategory.id)
					)
			) || [];

		setState([
			availableItems.map(onMapAvailable) as any,
			selectedItems.map(onMapAvailable as any),
		]);
	}, [factorCategoryResponse?.items, factorResponse?.items, setState]);

	useEffect(() => {
		getCategoryDualBox();
	}, []);

	const options = watch('options');
	console.log(options);

	const _onSubmit = async (form: FactorEnviroment) => {
		if (step === 1) {
			await onSubmit(
				{
					factorCategoryId: form.factorCategoryId,
					factorOptionsId: form.options,
					routineId,
				},
				{
					create: (...params) => testrayFactorRest.create(...params),
					update: (...params) => testrayFactorRest.update(...params),
				}
			)
				.then(() => {})
				.catch(onError);
		}
		if (step === 0) {
			setValue(
				'factorCategoryId',
				state[1].map((item) => item.value)
			);

			return setStep(1);
		}
	};

	return (
		<>
			{step === 0 && (
				<DualListBox
					boxes={state}
					leftLabel={i18n.translate('Available')}
					rightLabel={i18n.translate('Selected')}
					setValue={setState}
				/>
			)}

			{step === 1 && (
				<FactorsToOptions
					control={control}
					lastStep={lastStep}
					register={register}
					routineId={routineId}
					selectedEnvironmentFactors={selectedEnvironmentFactors}
					setValue={setValue}
				/>
			)}

			<Form.Footer
				isModal
				onClose={() => (lastStep ? setStep(0) : dispatch({type: 0}))}
				onSubmit={handleSubmit(_onSubmit)}
				primaryButtonTitle={i18n.translate(lastStep ? 'Save' : 'next')}
				secondaryButtonTitle={i18n.translate(
					lastStep ? 'Back' : 'Cancel'
				)}
			/>
		</>
	);
};

export default EnvironmentFactorsModal;
