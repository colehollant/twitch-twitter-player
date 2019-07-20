<template>
  <div class="plup">
    <aside class="header">
      <h1>Plup</h1>
    </aside>
    <main class="body">
        <div class="twitter--wrapper">
            <a class="twitter-timeline"
                href="https://twitter.com/PG_Plup"
                data-chrome="transparent nofooter noheader noscrollbar"
                data-theme="dark"
                data-border-color="#444"
                >
                Tweets by @PG_Plup
            </a>
        </div>

        <div v-if="ow1.length==0" class="twitch">
            <h2>Offline</h2>
            <div style="display:flex; margin: auto;">
                <font-awesome-icon icon="backward" v-on:click="vodIndex = vodIndex<0? numVods:vodIndex-1"/>
                <h4 style="margin: 0 1rem 1rem; color: #ccc;">{{vodIndex+1}}/{{numVods+1}} recent vods</h4>
                <font-awesome-icon icon="forward" v-on:click="vodIndex = vodIndex>=numVods? 0:vodIndex+1"/>
            </div>
            <div class="twitch--preview" style="padding: 10px; border-radius: 16px; background-color: #000; margin-auto;">
                <iframe
                    v-bind:src="getVideo(vods[vodIndex])"
                    style="width: 100%; height: 100%;"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true">
                </iframe>
            </div>
        </div>
        <div v-else class="twitch">
            <div @click="navigate('https://www.twitch.tv/plup')" style="margin: auto;">
                <h2 @click="navigate('https://www.twitch.tv/plup')" style="cursor: pointer;">Online</h2>
                <h4 @click="navigate('https://www.twitch.tv/plup')" style="cursor: pointer;">{{game}}</h4>
            </div>
            <div class="twitch--preview" style="padding: 10px; border-radius: 16px; background-color: #000; margin-auto;">
                <iframe
                    src="https://player.twitch.tv/?channel=plup&muted=true"
                    style="width: 100%; height: 100%;"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true">
                </iframe>
            </div>
        </div>
    </main>
  </div>
</template>
  
<script>
import {HTTP} from './twitch-http.js'

export default {
  name: "about",
  data() {
      return {
          ow1: [],
          ow2: [],
          ow3: [],
          vods: [],
          game: null,
          boxarturl: null,
          vodIndex: 0,
          numVods: null
      };
  },
  methods: {
    navigate(str){
      window.open(str, '_blank');
    },
    getVideo(id){
        return `https://player.twitch.tv/?video=${id}&autoplay=true`;
    },
    getStream() {
      HTTP.get('helix/streams/metadata?user_login=plup')
      .then((response) => {
        this.ow1 = response.data.data;
        console.log(this.ow1);
        if(typeof this.ow1[0] === "undefined"){
            this.game = 'Unknown';
        } else {
            this.getGame(this.ow1[0].game_id);
        }
        this.getVod();
      }).catch((error) => { console.log(error); });
    },
    getVod() {
        HTTP.get(`kraken/channels/plup/videos?broadcast_type=archive`)
        .then((response) => {
        this.ow3 = response.data;
        for(let i = 0; i < this.ow3.videos.length; i++){
            this.vods.push(this.ow3.videos[i]._id);
        }
        this.numVods = this.vods.length;
        console.log(this.ow3);
      }).catch((error) => { console.log(error); });
    },
    getGame(id) {
      HTTP.get(`helix/games?id=${id}`)
      .then((response) => {
        this.ow2 = response.data.data;
        if(typeof this.ow2[0] === "undefined"){
            this.game = 'Unknown';
        } else {
            this.game = this.ow2[0].name;
            this.boxarturl = this.ow2[0].box_art_url.replace("{width}x{height}", "500x500");
        }
        console.log("GAME");
        console.log(this.game);
        console.log(this.ow2);
        
      }).catch((error) => { console.log(error); });
    }
  },
  mounted(){
      require('./twitter.js');
      this.getStream();
  }
};
</script>

<style scoped>
.plup{
    margin-bottom: 2rem;
}
::-webkit-scrollbar {
    height: 0px;
    width: 0px;
    background: transparent;
}

.header h1{
  font-size: 1.9rem;
  text-align: center;
  margin: 0 0 1rem;
}

.body{
    display: flex;
    flex-direction: column;
}

.body p{
  line-height: 1.35rem;
  font-size: 1.2rem;
  color: #d8d8d8;
}

.twitter--wrapper{
    background-color:#22222220; 
    max-width: 800px; 
    width: 90%; 
    height: 40vh; 
    margin: auto; 
    overflow-y: scroll; 
    border: 2px solid #444; 
    border-radius: 8px;
}
.twitch{
    display: flex;
    flex-direction: column;
    text-align: center;
    padding-bottom: 1.3rem;
    border: 2px solid #444;
    max-width: 800px; 
    max-height: 45vh;
    width: 90%;
    margin: 1rem auto; 
    border-radius: 8px;
}
.live--game{
  max-width: 40%;
  height: auto;
  margin: auto;
  display: block;
  border-radius: 16px;
}
.twitch--preview{
    height: 80%;
    width: 80%;
    margin: auto;
    border-radius: 16px;
    display: block;
}
.grow { 
    transition: all 0.6s cubic-bezier(.25,.8,.25,1);
}
.grow:hover { transform: scale(1.05); cursor: pointer;}

@media only screen and (min-width: 1000px) {
.about{
  max-width: 60vw;
  margin: auto;
}
.header h1{
  margin: 1.5rem 0 2.5rem;
}

.body{
    display: flex;
    flex-direction: row;
}

.twitch{
    justify-content: space-around;
    max-height: 70vh;
    height: auto;
}
.twitter--wrapper{
    height: 70vh;
}
.live--game{
  max-width: 55%;
}
}
</style>
