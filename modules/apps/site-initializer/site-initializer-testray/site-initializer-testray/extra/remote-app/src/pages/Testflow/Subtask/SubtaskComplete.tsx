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

import ClayAlert from '@clayui/alert';
import {useForm} from 'react-hook-form';

import Form from '../../../components/Form';
import Container from '../../../components/Layout/Container';
import Modal from '../../../components/Modal';
import {withVisibleContent} from '../../../hoc/withVisibleContent';
import {FormModalOptions} from '../../../hooks/useFormModal';
import i18n from '../../../i18n';
import yupSchema, {yupResolver} from '../../../schema/yup';
import {TEST_STATUS} from '../../../util/constants';

type SubtaskForm = {
	dueStatus: string;
	issue: string;
};

type CaseTypeProps = {
	modal: FormModalOptions;
};

const SubtaskComplete: React.FC<CaseTypeProps> = ({
	modal: {modalState, observer, onClose, onSave},
}) => {
	const {
		formState: {errors},
		register,
		watch,
	} = useForm<SubtaskForm>({
		defaultValues: modalState?.dueStatus
			? ({
					dueStatus: modalState?.dueStatus,
					issue: modalState?.issue,
			  } as any)
			: {},
		resolver: yupResolver(yupSchema.subtask),
	});

	const inputProps = {
		errors,
		register,
	};

	const dueStatus = watch('dueStatus');
	const issue = watch('issue');

	return (
		<Modal
			last={
				<Form.Footer
					onClose={onClose}
					onSubmit={() => onSave(dueStatus)}
				/>
			}
			observer={observer}
			size="lg"
			title={i18n.translate(
				modalState?.id ? 'edit-case-type' : 'new-case-type'
			)}
			visible
		>
			<Container>
				<ClayAlert displayType="info">
					{i18n.translate(
						'clicking-save-will-assign-you-to-this-case-result'
					)}
				</ClayAlert>

				<Form.Select
					className="container-fluid-max-md"
					defaultOption={false}
					label={i18n.translate('status')}
					name="dueStatus"
					options={[
						{label: 'Passed', value: TEST_STATUS.Passed},
						{label: 'Failed', value: TEST_STATUS.Failed},
						{label: 'Blocked', value: TEST_STATUS.Blocked},
						{label: 'Test Fix', value: TEST_STATUS['Test Fix']},
					]}
					{...inputProps}
					value={dueStatus}
				/>

				<Form.Input
					className="container-fluid-max-md"
					label={i18n.translate('issues')}
					name="issue"
					{...inputProps}
					value={issue}
				/>

				<Form.Input
					className="container-fluid-max-md"
					label={i18n.translate('comment')}
					name="commentMBMessage"
					type="textarea"
					{...inputProps}
				/>
			</Container>
		</Modal>
	);
};

export default withVisibleContent(SubtaskComplete);
