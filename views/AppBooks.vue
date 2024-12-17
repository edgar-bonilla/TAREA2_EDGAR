<template>
  <div class="container py-4">
    <br><br><br>
    <h1 class="title mb-4">Books</h1>

    <div v-if="showTab === 'table'">
      <div class="d-flex justify-content-end">
        <button class="btn btn-success mb-4" @click="showCreateForm">Create Book</button>
      </div>

      <div class="table-container mb-5">
        <table class="table table-bordered table-hover">
          <thead class="table-dark">
            <tr>
              <th class="text-danger">ID</th>
              <th>Title</th>
              <th>Edition</th>
              <th>Copyright</th>
              <th>Language</th>
              <th>Pages</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="book in books" :key="book.id">
              <td>{{ book.id }}</td>
              <td>{{ book.title }}</td>
              <td>{{ book.edition }}</td>
              <td>{{ book.copyright }}</td>
              <td>{{ book.language }}</td>
              <td>{{ book.pages }}</td>
              <td>{{ book.author }}</td>
              <td>{{ book.publisher }}</td>
              <td class="action-buttons">
                <div class="d-flex ">
                  <button class="btn btn-warning btn-sm" @click="editBook(book)">Edit</button>
                  <button class="btn btn-danger btn-sm" @click="deleteBook(book)">Delete</button>
                </div>
              </td>

            </tr>
          </tbody>
        </table>
      </div>
      <br><br><br> <br><br><br>
    </div>
    <br><br><br>
    <!-- Tab for creating a book -->
    <div v-if="showTab === 'create'">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Create Book</h1>

            <!-- Formulario para crear libro -->
            <form @submit.prevent="createBook" class="needs-validation" novalidate>
              <div class="mb-3 row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newBook.title" id="title" class="form-control" placeholder="Enter title"
                    required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="edition" class="col-sm-2 col-form-label">Edition</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newBook.edition" id="edition" class="form-control"
                    placeholder="Enter edition" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="copyright" class="col-sm-2 col-form-label">Copyright</label>
                <div class="col-sm-7">
                  <input type="number" v-model="newBook.copyright" id="copyright" class="form-control"
                    placeholder="Enter copyright year" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="language" class="col-sm-2 col-form-label">Language</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newBook.language" id="language" class="form-control"
                    placeholder="Enter language" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="pages" class="col-sm-2 col-form-label">Pages</label>
                <div class="col-sm-7">
                  <input type="number" v-model="newBook.pages" id="pages" class="form-control"
                    placeholder="Enter number of pages" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="author" class="col-sm-2 col-form-label">Author</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newBook.author" id="author" class="form-control"
                    placeholder="Enter author" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="publisher" class="col-sm-2 col-form-label">Publisher</label>
                <div class="col-sm-7">
                  <input type="text" v-model="newBook.publisher" id="publisher" class="form-control"
                    placeholder="Enter publisher" required />
                </div>
              </div>
              <div class="d-flex">
                <button type="submit" class="btn btn-primary">Create</button>
                <button type="button" class="btn btn-secondary" @click="cancelCreate">Cancel</button>
                <br><br>
              </div>
            </form>
            <br><br><br>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showTab === 'edit' && editingBook">
      <div class="container py-4 d-flex justify-content-center">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h1 class="title mb-4">Edit Book</h1>
            <form @submit.prevent="updateBook" class="needs-validation" novalidate>
              <div class="mb-3 row">
                <label for="title" class="col-sm-2 col-form-label">Title</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingBook.title" id="title" class="form-control"
                    placeholder="Enter title" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="edition" class="col-sm-2 col-form-label">Edition</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingBook.edition" id="edition" class="form-control"
                    placeholder="Enter edition" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="copyright" class="col-sm-2 col-form-label">Copyright</label>
                <div class="col-sm-7">
                  <input type="number" v-model="editingBook.copyright" id="copyright" class="form-control"
                    placeholder="Enter copyright year" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="language" class="col-sm-2 col-form-label">Language</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingBook.language" id="language" class="form-control"
                    placeholder="Enter language" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="pages" class="col-sm-2 col-form-label">Pages</label>
                <div class="col-sm-7">
                  <input type="number" v-model="editingBook.pages" id="pages" class="form-control"
                    placeholder="Enter number of pages" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="author" class="col-sm-2 col-form-label">Author</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingBook.author" id="author" class="form-control"
                    placeholder="Enter author" required />
                </div>
              </div>
              <div class="mb-3 row">
                <label for="publisher" class="col-sm-2 col-form-label">Publisher</label>
                <div class="col-sm-7">
                  <input type="text" v-model="editingBook.publisher" id="publisher" class="form-control"
                    placeholder="Enter publisher" required />
                </div>
              </div>
              <div class="d-flex">
                <button type="submit" class="btn btn-primary">Update</button>
                <button type="button" class="btn btn-secondary" @click="cancelEdit">Cancel</button>
              </div>
            </form>
            <br><br><br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [],
      newBook: {
        title: '',
        edition: '',
        copyright: '',
        language: '',
        pages: '',
        author: '',
        publisher: '',
      },
      editingBook: null,
      showTab: 'table',
    };
  },
  async mounted() {
    const response = await fetch('/.netlify/functions/books');
    this.books = await response.json();
  },
  methods: {
    showCreateForm() {
      this.showTab = 'create';
    },
    cancelCreate() {
      this.showTab = 'table';
    },
    async createBook() {
      const response = await fetch('/.netlify/functions/books', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.newBook),
      });

      const newBook = await response.json();
      this.books.push(newBook);
      this.newBook = {
        title: '',
        edition: '',
        copyright: '',
        language: '',
        pages: '',
        author: '',
        publisher: '',
      };
      this.showTab = 'table';
    },
    async editBook(book) {
      this.editingBook = { ...book };
      this.showTab = 'edit';
    },
    cancelEdit() {
      this.showTab = 'table';
      this.editingBook = null;
    },
    async updateBook() {
      const response = await fetch(`/books/${this.editingBook.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.editingBook),
      });
      const updatedBook = await response.json();
      const index = this.books.findIndex((b) => b.id === updatedBook.id);
      this.books.splice(index, 1, updatedBook);
      this.showTab = 'table';
    },
    async deleteBook(book) {
      const response = await fetch(`/books/${book.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const index = this.books.findIndex((b) => b.id === book.id);
        this.books.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
.table-container {
  max-height: 80vh;
  overflow-y: auto;
}

.table {
  width: 100%;
  table-layout: fixed;
}

.action-buttons button {
  margin-right: 10px;
}
</style>
