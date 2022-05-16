// import('/src/bugs.js');
var randomImg = function(width, height) {return "http://picsum.photos/" + width + "/" + height + "/?image=" + Math.floor(Math.random()*1000);};
var projectObj = [
  {
    id: 0,
    selected: false,
    title: "ABOUT",
  },
  {
    id: 1,
    selected: false,
    title: "CONTACT",
  },
  // {
  //   id: 2,
  //   selected: false,
  //   title: "PHOTOS",
  // },
  {
    id: 2,
    selected: false,
    title: "PROJECTS",
    projectList: [
      {
        title: "PRODIGAL PICTURES",
        image: "/img/projects/prodigalpictures.jpg",
        desc: "Prodigal Pictures, a motion graphic design studio, requested a website from the ground up. It features an animated home-page intro and many other custom animations/transitions. Worked closely with their lead designer to get the look and feel just right. Built with <b>PHP</b> and the <b>Bootstrap</b> framework.",
        link: "http://prodigalpictures.com"
      },
      {
        title: "CUBESHARK",
        image: "/img/projects/cubeshark.jpg",
        desc: "Kyley's musical alias. Built to showcase audio production work. Made use of the limited embedded player API to play the music. Built on top of <b>VueJS</b>.",
        link: "#"
      },
      // {
      //   title: "JOY FOR THIS JOURNEY",
      //   image: "/img/projects/joyforthisjourney.jpg",
      //   desc: "Build for a life-coaching client. This was a basic informational website for my client's business. No longer in production. Built using the <b>Laravel</b> framework alongside <b>PHP</b>.",
      //   link: null
      // },
      {
        title: "CLEMMER GL",
        image: "/img/projects/clemmergl.jpg",
        desc: "Built for software development client. A site for a single software product called Clemmer GL. Worked with a lead visual designer to bring their visual design ideas into a functional website. Built with a <b>Bootstrap</b> frame.",
        link: "http://clemmergl.com"
      },
      // {
      //   title: "WEST BEACH MOSAICS",
      //   image: "/img/projects/westbeachmosaics.jpg",
      //   desc: "A simple informational website/logo package set up for a local artist gift-shop and mosaics small business. Uses the <b>Bootstrap</b> framework.",
      //   link: "http://westbeachmosaics.com"
      // },
      {
        title: "RANSOM NOTE GENERATOR",
        image: "/img/projects/ransomnote.jpg",
        desc: "A fun project made while learning <b>VueJS</b>. Letter styles are randomly assigned as you type. You can send notes to your friends using REST-ful programmatic URL generation.",
        link: "http://kyount.github.io/RandomRansom/"
      },
      // {
      //   title: "GOODBYE PATCHES",
      //   image: "/img/projects/goodbyepatches.jpg",
      //   desc: "A fun web toy I made based on the popular card game Hearthstone emulating animations and sounds from the game. Warning: might be loud.",
      //   link: "http://kyount.github.com/goodbyepatches"
      // }
    ]
  }
];
var colors = [
  {
    name: "default",
    light: '#FFD8B5',
    neutral: '#FF4366',
    dark: '#1C0C80',
    bg: '#3c373e',
  },
  {
    name: "nostalgia",
    light: '#c6dec0',
    neutral: '#8acd94',
    dark: '#63a088',
    bg: '#202d31',
  },
  {
    name: "fancy",
    light: '#F4F1BB',
    neutral: '#ED6A5A',
    dark: '#9BC1BC',
    bg: '#273133',
  },
  {
    name: "blueberry",
    light: '#d1effb',
    neutral: '#97bcea',
    dark: '#4039a5',
    bg: '#192f4a',
  },
  {
    name: "sandy",
    light: '#05668D',
    neutral: '#028090',
    dark: '#034c69',
    bg: '#F0F3BD',
  },
  {
    name: "Bus",
    light: '#E8EDDF',
    neutral: '#F5CB5C',
    dark: '#333533',
    bg: '#242423',
  },
  {
    name: "Lavender",
    light: '#F4F1DE',
    neutral: '#F2CC8F',
    dark: '#81B29A',
    bg: '#3D405B',
  }
]

var slider; //slider variable

var vm = new Vue({
  el: '#app',
  data: {
    aboutBox: false,
    contactBox: false,
    isProjectShowing: false,
    isInfoShowing: false,
    activeProject: -1,
    projects: projectObj,
    projectList: projectObj[2].projectList,
    colorList: colors,
    themeMenuActive: false,
    activeTheme: 0
  },
  computed: {
    isMobileDevice: function() {
      return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
    }
  },
  methods: {
    randomPhoto: function(width, height) {
      return "http://picsum.photos/" + width + "/" + height + "/?image=" + Math.floor(Math.random()*1000);
    },
    toggleThemeMenu: function() {
      this.themeMenuActive = !this.themeMenuActive;
    },
    showAbout: function() {
      this.hideContact();
      this.aboutBox = true;
    },
    hideAbout: function() {
      this.aboutBox = false;
    },
    showContact: function() {
      this.hideAbout();
      this.contactBox = true;
    },
    hideContact: function() {
      this.contactBox = false;
    },
    showProject: function(project) {
      this.activeProject = project.id;
      this.isProjectShowing = true;
    },
    hideProject: function() {
      this.activeProject = -1;
      this.isProjectShowing = false;
      window.scrollTo(0, 0);
    },
    computeBG: function(image) {
      return "background-image: url(" + image + ")";
    },
    changeTheme: function(index) {
      var elm = document.getElementsByTagName('html')[0];
      elm.style.cssText = '--bgcolor:' + this.colorList[index].bg
      + ';--lightcolor:' + this.colorList[index].light
      + ';--darkcolor:' + this.colorList[index].dark
      + ';--neutralcolor:' + this.colorList[index].neutral + ';';
      document.querySelector("meta[name=theme-color]").setAttribute("content", this.colorList[index].bg);
      this.activeTheme = index;
    }
  },
  mounted: function() {
    document.getElementById('fadeIn')
    .velocity({opacity:0}, {duration: 1000})
    .velocity({display:'none'}, {duration: 0});

  }
});
