import _ from "lodash";


export const ideas = _.times(100, i => ({
  name: `name${i}`,
  nick: `nick${i}`,
  description: `this is description with idea ${i}!`,
  text: _.times(100, j => `<p>Text paragrph ${j}/....</p>`).join(""),
}))