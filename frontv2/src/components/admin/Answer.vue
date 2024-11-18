<script setup lang="ts">
import {computed} from "vue";

const props = defineProps([
    'answerIndex',
    'questionIndex',
    'correctAnswerIndex',
    'answer'
])
const emit = defineEmits(['select-correct-answer', 'remove-answer', 'set-question'])

const response = computed({
  get: () => props.answer,
  set: (value) => emit('set-question', value, props.answerIndex),
})

const removeAnswer = (): void => {

  emit('remove-answer')
}

const selectCorrectAnswer = (): void => {
  emit('select-correct-answer', props.answerIndex)
}

const setQuestionValue = (): void => {
  emit('set-question', response.value, props.answerIndex)
}
</script>

<template>
  <div class="answer card">
    <div class="card-header">
      <label>Réponse {{ props.answerIndex + 1}}</label>
    </div>
    <input v-model="response" @input="setQuestionValue">
    <label class="correct">Bonne réponse</label>
    <input
        type="radio"
        :id="props.answerIndex"
        :value="props.questionIndex"
        :name="props.questionIndex"
        :checked="props.answerIndex === props.correctAnswerIndex"
        @change="selectCorrectAnswer"
    >
    <button @click="removeAnswer" class="deletion card-button">Supprimer réponse</button>
    <hr>
  </div>
</template>

<style scoped lang="scss">
.answer {
  display: flex;
  flex-direction: column;
  width: 40%;

  label.correct {
    font-size: 16px;
    text-align: center;
  }
  input {
    width: 60%;
  }

  input[type="radio"] {
    width: 30px;
    height: 30px;
    align-self: center;
    accent-color: #28536B;
    cursor: pointer;
  }
}
</style>