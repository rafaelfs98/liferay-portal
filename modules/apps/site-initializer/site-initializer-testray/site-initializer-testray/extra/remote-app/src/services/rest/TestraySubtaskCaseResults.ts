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

import yupSchema from '../../schema/yup';
import Rest from './Rest';
import {TestraySubTaskCasesResult} from './types';

type SubtaskCaseResultForm = typeof yupSchema.subtaskToCaseResult.__outputType;

class TestraySubtaskCaseResultImpl extends Rest<
	SubtaskCaseResultForm,
	TestraySubTaskCasesResult
> {
	constructor() {
		super({
			adapter: ({
				caseResultId: r_caseResultToSubtasksCasesResults_c_caseResultId,
				name,
				subtaskId: r_subtaskToSubtasksCasesResults_c_subtaskId,
			}) => ({
				name,
				r_caseResultToSubtasksCasesResults_c_caseResultId,
				r_subtaskToSubtasksCasesResults_c_subtaskId,
			}),
			nestedFields: 'caseResult.case,subtask',
			transformData: (subtaskCaseResult) => ({
				caseResult: subtaskCaseResult?.r_caseResultToSubtasksCasesResults_c_caseResult
					? {
							...subtaskCaseResult?.r_caseResultToSubtasksCasesResults_c_caseResult,
							case:
								subtaskCaseResult
									?.r_caseResultToSubtasksCasesResults_c_caseResult
									.r_caseToCaseResult_c_case,
							runs: subtaskCaseResult
								?.r_caseResultToSubtasksCasesResults_c_caseResult
								.run
								? {
										build:
											subtaskCaseResult
												.r_caseResultToSubtasksCasesResults_c_caseResult
												.run?.build,
								  }
								: null,
					  }
					: undefined,
				id: subtaskCaseResult.id,
				name: '',
				subTask:
					subtaskCaseResult?.r_subtaskToSubtasksCasesResults_c_subtask,
			}),
			uri: 'subtaskscasesresultses',
		});
	}
}

export const testraySubtaskCaseResultImpl = new TestraySubtaskCaseResultImpl();
