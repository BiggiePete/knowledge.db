<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import type { SuperValidated } from 'sveltekit-superforms';

	export let form: SuperValidated<
		{
			problem: string;
			steps: {
				step_title: string;
				step_text: string;
			}[];
		},
		any,
		{
			problem: string;
			steps: {
				step_title: string;
				step_text: string;
			}[];
		}
	>;
</script>

<Card>
	<CardHeader>
		<Input type="text" placeholder="step 1 . . ." />
		<br />
		<Textarea rows={4} placeholder="lorem ipsulem"></Textarea>
	</CardHeader>
</Card>
