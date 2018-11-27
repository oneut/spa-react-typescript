export interface ICommentAttributes {
  by: string,
  id: number,
  parent: number,
  text: string,
  time: number,
  type: string,
  kids: ICommentAttributes[]
}
