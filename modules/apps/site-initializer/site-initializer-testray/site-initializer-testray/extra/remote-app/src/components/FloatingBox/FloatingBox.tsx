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
import ClayButton from '@clayui/button';
import {ClayTooltipProvider} from '@clayui/tooltip';

import i18n from '../../i18n';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	loading?: boolean;
};

type FloatingBoxProps = {
	alerts?: {text: string; title?: string}[];
	buttonTitle: string;
	onClear?: () => void;
	onSubmit?: () => void;
	primaryButtonProps?: ButtonProps;
	selectdCount?: number;
};

const FloatingBox: React.FC<FloatingBoxProps> = ({
	alerts,
	buttonTitle,
	onClear,
	onSubmit,
	selectdCount,
	primaryButtonProps: {loading, ...primaryButtonProps} = {},
}) => {
	return (
		<div className="d-flex fixed-bottom flex-colunm testray-floating-box">
			<>
				{alerts?.map((item, index) => {
					const {text, title} = item;

					return (
						<div className="alert" key={index}>
							<ClayAlert
								displayType="danger"
								key={index}
								title={title}
								variant="feedback"
							>
								<span className="ml-1">{text}</span>
							</ClayAlert>
						</div>
					);
				})}

				<div className="align-items d-flex justify-content-between m-3">
					<div className="d-flex label-selected">
						<span className="count mr-2">{selectdCount}</span>

						{i18n.translate('selected')}
					</div>

					<div className="d-flex flex-row">
						<ClayTooltipProvider>
							<ClayButton
								className="mr-1"
								displayType="secondary"
								onClick={() => onClear}
								title="Deselect Items"
							>
								{i18n.translate('clear')}
							</ClayButton>
						</ClayTooltipProvider>

						<ClayTooltipProvider>
							<ClayButton
								{...primaryButtonProps}
								disabled={
									primaryButtonProps?.disabled || loading
								}
								displayType="primary"
								onClick={onSubmit}
								title={buttonTitle}
							>
								{i18n.translate(
									primaryButtonProps?.title ??
										i18n.translate('Merge Subtasks')
								)}
							</ClayButton>
						</ClayTooltipProvider>
					</div>
				</div>
			</>
		</div>
	);
};

export default FloatingBox;
