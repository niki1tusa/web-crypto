import _ from "lodash";


export const ideas = _.times(100, i => ({
  id: `${i}`,
  name: `text ${i} `,
  description: `this is description with idea ${i}!`,
  text: _.times(100, j => `<p>Text paragrph ${j}/....</p>`).join(""),
}))