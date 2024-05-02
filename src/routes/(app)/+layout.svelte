<script>
	import NavigationBar from '$lib/components/custom/navigationBar.svelte';
	import { PlusIcon } from 'lucide-svelte';
	import '../../app.pcss';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { navBarLinkSelected } from '../../stores';
</script>

<NavigationBar></NavigationBar>
<slot></slot>

<!-- below is the code for the floating plus button -->
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
