import * as Immutable from "immutable";
import timeago from "timeago.js";
import { ICommentAttributes } from "../attributes/ICommentAttributes";

interface IComment {
  by: string,
  id: number,
  parent: number,
  text: string,
  time: number,
  type: string,
  kids: Immutable.List<Comment>
}

const CommentRecord = Immutable.Record({
  by: "",
  id: 0,
  kids: Immutable.List(),
  parent: 0,
  text: "",
  time: 0,
  type: "",
});

export default class Comment extends CommentRecord implements IComment {
  public static newInstance(commentAttributes: ICommentAttributes) {
    return new Comment({
      by: commentAttributes.by,
      id: commentAttributes.id,
      kids: Immutable.List().withMutations((newCommentList) => {
        commentAttributes.kids.forEach((kidAttributes) =>
          newCommentList.push(Comment.newInstance(kidAttributes))
        );
      }),
      parent: commentAttributes.parent,
      text: commentAttributes.text,
      time: commentAttributes.time,
      type: commentAttributes.type,
    });
  }

  public getTimeAgo() {
    return timeago().format(new Date(this.time * 1000));
  }
}
