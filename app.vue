<script setup>
// Favicon préfixé par le baseURL (sinon 404 quand le site est en sous-dossier)
useHead({ link: [{ rel: 'icon', href: asset('/favicon.ico') }] })
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
