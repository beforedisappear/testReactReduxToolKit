import axios from "axios";

export const useHttp = () => {
  //   const request = useCallback(
  //     async (
  //       url,
  //       method = "GET",
  //       body = null,
  //       headers = { "Content-Type": "application/json" }
  //     ) => {
  //       // setProcess('loading');

  //       try {
  //         const response = await fetch(url, { method, body, headers });

  //         if (!response.ok) {
  //           throw new Error(`Could not fetch ${url}, status: ${response.status}`);
  //         }

  //         const data = await response.json();

  //         return data;
  //       } catch (e) {
  //         throw e;
  //       }
  //     },
  //     []
  //   );

  const request = async (
    url,
    method = "GET",
    data = null
    //body = null,
    //headers = { "Content-Type": "application/json" }
  ) => {
    try {
      const response = await axios({
        method: method,
        url: url,
        //headers: headers,
        data: data,
      });
      
      return response.data;
    } catch (e) {
      throw e;
    }
  };

  return { request };
};
