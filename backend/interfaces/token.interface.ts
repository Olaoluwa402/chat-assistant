type ObjectId = string;

interface Token extends Object {
  id: ObjectId;
  expiresIn: number;
}

export default Token;
