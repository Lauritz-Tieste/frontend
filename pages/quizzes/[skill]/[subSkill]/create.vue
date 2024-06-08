<template>
  <section
    class="grid-auto gap-card container h-screen-inner min pb-container pt-container grid-rows-[auto_auto_1fr] grid place-items-center">
    <section class="flex gap-3 items-center justify-end mb-3">
      <InputButtonToggle v-model="selectedTab" :mobile-responsive="false" :buttonOptions="toggleButtonOptions"
        smInMobile />
    </section>
    <section class="max-w-4xl w-full">
      <div class="flex justify-center">
        <div class="max-w-xl">
          <h4 class="text-heading-4 text-center mb-2 text-accent font-bold" v-if="lectureName">
            {{ $t("Headings.CreateForLecture",
              {
                "placeholder": selectedTab == 0 ?
                  $t("Headings.QuizQuestions") :
                  selectedTab == 1
                    ? $t("Headings.Matchings")
                    : $t("Headings.Challenges")
              }) }}
          </h4>
          <h2 class="text-heading-2 text-center mb-4" v-if="lectureName">
            {{ lectureName }}
          </h2>
          <p v-if="!user?.admin" class="text-warning text-center mb-12">
            {{ t("Body.OnlySeeContentCreatedYourself") }}
          </p>
          <div v-else class="mb-12" />
        </div>
      </div>
      <section v-if="selectedTab == 0" class="container-form max-w-4xl">
        <QuizSubTaskListEditable :quizzes="quizzes" :taskId="quizId" />
      </section>
      <section v-if="selectedTab == 1" class="container-form max-w-4xl">
        <LazyMatchingEditableList :matchings="myMatchings" :taskId="quizId" />
      </section>
      <section v-if="selectedTab == 2" class="container-form max-w-4xl">
        <LazyCodingChallengeEditableList :challengeId="quizId" :codingChallenges="codingChallenges" />
      </section>
    </section>
  </section>
</template>

<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import { getSubTasksInQuiz, useSubTasksInQuiz } from "~~/composables/quizzes";
definePageMeta({
  layout: "inner",
  middleware: ["auth"],
});

const { t } = useI18n();
const route = useRoute();
const sectionId = ref();
const courseId = ref();
const lectureId = ref();
const level: any = ref(0);
const quizId = ref();
const loading = ref(true);
const selectedTab = ref(0);
const user: any = useUser();
const quizzes = useSubTasksInQuiz();
const myMatchings = useMyMatchings();
const codingChallenges = useAllCodingChallengesInATask();
const course = useCourse();

const toggleButtonOptions = [
  {
    name: "Headings.Quizzes",
  },
  {
    name: "Headings.Matchings",
  },
  {
    name: "Headings.Challenges",
  },
];

const lectureName = computed(() => {
  return course.value.sections?.find((section) => section.id === sectionId.value)?.lectures?.find((lecture) => lecture.id === lectureId.value)?.title;
});

watch(
  () => selectedTab.value,
  (newValue, oldValue) => {
    if (!!!user.value.admin && level.value < 20 && selectedTab.value == 2) {
      openSnackbar("info", "Error.Level20RequiredForCreatingCodingChallenge");
      setTimeout(() => {
        selectedTab.value = oldValue;
      }, 0);
    }
  }
);

watch(
  () => route,
  (newValue, oldValue) => {
    courseId.value = (newValue.query?.course ?? "").toString();
    lectureId.value = (newValue.query?.lecture ?? "").toString();
    sectionId.value = (newValue.query?.section ?? "").toString();
    level.value = (newValue.query?.level ?? "").toString();
  },
  { immediate: true, deep: true }
);

onMounted(async () => {
  loading.value = true;
  const [success, error] = await createQuiz(courseId.value, {
    section_id: sectionId.value,
    lecture_id: lectureId.value,
  });
  if (success) quizId.value = success?.id ?? "";
  else {
    openSnackbar("error", error.data.detail);
  }

  await getSubTasksInQuiz(quizId.value, user?.value.admin ? undefined : user?.value.id);
  await getAllCodingChallengesInATask(quizId.value, user?.value.admin ? undefined : user?.value.id);
  await getMyMatchingsInTask(quizId.value, user?.value.admin ? undefined : user?.value.id);
  await getCourseByID(courseId.value);
  loading.value = false;
});
</script>

<style scoped></style>
