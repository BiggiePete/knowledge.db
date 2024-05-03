import { z } from 'zod';
import {zod} from "sveltekit-superforms/adapters"
import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import weaviate_client, { Knowledge_entry } from "$lib/weaviate_client"
import { fail } from '@sveltejs/kit';

const searchSchema = z.object({
	query:z.string(),
})


let results:any = [];

export const load = (async () => {
	const form = await superValidate(zod(searchSchema));
	form.message = "NULL"
	return {form,results};
}) satisfies PageServerLoad;


export const actions: Actions = {
	default: async ({request})=>{
		
		// handle querying the database for information reguarding the query

		const form = await superValidate(request,zod(searchSchema));
		if(!form.valid){
			return fail(400)
		}
		
		// TODO test weaviate to make sure it actually works
		results = await weaviate_client.graphql
		.get()
		.withClassName(Knowledge_entry.class)
		.withHybrid({query:form.data.query})
		.withLimit(6)
		.withFields('problem')
		.do();
		// .withFields('problem _additional { summary ( properties: ["summary"]) { property result } }')
		

	}
};