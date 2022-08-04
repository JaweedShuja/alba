import {mean} from 'd3-array';

const ACTIVE = '#FF1844',
  INACTIVE = '#424056',
  ACTIVE_PLAYABLE = '#1b1b26';

const ACTIVE_INVERSE = '#4F1224',
  ACTIVE_PLAYABLE_INVERSE = '#131116',
  INACTIVE_INVERSE = '#1C1A27';

function getColor(bars, bar, percentPlayed, percentPlayable, inverse) {
  if (bar / bars.length < percentPlayed) {
    return inverse ? ACTIVE : ACTIVE_INVERSE;
  } else if (bar / bars.length < percentPlayable) {
    return inverse ? ACTIVE_PLAYABLE : ACTIVE_PLAYABLE_INVERSE;
  } else {
    return inverse ? INACTIVE : INACTIVE_INVERSE;
  }
}

const WaveFormAudio = ({
  waveform,
  height,
  width,
  setTime,
  percentPlayed,
  percentPlayable,
  inverse,
}) => {
  const scaleLinearHeight = scaleLinear()
    .domain([0, waveform.height])
    .range([0, height]);
  const chunks = _.chunk(waveform.samples, waveform.width / ((width - 60) / 3));
  return (
    <View
      style={[
        {
          height,
          width,
          justifyContent: 'center',
          flexDirection: 'row',
        },
        inverse && {
          transform: [{rotateX: '180deg'}, {rotateY: '0deg'}],
        },
      ]}>
      {chunks.map((chunk, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => {
            setTime(i);
          }}>
          <View
            style={{
              backgroundColor: getColor(
                chunks,
                i,
                percentPlayed,
                percentPlayable,
                inverse,
              ),
              width: 2,
              marginRight: 1,
              height: scaleLinearHeight(mean(chunk)),
            }}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
export default WaveFormAudio;
