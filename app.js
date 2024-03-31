// Get UI 

// musictitle 

const getplaylist = document.querySelector('#playlist'),
getbuttons = document.querySelectorAll('button');

// darkmode 
getdarkmode = document.querySelector('#darkmode'),
getnav = document.querySelector('nav'),
getinterface = document.querySelector('#interface'),
getlabel = document.querySelector('#darkmodelabel'),
getmusicard = document.querySelector('.musiccard'),

// audio 
getaudioscreen = document.querySelector('#audioscreen'),

// music photo 
getmusicphoto = document.querySelector('#musicphoto'),
getmusicname = document.querySelector('#musicname'),
getartist = document.querySelector('#artist'),

// show song duration 
getssd = document.querySelector('#ssd'),
getsongtime = document.querySelector('#songtime'),

// range
getprogress = document.querySelector('#progress'),
getprogressbar = document.querySelector('#progress-bar'),

// control 
getshuffle = document.querySelector('#shuffle'),
getprevsong = document.querySelector('#previoussong'),
getprev = document.querySelector('#previous'),
getplay = document.querySelector('#play'),
getnext = document.querySelector('#next'),
getnextsong = document.querySelector('#nextsong'),
getstop = document.querySelector('#stop'),
getvolumedown = document.querySelector('#volumedown'),
getvolumeup = document.querySelector('#volumeup'),
getmute = document.querySelector('#mute'),
getvolumerange = document.querySelector('#volumerange'),

// variable 
songnames = ["lonely","memories","anglebaby","rewritethestar","nightchanges","seeyouagain","beautifulinwhite","itsyou","8letter","allfalldown","ghost"],
titles = ["Lonely","Memories","Angle Baby","Rewrite The Star","Night Changes","See You Again","Beautiful In White","Its You","8 Letter","All Fall Down","Ghost"],
artists = ["Akon","Maroon-5","Troye Sivan","Anne Marie & James","One Direction","Wiz Khalifa Ft Chaplie Puth","Shame Filan","Ali Gate","Why Don't We","Alan Walker","Justin Bieber"];


// for audio 
let curridx = 0;

function loadaudio(audio){
    let idx = songnames.indexOf(audio)
    getaudioscreen.src = `./music/${audio}.mp3`;
    getmusicphoto.src = `./img/${audio}.jpg`;
    getmusicname.innerText= titles[idx];
    getartist.innerText = artists[idx];
}

// playlist section 

songnames.forEach(function(songname,idx){

    const newbtn = document.createElement("a");
    newbtn.id = songname;
    newbtn.className = "dropdown-item";
    newbtn.innerText = titles[idx];
    getplaylist.appendChild(newbtn);

    newbtn.addEventListener('click',playlistsong);
});

function playlistsong(){
    loadaudio(this.id);
    playsong();
}

// for darkmode 
function darkmode(){
     
    getnav.classList.remove('bg-primary');
    getnav.classList.add('bg-dark');

    getinterface.classList.add('bg-secondary');

    getmusicard.classList.remove('light');
    getmusicard.classList.add('dark');

    getssd.classList.remove('text-primary');
    getssd.classList.add('text-light');

    getprogressbar.classList.remove('bg-primary');
    getprogressbar.classList.add('bg-dark');

    getbuttons.forEach(function(getbutton){
        getbutton.classList.remove('btn-outline-primary');
        getbutton.classList.add('btn-outline-light');
    });


    getlabel.innerText = "Dark-mode";
    getdarkmode.value = "0"

}

function lightmode(){
     
    getnav.classList.remove('bg-dark');
    getnav.classList.add('bg-primary');

    getinterface.classList.remove('bg-secondary');

    getmusicard.classList.add('light');
    getmusicard.classList.remove('dark');

    getssd.classList.add('text-primary');
    getssd.classList.remove('text-light');

    getprogressbar.classList.add('bg-primary');
    getprogressbar.classList.remove('bg-dark');

    getbuttons.forEach(function(getbutton){
        getbutton.classList.add('btn-outline-primary');
        getbutton.classList.remove('btn-outline-light');
    });

    getlabel.innerText = "Light-mode";
    getdarkmode.value = "1";

}

function darkmodeorlightmode(){
    if(getdarkmode.value == "1"){
        darkmode();
    }else{
        lightmode();
    }
}

// range section 

function updateprogress(e){
    const {duration}=e.target;
    const {currentTime}= e.target;

    if(currentTime === 0){
        getprogressbar.style.width = "0";

    } else {
        const getprogresspercent = (currentTime/duration)*100;

        getprogressbar.style.width = `${getprogresspercent}%`;
    }

    const mins = Math.floor((currentTime)/60);
    const secs = Math.floor((currentTime)%60);

    const minutevalue = mins.toString().padStart(2,'0');
    const secondvalue = secs.toString().padStart(2,'0');

    getsongtime.innerText = `${minutevalue}:${secondvalue}`;

    if(currentTime >= duration){
        nextsong();
    }

}

function progressaudioclick(e){
    const width = this.clientWidth;

    const clickx= e.offsetX;

    const getduration = getaudioscreen.duration;

    getaudioscreen.currentTime = (clickx/width) * getduration;

}


// control section 

// for prev song 
function prevsong(){
    curridx--;
    if(curridx < 0){
        curridx = songnames.length-1;
    }

    loadaudio(songnames[curridx]);
    playsong();
}

// for prev 

function prev(){
    if(getaudioscreen.currentTime!= 0){
        getaudioscreen.currentTime -= 2; 
    }
    
}

// for play 
function playsong(){
    getplay.querySelector('i.fas').classList.remove('fa-play');
    getplay.querySelector('i.fas').classList.add('fa-pause');
    
    getaudioscreen.play();
}

function pausesong(){
    getplay.querySelector('i.fas').classList.remove('fa-pause');
    getplay.querySelector('i.fas').classList.add('fa-play');
    
    getaudioscreen.pause();
}

function playorpausesong(){
    if(getaudioscreen.paused){
        playsong();
    }else{
        pausesong();
    }
}

// for next 
function next(){
    if(getaudioscreen.currentTime != getaudioscreen.duration){
        getaudioscreen.currentTime += 2; 
    }
}

// for next song 
function nextsong(){
    curridx++;
    if(curridx > songnames.length-1){
        curridx = 0;
    }

    loadaudio(songnames[curridx]);
    playsong();
}

// for stop 

function stopsong(){
    getaudioscreen.currentTime = 0;
    pausesong();
}

// for shuffle
function shufflesong(){
    let rdmnum;
    do{
        rdmnum = Math.floor(((Math.random()*songnames.length-1)+1));
    }while(rdmnum==curridx);

    curridx = rdmnum;

    loadaudio(songnames[curridx]);
    playsong();
}

// for volume down 
function voldown(){
    let getrangevalue = +getvolumerange.value;
   
    if(getrangevalue != 0){
        getrangevalue -= 10;
    }

    getvolumerange.value = `${getrangevalue}`;
    volumecontrol();
}

// for volume range 
function volumecontrol(){
    getaudioscreen.volume = getvolumerange.value/100;

    if(getaudioscreen.volume == 0){
        getmute.querySelector('i.fas').classList.remove('fa-volume-up');
        getmute.querySelector('i.fas').classList.add('fa-volume-mute');
    }else{
        getmute.querySelector('i.fas').classList.remove('fa-volume-mute');
        getmute.querySelector('i.fas').classList.add('fa-volume-up');
    }

}


// for volume up 
function volup(){
    let getrangevalue = +getvolumerange.value;
   
    if(getrangevalue != 100){
        getrangevalue += 10;
    }

    getvolumerange.value = `${getrangevalue}`;
    volumecontrol();
}


// for mute 
function mutesong(){
    getvolumerange.value = "0";
    volumecontrol();
}

function unmutesong(){
    getvolumerange.value = "100";
    volumecontrol();
}


function muteorunmutesong(){
    if(getaudioscreen.volume == 0){
        unmutesong();
    }else{
        mutesong();
    }
}

// for darkmode 
getdarkmode.addEventListener('change',darkmodeorlightmode);

// for range 
getaudioscreen.addEventListener('timeupdate',updateprogress);
getprogress.addEventListener('click',progressaudioclick);

// for control 
getshuffle.addEventListener('click',shufflesong);
getplay.addEventListener('click',playorpausesong);
getnextsong.addEventListener('click',nextsong);
getprevsong.addEventListener('click',prevsong);
getprev.addEventListener('click',prev);
getnext.addEventListener('click',next);
getstop.addEventListener('click',stopsong);
getvolumedown.addEventListener('click',voldown);
getvolumeup.addEventListener('click',volup);
getvolumerange.addEventListener('change',volumecontrol);
getmute.addEventListener('click',muteorunmutesong);

