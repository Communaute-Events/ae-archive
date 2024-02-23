declare type FileDropEvent = import('filedrop-svelte/event').FileDropEvent;
declare type FileDropSelectEvent = import('filedrop-svelte/event').FileDropSelectEvent;
declare type FileDropDragEvent = import('filedrop-svelte/event').FileDropDragEvent;
declare namespace svelteHTML {
  interface HTMLAttributes<T> {
      'on:filedrop'?: (
          event: CustomEvent<FileDropSelectEvent> & {
              target: EventTarget & T;
          }
      ) => void;
      // etc
  }
}