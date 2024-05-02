import { z } from 'zod';
import {zod} from "sveltekit-superforms/adapters"
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import type { SearchResult } from '$lib/types';

const searchSchema = z.object({
	query:z.string(),
})

const ex_response = {
title: "This is a problem",
steps:7,
summary:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi autem officiis amet provident, tempore porro adipisci facere dicta minima maiores libero animi illo quo molestiae distinctio, laborum, aliquam odio nulla."
} satisfies SearchResult

export const load = (async () => {
	const form = await superValidate(zod(searchSchema));

	return {form,results: [ex_response]};
}) satisfies PageServerLoad;


export const actions: Actions = {
	default: async ({request})=>{
// handle querying the database for information reguarding the query
	}
};