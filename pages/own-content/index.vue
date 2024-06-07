<template>
  <main class="container mt-main mb-32">
    <SectionTitle subheading="Subheadings.CreateContent" heading="Headings.CreateContent" body="Body.CreateContent"
      center full />

    <section class="bg-secondary card style-card w-full grid xl:grid-cols-2 gap-card mt-12 mb-card">
      <article v-for="(option, i) of contentData" :key="option.type"
        class="bg-primary card style-card flex gap-1 gap-x-4 md:gap-x-5">

        <div class="bg-tertiary box style-box flex-shrink-0 row-span-2 h-fit">
          <component :is="option.icon" class="text-accent"
            :class="option.lg ? 'w-6 h-6 xl:w-7 xl:h-7' : 'w-5 h-5 xl:w-6 xl:h-6'" />
        </div>

        <div class="flex flex-col justify-between w-full h-full">
          <div>
            <h3 class="text-heading-3 flex gap-card self-center justify-between items-center">
              {{ t(`List.OwnContent.${i + 1}.Heading`) }}
            </h3>

            <p class="text-body-2 text-body col-span-2 sm:col-span-1">
              {{ t(`List.OwnContent.${i + 1}.Body`) }}
            </p>
          </div>

          <div class="flex items-end justify-end mt-4">
            <Chip color="bg-accent" :icon="TrophyIcon">
              {{ t(`List.OwnContent.${i + 1}.XpAmount`) }}
            </Chip>
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script lang="ts">
import {
  AcademicCapIcon,
  TrophyIcon,
  QuestionMarkCircleIcon,
  WrenchIcon,
} from '@heroicons/vue/24/outline';
import IconCoaching from '~/components/icon/Coaching.vue';
import { useI18n } from 'vue-i18n';

export default {
  head: {
    title: 'Create your own content',
  },
  components: {
    TrophyIcon,
  },
  setup() {
    const { t } = useI18n();

    let contentData = [
      {
        icon: QuestionMarkCircleIcon,
        type: 'quizzes',
      },
      {
        icon: WrenchIcon,
        type: 'challenges',
      },
      {
        icon: AcademicCapIcon,
        type: 'webinars',
      },
      {
        icon: IconCoaching,
        type: 'choachings',
      },
    ];

    return { contentData, t, TrophyIcon };
  },
};
</script>