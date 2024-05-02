<script lang="ts">
	import { navBarLinkSelected } from '../../../stores';

	export let link: string;
</script>

{#if $navBarLinkSelected == link}
	<a
		href={link}
		class="text-foreground transition-colors hover:text-foreground"
		on:click={() => {
			$navBarLinkSelected = link;
		}}
	>
		<slot></slot>
	</a>
{:else}
	<a
		href={link}
		class="text-muted-foreground transition-colors hover:text-foreground"
		on:click={() => {
			$navBarLinkSelected = link;
		}}
	>
		<slot></slot>
	</a>
{/if}
