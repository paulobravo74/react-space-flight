import Wait from "../Components/Wait";

  export const Api = async (url) => {

    <Wait />

    try {
      const response = await fetch(url);
      const jsonData = await response.json();
      console.log(jsonData)
      return jsonData;
    } catch (error) {
      console.log(error);
      return null
    }

  }




