import { useQuery } from "react-query";
import { getUserDatabase } from './endpoint';

const QueryUserDatabase = () => useQuery("database", () => getUserDatabase());

export default QueryUserDatabase;
