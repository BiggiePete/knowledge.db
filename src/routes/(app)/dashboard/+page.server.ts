import { z } from 'zod';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import weaviate_client, { Knowledge_entry } from '$lib/weaviate_client';
import { fail } from '@sveltejs/kit';

const searchSchema = z.object({
	query: z.string().min(1),
	search_num: z.number().default(6)
});

export const load = (async () => {
	const form = await superValidate(zod(searchSchema));
	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		// handle querying the database for information reguarding the query

		const form = await superValidate(request, zod(searchSchema));
		if (!form.valid) {
			return fail(400);
		}

		const r = await weaviate_client.graphql
			.get()
			.withClassName(Knowledge_entry.class)
			.withHybrid({
				query: form.data.query
			})
			.withLimit(form.data.search_num)
			.withFields('problem description _additional { id }')
			.do();
		return message(form, JSON.stringify(r));
	}
};
