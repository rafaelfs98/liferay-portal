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

import ClayButton from '@clayui/button';
import {KeyedMutator} from 'swr';

import AssignModal from '../../../components/AssignModal';
import useFormModal from '../../../hooks/useFormModal';
import i18n from '../../../i18n';
import {TestraySubTask, UserAccount} from '../../../services/rest';
import {testraySubtaskImpl} from '../../../services/rest/TestraySubtask';
import SubtaskComplete from './SubtaskComplete';

const SubtaskHeaderActions: React.FC<{
	caseResult: number[];
	mutateSubtask: KeyedMutator<any>;
	subtask: TestraySubTask;
}> = ({caseResult, mutateSubtask, subtask}) => {
	const {modal: assignModal} = useFormModal({
		onSave: (user: UserAccount) =>
			testraySubtaskImpl.assignTo(subtask, user.id).then(mutateSubtask),
	});

	const {modal: completeModal} = useFormModal({
		onSave: (dueStatus) => {
			testraySubtaskImpl
				.complete(subtask.id, caseResult, dueStatus)
				.then(mutateSubtask);
		},
	});

	const ButtonDisabled = subtask.dueStatus === 4 || subtask.dueStatus === 3;

	return (
		<>
			<AssignModal modal={assignModal} />
			<SubtaskComplete modal={completeModal} />

			{ButtonDisabled && (
				<>
					<ClayButton
						className="mb-3 ml-3"
						displayType="secondary"
						onClick={() => assignModal.open()}
					>
						{i18n.translate(
							subtask.dueStatus === 4
								? 'assign-and-begin-analysis'
								: 'assign-and-reanalyze'
						)}
					</ClayButton>
				</>
			)}

			{!ButtonDisabled && (
				<>
					<ClayButton.Group className="mb-3 ml-3" spaced>
						<ClayButton
							displayType="secondary"
							onClick={() => assignModal.open()}
						>
							{i18n.translate('assign')}
						</ClayButton>

						<ClayButton onClick={() => completeModal.open()}>
							{i18n.translate('complete')}
						</ClayButton>

						<ClayButton
							displayType="secondary"
							onClick={() =>
								testraySubtaskImpl
									.returnToOpen(subtask)
									.then(mutateSubtask)
							}
						>
							{i18n.translate('return-to-open')}
						</ClayButton>
					</ClayButton.Group>
				</>
			)}
		</>
	);
};

export default SubtaskHeaderActions;
