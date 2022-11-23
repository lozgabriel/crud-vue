<template>
  <section class="content-box bg-white mx-1">
    <Message :msg="msg" v-show="msg"/>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Nome Documento</th>
                <th scope="col">Formato Documento</th>
                <th scope="col">Opcionais</th>
                <th scope="col" class="text-center">Editar</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="doc in docs" :key="doc.id">
                <th scope="row">{{ doc.id }}</th>
                <td>{{ doc.nome }}</td>
                <td>{{ doc.docFormat}}</td>
                <td>
                    <ul>
                        <li v-for="(opcional, index) in doc.opcionais" :key="index">{{ opcional }}</li>
                    </ul>
                </td>
                <td>
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <select name="status" class="status form-select" @change="updateDoc($event, doc.id)">
                                <option disabled value="">Selecionar status</option>
                                <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="doc.status == s.tipo">
                                    {{s.tipo}}
                                </option>
                            </select>
                        </div>
                        <div class="col-auto">
                            <button class="btn btn-ld-default delete-btn" @click="deleteDoc(doc.id)">Deletar</button>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
  </section>
</template>

<script>
import Message from '../components/Message.vue';

export default {
    name: "Dashboard-App",
    components: {
        Message
    },
    data() {
        return {
            docs: null,
            docs_id: null,
            status: [],
            msg: null
        }
    },
    methods: {
        async getDocsCadastrados() {

            const req = await fetch("http://localhost:3000/docs");
            const data = await req.json();

            this.docs = data;

            //resgatar status
            this.getStatus();
        },

        async getStatus() {
            const req = await fetch("http://localhost:3000/status");
            const data = await req.json();

            this.status = data;
        },
        async deleteDoc(id) {
            const req = await fetch(`http://localhost:3000/docs/${id}`, {
                method: "DELETE"
            })

            const res = await req.json();

            //Colocar mensagem de sistema
            console.log(res);
            this.msg = `Documento deletado com sucesso!`
            setTimeout(() => this.msg = "", 3000)

            //Forçar atualização do sistema
            this.getDocsCadastrados();
        },
        async updateDoc(event, id) {

            const option = event.target.value;

            const dataJson = JSON.stringify({ status: option });

            const req = await fetch(`http://localhost:3000/docs/${id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: dataJson
            });

            const res = await req.json();

            //Colocar mensagem de sistema
            console.log(res);
            this.msg = `Documento ${res.id} foi atualizado para ${res.status}`
            setTimeout(() => this.msg = "", 3000)
        }
    },
    mounted() {
        this.getDocsCadastrados();
    }
}
</script>

<style>

</style>