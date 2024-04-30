<script lang="ts">
	import { navBarLinkSelected } from '../../../stores';

	export let id: number;
	export let link: string;
</script>

{#if $navBarLinkSelected == id}
	<a
		href={link}
		class="text-foreground transition-colors hover:text-foreground"
		on:click={() => {
			$navBarLinkSelected = id;
		}}
	>
		<slot></slot>
	</a>
{:else}
	<a
		href={link}
		class="text-muted-foreground transition-colors hover:text-foreground"
		on:click={() => {
			$navBarLinkSelected = id;
		}}
	>
		<slot></slot>
	</a>
{/if}
