import {dataForum} from "../constants/data";
import reduce from 'lodash/reduce'

export const covertChildForumToObject = () => {
  return reduce(dataForum, (acc, {child}) => {
    child.forEach((item) => {
      acc[item.id] = item;
    })
    return acc;
  }, {});
}
