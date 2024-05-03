<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import type { SearchResult } from '$lib/types';

	export let result: SearchResult;
</script>

<a href={'/entry/' + result.id}>
	<Card>
		<CardHeader>
			<h2 class="text-xl font-semibold">{result.title}</h2>
			<hr />
		</CardHeader>
		<CardDescription>
			<div class="m-2 mt-0 p-2">
				<h3 class="font-semibold">Summary</h3>
				{result.summary}
			</div>
		</CardDescription>
		<CardFooter>
			Total Steps : {result.steps}
		</CardFooter>
	</Card></a
>
