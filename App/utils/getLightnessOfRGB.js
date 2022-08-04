export const getLightnessOfRGB = (params) => {
  let substringColor = params && params.substring(5, params.length - 1);
  let split = substringColor ? substringColor.split(',') : [];
  if (split && split.length) {
    const color = {r: split[0].trim(), g: split[1].trim(), b: split[2].trim()};

    if (color.r >= 170) {
      if (color.g >= 140) return 'light';
      else return 'dark';
    } else if (color.r <= 170) {
      if (color.g >= 165) return 'light';
      else return 'dark';
    }
  }
};
