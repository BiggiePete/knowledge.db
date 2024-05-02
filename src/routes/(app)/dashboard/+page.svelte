<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Card } from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Label } from '$lib/components/ui/label';
	import { Search } from 'lucide-svelte';
	import type { PageData } from './$types';
	import { navBarLinkSelected } from '../../../stores';
	import ResultPreviewCard from '$lib/components/custom/Search/result-preview-card.svelte';

	export let data: PageData;
	$navBarLinkSelected = '/dashboard'; // quick bug-fix for links
</script>

<!-- Search bar -->
<div class="container content-center">
	<Card class="m-2 max-w-full">
		<CardHeader>Check the DB</CardHeader>
		<CardContent>
			<Label for="Search">Search your question</Label>
			<form method="post" class="flex">
				<Input type="search" placeholder="I think . . ." class="h-12 w-full" />
				<Button type="submit" class="h-12">
					<Search></Search>
				</Button>
			</form>
		</CardContent>
	</Card>
</div>
<br />
<hr />
<br />
<div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	<!-- display here the latest searches, in the format of a title, how many steps were involved, and a small summary of what the project / solution entails -->
	<!-- TODO change if statement to check if there are any search results to show -->
	{#if true}
		{#each data.results as result}
			<ResultPreviewCard {result}></ResultPreviewCard>
		{/each}
	{/if}
</div>
