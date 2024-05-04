import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import weaviate_client, { Knowledge_entry } from '$lib/weaviate_client';

const newEntrySchema = z.object({
	problem: z.string(),
	description: z.string(),
	steps: z
		.object({
			step_title: z.string(),
			step_text: z.string()
		})
		.array()
		.min(0)
});

export const load = (async () => {
	const form = await superValidate(zod(newEntrySchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(newEntrySchema));

		if (!form.valid) {
			return fail(400);
		}
		// console.log(form.data);
		weaviate_client.data
			.creator()
			.withClassName(Knowledge_entry.class)
			.withProperties({
				problem: form.data.problem,
				description: form.data.description
			})
			.do();
		// console.log(JSON.stringify(r, null, 2));
		return message(
			form,
			JSON.stringify({
				status: 'OK'
			})
		);
	}
};
