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
	import { PlusIcon } from 'lucide-svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { superForm } from 'sveltekit-superforms';

	export let data: PageData;

	const { form, enhance, message, constraints } = superForm(data.form, {
		clearOnSubmit: 'errors'
	});
	$navBarLinkSelected = '/dashboard'; // quick bug-fix for links
	$: console.log(JSON.parse($message ?? '{}'));
	$: ReturnedData = JSON.parse($message ?? '{}').data;
</script>

<!-- Search bar -->
<div class="container content-center">
	<Card class="m-2 max-w-full">
		<CardHeader>Check the DB</CardHeader>
		<CardContent>
			<Label for="Search">Search your question</Label>
			<form method="post" use:enhance>
				<div class="flex flex-grow-0">
					<Input
						type="search"
						placeholder="What is . . ."
						class="h-12 w-full"
						name="query"
						bind:value={$form.query}
						{...$constraints.query}
					/>
					<Button type="submit" class="h-12">
						<Search></Search>
					</Button>
				</div>
				<div class=" w-1/4">
					<Label for="search_num">Number of results</Label>
					<Input
						type="number"
						bind:value={$form.search_num}
						name="search_num"
						class="h-12"
						{...$constraints.search_num}
					/>
				</div>
			</form>
		</CardContent>
	</Card>
</div>
<br />
<hr />
<br />
<div class="container grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	<!-- display here the latest searches, in the format of a title, how many steps were involved, and a small summary of what the project / solution entails -->
	{#if ReturnedData}
		{#if ReturnedData.Get.Entry.length > 0}
			{#each ReturnedData.Get.Entry as result}
				<ResultPreviewCard
					result={{
						id: result._additional.id,
						steps: Math.round(Math.random() * 6),
						title: result.problem,
						summary: result.description
					}}
				></ResultPreviewCard>
			{/each}
		{/if}
	{/if}
</div>

<div class="fixed bottom-16 right-16">
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Button href="/new-entry" variant="outline" class="h-16 w-16">
				<PlusIcon></PlusIcon>
			</Button>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Create a new Entry</p>
		</Tooltip.Content>
	</Tooltip.Root>
</div>

<!-- some spacing -->
<br />
<br />
<br />
