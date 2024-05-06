import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import weaviate_client, { Knowledge_entry } from '$lib/weaviate_client';
import db from '$lib/db';
import type { Step } from '@prisma/client';

const newEntrySchema = z.object({
	problem: z.string(),
	description: z.string(),
	steps: z
		.object({
			step_title: z.string(),
			step_text: z.string()
		})
		.array()
		.min(1)
});

export const load = (async () => {
	const form = await superValidate(zod(newEntrySchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(newEntrySchema));
		// TODO fix problem with no steps being sent to server
		// if (!form.valid) {
		// 	return fail(400);
		// }
		console.log(form.data);
		// const r = await weaviate_client.data
		// 	.creator()
		// 	.withClassName(Knowledge_entry.class)
		// 	.withProperties({
		// 		problem: form.data.problem,
		// 		description: form.data.description
		// 	})
		// 	.do();
		// once the data goes through to weaviate, lets store the steps and the problem as a hole over to the prisma db
		// generate all the records to be created

		const steps_data = [];
		for (let idx = 0; idx < form.data.steps.length; idx++) {
			steps_data.push({
				idx: idx,
				content: form.data.steps[idx].step_text,
				title: form.data.steps[idx].step_title
			});
		}

		console.log(steps_data);

		// db.problem.create({
		// 	data: {
		// 		id: r.id,
		// 		problemText: form.data.problem,
		// 		description: form.data.description,
		// 		steps: {
		// 			createMany: {
		// 				data: [...steps_data]
		// 			}
		// 		}
		// 	}
		// });
		// console.log(JSON.stringify(r, null, 2));
		return message(
			form,
			JSON.stringify({
				status: 'OK'
			})
		);
	}
};
