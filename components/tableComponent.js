export const userCard = {
  name: 'userCard',
  template: `
   <table class="table table-bordered table-hover text-center">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Age</th>
          <th>Address</th>
          <th>Tags</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.key">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.age }}</td>
          <td>{{ user.address }}</td>
          <td>
            <span
              v-for="tag in user.tags"
              :key="tag"
              class="badge bg-info text-dark me-1"
            >
              {{ tag }}
            </span>
          </td>
          <td class=" d-flex justify-content-between align-items-center p-2">
            <p class=" text-danger p-0 m-0"  style="cursor: pointer" @click="deleteUser(user.key)">Delete</p>
            <p class="text-primary m-0 p-0" style="cursor: pointer" @click="() => editUser(user.key)"> Edit </p>

          </td>
        </tr>
      </tbody>
    </table>



        <div v-if="openModal"
      class="container col-md-6 p-3 border-0 rounded-xl shadow-lg modal-body"
    >
    <form @submit="submitEdit" >
  <input v-model="name" class="form-control mt-2" type="text" placeholder="Enter name" />
  <input v-model="age" class="form-control mt-2" type="number" placeholder="Enter age" />
  <input v-model="address" class="form-control mt-2" type="text" placeholder="Enter address" />
  <input v-model="tags" class="form-control mt-2" type="text" placeholder="Enter tags (comma separated)" />
  <button  type="submit" class="btn btn-success mt-2">Save Changes</button>
</form>

    </div>



    
  `,
  setup () {
    const { ref } = Vue

    const users = ref([
      {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
      },
      {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
      },
      {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher']
      }
    ])

    const name = ref('')
    const age = ref(0)
    const address = ref('')
    const tags = ref('')
    const editingKey = ref(null)
    const openModal = ref(false)

    const deleteUser = key => {
      users.value = users.value.filter(user => user.key !== key)
    }

    const editUser = key => {
      openModal.value = true
      const findUser = users.value.find(user => user.key == key)
      if (findUser) {
        name.value = findUser.name
        age.value = findUser.age
        address.value = findUser.address
        tags.value = findUser.tags.join(', ')
        editingKey.value = key
      }
    }

    const submitEdit = e => {
      e.preventDefault()
      const updatedUser = users.value.find(
        user => user.key === editingKey.value
      )
      openModal.value = false

      if (updatedUser) {
        updatedUser.name = name.value
        updatedUser.age = age.value
        updatedUser.address = address.value
        updatedUser.tags = tags.value.split(',').map(t => t.trim())
        editingKey.value = null
        name.value = ''
        age.value = 0
        address.value = ''
        tags.value = ''
      }
    }

    return {
      users,
      deleteUser,
      editUser,
      submitEdit,
      name,
      age,
      address,
      tags,
      openModal,
      editingKey
    }
  }
}
