<template>
  <section class="content-box bg-white mx-1">
    <Message :msg="msg" v-show="msg"/>
    <p>Cadastro de usuário:</p>
    <form id="doc-form" @submit="setDocs">
      <div class="mb-3">
        <label for="first_name" class="form-label">Nome</label>
        <input type="text" class="form-control" id="first_name" name="first_name" v-model="first_name">
      </div>

      <div class="mb-3">
        <label for="last_name" class="form-label">Sobrenome</label>
        <input type="text" class="form-control" id="last_name" name="last_name" v-model="last_name">
      </div>

      <div class="mb-3">
        <label for="docFormat" class="form-label">Formato Documento</label>
        <select name="docFormat" id="docFormat" v-model="docFormat" class="form-select">
          <option v-for="docFormat in docFormats" :key="docFormat.id" :value="docFormat.tipo" :selected="docFormat.tipo">
            {{ docFormat.tipo }}
          </option>
        </select>
      </div>

      <div class="mb-1 form-check" v-for="opcional in opcionaisData" :key="opcional.id">
        <div class="col-auto">
          <input type="checkbox" name="opcionais" class="form-check-input" id="opcionais" v-model="opcionais" :value="opcional.tipo">
          <label class="form-check-label" for="opcionais"> {{ opcional.tipo }}</label>
        </div>
      </div>

      <div class="text-center">
        <button type="submit" class="btn btn-ld-default">Enviar</button>
      </div>

    </form>
  </section>
</template>

<script>
import Message from '../components/Message.vue';

export default {
  name: "SetUsers-App",
  components: {
    Message
  },
  data() {
    return {
      nomes: null,
      docFormats: null,
      first_name: null,
      docFormat: null,
      opcionaisData: null,
      opcionais: [],
      msg: null
    };
  },
  methods: {
    async getDocs() {

      const req = await fetch("http://localhost:3000/documentos");
      const data = await req.json();

      this.nomes = data.nomes
      this.docFormats = data.docFormats
      this.opcionaisData = data.opcionaisData
    },

    async setDocs(e) {
      e.preventDefault();
      
      const data = {
        first_name: this.first_name,
        docFormat: this.docFormat,
        opcionais: Array.from(this.opcionais),
        status: "Enviado"
      }

      const dataJson = JSON.stringify(data);

      const req = await fetch("http://localhost:3000/docs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: dataJson
      });

      const res = await req.json();

      //Colocar mensagem de sistema
      this.msg = `Documento ${res.first_name} cadastrado com sucesso!`
      setTimeout(() => this.msg = "", 3000)
      //Limpar os campos
      this.first_name = "",
      this.docFormat = "",
      this.opcionais = ""
    }
  },
  mounted() {
    this.getDocs()
  }
};
</script>

<style lang="less" scoped></style>
