<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Brain, PlusIcon } from 'lucide-svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { navBarLinkSelected } from '../../../stores';

	export let data: PageData;
	const { form, message, constraints, errors } = superForm(data.form, {
		dataType: 'json'
	});
	$navBarLinkSelected = '/new-entry';
	$: if ($message) {
		if (JSON.parse($message ?? '{}').status == 'OK') {
			setTimeout(() => {
				toast.success('Success!');
			}, 200);
		}
	}
</script>

<SuperDebug data={$form}></SuperDebug>
<Card class="m-4">
	<CardHeader>
		<h2 class="text-xl font-semibold">New problem?</h2>
	</CardHeader>
	<CardContent>
		<div class="m-2 p-2">
			<form method="post">
				<span>Problem Prompt:</span>
				<Input placeholder="x does not work" name="problem" bind:value={$form.problem} />
				<br /><br />
				<span>Description of the Problem:</span>
				<Textarea name="description" placeholder="well you see . . " bind:value={$form.description}
				></Textarea>
				<br /><br />
				<div class="grid grid-cols-1 gap-4">
					{#each $form.steps as _, step_id}
						<Card>
							<CardHeader>
								<Input
									type="text"
									placeholder="step 1 . . ."
									bind:value={$form.steps[step_id].step_title}
								/>
								<br />
								<Textarea
									rows={4}
									placeholder="lorem ipsulem"
									bind:value={$form.steps[step_id].step_text}
								></Textarea>
							</CardHeader>
						</Card>
					{/each}
				</div>
				<br />
				<br />

				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							class="m-2"
							type="submit"
							on:click={() => {
								toast.message('Uploading Problem . . . ');
							}}>Submit &nbsp;<Brain></Brain></Button
						>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Submits problem & solution to the DB</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</form>
			<div class=" float-right m-2 -mt-12 p-2">
				<Tooltip.Root>
					<Tooltip.Trigger>
						<Button
							variant="outline"
							class="h-12 w-12"
							on:click={() => {
								$form.steps.push({
									step_title: 'Step : ' + ($form.steps.length + 1),
									step_text: ''
								});
								$form = $form;
							}}
						>
							<PlusIcon></PlusIcon>
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Add another step</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</div>
	</CardContent>
</Card>
