<template>
  <div class="streamer" :key="componentKey">
    <aside class="header">
      <h1>{{streamerName}}</h1>
    </aside>
    <main class="body">
        <div class="twitter--wrapper">
            <Timeline v-bind:id="twitterHandle" :sourceType="'profile'" 
                :options="{ theme: 'dark', chrome: 'transparent nofooter noheader noscrollbar', borderColor: '#444'}"
            />
        </div>

        <div v-if="ow1 === null || ow1.length==0" class="twitch">
            <h2>Offline</h2>
            <div style="display:flex; margin: auto;">
                <font-awesome-icon icon="backward" v-on:click="vodIndex = vodIndex<0? numVods:vodIndex-1"/>
                <h4 style="margin: 0 1rem 1rem; color: #ccc;">{{vodIndex+1}}/{{numVods+1}} recent vods</h4>
                <font-awesome-icon icon="forward" v-on:click="vodIndex = vodIndex>=numVods? 0:vodIndex+1"/>
            </div>
            <div class="twitch--preview" style="padding: 10px; border-radius: 16px; background-color: #000; margin-auto;">
                <iframe
                    id="twitch1"
                    v-bind:src="getVideo(vods[vodIndex])"
                    style="width: 100%; height: 100%;"
                    frameborder="0"
                    scrolling="no"
                    allowfullscreen="true">
                </iframe>
            </div>
        </div>
        <div v-else class="twitch">
            <div @click="navigate(`https://www.twitch.tv/${twitchHandle}`)" style="margin: auto;">
                <h2 @click="navigate(`https://www.twitch.tv/${twitchHandle}`)" style="cursor: pointer;">Online</h2>
                <h4 @click="navigate(`https://www.twitch.tv/${twitchHandle}`)" style="cursor: pointer;">{{game}}</h4>
            </div>
            <div class="twitch--preview" style="padding: 10px; border-radius: 16px; background-color: #000; margin-auto;">
                <iframe
                    id="twitch2"
                    v-bind:src="`https://player.twitch.tv/?channel=${twitchHandle}&muted=true`"
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
function initData() {
    return {
        ow1: null,
        ow2: null,
        ow3: null,
        vods: [],
        game: null,
        boxarturl: null,
        vodIndex: 0,
        numVods: null,
        componentKey: 0,
    };
}
export default {
  name: "about",
  props: [
      'streamerName',
      'twitterHandle',
      'twitchHandle'
  ],
  data() {
      return initData();
  },
  methods: {
    navigate(str){
      window.open(str, '_blank');
    },
    getVideo(id){
        return `https://player.twitch.tv/?video=${id}&autoplay=true`;
    },
    getStream() {
      HTTP.get(`helix/streams/metadata?user_login=${this.twitchHandle}`)
      .then((response) => {
        this.ow1 = response.data.data;
        if(typeof this.ow1[0] === "undefined"){
            this.game = 'Unknown';
        } else {
            this.getGame(this.ow1[0].game_id);
        }
        this.getVod();
      }).catch((error) => { console.log(error); });
    },
    getVod() {
        HTTP.get(`kraken/channels/${this.twitchHandle}/videos?broadcast_type=archive`)
        .then((response) => {
        this.ow3 = response.data;
        for(let i = 0; i < this.ow3.videos.length; i++){
            this.vods.push(this.ow3.videos[i]._id);
        }
        this.numVods = this.vods.length;
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
      }).catch((error) => { console.log(error); });
    },
    forceRerender() {
        this.componentKey += 1;  
    },
    twitterStuff(){
        window.twttr = (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0], t = window.twttr || {};
        if (d.getElementById(id)){ 
            return t; 
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "https://platform.twitter.com/widgets.js";
        fjs.parentNode.insertBefore(js, fjs);

        t._e = [];
        t.ready = function(f) {
            t._e.push(f);
        };

        return t;
        }(document, "script", "twitter-wjs"));
    },
    twitterStuff2() {
        twttr.widgets.createTimeline(
        {
            sourceType: "profile",
            screenName: this.twitterHandle
        },
        document.getElementById("twitter-container"),
        {
            height: 400,
            chrome: "nofooter",
            linkColor: "#820bbb",
            borderColor: "#a80000"
        }
        );
    },
    resetStuff(){
        this.ow1= null;
        this.ow2= null;
        this.ow3= null;
        this.vods= [];
        this.game= null;
        this.boxarturl= null;
        this.vodIndex= 0;
        this.numVods= null;
    }
  },
  mounted(){
        this.twitterStuff();
        this.getStream();
  },
  watch: { 
      	streamerName: function(newVal, oldVal) {
            this.componentKey++;
            this.resetStuff();
            this.twitterStuff();
            this.getStream();
        }
      }
};
</script>

<style scoped>
.streamer{
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
