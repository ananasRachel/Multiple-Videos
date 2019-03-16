Component({
  properties: {
    video: {
      type: Object,
      default: {},
    },
    active: {
      type: Boolean,
      default: false,
      observer(newValue) {
        this.updatePlayer(newValue);
      },
    },
  },
  data: {
    player: null,
  },
  lifetimes: {
    ready() {
      this.setData({ player: wx.createVideoContext('video', this) });
      this.updatePlayer(this.data.active);
    },
  },
  methods: {
    updatePlayer(active) {
      setTimeout(() => {
        if (active) {
          this.data.player.play();
        } else {
          this.data.player.pause();
        }
      }, 150);  //部分安卓机点击播放按钮后，不会自动播放，需要延时150毫秒等待资源加载完毕
    },
    handleTap() {
      this.triggerEvent('active');
    },
  },
});
