import { useEffect, useState } from "react";

const STATUS = {
  LOADING: "loading",
  LOADED: "loaded",
  UNLOADED: "unloaded",
};
const localCache = {};
export default function useBreadList(animal) {
  const [breadList, setBreadList] = useState([]);
  const [status, setStatus] = useState(STATUS.UNLOADED);
  useEffect(() => {
    if (!animal) {
      setBreadList([]);
    } else if (localCache[animal]) {
      setBreadList(localCache[animal]);
    } else {
      requestBreadList();
    }
    async function requestBreadList() {
      setBreadList([]);
      setStatus(STATUS.LOADING);
      const res = await fetch(
        `https://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreadList(localCache[animal]);
      setStatus(STATUS.LOADED);
    }
  }, [animal]);

  return [breadList, status];
}
