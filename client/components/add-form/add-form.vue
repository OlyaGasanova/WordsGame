<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <b-card>
        <b-modal id="modal1" title="Не удалось добавить слово ((("> <span style="color: red">{{reason}} </span></b-modal>


        <b-form-input
                v-model="wordEntry.word"
                type="text"
                placeholder="Новое слово"
                @change="setWordEntry()"
                :state="wordEntry.word.length ? 'success' : 'warning'"
        >

        </b-form-input>
        <small class="text-muted">Подходящее по правилам игры в слова</small>

        <br>
        <br>

        <b-form-input v-model="wordEntry.username" type="text" placeholder="Ник" :state="wordEntry.username.length?'success':'warning'"></b-form-input>
        <small class="text-muted">Ваш никнейм/имя</small>

        <br>
        <br>

        <b-form-input textarea v-model="wordEntry.comment" placeholder="Комментарий"></b-form-input>
        <small class="text-muted">Без нецензурной лексики</small>

        <br>
        <br>

        <b-button v-on:click="addWord">Добавить</b-button>


    </b-card>
</template>

<script>
    export default {
        data: function () {
            return {
                reason: "",
                badWords: ['член', 'чёрный', 'вагина']
             }
        },
        methods: {
            addWord () {
                let wordEntryCopy = Object.assign(this.wordEntry);
               if  (wordEntryCopy.comment.search(/член/)!=-1 || wordEntryCopy.comment.indexOf('черный')!=-1 || wordEntryCopy.comment.indexOf('вагина')!=-1 ||
                 wordEntryCopy.comment.indexOf('хуй')!=-1)
                {
                this.reason = "Атата";
                this.$root.$emit('show::modal','modal1');
                }
                else if
                (wordEntryCopy.word[0]==this.$store.getters.wordEntries.slice().reverse()[0].word[this.$store.getters.wordEntries.slice().reverse()[0].word.length-1])

                    {this.$store.dispatch('addWordEntry').then(() => {
                        this.$socket.emit( 'new word', wordEntryCopy)
                    },
                        (err) => {
                            this.reason = err.body;
                            this.$root.$emit('show::modal','modal1');

                        });
                    }
                    else {
                    this.reason = "Не удовлетворяет правилам";
                    this.$root.$emit('show::modal','modal1');
                    }
                console.log(wordEntryCopy);
                wordEntryCopy.comment.indexOf('член');

            },
            setWordEntry() {
                this.$store.dispatch('setNewWordEntry', this.wordEntry);
            },
        },
        computed: {
            wordEntry(){
                return this.$store.getters.newWordEntry
            }
        }
    }
</script>

<style>


</style>