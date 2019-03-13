constructor(props) {
  super(props);
  this.videoRef = React.createRef();
}

state = {
  currentVideo: null,
};

componentDidUpdate(prevProps, prevState) {
  if (prevState.currentVideo !== this.state.currentVideo) {
    const videoRef = this.videoRef.current;
    videoRef.play();
  }
}

handleVideoPlay = evt => {
  const node = evt.currentTarget;
  const videonum = node.dataset.videonum;

  this.setState({
    currentVideo: videonum,
  });
};

render() {
  const { currentVideo } = this.state;
  const { details } = this.props;

  return (
    {(details || []).map((item, idx) => {
      const currentPlay = currentVideo === '' + idx ? true : false;
      return (
        <div
          className={styles.videoWrapper}
          key={`video${idx}`}
          data-videonum={idx}
          onClick={this.handleVideoPlay}
          style={{ height: item.image.h / 2 + 'px' }}   //根据视频封面图的尺寸等比例显示视频宽高
        >
          //视频封面图
          <div
            className={styles.videoPoster}
            style={
              currentPlay
                ? { backgroundColor: '#000000' }
                : {
                    backgroundImage:
                      item.image && `url("${item.image.s}")`,
                  }
            }
          />

          //在真正的视频上覆盖一层播放按钮触发膜，形成假象（因为此时视频不一定被加载进来）
          <div className={styles.videoTrigger}>
            {!currentPlay && <div className={styles.videoTgimg} />}
          </div>

          //因为是在循环中使用videoRef，限制点击的是当前的视频才插入video DOM,保证当前页面只能获取到一个videoRef，触发paly()
          {currentPlay ? (
            <video
              ref={this.videoRef}
              className={styles.video}
              src={item.v}
              controls
              x-webkit-airplay="true"
              webkit-playsinline="true"   //解决低版本iOS点击播放按钮即全屏播放的问题
              playsInline={true}
            />
          ) : null}
        </div>
      );
    })
  );
}
