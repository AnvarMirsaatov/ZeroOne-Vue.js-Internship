import { userCard } from './components/tableComponent.js'
import { treeCollapse } from './components/TreeCollapse.js'

const { createApp, ref } = Vue

createApp({
  components: {
    userCard,
    treeCollapse
  },

  setup () {
    const firstTaskState = ref(true)
    const secondTaskState = ref(false)
    const thirdTaskState = ref(false)

    const firstTask = () => {
      firstTaskState.value = true
      secondTaskState.value = false
      thirdTaskState.value = false
    }
    const secondTask = () => {
      secondTaskState.value = true
      firstTaskState.value = false
      thirdTaskState.value = false
    }
    const thirdTask = () => {
      thirdTaskState.value = true
      secondTaskState.value = false
      firstTaskState.value = false
    }

    return {
      firstTaskState,
      secondTaskState,
      thirdTaskState,
      firstTask,
      secondTask,
      thirdTask
    }
  }
}).mount('#app')
