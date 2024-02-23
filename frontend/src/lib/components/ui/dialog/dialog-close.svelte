<script lang="ts">
	import { Dialog as DialogPrimitives } from 'bits-ui';

	type $$Props = DialogPrimitives.CloseProps;
</script>

<DialogPrimitives.Close {...$$restProps}>
	<slot />
</DialogPrimitives.Close>