export const treeCollapse = {
  name: 'treeCollapse',
  template: `
    <div class="row d-flex flex-column">
      <div 
        v-for="(item, index) in treeData" 
        :key="index" 
        class="col-5 border p-3 rounded"
      >
        <h5 
          class="fw-bold" 
          @click="toggleParent(index)"
          style="cursor: pointer"
        >
          {{ item.title }}
        </h5>

        <ul v-if="parent[index]" class="ps-3">
          <li 
            v-for="(child, i) in item.children" 
            :key="i" 
            @click.stop="toggleChild(index, i)"
            class="fw-medium"
            style="cursor: pointer"
          >
            {{ child.title }}

            <ul v-if="childItems[\`\${index}-\${i}\`]" class="ps-3">
              <li 
                v-for="(sub, j) in child.children" 
                :key="j" 
                class="text-muted"
              >
                {{ sub.title }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  `,
  setup () {
    const { ref } = Vue

    const treeData = ref([
      {
        title: 'Models',
        children: [
          {
            title: 'Data warehouse',
            children: [
              { title: 'Report samples' },
              { title: 'Sales performance' }
            ]
          }
        ]
      },
      {
        title: 'Statistics',
        children: [
          {
            title: 'Data warehouse',
            children: [
              { title: 'Report samples' },
              { title: 'Sales performance' }
            ]
          }
        ]
      }
    ])

    const parent = ref({})
    const childItems = ref({})

    const toggleParent = index => {
      parent.value[index] = !parent.value[index]
    }

    const toggleChild = (parentIndex, childIndex) => {
      const key = `${parentIndex}-${childIndex}`
      childItems.value[key] = !childItems.value[key]
    }

    return {
      treeData,
      parent,
      childItems,
      toggleParent,
      toggleChild
    }
  }
}
