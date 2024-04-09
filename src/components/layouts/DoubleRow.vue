<template>
    <div class="flex w-full">
        <div class="grid h-20 flex-grow card rounded-box place-items-center">
            <slot name="first" />
        </div>
        <div class="grid h-20 flex-grow card rounded-box place-items-center">
            <slot name="second" />
        </div>
    </div>
</template>
