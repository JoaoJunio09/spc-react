import type { StepByCatechumenResponse } from "../interfaces/step/StepByCatechumenResponse";
import type { StepResponse } from "../interfaces/step/StepResponse";
import { FormatStep } from "./FormatStep";

function define(step: StepResponse | StepByCatechumenResponse) {
	let textOption:string = '';

	for (let i = 0; i < step.catechists.length; i++) {
		if (i === 0) {
			textOption = FormatStep.format(step.stepName) + ' - ';
		}

		step.catechists.length - i === 1
			?	textOption += `${step.catechists[i].firstName}`
			:	textOption += `${step.catechists[i].firstName} & `
	}

	return [textOption];
}

export const DefineNameCatechists = {
	define
}