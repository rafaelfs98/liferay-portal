/**
 * SPDX-FileCopyrightText: (c) 2000 Liferay, Inc. https://liferay.com
 * SPDX-License-Identifier: LGPL-2.1-or-later OR LicenseRef-Liferay-DXP-EULA-2.0.0-2023-06
 */

import {useParams, useSearchParams} from 'react-router-dom';
import Avatar from '~/components/Avatar';
import AssignToMe from '~/components/Avatar/AssignToMe/AssignToMe';
import Code from '~/components/Code';
import JiraLink from '~/components/JiraLink';
import Container from '~/components/Layout/Container';
import ListView from '~/components/ListView';
import StatusBadge from '~/components/StatusBadge';
import {StatusBadgeType} from '~/components/StatusBadge/StatusBadge';
import useMutate from '~/hooks/useMutate';
import useSearchBuilder from '~/hooks/useSearchBuilder';
import i18n from '~/i18n';
import {
	PickList,
	TestrayCaseResult,
	testrayCaseResultImpl,
} from '~/services/rest';
import {getTruncateText} from '~/util/getTruncateText';

import useBuildTestActions from './useBuildTestActions';

const Build = () => {
	const [searchParams] = useSearchParams();
	const {actions, form} = useBuildTestActions();
	const {buildId} = useParams();
	const {updateItemFromList} = useMutate();

	const runId = searchParams.get('runId');

	const caseResultFilter = useSearchBuilder({useURIEncode: false});

	const filter = runId
		? caseResultFilter.eq('buildId', buildId as string).build()
		: caseResultFilter.eq('buildId', buildId as string).build();

	return (
		<Container className="mt-4">
			<ListView
				initialContext={{
					columns: {environment: false},
					pageSize: 200,
				}}
				managementToolbarProps={{
					applyFilters: true,
					filterSchema: 'buildResults',
					title: i18n.translate('tests'),
				}}
				resource={`/testray-case-result/by-testray-buildId/${buildId}`}
				tableProps={{
					actions,
					columns: [
						{
							clickable: true,
							key: 'testrayCaseTypeName',
							value: i18n.translate('case-type'),
						},
						{
							clickable: true,
							key: 'priority',
							render: (
								_,
								{case: testrayCase}: TestrayCaseResult
							) => testrayCase?.priority,
							value: i18n.translate('priority'),
						},
						{
							clickable: true,
							key: 'testrayTeamName',
							value: i18n.translate('team'),
						},
						{
							clickable: true,
							key: 'testrayComponentName',
							value: i18n.translate('component'),
						},
						{
							key: 'testrayCaseName',
							selectable: true,
							size: 'xl',
							value: i18n.translate('case'),
						},
						{
							clickable: true,
							key: 'testrayRunNumber',
							render: (testrayRunNumber) =>
								testrayRunNumber?.toString().padStart(2, '0'),
							value: i18n.translate('run'),
						},
						{
							clickable: true,
							key: 'testrayRunName',
							value: i18n.translate('environment'),
							width: '250',
						},
						{
							key: 'testrayUserName',
							render: (testrayUserName, mutate) => {
								if (testrayUserName) {
									return (
										<Avatar
											className="text-capitalize"
											displayName
											name={testrayUserName}
											size="sm"
											url={''}
										/>
									);
								}

								return (
									<AssignToMe
										onClick={() =>
											testrayCaseResultImpl
												.assignToMe(testrayUserName)
												.then(() => {
													updateItemFromList(
														mutate,
														0,
														{},
														{
															revalidate: true,
														}
													);
												})
												.then(form.onSuccess)
												.catch(form.onError)
										}
									/>
								);
							},
							truncate: false,
							value: i18n.translate('assignee'),
							width: '200',
						},
						{
							clickable: true,
							key: 'status',
							render: (dueStatus) => (
								<StatusBadge
									type={dueStatus as StatusBadgeType}
								>
									{dueStatus}
								</StatusBadge>
							),
							value: i18n.translate('status'),
						},
						{
							key: 'issues',
							render: (issues: string) => (
								<JiraLink
									displayViewInJira={false}
									issue={issues}
								/>
							),
							value: i18n.translate('issues'),
						},
						{
							key: 'error',
							render: (errors: string) =>
								errors && (
									<Code title={errors as string}>
										{getTruncateText(errors)}
									</Code>
								),
							size: 'xl',
							truncate: true,
							value: i18n.translate('errors'),
						},
						{
							clickable: true,
							key: 'comment',
							size: 'lg',
							value: i18n.translate('comment'),
						},
					],
					navigateTo: ({testrayCaseResultId}) =>
						`case-result/${testrayCaseResultId}`,
					rowWrap: true,
				}}
			/>
		</Container>
	);
};

export default Build;
