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

import {useEffect} from 'react';
import {useParams} from 'react-router-dom';

import Avatar from '../../../components/Avatar';
import AssignToMe from '../../../components/Avatar/AssigneToMe';
import Code from '../../../components/Code';
import Container from '../../../components/Layout/Container';
import Loading from '../../../components/Loading';
import StatusBadge from '../../../components/StatusBadge';
import QATable from '../../../components/Table/QATable';
import {useFetch} from '../../../hooks/useFetch';
import useHeader from '../../../hooks/useHeader';
import i18n from '../../../i18n';
import {
	APIResponse,
	TestraySubTask,
	TestraySubTaskCasesResult,
	TestrayTask,
	testrayTaskImpl,
} from '../../../services/rest';
import {testraySubtaskImpl} from '../../../services/rest/TestraySubtask';
import {testraySubtaskCaseResultImpl} from '../../../services/rest/TestraySubtaskCaseResults';
import {SUBTASK_STATUS} from '../../../util/constants';
import {getTimeFromNow} from '../../../util/date';
import {searchUtil} from '../../../util/search';
import SubtasksCaseResults from './SubtaskCaseResults';
import SubtaskHeaderActions from './SubtaskHeaderActions';

const Subtasks = () => {
	const {setHeading} = useHeader();
	const {subtaskId, taskId} = useParams();

	const {data: testraySubtaskData, mutate: mutateSubtask} = useFetch<
		TestraySubTask
	>(testraySubtaskImpl.getResource(subtaskId as string), (response) =>
		testraySubtaskImpl.transformData(response)
	);

	const {data: testrayTaskData, loading} = useFetch<TestrayTask>(
		testrayTaskImpl.getResource(taskId as string),
		(response) => testrayTaskImpl.transformData(response)
	);

	const {data: testrayCaseResultData} = useFetch<
		APIResponse<TestraySubTaskCasesResult>
	>(
		`${testraySubtaskCaseResultImpl.resource}&filter=${searchUtil.eq(
			'subtaskId',
			subtaskId as string
		)}&pageSize=100`
	);

	const caseResults = testrayCaseResultData?.items || [];

	useEffect(() => {
		setTimeout(() => {
			setHeading([
				{
					category: i18n.translate('task'),
					path: `/testflow/${taskId}`,
					title: `${testrayTaskData?.name}`,
				},
				{
					category: i18n.translate('subtask'),
					title: `${testraySubtaskData?.name}`,
				},
			]);
		});
	}, [
		setHeading,
		testraySubtaskData?.name,
		subtaskId,
		testrayTaskData?.name,
		taskId,
	]);

	if (loading || !testraySubtaskData) {
		return <Loading />;
	}

	return (
		<>
			<SubtaskHeaderActions
				caseResult={caseResults.map((caseResult) =>
					Number(
						caseResult
							.r_caseResultToSubtasksCasesResults_c_caseResult?.id
					)
				)}
				mutateSubtask={mutateSubtask}
				subtask={testraySubtaskData}
			/>

			<Container className="pb-6" title={i18n.translate('subtasks')}>
				<div className="d-flex flex-wrap">
					<div className="col-4 col-lg-4 col-md-12">
						<QATable
							items={[
								{
									title: i18n.translate('status'),
									value: (
										<StatusBadge
											type={
												(SUBTASK_STATUS as any)[
													testraySubtaskData?.dueStatus as number
												]?.label
											}
										>
											{
												(SUBTASK_STATUS as any)[
													testraySubtaskData?.dueStatus as number
												]?.label
											}
										</StatusBadge>
									),
								},
								{
									title: i18n.translate('assignee'),
									value: testraySubtaskData.r_userToSubtasks_user ? (
										<Avatar
											displayName
											name={`${testraySubtaskData.r_userToSubtasks_user?.givenName} ${testraySubtaskData?.r_userToSubtasks_user?.additionalName}`}
										/>
									) : (
										<AssignToMe
											onClick={() =>
												testraySubtaskImpl
													.assignToMe(
														testraySubtaskData
													)
													.then(mutateSubtask)
											}
										/>
									),
								},
								{
									title: i18n.translate('updated'),
									value: getTimeFromNow(
										testraySubtaskData.statusUpdateDate
									),
								},
								{
									title: i18n.translate('issue'),
									value: '-',
								},
								{
									title: i18n.translate('comment'),
									value: 'None',
								},
							]}
						/>
					</div>

					<div className="col-8 col-lg-8 col-md-12 pb-5">
						<QATable
							items={[
								{
									title: i18n.translate('score'),
									value: `${testraySubtaskData?.score}`,
								},
								{
									title: i18n.translate('error'),
									value: (
										<Code>
											{caseResults.length
												? caseResults[0]
														.r_caseResultToSubtasksCasesResults_c_caseResult
														?.errors
												: null}
										</Code>
									),
								},
							]}
						/>
					</div>
				</div>
			</Container>

			<Container className="mt-5" title={i18n.translate('tests')}>
				<SubtasksCaseResults />
			</Container>
		</>
	);
};

export default Subtasks;
