<script>
	import NavigationBar from '$lib/components/custom/navigationBar.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../../app.pcss';
	import { Toaster } from '$lib/components/ui/sonner';
</script>

<ModeWatcher />
<Toaster />
<NavigationBar />
<slot></slot>

<!-- below is the code for the floating plus button -->
