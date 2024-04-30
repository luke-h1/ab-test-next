import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const useAbTesting = () => {
  const [variant, setVariant] = useState<"control" | "experiment">("control");
  const cookieName = "abTest";

  // expr + cust id hash if have auth

  useEffect(() => {
    const getAndSetVariant = async () => {
      let abTest = Cookies.get(cookieName);
      const { count } = await fetch("/api/counter").then((res) => res.json());
      console.log("count is", count);

      const TOTAL_USERS = 100;

      const FIFTY_PERCENT_OF_USERS = TOTAL_USERS / 2;

      if (!abTest && parseInt(count) < FIFTY_PERCENT_OF_USERS) {
        Cookies.set(cookieName, "experiment");

        const res = await fetch("/api/counter", {
          method: "POST",
        }).then((res) => res.json());

        console.log("res is", res.count);

        setVariant("experiment");
      } else {
        Cookies.set(cookieName, "control");
        setVariant("control");
      }
      return variant;
    };

    getAndSetVariant();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
export default useAbTesting;
