import { getEvents } from "@/services/api/events";
import axios from "axios";

// const data = await getEvents("cmtgyhgck00009zexv8wcfuua");
const data = await axios.get(
  "http://localhost:3000/api/sessions/cmtgyhgck00009zexv8wcfuua/events",
);
console.log(data.data);
