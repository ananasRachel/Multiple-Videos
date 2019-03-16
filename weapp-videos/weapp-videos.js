Component({
  data: { videoActive: false, currentActive: null },
  methods: {
    handleVideoActive(evt) {
      const { videonum } = evt.currentTarget.dataset;
      this.setData({ videoActive: true, currentActive: videonum });
    },
  },
});
