<template>
  <div>
    <form @submit.prevent="editar ? updateLibro() : addLibro()">
      <p>
        <input type="text" v-model="titulo">
        <input type="text" v-model="autor">
        <button type="submit"> {{editar ? "Editar" : "Agregar"}} </button>
        <button v-if="editar" @click="editar = false; titulo=''; autor=''">Cancelar</button>
      </p>
    </form>

    Lista de libros:
    <p v-if="cargando">cargando</p>
    <div v-if="!cargando">
      
      <div v-for="libro in libros" :key="libro.id">
        {{libro.titulo}}, escrito por {{libro.autor}}.
        <button @click="deleteLibro(libro)">Eliminar elemento</button>
        <button @click="selectLibro(libro)">Editar elemento</button>
      </div>
      <br>
      
    </div>
  </div>
</template>

<script>
import {db} from '../firebase.js'
export default {
  name: 'DashboardLibros',
  data() {
    return {
      libros: [],
      id: "",
      titulo: "",
      autor: "",
      cargando: false,
      editar: false
    }
  },
  created() {
    this.fetchLibros();
  },
  methods: {
    async fetchLibros(){
      this.cargando = true;
      const data = await db.collection("libros").get();
      this.libros = data.docs.map(doc => ({
        id: doc.id, ...doc.data()
      }))
      this.cargando = false;
    },
    async addLibro(){
      await db.collection('libros').add(
        {
          titulo: this.titulo,
          autor: this.autor
        }
      )
      this.titulo = "";
      this.autor = "",
      this.fetchLibros();
    },
    
    async deleteLibro(libro){
      await db.collection('libros').doc(libro.id).delete();
      this.fetchLibros();
    },

    selectLibro(libro){
      this.editar = true;
      this.id = libro.id;
      this.titulo = libro.titulo;
      this.autor = libro.autor;
    },

    async updateLibro(){
      await db.collection('libros').doc(this.id).set({
        titulo: this.titulo,
        autor: this.autor
      })
      this.editar = false;
      this.id = "";
      this.titulo = "";
      this.autor = "";
      this.fetchLibros();
    }
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
