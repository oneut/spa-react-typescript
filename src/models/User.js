import Immutable from "immutable";

const UserRecord = Immutable.Record({
  created: null,
  id: "",
  karma: 0,
});

export default class User extends UserRecord {}
