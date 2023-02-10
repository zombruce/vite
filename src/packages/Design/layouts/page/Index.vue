<template>
    <RouterView>
        <template #default="{ Component, route }">
            <transition
                :name="
                    getTransitionName({
                        route,
                        openCache,
                        enableTransition: getEnableTransition,
                        cacheTabs: getCaches,
                        def: getBasicTransition
                    })
                "
                mode="out-in"
                appear
            >
                <keep-alive v-if="openCache" :include="getCaches">
                    <component :is="Component" :key="route.fullPath" />
                </keep-alive>
                <div v-else>
                    <component :is="Component" :key="route.fullPath" />
                </div>
            </transition>
        </template>
    </RouterView>
</template>

<script lang="ts" setup>
    import { computed, unref } from 'vue'
    import { useMultipleTabSetting } from '@/hooks/Design/setting/useMultipleTabSetting'
    import { useRootSetting } from '@/hooks/Design/setting/useRootSetting'
    import { getTransitionName } from './transition'
    import { useTransitionSetting } from '@/hooks/Design/setting/useTransitionSetting'
    import { useMultipleTabStore } from '@/store/modules/multipleTab'

    const tabStore = useMultipleTabStore()
    const { getBasicTransition, getEnableTransition } = useTransitionSetting()
    const { getShowMultipleTab } = useMultipleTabSetting()
    const { getOpenKeepAlive } = useRootSetting()

    const openCache = computed(() => unref(getOpenKeepAlive) && unref(getShowMultipleTab))
    const getCaches = computed((): string[] => {
        if (!unref(getOpenKeepAlive)) {
            return []
        }
        return tabStore.getCachedTabList
    })
</script>

<style scoped lang="scss"></style>
